import { async } from '@angular/core/testing';
import { LangConstants } from '@constants/lang-constants';
import { Component, OnInit } from '@angular/core';
import { Nav } from '../../_nav';
import { INavData } from '@coreui/angular';
import { LocalStorageConstants } from '@constants/local-storage.constants';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { DestroyService } from '@services/destroy.service';
import { UserForLogged } from '@models/auth/auth';
import { AuthService } from '@services/auth/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  providers: [DestroyService]
})
export class DefaultLayoutComponent implements OnInit {
  langConstants: typeof LangConstants = LangConstants;

  public sidebarMinimized = false;
  public navItems: INavData[] = [];
  user: UserForLogged = JSON.parse((localStorage.getItem(LocalStorageConstants.USER)));

  constructor(
    private authService: AuthService,
    private translate: TranslateService,
    private navItem: Nav,
    private destroyService: DestroyService) {
  }
  async ngOnInit() {
    this.navItems = await this.navItem.getNav();
    this.translate.onLangChange.pipe(takeUntil(this.destroyService.destroys$)).subscribe(async (res) => {
      this.navItems = await this.navItem.getNav();
    });
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  switchLang(lang: string) {
    localStorage.setItem(LocalStorageConstants.LANG, lang);
    this.translate.use(lang);
  }
  logout() {
    this.authService.logout();
  }
  ngOnDestroy(): void {
  }
}
