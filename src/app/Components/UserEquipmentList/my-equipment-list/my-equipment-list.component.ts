import { Component } from '@angular/core';
import { EquipementServiceService } from '../../../Services/equipement-service.service';
import { EquipementRequestServiceService } from '../../../Services/equipement-request-service.service';

@Component({
  selector: 'app-my-equipment-list',
  templateUrl: './my-equipment-list.component.html',
  styleUrl: './my-equipment-list.component.css'
})
export class MyEquipmentListComponent {
 AssetsList:any;
 constructor(
 private equipementService: EquipementRequestServiceService,
  
){}
ngOnInit(){
this.getAssetsList();
 }


 getAssetsList(){
    this.equipementService.GetAssetsList().subscribe(
      (data) => {
        this.AssetsList = data;
        console.log(this.AssetsList)

      },
      (error) => {
      }
    );
  }
}
