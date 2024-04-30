import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Authentication/login/login.component';
import { LandingPageComponent } from './Components/WelcomePage/landing-page/landing-page.component';
import { RegisterComponent } from './Components/Authentication/register/register.component';
import { DashboardComponent } from './Components/Admin/dashboard/dashboard.component';
import { AdminsComponent } from './Components/Admin/admins/admins.component';
import { UsersManagComponent } from './Components/Admin/users-manag/users-manag.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path : 'login',component:LoginComponent},
  { path : 'register',component:RegisterComponent},
  { path : 'admin',component:AdminsComponent, children: [
        {
          path:'dashboard', component: DashboardComponent
          
        },
        {
          path:'users', component: UsersManagComponent,

        }
      ]},

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

