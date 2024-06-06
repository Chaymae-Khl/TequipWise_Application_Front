import { Component } from '@angular/core';
import { EquipementServiceService } from '../../Services/equipement-service.service';

@Component({
  selector: 'app-equipment-request',
  templateUrl: './equipment-request.component.html',
  styleUrl: './equipment-request.component.css'
})
export class EquipmentRequestComponent {
  checked!: boolean;
  equipemnts:any;

constructor(private equipementService: EquipementServiceService){

}


  ngOnInit(){
this.getEquipmentNames();
}

getEquipmentNames(){
this.equipementService.getEquipmentName().subscribe((data)=>
{
this.equipemnts=data;
console.log(this.equipemnts);
},
(error)=>{
console.log("error displaying the equipemnts data",error)
}

)
}
  ValidRequest(){}
}
