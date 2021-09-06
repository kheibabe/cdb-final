import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComputerListComponent } from './computer-list/computer-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ComputerDetailsComponent } from './computer-details/computer-details.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';



@NgModule({
  declarations: [
    ComputerDetailsComponent,
    ComputerListComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    CustomMaterialModule,
  ],
  exports: [
    ComputerDetailsComponent,
    ComputerListComponent,

  ]
})
export class ComputerModule { }
