import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Authentication/login/login.component';
import { LandingPageComponent } from './Components/WelcomePage/landing-page/landing-page.component';
import { RegisterComponent } from './Components/Authentication/register/register.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path : 'login',component:LoginComponent},
  { path : 'register',component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}

