import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { ComputerModule } from './computer/computer.module';
import { CompanyModule } from './company/company.module';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { HomeComponent } from './home/home.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    ComputerModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CompanyModule,
    LoginModule,
    
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
