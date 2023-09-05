import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  customers!: Customer[];
  first =0;
  @ViewChild('dt') dt: Table | undefined;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomersLarge().then((customers: Customer[]) => (this.customers = customers));
  }

  nextProfiles() {
    this.first +=8;
  }

  previousProfiles() {
    this.first -=8;
  }

  applyFilterGlobal($event: any) {
    return $event.target.value;
  }
}
