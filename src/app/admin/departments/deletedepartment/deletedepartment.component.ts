import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { DepartmentsService } from '../departments.service';
import { ManageDepartmentsComponent } from '../manage-departments/manage-departments.component';

@Component({
  selector: 'app-deletedepartment',
  templateUrl: './deletedepartment.component.html',
  styleUrls: ['./deletedepartment.component.sass']
})
export class DeletedepartmentComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ManageDepartmentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private service: DepartmentsService) { }

  name: any;
  desc: any;
  subscription!: Subscription;
  loading = false;

  ngOnInit(): void {
    this.name = this.data.dt.departmentCode;
    this.desc = this.data.dt.departmentName;
  }

  onDelete() {
    this.loading = true;
    this.subscription = this.service.deleteDeparment(this.data.dt.id).subscribe(res => {
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
