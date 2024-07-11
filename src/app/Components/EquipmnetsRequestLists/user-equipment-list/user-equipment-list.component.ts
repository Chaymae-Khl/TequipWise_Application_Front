import { Component } from '@angular/core';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';

@Component({
  selector: 'app-user-equipment-list',
  templateUrl: './user-equipment-list.component.html',
  styleUrl: './user-equipment-list.component.css'
})
export class UserEquipmentListComponent {
  expandedRows = {};


  expandAll() {
    // this.expandedRows = this.products.reduce((acc, p) => (acc[p.id] = true) && acc, {});
}
collapseAll() {
  this.expandedRows = {};
}

onRowExpand(event: TableRowExpandEvent) {
  // this.messageService.add({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
}

onRowCollapse(event: TableRowCollapseEvent) {
  // this.messageService.add({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
}
}
