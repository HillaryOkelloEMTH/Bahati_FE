import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { DepartmentsService } from '../departments.service';
import { ManageDepartmentsComponent } from '../manage-departments/manage-departments.component';

@Component({
  selector: 'app-editdepartment',
  templateUrl: './editdepartment.component.html',
  styleUrls: ['./editdepartment.component.sass']
})
export class EditdepartmentComponent implements OnInit {

  editDepartmentForm: FormGroup;
  roles: any;
  departments: any;
  senior: any;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private service: DepartmentsService,
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<ManageDepartmentsComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.editDepartmentForm = this.updateDepartmentForm();
  }


  updateDepartmentForm(): FormGroup {
    return this.fb.group({
      departmentCode: [this.data.dt.departmentCode, [Validators.required]],
      departmentName: [this.data.dt.departmentName, [Validators.required]],
      id: [this.data.dt.id, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  onCancel() {
    this.dialogRef.close();
  }


  onSubmit() {
    this.loading = true;
    this.service.updateDeparment(this.editDepartmentForm.value).subscribe(
      (res) => {
        this.loading = false;
        this.snackbar.showNotification("snackbar-success", "SUCCESSFUL!");
        this.editDepartmentForm.reset();
        this.dialogRef.close();
      },
      (err) => {
        this.loading = false;
        this.snackbar.showNotification("snackbar-danger", err);
      }
    );
  }
}

