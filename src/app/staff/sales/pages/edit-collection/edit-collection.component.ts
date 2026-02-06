import { Component, Inject, OnInit } from '@angular/core';
import { CollectionsComponent } from '../collections/collections.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { SalesService } from '../../services/sales.service';
import { MilkCansService } from 'src/app/staff/milk-cans/milk-cans.service';
import { PickupService } from 'src/app/admin/pick-up-locations/pickup.service';

@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.sass']
})
export class EditCollectionComponent implements OnInit {

  
  editForm: FormGroup;
  loading = false;
  collection:any

  constructor(public dialogRef: MatDialogRef<CollectionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private service: SalesService,
    private canService: MilkCansService ,
    private pservice: PickupService ,
    ) { }
  subscription!: Subscription;
farmer:any
farmerNo:any

  ngOnInit(): void {
    
    this.collection=this.data.collection
    this.farmer=this.collection.farmer
    this.farmerNo=this.collection.farmer_no
    
    console.log(this.collection=this.data.collection)
    console.log(this.collection.canNo)
    this.getCans();
    this.getRoutes();
    this.editForm = this.fb.group({
      session:[this.collection.session,[Validators.required]],
      collectionNumber:[this.collection.collectionCode,[Validators.required]],
      route:[this.collection.route,[Validators.required]],
      // route:[""],
      // canNo: [this.collection.canNo,],
      originalQuantity:[this.collection.quantity,[Validators.required]],
      farmer_no:[this.collection.farmer_no,[Validators.required]]
      
    })

    
  }

  onSubmit() {
    console.log(this.editForm.value)
    this.loading = true;
    this.subscription = this.service.updateCollections(this.editForm.value).subscribe(res => {
      this.snackbar.showNotification("snackbar-success", "Successful!");
      this.loading = false;
      this.editForm.reset();
      this.dialogRef.close();
    }, err => {
      this.loading = false;
      this.snackbar.showNotification("snackbar-success", err.message);
      this.dialogRef.close();
    })
  }

 


  onClick() {
    this.dialogRef.close();
  }


  cans: any;
  getCans() {
    this.canService.getAllCans().subscribe(
      (res) => {
        this.cans = res.entity;
        console.log(this.cans)
      },
      (err) => {
        this.cans = [];
      }
    );
  }

  routes: any;
  getRoutes() {
    this.pservice.getRoutes().subscribe(
      (res) => {
        this.routes = res.entity;
      },
      (err) => {
        this.routes = [];
      }
    );
  }
}
