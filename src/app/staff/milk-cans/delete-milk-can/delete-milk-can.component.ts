import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ManageMilkCansComponent } from '../manage-milk-cans/manage-milk-cans.component';
import { MilkCansService } from '../milk-cans.service';

@Component({
  selector: 'app-delete-milk-can',
  templateUrl: './delete-milk-can.component.html',
  styleUrls: ['./delete-milk-can.component.sass']
})
export class DeleteMilkCanComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ManageMilkCansComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private service: MilkCansService) { }

  can: any;
  subscription!: Subscription;
  loading = false;

  ngOnInit(): void {
    this.can = this.data.cans.canName;
  }

  onDelete() {
    this.loading = true;
    this.subscription = this.service.deleteCan(this.data.cans.id).subscribe(res => {
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
