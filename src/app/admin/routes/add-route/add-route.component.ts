import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ManageRoutesComponent } from '../manage-routes/manage-routes.component';
import { RoutesService } from '../routes.service';

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.sass']
})
export class AddRouteComponent implements OnInit {

  addRouteForm: FormGroup;
  loading = false;

  constructor(public dialogRef: MatDialogRef<ManageRoutesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private service: RoutesService) { }
  subscription!: Subscription;


  ngOnInit(): void {
    this.addRouteForm = this.fb.group({
      route: ["", [Validators.required]],
    })
  }

  onSubmit() {
    this.loading = true;
    this.subscription = this.service.addNewRoute(this.addRouteForm.value).subscribe(res => {
      this.snackbar.showNotification("snackbar-success", "Successful!");
      this.loading = false;
      this.addRouteForm.reset();
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
