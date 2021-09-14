import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComputerListComponent } from './computer-list/computer-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ComputerDetailsComponent } from './computer-details/computer-details.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { SharedModule } from '../shared/shared.module';
import { NewComputerComponent } from './new-computer/new-computer.component';



@NgModule({
  declarations: [
    ComputerDetailsComponent,
    NewComputerComponent,
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
    NewComputerComponent,
    ComputerListComponent,

  ]
})
export class ComputerModule { }
