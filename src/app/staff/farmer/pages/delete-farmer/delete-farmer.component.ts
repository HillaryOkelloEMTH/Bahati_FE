import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { SalesService } from 'src/app/staff/sales/services/sales.service';
import { FarmerManagenentComponent } from '../farmer-managenent/farmer-managenent.component';

@Component({
  selector: 'app-delete-farmer',
  templateUrl: './delete-farmer.component.html',
  styleUrls: ['./delete-farmer.component.sass']
})
export class DeleteFarmerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FarmerManagenentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private service: SalesService) { }

  farmer: any;
  subscription!: Subscription;
  loading = false;

  ngOnInit(): void {
    this.farmer = this.data.farmer.firstName + " " + this.data.farmer.lastName;
  }

  onDelete() {
    this.loading = true;
    this.subscription = this.service.deleteFarmerDetails(this.data.farmer.id).subscribe(res => {
      this.loading = false;
      this.snackbar.showNotification("snackbar-success", "Successful!");
      this.dialogRef.close();
    }, err => {
      this.loading = false;
      this.snackbar.showNotification("snackbar-danger", err);
      this.dialogRef.close();
    })
  }

  onClick() {
    this.dialogRef.close();
  }

}
