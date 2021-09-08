import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyAddComponent } from './company/company-add/company-add.component';
import { CompanyDetailComponent } from './company/company-detail/company-detail.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { ComputerListComponent } from './computer/computer-list/computer-list.component';
import { LoginComponent } from './login/login.component';

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
    component: CompanyListComponent,
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
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
