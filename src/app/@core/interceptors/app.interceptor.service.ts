import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpContextToken,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
export const metaData = {
  ANONYMOUS: new HttpContextToken(() => false),
  External: new HttpContextToken(() => false),
};

@Injectable({
  providedIn: 'root',
})
export class AppInterceptorService implements HttpInterceptor {
  ipAddress: any;

  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = request.clone({
      headers: request.headers.set(
        'Authorization',
        `Basic ${environment.basic_auth}`
      ),
    });

    const isExternal = request.context.get(metaData.External);
    const isAnonymous = request.context.get(metaData.ANONYMOUS);

    if (isExternal) {
      return next.handle(request);
    } else if (authReq.url.includes('auth') && !isAnonymous) {
      return next.handle(authReq);
    } else if (
      (authReq.url !== `${environment.api_url}/auth/login` &&
        authReq.url.includes(environment.api_url)) ||
      authReq.url.includes(environment.api_url)
    ) {
      if (localStorage.getItem('SAW') !== null) {
        const SAWData: {
          accessT: string;
          exp: number;
        } = JSON.parse(localStorage.getItem('SAW')!);

        authReq = authReq.clone({
          headers: authReq.headers.set('AccessToken', `${SAWData.accessT}`),
        });

        return next.handle(authReq);
      } else {
        return next.handle(authReq);
      }
    } else {
      return next.handle(authReq);
    }
  }
}
