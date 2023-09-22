import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import '../app/_core/utilities/extension-methods';

import { IconSetService } from '@coreui/icons-angular';
import { freeSet } from '@coreui/icons';
import './_core/utilities/extension-methods'
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageConstants } from '@constants/local-storage.constants';
import { LangConstants } from '@constants/lang-constants';
import { InjectBase } from '@utilities/inject-base-app';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: `
    <router-outlet></router-outlet>
    <ng-snotify></ng-snotify>
    <ngx-spinner bdColor="rgba(51,51,51,0.8)" size="medium" color="#fff" type="ball-scale-multiple"></ngx-spinner>
  `,
  providers: [IconSetService],
})
export class AppComponent extends InjectBase implements OnInit {
  lang: string = localStorage.getItem(LocalStorageConstants.LANG);

  constructor(public iconSet: IconSetService) {
    super()
    iconSet.icons = { ...freeSet };
  }

  ngOnInit() {
    this.translateService.addLangs([LangConstants.ZH, LangConstants.EN, LangConstants.VI]);
    if (!this.lang) {
      this.lang = LangConstants.EN
      localStorage.setItem(LocalStorageConstants.LANG, this.lang);
    }
    this.translateService.setDefaultLang(this.lang);
    this.translateService.use(this.lang);
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
