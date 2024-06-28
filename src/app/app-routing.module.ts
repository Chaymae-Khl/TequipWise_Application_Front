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
import { TokenExpiredComponent } from './Components/token-expired/token-expired.component';
import { MenuComponent } from './Components/menu/menu.component';
import { EquipmentManagComponent } from './Components/Admin/equipment-manag/equipment-manag.component';
import { EquipmentRequestComponent } from './Components/equipment-request/equipment-request.component';
import { UserEquipmentRequestListComponent } from './Components/user-equipment-request-list/user-equipment-request-list.component';
import { ConfirmationOperationsRequestListComponent } from './Components/confirmation-operations-request-list/confirmation-operations-request-list.component';
import { MyProfileComponent } from './Components/Authentication/my-profile/my-profile.component';

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
      },
      {
        path: 'equipements', component: EquipmentManagComponent,
      },
      {
        path: 'dashboard', component: DashboardComponent,
      }
    ], resolve: { isAuthenticated: AuthGuard }
  },
  { path: 'loading', component: LoadingComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: 'tokenExpired', component: TokenExpiredComponent },
  { path: 'Menu', component: MenuComponent, resolve: { isAuthenticated: AuthGuard } },
  { path: 'EquipementRequest', component: EquipmentRequestComponent, resolve: { isAuthenticated: AuthGuard } },
  { path: 'EquipmentList', component: UserEquipmentRequestListComponent, resolve: { isAuthenticated: AuthGuard } },
  { path: 'RequestConfirmation', component: ConfirmationOperationsRequestListComponent, resolve: { isAuthenticated: AuthGuard } },
  { path: 'MyProfile', component: MyProfileComponent, resolve: { isAuthenticated: AuthGuard } }






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

