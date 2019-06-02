#include <OneWire.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include <ESP8266WiFi.h>
#include <SocketIOClient.h>
#include <ArduinoJson.h>

#define ONE_WIRE_BUS 2

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);
TinyGPSPlus gps;
SoftwareSerial softwareSerial(4, 5);
SocketIOClient client;

const char* ssid = "VINH";         
const char* password = "26031107"; 
const char* uuid = "d0b96e26-c125-4003-a8b1-3921daf8fc07";
const char* name = "Test ESP8266";
char host[] = "192.168.1.11";
int port = 3000;
float voltage = 0.0;
float tempVoltage = 0.0;
int analogValue;
unsigned long previousMillis = 0;
long interval = 5000;

extern String RID;
extern String Rfull;

void setup() {
  Serial.begin(9600);
  softwareSerial.begin(9600);
  delay(10);

  connectWifi();
  connectSocket();
  
  sensors.begin();
  Serial.println("Every thing is ready !");
  Serial.println();
}

void loop() {
  handleAllData();
  delay(5000);
}

void connectWifi() {
  Serial.print("Connecting to ssid: ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) { 
    delay(500);
    Serial.print('.');
  }
  Serial.println();
  Serial.println(F("WiFi is connected !"));
  Serial.println(F("IP Address of ESP8266 (Socket Client ESP8266): "));
  Serial.println(WiFi.localIP());
}

void connectSocket() {
   if (!client.connect(host, port)) {
      Serial.println(F("Can't connect to socket server, please check again !"));
      return;
  }

  if (client.connected()) {
     StaticJsonDocument<200> jsonBuffer;
     jsonBuffer["message"] = "Request from ESP8266";
     char output[1024];
     serializeJson(jsonBuffer, output);
     client.send("connection", output);  
  }
}

void handleAllData() {
  if (millis() - previousMillis > interval) {
    previousMillis = millis();
    handleVoltage();
    handleGps();
    handleTemperature();
  }
  handleEventFromSocket();
}

void handleVoltage() {
  analogValue = analogRead(A0);
  voltage = (analogValue * 3.3)/ 1024.0;
  tempVoltage = voltage * 3.4;
  StaticJsonDocument<200> jsonVoltageBuffer;
  jsonVoltageBuffer["uuid"] = uuid;
  jsonVoltageBuffer["voltage"] = tempVoltage;
  char output[1024];
  serializeJson(jsonVoltageBuffer, output);
  client.send("requestUpdateVoltage", output);
}

void handleGps() {
  while (softwareSerial.available() > 0) {
    if (gps.encode(softwareSerial.read())) {
      Serial.print(("Location: ")); 
      if (gps.location.isValid()) {
        Serial.print(gps.location.lat(),6);
        Serial.print(",");
        Serial.print(gps.location.lng(),6);
        StaticJsonDocument<200> jsonGpsBuffer;
        jsonGpsBuffer["uuid"] = uuid;
        jsonGpsBuffer["lat"] = gps.location.lat() * pow(10, 6);
        jsonGpsBuffer["lng"] = gps.location.lng() * pow(10, 6);
        char output[1024];
        serializeJson(jsonGpsBuffer, output);
        client.send("requestUpdateGps", output);
      } else {
        Serial.print(("INVALID"));
      }  
    }
  }
    
  if (millis() > 5000 && gps.charsProcessed() < 10) {
    Serial.println(F("No GPS detected: check wiring."));
    while(true);
  }
}

void handleTemperature() {
  sensors.requestTemperatures();
  StaticJsonDocument<200> jsonTemperatureBuffer;
  jsonTemperatureBuffer["uuid"] = uuid;
  jsonTemperatureBuffer["temperature"] = sensors.getTempCByIndex(0);
  char output[1024];
  serializeJson(jsonTemperatureBuffer, output);
  client.send("requestUpdateTemperature", output);
}

void handleEventFromSocket() {
  if (client.monitor()) {
    StaticJsonDocument<200> doc;
    deserializeJson(doc, Rfull);
    JsonObject object = doc.as<JsonObject>();
    const char* uuid = object["uuid"];
    const char* status = object["status"];
    const char* updatedOn = object["updatedOn"];
    const char* type = object["type"];
    Serial.println(uuid);
    Serial.println(status);
    Serial.println(updatedOn);
    Serial.println(type);
  }
    
  if (!client.connected()) {
    client.reconnect(host, port);
  }
}
