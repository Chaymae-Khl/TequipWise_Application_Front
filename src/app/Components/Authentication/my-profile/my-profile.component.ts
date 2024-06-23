import { Component } from '@angular/core';
import { AuthServiceService } from '../../../Services/auth-service.service';
import { User } from '../../../Models/user';
import { OpenDataServiceService } from '../../../Services/open-data-service.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {
  activeIndex: number = 0;
  Authenticated: any = {};
  locations: any;
  selectedLocation: any; // Store only the location of the selected plant
  plantsOfSelectedLocation: any[] = [];
  departmentsOfSelectedPlant: any[] = [];
  Roles: any;
  users: any;

  constructor(private authservice: AuthServiceService, private openDataService: OpenDataServiceService) { }

  ngOnInit(): void {
    this.getUsers();
    this.getAuthUseer();
    this.getLocations();
    this.getRoles();
  }
  getAuthUseer() {
    this.authservice.getAuthuser().subscribe(
      (data) => {
        this.Authenticated = data;
        console.log(this.Authenticated);
      }
    )
  }

  getLocations() {
    this.openDataService.getPlantsWDept().subscribe(
      (data) => {
        this.locations = data;
        // If there is a preselected location, update the plants and departments.
        if (this.Authenticated && this.Authenticated.locationName) {
          this.onLocationChange({ value: this.Authenticated.locationName });
        }
      },
      (error) => {
        console.error('An error occurred while fetching plants:', error);
      }
    );
  }

  onLocationChange(event: any) {
    const selectedLocationName = event.value;
    // Find the selected location object based on the location name.
    const selectedLocation = this.locations.find((location: any) => location.locationName === selectedLocationName);

    if (selectedLocation) {
      // Update the plants and departments based on the selected location.
      this.plantsOfSelectedLocation = selectedLocation.plants;
      this.departmentsOfSelectedPlant = selectedLocation.departments;
    } else {
      // If no location is selected, clear the plants and departments.
      this.plantsOfSelectedLocation = [];
      this.departmentsOfSelectedPlant = [];
    }
  }
  //get roles method
  getRoles() {
    this.authservice.getRoles().subscribe(
      (data) => {
        this.Roles = data;
        console.log(this.Roles);
      },
      (error) => {
        console.error('An error occurred while fetching roles:', error);
        console.log('Error response:', error.error); // Log the response object
      }
    );

  }
  onApproverActiveChangeBackup() {
    if (!this.Authenticated.backupActive) {
      this.Authenticated.backupaprover_Name = this.Authenticated.backupaprover_Name;
    }
  }
  getUsers() {
    this.authservice.getUsers().subscribe(
      (data) => {
        this.users = data;
        console.log(this.users);
      },
      (error) => {
        console.error('An error occurred while fetching Users:', error);
        console.log('Error response:', error.error); // Log the response object
      }
    );


  }
}
