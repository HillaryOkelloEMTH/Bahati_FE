import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { FarmerLookupComponent } from 'src/app/staff/farmer/pages/farmer-lookup/farmer-lookup.component';
import { ReportsService } from '../../services/reports.service';
import { MainComponent } from '../../main/main.component';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { DatePipe } from '@angular/common';
import { from } from 'rxjs';

@Component({
  selector: 'app-statment',
  templateUrl: './statment.component.html',
  styleUrls: ['./statment.component.sass']
})
export class StatmentComponent implements OnInit {
  farmerstatementForm: FormGroup

  dialogData: any;
  loading: boolean
  title: any
  from:any
  to:any
  
  constructor(
    public dialogRef: MatDialogRef<MainComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackbar: SnackbarService,
    private service: ReportsService,
    private datePipe: DatePipe,

  ) {
    this.title = data.data;
    console.log("Title == ", this.title)
  }

  ngOnInit(): void {


    this.farmerstatementForm = this.fb.group({
      username: ["", [Validators.required]],
      farmerNo: [""],
      from: ["", [Validators.required]],
      to: ["", [Validators.required]]
    })
  }

  selectFarmer() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.data = {
      user: '',
    };
    const dialogRef = this.dialog.open(FarmerLookupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.dialogData = result;
      this.farmerstatementForm.patchValue({
        username: this.dialogData.data.username,
        farmerNo: this.dialogData.data.farmer_no
      });
    });
  }

  generateStatement() {
    console.log("Form data " + this.farmerstatementForm.controls.farmerNo.value)
    this.from = this.datePipe.transform(this.farmerstatementForm.value.from, 'yyyy-MM-dd');
    this.to = this.datePipe.transform(this.farmerstatementForm.value.to, 'yyyy-MM-dd');
    this.service.generatefarmerStatement(this.farmerstatementForm.controls.farmerNo.value,
      this.from,
      this.to
    )
      .subscribe(
        (response) => {
          console.log(response)
          let url = window.URL.createObjectURL(response.data);

          // if you want to open PDF in new tab
          window.open(url);

          let a = document.createElement("a");
          document.body.appendChild(a);
          a.setAttribute("style", "display: none");
          a.setAttribute("target", "blank");
          a.href = url;
          response.filename = this.farmerstatementForm.value.username
          a.download = response.filename;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();

          this.loading = false;

          this.dialogRef.close();

          this.snackbar.showNotification(
            "Report generated successfully",
            "snackbar-success"
          );
        },
        (err) => {
          console.log(err);
          this.loading = false;

          this.dialogRef.close();

          this.snackbar.showNotification(
            "Report could not be generated successfully",
            "snackbar-danger"
          );
        }
      );

  }
  onClick() {

  }


}
