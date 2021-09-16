import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register.component';



@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    CustomMaterialModule,
    SharedModule,
  ],
  exports: [
    RegisterComponent
  ]
})
export class RegisterModule { }
