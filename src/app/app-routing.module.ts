import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyAddComponent } from './company/company-add/company-add.component';
import { CompanyDetailComponent } from './company/company-detail/company-detail.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { ComputerDetailsComponent } from './computer/computer-details/computer-details.component';
import { ComputerListComponent } from './computer/computer-list/computer-list.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [

  // ROUTES COMPUTERS //

  {
    path: 'computers',
    component: ComputerListComponent,
    pathMatch: 'full'
  },

  {
    path: 'computers/:id',
    component: ComputerDetailsComponent,
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
    path: 'logout',
    component: LogoutComponent,
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
