import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    CustomMaterialModule,
    SharedModule,
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
