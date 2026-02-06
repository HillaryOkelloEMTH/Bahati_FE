import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { FarmerLookupComponent } from 'src/app/staff/farmer/pages/farmer-lookup/farmer-lookup.component';
import { FarmerService } from 'src/app/staff/farmer/services/farmer.service';
import { MainComponent } from '../main/main.component';
import { ReportsService } from '../services/reports.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-farmer-statement',
  templateUrl: './farmer-statement.component.html',
  styleUrls: ['./farmer-statement.component.sass']
})
export class FarmerStatementComponent implements OnInit {
 
  farmerCollectionsForm: FormGroup

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
    private datePipe: DatePipe

  ) {
    // this.title = data.data;
    // console.log("Title == ", this.title)
  }

  ngOnInit(): void {

    this.farmerCollectionsForm = this.fb.group({
      username: ["", [Validators.required]],
      farmerNo: ["", [Validators.required]],
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
      this.farmerCollectionsForm.patchValue({
        username: this.dialogData.data.username,
        farmerNo: this.dialogData.data.farmer_no
      });
    });
  }
  onSubmit() {
    this.loading = true;
    console.log("Form data " + this.farmerCollectionsForm.controls.farmerNo.value)
    this.from = this.datePipe.transform(this.farmerCollectionsForm.value.from, 'yyyy-MM-dd');
    this.to = this.datePipe.transform(this.farmerCollectionsForm.value.to, 'yyyy-MM-dd');
    this.service.generatefarmerCollections(this.farmerCollectionsForm.controls.farmerNo.value, this.from, this.to)
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
          response.filename = this.farmerCollectionsForm.value.username
          a.download = response.filename.pdf;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();

          this.loading = false;
          this.dialogRef.close()
          this.dialogRef.afterClosed().subscribe({
            next: () => {
              this.snackbar.showNotification(
                "snackbar-success",
                "Report generated successfully"
              );
            }
          })
        },
        (err: any) => {
          console.log(err);
          this.loading = false;

          this.dialogRef.close()
          this.dialogRef.afterClosed().subscribe({
            next: () => {
              this.snackbar.showNotification(
                "snackbar-danger",
                "Report could not be generated successfully"
              );
            }
          })
        }
      );

  }
 
  onClick() {
    this.dialogRef.close();
  }


}
