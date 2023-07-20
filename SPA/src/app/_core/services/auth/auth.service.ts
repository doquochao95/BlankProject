import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import {UserForLogged, UserLoginParam} from '@models/auth/auth';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';
import {LocalStorageConstants} from '@constants/local-storage.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  constructor(private  http: HttpClient,
              private  router: Router) { }
  login(param: UserLoginParam) {
    return this.http.post(this.apiUrl + 'auth/login', param).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem(LocalStorageConstants.TOKEN, user.token);
          localStorage.setItem(LocalStorageConstants.USER, JSON.stringify(user.user));
          localStorage.setItem(LocalStorageConstants.ROLES, JSON.stringify(user.user.roles));
          localStorage.setItem(LocalStorageConstants.ROLE_ALL, JSON.stringify(user.user.roleAll));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
        }
      })
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  loggedIn() {
    const token: string = localStorage.getItem(LocalStorageConstants.TOKEN);
    const user: UserForLogged = JSON.parse(localStorage.getItem(LocalStorageConstants.USER));
    const roles: string[] = JSON.parse(localStorage.getItem(LocalStorageConstants.ROLES));
    return !(!user || !roles) || !this.jwtHelper.isTokenExpired(token);
  }
}
