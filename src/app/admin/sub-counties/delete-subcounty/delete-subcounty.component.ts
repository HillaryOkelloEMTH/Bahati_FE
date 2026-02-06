import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ManageSubCountiesComponent } from '../manage-sub-counties/manage-sub-counties.component';
import { SubcountiesService } from '../subcounties.service';

@Component({
  selector: 'app-delete-subcounty',
  templateUrl: './delete-subcounty.component.html',
  styleUrls: ['./delete-subcounty.component.sass']
})
export class DeleteSubcountyComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ManageSubCountiesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private service: SubcountiesService) { }

    subcounty: any;
  subscription!: Subscription;
  loading = false;

  ngOnInit(): void {
    this.subcounty = this.data.county.name;
  }

  onDelete() {
    this.loading = true;
    this.subscription = this.service.deleteSubCounty(this.data.county.id).subscribe(res => {
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
