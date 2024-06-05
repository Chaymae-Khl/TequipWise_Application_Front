import { Pipe, PipeTransform } from '@angular/core';
import { Equipment } from '../Models/equipment';

@Pipe({
  name: 'equipmentFilter'
})
export class EquipmentFilterPipe implements PipeTransform {
  transform(equipement: Equipment[] | null, searchTerm: any): Equipment[] | null {
    if (!equipement || !searchTerm) {
      return equipement;
    }

    const term = searchTerm.toString().toLowerCase().trim();

    return equipement.filter(equipement => {
      if (typeof equipement.equipementSN === 'number') {
        // Convert the equipementSN to a string before calling toLowerCase
        const equipementSNStr = equipement.equipementSN.toString();
        return equipementSNStr.toLowerCase().includes(term);
      }
      return false; // Handle non-number values
    });
  }
}
