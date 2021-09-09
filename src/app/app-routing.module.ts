import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyAddComponent } from './company/company-add/company-add.component';
import { CompanyDetailComponent } from './company/company-detail/company-detail.component';
import { CompanyOverviewComponent } from './company/company-overview/company-overview.component';
import { ComputerListComponent } from './computer/computer-list/computer-list.component';

const routes: Routes = [

  // ROUTES COMPUTERS //

  {
    path: 'computers',
    component: ComputerListComponent,
    pathMatch: 'full'
  },


  // ROUTES COMPANIES //
  {
    path: 'companies',
    component: CompanyOverviewComponent,
    pathMatch: 'full'
  },
  {
    path: 'companies/:id',
    component: CompanyDetailComponent,
    pathMatch: 'full'
  },
  {
    path: 'companies/add',
    component: CompanyAddComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
