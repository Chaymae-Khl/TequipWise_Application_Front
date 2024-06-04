import { Pipe, PipeTransform } from '@angular/core';
import { Location } from '../Models/location';

@Pipe({
  name: 'locationFilter'
})
export class LocationFilterPipe implements PipeTransform {

  transform(locations: Location[] | null, searchTerm: string): Location[] | null {
    if (!locations || !searchTerm) {
      return locations;
    }

    const term = searchTerm.toLowerCase().trim();

    return locations.filter(location =>
      location.locationName.toLowerCase().includes(term)
    );
  }

}
