import { Component, OnInit } from "@angular/core";
import { InjectBase } from "@utilities/inject-base-app";
import { CaptionConstants, MessageConstants } from '@constants/message.enum';
import { UserLoginParam } from '@models/auth/auth';
import { AuthService } from '@services/auth/auth.service';
import { KeyValuePair } from "@utilities/key-value-pair";

@Component({
  selector: "app-dashboard",
  templateUrl: "login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent extends InjectBase implements OnInit {
  user: UserLoginParam = <UserLoginParam>{
  };
  listFactory: KeyValuePair[] = [];
  constructor(
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
  }
  login() {
    this.spinnerService.show();
    this.authService.login(this.user).subscribe({
      next: () => {
        this.snotifyService.success(
          this.translateService.instant('System.Message.LogIn'),
          this.translateService.instant('System.Caption.Success'));
        this.spinnerService.hide();
      },
      error: () => {
        this.snotifyService.error(
          this.translateService.instant('System.Message.LogInFailed'),
          this.translateService.instant('System.Caption.Error'));
        this.spinnerService.hide();
      },
      complete: () => {
        this.router.navigate(["/dashboard"]);
        this.spinnerService.hide();
      }
    })
  }
  // login() {
  //   this.spinnerService.show();
  //   this.authService.login(this.user).subscribe({
  //     next: () => {
  //       this.snotifyService.success(
  //         MessageConstants.LOGGED_IN,
  //         CaptionConstants.SUCCESS);
  //       this.spinnerService.hide();
  //     },
  //     error: () => {
  //       this.snotifyService.error(MessageConstants.LOGIN_FAILED, CaptionConstants.ERROR);
  //       this.spinnerService.hide();
  //     },
  //     complete: () => {
  //       this.router.navigate(["/dashboard"]);
  //       this.spinnerService.hide();
  //     }
  //   });
  // }
}
