import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable, ReplaySubject} from "rxjs";
import {JwtService} from "./jwt.service";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
      private http: HttpClient
  ) { }

  attemptAuth(credentials) {
    return this.http.post('https://solar-energy-server.herokuapp.com/auth/sign-in', credentials).pipe(map((response: any) => {
      this.setAuth(response);
      return response;
    }));
  }

  attemptRegister(credentials): Observable<any> {
    return this.http.post('user/register', credentials).pipe(map((response: any) => {
      JwtService.saveToken(response.token);
      return response;
    }));
  }

  private setAuth(user) {
    JwtService.saveToken(user.token);
    this.isAuthenticatedSubject.next(true);
  }

  private purgeAuth() {
    JwtService.destroyToken();
    this.isAuthenticatedSubject.next(false);
  }

  signOut() {
    this.purgeAuth();
  }
}
