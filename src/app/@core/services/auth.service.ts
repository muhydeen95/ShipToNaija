import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Notification } from '../interfaces';
import { NotificationService } from './notification.service';
import { Subscription, filter } from 'rxjs';
import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import {
  AuthenticationResult,
  EventMessage,
  EventType,
  RedirectRequest,
} from '@azure/msal-browser';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  idleState = 'Not started.';
  hasRefreshTokenBeenCalled: boolean = false;
  hasSessionLogoutBeenCalled: boolean = false;

  // private tokenExpirationTimer: any;
  private subscription = new Subscription();

  constructor(
    private idle: Idle,
    private notificationService: NotificationService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService // private _jwt: JwtHelperService
  ) {
    // sets an idle timeout of 1 second.
    this.idle.setIdle(1);

    // sets a timeout period of 3600 seconds. after 3601 seconds of inactivity, the user will be considered timed out.
    this.idle.setTimeout(3600);

    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.subscription.add(
      this.idle.onTimeoutWarning.subscribe((countdown) => {
        this.idleState = `Timer = ${countdown}`;

        const SAWData = JSON.parse(localStorage.getItem('SAW')!);
        const SAWAuthData = JSON.parse(localStorage.getItem('SAW_auth')!);

        const SAWSessionExpiryDateTime = SAWData?.exp;
        const SAWAuthSessionExpiryDateTime = SAWAuthData?.expiryDate;

        const currentDateTime = new Date().getTime();

        const SAWTimeLeft =
          (SAWSessionExpiryDateTime - currentDateTime) / 60000; //Value in minutes from milliseconds

        const SAWAuthTimeLeft =
          (SAWAuthSessionExpiryDateTime - currentDateTime) / 60000; //Value in minutes from milliseconds

        //If time runs out i.e timeLeft <= 0, logout user
        if (
          (SAWTimeLeft <= 0 || SAWAuthTimeLeft <= 0) &&
          this.hasSessionLogoutBeenCalled === false
        ) {
          this.sessionLogout();
        }
      })
    );

    this.subscription.add(
      this.idle.onIdleEnd.subscribe(() => {
        this.idleState = `You're now active`;

        const SAWData = JSON.parse(localStorage.getItem('SAW')!);
        const SAWAuthData = JSON.parse(localStorage.getItem('SAW_auth')!);

        const SAWSessionExpiryDateTime = SAWData?.exp;
        const SAWAuthSessionExpiryDateTime = SAWAuthData?.expiryDate;

        const currentDateTime = new Date().getTime();

        const SAWTimeLeft =
          (SAWSessionExpiryDateTime - currentDateTime) / 60000; //Value in minutes from milliseconds

        const SAWAuthTimeLeft =
          (SAWAuthSessionExpiryDateTime - currentDateTime) / 60000; //Value in minutes from milliseconds

       
        if (
          (SAWTimeLeft <= 0 || SAWAuthTimeLeft <= 0) &&
          this.hasSessionLogoutBeenCalled === false
        ) {
          this.sessionLogout();
        }
      })
    );

    this.subscription.add(
      this.idle.onTimeout.subscribe(() => {
        this.idleState = 'Timed out!';

        /** As a last resort, if "this.idle.setTimeout(3600);" timesout
         *  and the both bearer tokens are still active,
         *  that means 3600 seconds (1 hour) has passed. So log the user out */
        this.sessionLogout();
      })
    );
  }

  autoLogout() {
    const notification: Notification = {
      state: 'error',
      message: `Your session has expired. Logging you out now.`,
    };

    this.notificationService.openNotification(
      notification,
      'saw-notification-error'
    );

    setTimeout(() => {

    }, 3000);
  }

  sessionLogout() {
    /** Only auto logout when in the APP **/
    if (location.pathname.includes('/app')) {
      this.autoLogout();

      this.hasSessionLogoutBeenCalled = true;
    }
  }

  startActivityMonitor() {
    this.idle.watch();
  }

  stopActivityMonitor() {
    if (this.idle) {
      this.idle.stop();
    }
  }

  initializeLoginWithAzureAD() {
    if (this.msalGuardConfig.authRequest) {
      this.msalService.loginRedirect({
        ...this.msalGuardConfig.authRequest,
      } as RedirectRequest);
    } else {
      this.msalService.loginRedirect();
    }
  }

  listenToAzureADLoginSuccess() {
    this.subscription.add(
      this.msalBroadcastService.msalSubject$
        .pipe(
          filter(
            (msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS
          )
        )
        .subscribe((result: EventMessage) => {
          const payload = result.payload as AuthenticationResult;

          this.msalService.instance.setActiveAccount(payload.account);
        })
    );
  }

  // decrypt_jwt(token: string): any {
  //   if (token) {
  //     const decoded = this._jwt.decodeToken(token);
  //     return decoded;
  //   }
  //   return null;
  // }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
