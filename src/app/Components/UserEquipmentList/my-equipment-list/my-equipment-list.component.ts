import { Component } from '@angular/core';
import { EquipementServiceService } from '../../../Services/equipement-service.service';
import { EquipementRequestServiceService } from '../../../Services/equipement-request-service.service';
import { PhoneRequestServiceService } from '../../../Services/phone-request-service.service';

@Component({
  selector: 'app-my-equipment-list',
  templateUrl: './my-equipment-list.component.html',
  styleUrl: './my-equipment-list.component.css'
})
export class MyEquipmentListComponent {
 AssetsList:any;
 phonesList:any;

 constructor(
 private equipementService: EquipementRequestServiceService,
  private phoneService :PhoneRequestServiceService
){}
ngOnInit(){
this.getAssetsList();
this.getPhoneList();
 }


 getAssetsList(){
    this.equipementService.GetAssetsList().subscribe(
      (data) => {
        this.AssetsList = data;
        // console.log(this.AssetsList)

      },
      (error) => {
      }
    );
  }
  getPhoneList(){
    this.phoneService.GetPhonesList().subscribe(
      (data) => {
        this.phonesList = data;
        console.log(this.phonesList)
      },
      (error) => {
      }
    );
  }
}
