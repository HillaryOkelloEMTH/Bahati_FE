import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { DepartmentsService } from '../departments.service';
import { ManageDepartmentsComponent } from '../manage-departments/manage-departments.component';

@Component({
  selector: 'app-add-departments',
  templateUrl: './add-departments.component.html',
  styleUrls: ['./add-departments.component.sass']
})
export class AddDepartmentsComponent implements OnInit {
  loading = false;
  addDepartmentForm: FormGroup;
  subsidiary:any;
  name:any;

  constructor(public dialogRef: MatDialogRef<ManageDepartmentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private service: DepartmentsService,
    private dialog: MatDialog,) { }
  subscription!: Subscription;


  ngOnInit(): void {
    this.addDepartmentForm = this.fb.group({
      departmentName: ["", [Validators.required]],
      departmentCode: ["", [Validators.required]],
    })
  }

  onSubmit() {
    this.loading = true;
    this.subscription = this.service.addNewDepartment(this.addDepartmentForm.value).subscribe(res => {
      this.loading = false;
      this.snackbar.showNotification("snackbar-success", "Successful!");
      this.addDepartmentForm.reset();
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
