import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../Models/user';
import { OpenDataServiceService } from '../../../Services/open-data-service.service';
import { AuthServiceService } from '../../../Services/auth-service.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.css'
})
export class UserModalComponent implements OnInit{
  @Input() user:User= new User();
  @Input() mode!: 'view' | 'update'; // Mode to control the behavior of the modal
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateUser: EventEmitter<User> = new EventEmitter<User>();
  plants: any;
  selectedPlant: any; // Store the entire selected plant object
  Roles:any;
  selectedLocation: any;
  constructor(private openDataService: OpenDataServiceService,private authservice:AuthServiceService) { }

  ngOnInit() {
    this.getPlants();
    this.getRoles();
  }
   //GetPlants method
   getPlants(){
    this.openDataService.getPlantsWDept().subscribe(
      (data) => {
        console.log(data);
        this.plants = data;
      },
      (error) => {
        console.error('An error occurred while fetching plants:', error);
        console.log('Error response:', error.error); // Log the response object
      }
    );
  }

  //to get the department associed to the plant
  onPlantChange(event: any) {
    this.selectedPlant = event.value;
    console.log('Selected Plant:', this.selectedPlant);
  
    if (this.selectedPlant) {
      this.selectedLocation = this.selectedPlant.location;
      console.log('Selected Location:', this.selectedLocation);
    } else {
      this.selectedLocation = null;
      console.log('No plant selected.');
    }
  }
 
  //get roles method
getRoles(){
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


  onClose(): void {
    this.closeModal.emit();
  }

  onUpdateUser(): void {
    this.updateUser.emit(this.user);
  }
}
