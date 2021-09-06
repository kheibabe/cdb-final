import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { CompanyAddComponent } from './company-add/company-add.component';
import { CompanyOverviewComponent } from './company-overview/company-overview.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CompanyListComponent,
    CompanyDetailComponent,
    CompanyAddComponent,
    CompanyOverviewComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    CustomMaterialModule,
    FormsModule,
  ],
  exports: [
    CompanyListComponent,
    CompanyDetailComponent,
    CompanyAddComponent,
    CompanyOverviewComponent
  ]
})
export class CompanyModule { }
