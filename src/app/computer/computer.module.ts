import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComputerListComponent } from './computer-list/computer-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ComputerDetailsComponent } from './computer-details/computer-details.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { SharedModule } from '../shared/shared.module';



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
    SharedModule,
  ],
  exports: [
    ComputerDetailsComponent,
    ComputerListComponent,

  ]
})
export class ComputerModule { }
