import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { CountiesService } from '../counties.service';
import { ManageCountiesComponent } from '../manage-counties/manage-counties.component';

@Component({
  selector: 'app-edit-county',
  templateUrl: './edit-county.component.html',
  styleUrls: ['./edit-county.component.sass']
})
export class EditCountyComponent implements OnInit {

  addCountyForm: FormGroup;
  loading = false;

  constructor(public dialogRef: MatDialogRef<ManageCountiesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private service: CountiesService) { }
  subscription!: Subscription;


  ngOnInit(): void {
    this.addCountyForm = this.fb.group({
      id:[this.data.county.id, [Validators.required]],
      name: [this.data.county.name, [Validators.required]],
      code: [this.data.county.code, [Validators.required]],
    })
  }

  onSubmit() {
    console.log(this.addCountyForm.value)
    this.loading = true;
    this.subscription = this.service.updateCounty(this.addCountyForm.value).subscribe(res => {
      this.snackbar.showNotification("snackbar-success", "Successful!");
      this.loading = false;
      this.addCountyForm.reset();
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
