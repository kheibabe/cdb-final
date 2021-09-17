import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { CompanyAddComponent } from './company-add/company-add.component';
import { CompanyOverviewComponent } from './company-overview/company-overview.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { DialogContent } from '../computer/computer-list/dialog-content';
import { DeleteDialog } from './company-overview/delete-dialog';



@NgModule({
  declarations: [
    CompanyDetailComponent,
    CompanyAddComponent,
    CompanyOverviewComponent,
    EditCompanyComponent,
    DeleteDialog,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    CustomMaterialModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    CompanyDetailComponent,
    CompanyAddComponent,
    CompanyOverviewComponent,
    DeleteDialog,
  ]
})
export class CompanyModule { }
