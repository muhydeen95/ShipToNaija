import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  fromEvent,
  mapTo,
  merge,
  of,
} from 'rxjs';
import * as fromApp from '@store/app/app.reducer';
import * as CryptoJS from 'crypto-js';
import { environment } from '@env/environment';
import { Notification } from '../interfaces';
import { NotificationService } from './notification.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HelperService implements OnDestroy {
  private triggerSurveySaveFunctionSubject = new Subject<void>();

  private subscription: Subscription = new Subscription();
  messenger = new BehaviorSubject<any>(null);

  triggerFunction$ = this.triggerSurveySaveFunctionSubject.asObservable();

  constructor(
    private store: Store<fromApp.AppState>,
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  triggerFunction() {
    this.triggerSurveySaveFunctionSubject.next();
  }

  checkExpiryStatusOfNg2Idle() {
    /**if a user is
     * logged in and leaves the browser window or
     * their device goes to sleep
     * and in that mean time,
     * 'ng2Idle.main.expiry' || 'SAW' || 'SAW_auth' expires
     * this function acts as a force logout feature
     */
    document.addEventListener('visibilitychange', () => {
      const SAWData: {
        accessToken: string;
        userToken: string;
        exp: number;
      } = JSON.parse(localStorage.getItem('SAW')!);

      const SAWAuthData: {
        bearer_token: string;
        expiryDate: number;
      } = JSON.parse(localStorage.getItem('SAW_auth')!);

      const ng2IdleMainExpiry = parseInt(
        localStorage.getItem('ng2Idle.main.expiry')!
      );

      if (
        (ng2IdleMainExpiry <= new Date().getTime() ||
          (SAWData?.exp <= new Date().getTime() && ng2IdleMainExpiry) ||
          (SAWAuthData?.expiryDate <= new Date().getTime() &&
            ng2IdleMainExpiry)) &&
        document.visibilityState === 'visible'
      ) {
        this.authService.hasSessionLogoutBeenCalled = false;
        this.authService.stopActivityMonitor();

        localStorage.removeItem('SAW');
        localStorage.removeItem('SAW_auth');

        location.reload();
      }
    });
  }

  AES_Encryption_Decryption(instance: 'encrypt' | 'decrypt', data: string) {
    let result!: any;

    const encryptionKey = CryptoJS.enc.Utf8.parse(environment.AES_SecretKey);
    const salt = CryptoJS.enc.Base64.parse('SXZhbiBNZWR2ZWRldg=='); // This is the byte array in .net fiddle

    const iterations = 1000; // https://learn.microsoft.com/en-us/dotnet/api/system.security.cryptography.rfc2898derivebytes?view=netcore-3.1
    const keyAndIv = CryptoJS.PBKDF2(encryptionKey, salt, {
      keySize: 256 / 32 + 128 / 32,
      iterations: iterations, // The default iteration count is 1000 so the two methods use the same iteration count.
      hasher: CryptoJS.algo.SHA1,
    });

    /**
     * so PBKDF2 in CryptoJS is direct in that it
     * always begins at the beginning of the password, whereas the .net
     * implementation offsets by the last length each time .GetBytes() is called
     * so we had to generate a Iv + Salt password and then split it
     */

    const hexKeyAndIv = CryptoJS.enc.Hex.stringify(keyAndIv);
    const key = CryptoJS.enc.Hex.parse(hexKeyAndIv.substring(0, 64));
    const iv = CryptoJS.enc.Hex.parse(
      hexKeyAndIv.substring(64, hexKeyAndIv.length)
    );

    // As you're using Encoding.Unicode in .net, we have to use CryptoJS.enc.Utf16LE here.
    if (instance === 'encrypt') {
      result = CryptoJS.AES.encrypt(CryptoJS.enc.Utf16LE.parse(data), key, {
        iv: iv,
        padding: CryptoJS.pad.ZeroPadding,
      }).toString();
    } else if (instance === 'decrypt') {
      result = CryptoJS.AES.decrypt(data, key, {
        iv: iv,
        padding: CryptoJS.pad.ZeroPadding,
      }).toString(CryptoJS.enc.Utf16LE);
    }

    return result;
  }

  decryptResponse(resData: any) {
    return {
      ...resData,
      entity:
        resData.entity !== null
          ? JSON.parse(
              this.AES_Encryption_Decryption('decrypt', resData.entity as any)
            )
          : resData.entity,
    };
  }

  readonly online$: Observable<boolean> = merge(
    of(navigator.onLine),
    fromEvent(window, 'online').pipe(mapTo(true)),
    fromEvent(window, 'offline').pipe(mapTo(false))
  );

  private getErrorMessageFromHttpErrorResponse(
    errorRes: HttpErrorResponse,
    data: any
  ): string {
    switch (errorRes.status) {
      case 400:
        if (Array.isArray(errorRes.error.data)) {
          return errorRes.error.data.join(', ');
        }

        return errorRes.error.message;

      case 401:
        // location.reload();
        this.router.navigate(['login']);
        return errorRes.error.message;

      case 403:
        if (errorRes.error.message.toLowerCase().includes('change')) {
          this.router.navigate(['change'], {
            queryParams: {
              email: data.email,
              password: data.password,
            },
          });
        } else {
          this.router.navigate(['app/dashboard']);
        }

        return errorRes.error.message;

      case 404:
        return errorRes.error.message;

      default:
        return errorRes.error.message;
    }
  }

  handleErrorMessages(errorRes: HttpErrorResponse, type: string, data?: any) {
    const notification: Notification = {
      state: 'error',
      title: 'System Notification',
      message: this.getErrorMessageFromHttpErrorResponse(errorRes, data),
    };

    this.notificationService.openNotification(
      notification,
      'saw-notification-error'
    );

    this.store.dispatch({
      type: type,
    });

    return of();
  }

  upload(files: File[]): Observable<any> {
    const formData: FormData = new FormData();

    files.forEach((file) => {
      formData.append('files', file);
    });

    return this.http.post(`${environment.api_url}/upload`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
