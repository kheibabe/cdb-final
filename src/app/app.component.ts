
import { Component } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthenticationInterceptor } from './services/authentication.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi:true},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FinalOne';
}
