import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './Components/WelcomePage/landing-page/landing-page.component';
import { LoginComponent } from './Components/Authentication/login/login.component';
import { RegisterComponent } from './Components/Authentication/register/register.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { DashboardComponent } from './Components/Admin/dashboard/dashboard.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminsComponent } from './Components/Admin/admins/admins.component';
import { SidebarComponent } from './Components/Admin/sidebar/sidebar.component';
import { UsersManagComponent } from './Components/Admin/users-manag/users-manag.component';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { UserModalComponent } from './Components/Admin/user-modal/user-modal.component';
import { RoleManagComponent } from './Components/Admin/role-manag/role-manag.component';
import { UserFilterPipe } from './Pipes/user-filter.pipe';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { DeptPlantMangComponent } from './Components/Admin/dept-plant-mang/dept-plant-mang.component';
import { DepartemnentListModalComponent } from './Components/Admin/departemnent-list-modal/departemnent-list-modal.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { DeptPlantModalComponent } from './Components/Admin/dept-plant-modal/dept-plant-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AdminsComponent,
    SidebarComponent,
    UsersManagComponent,
    NavBarComponent,
    UserModalComponent,
    RoleManagComponent,
    UserFilterPipe,
    MessageDialogComponent,
    DeptPlantMangComponent,
    DepartemnentListModalComponent,
    DeptPlantModalComponent,
   
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatSnackBarModule,
    MatTableModule, 
    MatPaginatorModule,
    MatButtonModule,
    CardModule,
    ButtonModule,
    TableModule,
    TableModule, 
    TagModule, 
    IconFieldModule, 
    InputTextModule, 
    InputIconModule, 
    MultiSelectModule, 
    DropdownModule, 
    CommonModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
