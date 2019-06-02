import {Component, OnInit} from '@angular/core';
import {DashboardService} from "./dashboard.service";
import {FormControl} from "@angular/forms";
import data from '../../mock-data/mock-data';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public lineChartVoltage = [{
        data: [],
        label: 'Voltage'
    }];
    public lineChartTemperature = [{
        data: [],
        label: 'Temperature'
    }];
    public lineChartDate = [];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors: Array<any> = [
        {
            // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        {
            // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        {
            // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend: boolean;
    public lineChartType: string;
    month: FormControl;
    station: FormControl;
    myData: any;

    constructor(
        private service: DashboardService
    ) {
        this.month = new FormControl(5);
        this.station = new FormControl(data[0].uuid);
    }

    ngOnInit() {
        this.lineChartLegend = true;
        this.lineChartType = 'line';
        this.get();
        this.subscribeMonth();
        this.subscribeStation();
    }

    get() {
        this.service.get(this.station.value).subscribe(data => {
            this.myData = data.statistics;
            this.renderChart(this.myData.find(item => item.month === +this.month.value).data);
        })
    }

    renderChart(data) {
        this.lineChartDate = data.map(item => item.date.split('-')[0]);
        this.lineChartVoltage[0].data = data.map(item => item.voltage);
        this.lineChartTemperature[0].data = data.map(item => item.temperature);
    }

    subscribeMonth() {
        this.month.valueChanges.subscribe(data => {
            this.renderChart(this.myData.find(item => item.month === +data).data);
        })
    }

    subscribeStation() {
        this.station.valueChanges.subscribe(data => {
            this.get();
        })
    }
}
