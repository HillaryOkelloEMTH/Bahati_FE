import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { SalesService } from '../../services/sales.service';
import { ProductsAllocationComponent } from '../products-allocation/products-allocation.component';

@Component({
  selector: 'app-add-allocation',
  templateUrl: './add-allocation.component.html',
  styleUrls: ['./add-allocation.component.sass']
})
export class AddAllocationComponent implements OnInit {

  allocateform: FormGroup;
  loading = false;
  selected="";

  constructor(public dialogRef: MatDialogRef<ProductsAllocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private service: SalesService) { }
  subscription!: Subscription;


  ngOnInit(): void {
    this.allocateform = this.fb.group({
      type:["",[Validators.required]],
      productId: ["", [Validators.required]],
      quantity: [""],
      farmerNo: ["", [Validators.required]],
      heatStartDate: [""],
      noOfCows: ["" ],
    })

    this.getFarmers();
    this.getProducts();
  }

  onSubmit() {
    console.log(this.allocateform.value)
    this.loading = true;
    this.subscription = this.service.addAllocation(this.allocateform.value).subscribe(res => {
      this.snackbar.showNotification("snackbar-success", "Successful!");
      this.loading = false;
      this.allocateform.reset();
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
