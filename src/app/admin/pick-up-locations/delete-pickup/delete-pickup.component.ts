import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ManagePickupsComponent } from '../manage-pickups/manage-pickups.component';
import { PickupService } from '../pickup.service';

@Component({
  selector: 'app-delete-pickup',
  templateUrl: './delete-pickup.component.html',
  styleUrls: ['./delete-pickup.component.sass']
})
export class DeletePickupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ManagePickupsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private service: PickupService) { }

  location: any;
  subscription!: Subscription;
  loading = false;

  ngOnInit(): void {
    this.location = this.data.location.name;
  }

  onDelete() {
    this.loading = true;
    this.subscription = this.service.deleteLocation(this.data.location.id).subscribe(res => {
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
