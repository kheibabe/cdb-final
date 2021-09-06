import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { ComputerModule } from './computer/computer.module';
import { CompanyModule } from './company/company.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    ComputerModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CompanyModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
