import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgIdleModule } from '@ng-idle/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@env/environment';
import { AuthModule } from './@auth/auth.module';
import { AppInterceptorService } from './@core/interceptors/app.interceptor.service';
import * as fromApp from './@store/app/app.reducer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './@components/page-not-found/page-not-found.component';
import { UnauthorizedPageComponent } from './@components/unauthorized-page/unauthorized-page.component';
import { MatRippleModule } from '@angular/material/core';
import { ButtonLoaderModule } from './@core/shared/loaders/button-loader/button-loader.module';
import {
  IPublicClientApplication,
  PublicClientApplication,
  BrowserCacheLocation,
  LogLevel,
  InteractionType,
} from '@azure/msal-browser';
import {
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalInterceptorConfiguration,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
  MsalBroadcastService,
  MsalService,
  MsalGuard,
  MsalRedirectComponent,
  MsalModule,
  MsalInterceptor,
} from '@azure/msal-angular';
const GRAPH_ENDPOINT = 'Enter_the_Graph_Endpoint_Herev1.0/me';
const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;
export function loggerCallback(logLevel: LogLevel, message: string) {}
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '0f2d1bc0-489a-472d-a7e3-c309c6fcad7d',
      authority: 'https://login.microsoftonline.com/common/',
      redirectUri: '/azure-active-directory',
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
    },
  });
}
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(GRAPH_ENDPOINT, ['user.read']);
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read'],
    },
  };
}
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    UnauthorizedPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MsalModule,
    ButtonLoaderModule,
    StoreModule.forRoot(fromApp.appReducer, {
      metaReducers: fromApp.metaReducers,
    }),
    AuthModule,
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          logOnly: environment.production,
        }),
    NgIdleModule.forRoot(),
    MatRippleModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ],
  exports: [],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {}