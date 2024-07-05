import { Pipe, PipeTransform } from '@angular/core';
import { Equipment } from '../Models/equipment';

@Pipe({
  name: 'equipmentFilter'
})
export class EquipmentFilterPipe implements PipeTransform {
  transform(equipement: Equipment[] | null, searchTerm: string): Equipment[] | null {
    if (!equipement || !searchTerm) {
      return equipement;
    }

    const term = searchTerm.toString().toLowerCase().trim();
    return equipement.filter(equipement =>
      equipement.equipName.toLowerCase().includes(term)
    );
    
  }
}
