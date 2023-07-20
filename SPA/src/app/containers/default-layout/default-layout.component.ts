import {Component, OnInit} from '@angular/core';
import {Nav} from '../../_nav';
import {AuthService} from '@services/auth/auth.service';
import {INavData} from '@coreui/angular';
import {LocalStorageConstants} from '@constants/local-storage.constants';
import {UserForLogged} from '@models/auth/auth';
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems: INavData[] = [];
  user: UserForLogged = JSON.parse((localStorage.getItem(LocalStorageConstants.USER)));
   constructor(private authService: AuthService,
              private navItem: Nav) {
   }
  ngOnInit() {
     this.navItems = this.navItem.getNav();
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
     this.authService.logout();
  }
}
