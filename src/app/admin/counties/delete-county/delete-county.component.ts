import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { CountiesService } from '../counties.service';
import { ManageCountiesComponent } from '../manage-counties/manage-counties.component';

@Component({
  selector: 'app-delete-county',
  templateUrl: './delete-county.component.html',
  styleUrls: ['./delete-county.component.sass']
})
export class DeleteCountyComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ManageCountiesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private service: CountiesService) { }

    county: any;
  subscription!: Subscription;
  loading = false;

  ngOnInit(): void {
    this.county = this.data.county.code+" - "+this.data.county.name;
  }

  onDelete() {
    this.loading = true;
    this.subscription = this.service.deleteCounty(this.data.county.id).subscribe(res => {
      this.loading = false;
      this.snackbar.showNotification("snackbar-success", "SUCCESSFUL!");
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
