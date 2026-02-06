import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddProductPriceComponent } from '../add-product-price/add-product-price.component';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { InventoryService } from '../../inventory/inventory.service';

@Component({
  selector: 'app-product-lookup',
  templateUrl: './product-lookup.component.html',
  styleUrls: ['./product-lookup.component.sass']
})
export class ProductLookupComponent implements OnInit {
  isLoading: boolean = false
  dataSource: MatTableDataSource<any>
  displayedColumns: string[] = ["name", "price", "stock"]

  sort: any
  paginator: any
  isdata: boolean = false
  data: any
  subscription: Subscription 


  constructor(public dialogRef: MatDialogRef<AddProductPriceComponent>, private service: InventoryService) { }

  ngOnInit(): void {
    this.getProducts();
  }


  getProducts() {
    this.isLoading = true
    this.subscription = this.service.getAllProducts().subscribe({
      next: (res: any) => {
        this.data = res.productData

        if (this.data != null) {
          this.isLoading = false
          this.isdata = true

          this.dataSource = new MatTableDataSource<any>(this.data)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.data = false
          this.isLoading = false
        }
      },
      error: (error: any) => {
        this.data = false
        this.isLoading = false
      },
      complete: () => {}
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSelectRow(data: any) {
    this.dialogRef.close({ data });
  }

}
