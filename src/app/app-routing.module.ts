import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyAddComponent } from './company/company-add/company-add.component';
import { CompanyDetailComponent } from './company/company-detail/company-detail.component';
import { CompanyOverviewComponent } from './company/company-overview/company-overview.component';
import { ComputerDetailsComponent } from './computer/computer-details/computer-details.component';
import { ComputerListComponent } from './computer/computer-list/computer-list.component';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { RouteGuard } from './shared/route-guard';
import { NewComputerComponent } from './computer/new-computer/new-computer.component';

const routes: Routes = [

  // ROUTES COMPUTERS //

  {
    path: 'computers',
    component: ComputerListComponent,
    pathMatch: 'full',
    canActivate : [RouteGuard],
  },

  {
    path: 'computers/:id',
    component: ComputerDetailsComponent,
    pathMatch: 'full',
    canActivate : [RouteGuard],
  },

  {
    path: 'computer/add',
    component: NewComputerComponent,
    pathMatch: 'full',
    canActivate : [RouteGuard],
  },


  // ROUTES COMPANIES //
  {
    path: 'companies',
    component: CompanyOverviewComponent,
    pathMatch: 'full',
    canActivate : [RouteGuard],
  },
  {
    path: 'companies/:id',
    component: CompanyDetailComponent,
    pathMatch: 'full',
    canActivate : [RouteGuard],
  },
  {
    path: 'companies/add',
    component: CompanyAddComponent,
    pathMatch: 'full',
    canActivate : [RouteGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full',
  },
  {
    path: 'logout',
    component: LogoutComponent,
    pathMatch: 'full',
    canActivate : [RouteGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
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
  exports: [RouterModule],
})

export class AppRoutingModule { }
