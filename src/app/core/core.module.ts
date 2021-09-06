import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { CustomMaterialModule } from '../custom-material/custom-material.module';



@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CustomMaterialModule
  ],
  exports: [
    HeaderComponent,
  ]
})
export class CoreModule { }
