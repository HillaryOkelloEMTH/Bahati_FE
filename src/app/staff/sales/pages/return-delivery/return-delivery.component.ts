import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PickupService } from 'src/app/admin/pick-up-locations/pickup.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { MilkCansService } from 'src/app/staff/milk-cans/milk-cans.service';
import { SalesService } from '../../services/sales.service';
import { CollectionsComponent } from '../collections/collections.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-return-delivery',
  templateUrl: './return-delivery.component.html',
  styleUrls: ['./return-delivery.component.sass']
})
export class ReturnDeliveryComponent implements OnInit {

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
    private datePipe: DatePipe
    ) { }
  subscription!: Subscription;
farmer:any
farmerNo:any

  ngOnInit(): void {
    
    this.collection=this.data.collection
    this.farmer=this.collection.farmer
    this.farmerNo=this.collection.farmer_no
    
    console.log(this.collection=this.data.collection)

    const formattedDate = this.datePipe.transform(this.collection.collection_date, "yyyy-MM-dd")

    this.editForm = this.fb.group({
      session:[this.collection.session,[Validators.required]],
      date:[formattedDate,[Validators.required]],
      route:[this.collection.route,[Validators.required]],
      // route:[""],
      originalQuantity:[this.collection.quantity,[Validators.required]],
      farmer_no:[this.collection.farmer_no,[Validators.required]]
    })

    
  }

  onSubmit() {
    this.loading = true;
    this.subscription = this.service.returnCollections(this.collection.id).subscribe(res => {
      this.snackbar.showNotification("snackbar-success", "Return Successful!");
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
}
