import { Pipe, PipeTransform } from '@angular/core';
import { Supplier } from '../Models/supplier';

@Pipe({
  name: 'supplierFilte'
})
export class SupplierFiltePipe implements PipeTransform {

  transform(suppliers: Supplier[] | null, searchTerm: string): Supplier[] | null {
    if (!suppliers || !searchTerm) {
      return suppliers;
    }

    const term = searchTerm.toLowerCase().trim();

    return suppliers.filter(supplier =>
      supplier.suuplier_name.toLowerCase().includes(term)
    );
  }
}
