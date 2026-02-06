import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { FarmerLookupComponent } from 'src/app/staff/farmer/pages/farmer-lookup/farmer-lookup.component';
import { MainComponent } from '../../main/main.component';
import { ReportsService } from '../../services/reports.service';
import { DatePipe } from '@angular/common';
import { LookupPickUpLocationsComponent } from 'src/app/staff/sales/pages/lookup-pick-up-locations/lookup-pick-up-locations.component';
const MONTHS = [
  {value: '1', name: 'JANUARY'},
  {value: '2', name: 'FEBRUARY'},
  {value: '3', name: 'MARCH'},
  {value: '4', name: 'APRIL'},
  {value: '5', name: 'MAY'},
  {value: '6', name: 'JUNE'},
  {value: '7', name: 'JULY'},
  {value: '8', name: 'AUGUST'},
  {value: '9', name: 'SEPTEMBER'},
  {value: '10', name: 'OCTOBER'},
  {value: '11', name: 'NOVEMBER'},
  {value: '12', name: 'DECEMBER'}
];

const YEARS = [
  {value: '2024', name: '2024'},
  {value: '2025', name: '2025'},
  {value: '2026', name: '2026'},
  {value: '2027', name: '2027'},
  {value: '2028', name: '2028'},
  {value: '2029', name: '2029'},
  {value: '2030', name: '2030'},
  {value: '2031', name: '2031'},
];
@Component({
  selector: 'app-farmer-products-report',
  templateUrl: './farmer-products-report.component.html',
  styleUrls: ['./farmer-products-report.component.sass']
})
export class FarmerProductsReportComponent implements OnInit {

  farmerProductsForm: FormGroup
  months:any
  years: any
  currentYear: any

  dialogData: any;
  loading: boolean
  title: any
  date:any
  constructor(
    public dialogRef: MatDialogRef<MainComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackbar: SnackbarService,
    private service: ReportsService,
    private datePipe: DatePipe,

  ) {
    // this.title = data.data;
    // console.log("Title == ", this.title)
  }

  ngOnInit(): void {
    this.months=MONTHS
    this.years = YEARS
    this.currentYear = new Date().getFullYear().toString()

    this.farmerProductsForm = this.fb.group({
      name: ["", [Validators.required]],
      month: ["", [Validators.required]],
      year: [this.currentYear],
      locationId: ["", [Validators.required]]
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
      this.farmerProductsForm.patchValue({
        username: this.dialogData.data.username,
        farmerNo: this.dialogData.data.farmer_no
      });
    });
  }

  onSubmit() {
    this.loading = true;
    console.log("Form data " + this.farmerProductsForm.controls.locationId.value)
    const monthname = this.getMonthName()

    const mcc = this.farmerProductsForm.value.name
    const year = this.farmerProductsForm.value.year
    this.date = this.datePipe.transform(this.farmerProductsForm.value.from, 'yyyy-MM-dd');
    this.service.generateMccAllocations(this.farmerProductsForm.controls.locationId.value,this.farmerProductsForm.value.month, year)
      .subscribe({
        next: (response: any) => {
            console.log(response)
            let url = window.URL.createObjectURL(response.data);
  
            // if you want to open PDF in new tab
            window.open(url);
  
            let a = document.createElement("a");
            document.body.appendChild(a);
            a.setAttribute("style", "display: none");
            a.setAttribute("target", "blank");
            a.href = url;

            response.filename = mcc+'-'+monthname+'-'+year
            a.download = response.filename;
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
  
            this.loading = false;
  
            this.dialogRef.close();
  
            this.snackbar.showNotification(
              "snackbar-success",
              "Report generated successfully"
            );

        },
        error: (err) => {
          console.log(err);
          this.loading = false;
          this.dialogRef.close();
  
          // Attempt to access the error message
          this.snackbar.showNotification(
            "snackbar-danger",
            err,
          );
        },
      }
      );

  }
 
  onClick() {

  }

  choosePickUpLocation() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.data = {
      user: '',
    };
    const dialogRef = this.dialog.open(LookupPickUpLocationsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.dialogData = result;
      this.farmerProductsForm.patchValue({
        name: this.dialogData.data.name,
        locationId: this.dialogData.data.id
      });
    });
  }

  getMonthName(): string {
    const month = MONTHS.find(m => m.value === this.farmerProductsForm.value.month);
    return month ? month.name : "inavalid-month";
  }
}