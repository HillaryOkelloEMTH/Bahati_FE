import { Component, Inject, OnInit } from '@angular/core';
import { ProductsAllocationComponent } from '../pages/products-allocation/products-allocation.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { SalesService } from '../services/sales.service';

@Component({
  selector: 'app-verifyproduct-allocations',
  templateUrl: './verifyproduct-allocations.component.html',
  styleUrls: ['./verifyproduct-allocations.component.sass']
})
export class VerifyproductAllocationsComponent implements OnInit {

  verifyallocationform: FormGroup;
  loading = false;
  selected="";

  constructor(public dialogRef: MatDialogRef<ProductsAllocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private service: SalesService) { }
  subscription!: Subscription;
  
  ngOnInit(): void {
    console.log("Passed Data: "+this.data.row.id)
    this.verifyallocationform = this.fb.group({
       id: [this.data.row.id],
      status: ["", [Validators.required]],
   
    })

    this.getFarmers();
    this.getProducts();
  }

  onSubmit() {
    console.log(this.verifyallocationform.value)
    this.loading = true;
    this.subscription = this.service.verifyAllocatins(this.verifyallocationform.value.id,this.verifyallocationform.value.status).subscribe(res => {
      console.log(res)
      this.snackbar.showNotification("snackbar-success", "Successful!");
      this.loading = false;
      this.verifyallocationform.reset();
      this.dialogRef.close();
    }, err => {
      this.loading = false;
      this.dialogRef.close();
    })
  }

  onClick() {
    this.dialogRef.close();
  }


  farmers: any;
  getFarmers() {
    this.service.getAllFarmers().subscribe(
      (res) => {
        this.farmers = res.entity;
      },
      (err) => {
        this.farmers = [];
      }
    );
  }


  products: any;
  getProducts() {
    this.service.getAllProducts().subscribe(
      (res) => {
        this.products = res.productData;
      },
      (err) => {
        this.products = [];
      }
    );
  }
}
