import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Authentication/login/login.component';
import { LandingPageComponent } from './Components/WelcomePage/landing-page/landing-page.component';
import { RegisterComponent } from './Components/Authentication/register/register.component';
import { DashboardComponent } from './Components/Admin/dashboard/dashboard.component';
import { AdminsComponent } from './Components/Admin/admins/admins.component';
import { UsersManagComponent } from './Components/Admin/users-manag/users-manag.component';
import { RoleManagComponent } from './Components/Admin/role-manag/role-manag.component';
import { AuthGuard } from './Gards/auth.guard';
import { DeptPlantMangComponent } from './Components/Admin/dept-plant-mang/dept-plant-mang.component';
import { LoadingComponent } from './Components/loading/loading.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { SuppliersManagComponent } from './Components/Admin/suppliers-manag/suppliers-manag.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin', component: AdminsComponent, children: [
      {
        path: 'dashboard', component: DashboardComponent

      },
      {
        path: 'users', component: UsersManagComponent,

      },
      {
        path: 'roles', component: RoleManagComponent,
      },
      {
        path: 'plants', component: DeptPlantMangComponent,
      },
      {
        path: 'suppliers', component: SuppliersManagComponent,
      }
    ], canActivate: [AuthGuard]
  },
  { path: 'loading', component: LoadingComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },

  // { path : 'dashboard',component:DashboardComponent},
  // {
  //   path:'admin', 
  //   component: AdminsComponent,
  //   children: [
  //     {
  //       path:'dashboard', component: DashboardComponent
  //     }
  //   ]
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

