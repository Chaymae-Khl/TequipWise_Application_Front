import { Pipe, PipeTransform } from '@angular/core';
import { EquipmentRequest } from '../Models/equipment-request';

@Pipe({
  name: 'requestFilter'
})
export class RequestFilterPipe implements PipeTransform {

  transform(requests: EquipmentRequest[] | null, searchTerm: string): EquipmentRequest[] | null {
    if (!requests || !searchTerm) {
      return requests;
    }

    const term = searchTerm.toLowerCase().trim();

    return requests.filter(request =>
      request.nmaeOfUser?.toLowerCase().includes(term)
    );
  }

}
