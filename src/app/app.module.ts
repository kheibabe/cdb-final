import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, httpInterceptorProviders } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { ComputerModule } from './computer/computer.module';
import { CompanyModule } from './company/company.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { LoginModule } from './login/login.module';
import { FormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { RouteGuard} from './shared/route-guard';
<<<<<<< HEAD
import { RegisterModule } from './register/register.module';
=======
import { StoreModule } from '@ngrx/store';
>>>>>>> dev

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, 'http://localhost:4200/assets/i18n/', '-lang.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LogoutComponent,
  ],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CoreModule,
    ComputerModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CompanyModule,
    LoginModule,
    RegisterModule,
    FormsModule,

  ],
  providers: [
    httpInterceptorProviders,
    RouteGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
