import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ManageRoutesComponent } from '../manage-routes/manage-routes.component';
import { RoutesService } from '../routes.service';

@Component({
  selector: 'app-delete-route',
  templateUrl: './delete-route.component.html',
  styleUrls: ['./delete-route.component.sass']
})
export class DeleteRouteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ManageRoutesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private service: RoutesService) { }

  route: any;
  subscription!: Subscription;
  loading = false;

  ngOnInit(): void {
    this.route = this.data.route.route;
  }

  onDelete() {
    this.loading = true;
    this.subscription = this.service.deleteRoute(this.data.route.id).subscribe(res => {
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
