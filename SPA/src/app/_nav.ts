import { Injectable } from '@angular/core';
import { INavData } from '@coreui/angular';
import { RoleInfomation } from './_core/models/auth/auth';
import { LocalStorageConstants } from '@constants/local-storage.constants';
import { NavConstants } from '@constants/nav.constants';
import { firstValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { FunctionUtility } from '@utilities/function-utility';

@Injectable({ providedIn: 'root' })
export class Nav {
  nav: INavData[] = [];
  constructor(private translateService: TranslateService) { }
  // async getNav(roles: RoleInfomation[]): Promise<INavData[]> {
  //   this.navItems = [];
  //   const navConstants = NavConstants;
  //   for (let i = 0; i < navConstants.length; i++) {
  //     let navParent: INavData = {
  //       name: `${i+1}. ${ await firstValueFrom(this.translateService.get(navConstants[i].variant))}`,
  //       icon: navConstants[i].icon,
  //       url: navConstants[i].name.toLowerCase(),
  //       children: []
  //     }
  //     this.navItems.push(navParent);
  //   }
  //   let routerParents = navConstants.map(x => x.name.toLowerCase());
  //   if(roles && roles.length > 0) {
  //     for (let i = 0; i < roles.length; i++) {
  //       let positionIndex = +(`${roles[i].position}`.charAt(0));
  //       let navItem: INavData = {
  //         name: await firstValueFrom(this.translateService.get(`Roles.Menu_Child.${roles[i].unique}`)),
  //         url: roles[i].unique === "BQRC.QRCodeWIPReport" ? 'report/qrcode-wip-report' : this.functionUtility.convertUrlMenu(roles[i].unique, positionIndex - 1, routerParents),
  //         class: 'menu-margin'
  //       };
  //       this.navItems[positionIndex-1].children.push(navItem);
  //     }
  //   }
  //   return this.navItems;
  // }
  // async getNav() {
  //   this.nav = [];
  //   const navConstants = NavConstants;
  //   for (let i = 0; i < navConstants.length; i++) {
  //     const navParent: INavData = {
  //       name: `${i + 1}. ${navConstants[i].name}`,
  //       icon: navConstants[i].icon,
  //       url: navConstants[i].name.toLowerCase(),
  //       children: [],
  //     };
  //     this.nav.push(navParent);
  //   }

  //   const user_roles: RoleInfomation[] =
  //     JSON.parse(localStorage.getItem(LocalStorageConstants.ROLES)) || [];
  //   user_roles.forEach((roleItem, i) => {
  //     const positionIndex = +`${user_roles[i].program_Code}`.charAt(0);
  //     const navItem: INavData = {
  //       name: `${roleItem.program_Code} ${roleItem.program_Name}`,
  //       url: navConstants[positionIndex - 1]?.name.toLowerCase() + '/' + this.convertUrl(roleItem.program_Name),
  //       class: 'menu-margin'
  //     };
  //     this.nav[positionIndex - 1]?.children.push(navItem);
  //   });
  //   return this.nav;
  // }
  async getNav() {
    this.nav = [];
    const navConstants = NavConstants;
    for (let i = 0; i < navConstants.length; i++) {
      const navParent: INavData = {
        name: `${i + 1}. ${await firstValueFrom(this.translateService.get(`Roles.${navConstants[i].name}`.replace('-', ' ')))}`,
        icon: navConstants[i].icon,
        url: navConstants[i].name.toLowerCase(),
        children: [],
      };
      this.nav.push(navParent);
    }

    const user_roles: RoleInfomation[] =
      JSON.parse(localStorage.getItem(LocalStorageConstants.ROLES)) || [];
    user_roles.forEach(async (roleItem, i) => {
      const positionIndex = +`${user_roles[i].program_Code}`.charAt(0);
      const navItem: INavData = {
        name: `${roleItem.program_Code} ${await firstValueFrom(this.translateService.get(`Roles.Menu_Child.${roleItem.program_Name.split(' ').join('')}`))}`,
        url: navConstants[positionIndex - 1]?.name.toLowerCase() + '/' + this.convertUrl(roleItem.program_Name),
        class: 'menu-margin'
      };
      this.nav[positionIndex - 1]?.children.push(navItem);
    });
    return this.nav;
  }

  convertUrl(str: string): string {
    const strConvert = str.toLowerCase().replace('/', ' ').split(' ');
    strConvert.shift();
    return strConvert.filter((x) => x !== '&').join('-');
  }
}
