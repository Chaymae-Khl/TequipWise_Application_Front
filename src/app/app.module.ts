import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './Components/WelcomePage/landing-page/landing-page.component';
import { LoginComponent } from './Components/Authentication/login/login.component';
import { RegisterComponent } from './Components/Authentication/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatMenuModule  } from '@angular/material/menu';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { DeptPlantModalComponent } from './Components/Admin/dept-plant-modal/dept-plant-modal.component';
import { MessageService } from 'primeng/api';
import { LoadingComponent } from './Components/loading/loading.component';
import { AuthGuard } from './Gards/auth.guard';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { SuppliersManagComponent } from './Components/Admin/suppliers-manag/suppliers-manag.component';
import { SupplierFiltePipe } from './Pipes/supplier-filte.pipe';
import { TokenExpiredComponent } from './Components/token-expired/token-expired.component';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { MenuComponent } from './Components/menu/menu.component';
import { FieldsetModule } from 'primeng/fieldset';
import { TabViewModule } from 'primeng/tabview';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PanelModule } from 'primeng/panel';
import { DockModule } from 'primeng/dock';
import { DockComponent } from './Components/dock/dock.component';
import { SpeedDialModule } from 'primeng/speeddial';
import { SplitterModule } from 'primeng/splitter';
import { DividerModule } from 'primeng/divider';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { SplitButtonModule } from 'primeng/splitbutton';
import { LocationFilterPipe } from './pipes/location-filter.pipe';
import { EquipmentManagComponent } from './Components/Admin/equipment-manag/equipment-manag.component';
import { EquipmentFilterPipe } from './pipes/equipment-filter.pipe';
import { OrderListModule } from 'primeng/orderlist';
import { EquipmentRequestComponent } from './Components/equipment-request/equipment-request.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { TimelineModule } from 'primeng/timeline';
import { MyProfileComponent } from './Components/Authentication/my-profile/my-profile.component';
import { NgxApexchartsModule } from 'ngx-apexcharts';
import { MenuModule } from 'primeng/menu';
import { ChartModule } from 'primeng/chart';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RequestFilterPipe } from './pipes/request-filter.pipe';
import { CalendarModule } from 'primeng/calendar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FileUploadModule } from 'primeng/fileupload';
import { InplaceModule } from 'primeng/inplace';
import { UserEquipmentListComponent } from './Components/EquipmnetsRequestLists/user-equipment-list/user-equipment-list.component';
import { ConfirmationEquipmentListComponent } from './Components/EquipmnetsRequestLists/confirmation-equipment-list/confirmation-equipment-list.component';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { StepperModule } from 'primeng/stepper';
import { NotificationServiceService } from './Services/notification-service.service';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MeterGroupModule } from 'primeng/metergroup';
import { MyEquipmentListComponent } from './Components/UserEquipmentList/my-equipment-list/my-equipment-list.component';
import { PhoneRequestComponent } from './Components/phone-request/phone-request.component';
import { UserPhoneListComponent } from './Components/PhonesRequestLists/user-phone-list/user-phone-list.component';
import { ConfirmationPhoneListComponent } from './Components/PhonesRequestLists/confirmation-phone-list/confirmation-phone-list.component';
import { MaintenanceRequestComponent } from './Components/maintenance-request/maintenance-request.component';
import { UserMaintenanceListComponent } from './Components/MaintenanceRequestLists/user-maintenance-list/user-maintenance-list.component';
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
    RoleManagComponent,
    UserFilterPipe,
    MessageDialogComponent,
    DeptPlantMangComponent,
    DepartemnentListModalComponent,
    DeptPlantModalComponent,
    LoadingComponent,
    ForgetPasswordComponent,
    SuppliersManagComponent,
    SupplierFiltePipe,
    TokenExpiredComponent,
    MenuComponent,
    DockComponent,
    LocationFilterPipe,
    EquipmentManagComponent,
    EquipmentFilterPipe,
    EquipmentRequestComponent,
    MyProfileComponent,
    RequestFilterPipe,
    UserEquipmentListComponent,
    ConfirmationEquipmentListComponent,
    MyEquipmentListComponent,
    PhoneRequestComponent,
    UserPhoneListComponent,
    ConfirmationPhoneListComponent,
    MaintenanceRequestComponent,
    UserMaintenanceListComponent,
    
  
   
  
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
    CommonModule,
    ToastModule,
    MatMenuModule,
    FloatLabelModule,
    DialogModule,
    ReactiveFormsModule,
    PasswordModule,
    OrganizationChartModule,
    FieldsetModule,
    TabViewModule,
    RadioButtonModule,
    InputSwitchModule,
    PanelModule,
    DockModule,
    SpeedDialModule,
    SplitterModule,
    DividerModule,
    AccordionModule,
    ConfirmPopupModule,
    SplitButtonModule,
    OrderListModule,
    CheckboxModule,
    InputTextareaModule,
    InputNumberModule,
    TimelineModule,
    NgxApexchartsModule,
    MenuModule,
    ChartModule,
    SelectButtonModule,
    CalendarModule,
    ProgressSpinnerModule,
    FileUploadModule,
    InplaceModule,
    StepperModule,
    AvatarGroupModule,
    AvatarModule,
    MeterGroupModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    MessageService,
    AuthGuard,
    NotificationServiceService,
   { provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true}
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
