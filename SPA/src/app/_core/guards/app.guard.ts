import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {LocalStorageConstants} from "@constants/local-storage.constants";
import {RoleInfomation} from "@models/auth/auth";

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanLoad {
  constructor(private router: Router) { }
  canLoad(route: Route): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let role = route.data['role'];
    let roleOfUser: RoleInfomation[] = JSON.parse(localStorage.getItem(LocalStorageConstants.ROLES));
    let checkRole = roleOfUser.map(x => x.unique).some(x => x.trim() === role?.trim());
    if (checkRole) {
      return true;
    } else {
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
}
