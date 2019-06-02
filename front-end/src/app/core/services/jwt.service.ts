import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor() { }
  static getToken(): string {
    return window.localStorage.getItem('jwtToken');
  }

  static saveToken(token: string) {
    window.localStorage.setItem('jwtToken', token);
  }

  static destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }
}
