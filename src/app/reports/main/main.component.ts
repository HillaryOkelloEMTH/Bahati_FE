import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { FarmerLookupComponent } from 'src/app/staff/farmer/pages/farmer-lookup/farmer-lookup.component';
import { FarmerStatementComponent } from '../farmer-statement/farmer-statement.component';
import { ReportsService } from '../services/reports.service';
import { StatmentComponent } from '../pages/statment/statment.component';
import { FarmerProductsReportComponent } from '../pages/farmer-products-report/farmer-products-report.component';
import { LookupPickUpLocationsComponent } from 'src/app/staff/sales/pages/lookup-pick-up-locations/lookup-pick-up-locations.component';
import { saveAs } from 'file-saver';
const MONTHS = [
  { value: '1', name: 'January' },
  { value: '2', name: 'February' },
  { value: '3', name: 'March' },
  { value: '4', name: 'April' },
  { value: '5', name: 'May' },
  { value: '6', name: 'June' },
  { value: '7', name: 'July' },
  { value: '8', name: 'August' },
  { value: '9', name: 'September' },
  { value: '10', name: 'October' },
  { value: '11', name: 'November' },
  { value: '12', name: 'December' }
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
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  reportCollectionForm: FormGroup;
  farmerstatementForm: FormGroup
  collectionsPerLocationsForm: FormGroup
  reportCollectionForm2: FormGroup
  reportCollectionForm3: FormGroup
  reportCollectionFormp:FormGroup
  paymentFileForm: FormGroup
  paymentFileFormdr:FormGroup
  reportCollectionFormm:FormGroup
  mccMonthlyRouteSummary: FormGroup
  isloading: boolean
  collectors: any
  months: any
  from:any
  to:any
  years: any

  centered = false;
  // radius: number;
  color: string;

  @ViewChild(MatAccordion) accordion: MatAccordion;
  dialogData: any;
  date: string;
  currentYear: any


  constructor(
    // public dialogRef: MatDialogRef<MainComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private snackbar: SnackbarService,
    private service: ReportsService,
  ) { }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear().toString();
    this.years = YEARS

    this.reportCollectionForm = this.fb.group({
      date: ["", [Validators.required]],
      format: ["", [Validators.required]],
    })

    this.reportCollectionForm2 = this.fb.group({
      date: ["", [Validators.required]],
      // format: ["", [Validators.required]],
    })

    this.reportCollectionForm3 = this.fb.group({
      date: ["", [Validators.required]],
      mcc: ["", [Validators.required]],
      centerId: ["", [Validators.required]],
      format: ["", [Validators.required]],
    })

    this.mccMonthlyRouteSummary = this.fb.group({
      month: ['', [Validators.required]],
      mcc: ['', [Validators.required]],
      locationId: ['', [Validators.required]]
    });

    this.reportCollectionFormp = this.fb.group({
      month: ["", [Validators.required]],
      year: [this.currentYear, [Validators.required]],
      mcc: ['', [Validators.required]],
      locationId: ['', [Validators.required]]
      // format: ["", [Validators.required]],
    })

    this.reportCollectionFormm = this.fb.group({
      year: [this.currentYear, [Validators.required]],
      month: ["", [Validators.required]],
      // format: ["", [Validators.required]],
    })

    // this.paymentFileFormdr= this.fb.group({
    //   format: ["", [Validators.required]],
    //   mode: ["", [Validators.required]],
    //   from: ["", [Validators.required]],
    //   to: ["", [Validators.required]],
    // });
    this.paymentFileFormdr = this.fb.group(
      {
        from: ["", Validators.required],
        to: ["", Validators.required],
      },
      { validators: this.dateRangeValidator }
    );
    
    

    this.collectionsPerLocationsForm = this.fb.group({
      to: ["", [Validators.required]],
      date: ["", [Validators.required]],
      format: ["excel", [Validators.required]],
      pul: ["", [Validators.required]],
      locationId: ["", [Validators.required]],
    })




    this.months = MONTHS
    this.paymentFileForm = this.fb.group(
      {
        month: ["", [Validators.required]],
        format: ["excel"],
        year: [this.currentYear, [Validators.required]],
      }
    )

  }
  generateDateReport() {
    // this.color="green"
    // this.centered=true
    this.isloading = true
    let format = this.reportCollectionForm.value.format
    this.date = this.datePipe.transform(this.reportCollectionForm.value.date, 'yyyy-MM-dd');
    if (format == "pdf") {

      this.service.collectionsPerDate(this.date)
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
            a.download = response.filename;
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();

            this.isloading = false;



            this.snackbar.showNotification(
              "snackbar-success",
              "Report generated successfully"
            );
          },
          (err) => {
            console.log(err);
            this.isloading = false

            this.snackbar.showNotification(
              "snackbar-danger",
              "Report could not be generated successfully"
            );
          }
        );
    } else if (format == "excel") {
      console.log("File format picked = " + format)
      console.log("Formated Date = " + this.date)
      this.service.collectionsPerDateExcel(this.date).subscribe(
        (response: Blob) => {
          this.isloading = false

          this.snackbar.showNotification(
            "snackbar-success",
            "Report generated successfully"
          );
          const filename = 'collections_per_date.xlsx'; // Specify the desired filename with the appropriate extension
          saveAs(response, filename);
        },
        error => {
          this.isloading = false

          this.snackbar.showNotification(
            "snackbar-danger",
            "Report could not be generated successfully"
          );
          console.error('Failed to download report:', error);
        }
      );
    }

  }

  getBahatiDailyDeliverySummary() {
    // console.log(this.reportCollectionForm.value)
    this.date = this.datePipe.transform(this.reportCollectionForm2.value.date, 'yyyy-MM-dd');
    console.log("Formated date is ", this.date)
    this.isloading = true
    this.service.bahatiDailyDeliverySummary(this.date)
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
          a.download = response.filename;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();

          this.isloading = false;

          this.snackbar.showNotification(
            "snackbar-success",
            "Report generated successfully",
          );
        },
        (err) => {
          console.log(err);
          this.isloading = false

          this.snackbar.showNotification(
            "snackbar-danger",
            "Report could not be generated successfully",
          );
        }
      );

  }

  generateCollectionsPerLocations() {
    // console.log(this.reportCollectionForm.value)
    const mcc = this.reportCollectionForm3.value.mcc
    this.date = this.datePipe.transform(this.reportCollectionForm3.value.date, 'yyyy-MM-dd');
    console.log("Formated date is ", this.date)
    this.isloading = true

    if (this.reportCollectionForm3.value.format == "excel") {
      this.service.getMCCRouteSummaryByDate(this.date, this.reportCollectionForm3.value.centerId).subscribe({
        next: (res: Blob) => {
          this.isloading = false;


          this.snackbar.showNotification(
            "snackbar-success",
            "Report generated successfully"
          );
          const filename = mcc+'-summary'+this.date+'.xlsx'; // Specify the desired filename with the appropriate extension
          saveAs(res, filename);
        },
        error: (error: any) => {
          this.isloading = false

          this.snackbar.showNotification(
            "snackbar-danger",
            "Report could not be generated successfully"
          );
          console.error('Failed to download report:', error);
        },
        complete: () => {}
      })
    } else {
      this.service.mccDailyRouteSummary(this.reportCollectionForm3.value.centerId, this.date)
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
          a.download = response.filename;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();

          this.isloading = false;



          this.snackbar.showNotification(
            "Report generated successfully",
            "snackbar-success"
          );
        },
        (err) => {
          console.log(err);
          this.isloading = false

          this.snackbar.showNotification(
            "Report could not be generated successfully",
            "snackbar-danger"
          );
        }
      );
    }

  }


  generateMccMonthlyRouteSummary() {
    // console.log(this.reportCollectionForm.value)
    const mcc = this.mccMonthlyRouteSummary.value.mcc
    this.isloading = true

    this.service.mccMonthlyRouteSummary(this.mccMonthlyRouteSummary.value.month, this.mccMonthlyRouteSummary.value.locationId).subscribe({
      next: (res: Blob) => {
        this.isloading = false;


        this.snackbar.showNotification(
          "snackbar-success",
          "Report generated successfully"
        );
        const filename = mcc+'-summary.xlsx'; // Specify the desired filename with the appropriate extension
        saveAs(res, filename);
      },
      error: (error: any) => {
        this.isloading = false

        this.snackbar.showNotification(
          "snackbar-danger",
          "Report could not be generated successfully"
        );
        console.error('Failed to download report:', error);
      },
      complete: () => {}
    })

  }



  monthlyRouteSummary() {
    // console.log(this.reportCollectionForm.value)
    console.log("Formated date is ", this.date)
    this.isloading = true
    this.service.monthlyRouteSummary(this.reportCollectionFormp.value.locationId, this.reportCollectionFormp.value.month, this.reportCollectionFormp.value.year).subscribe({
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
            a.download = response.filename;
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();

            this.isloading = false;



            this.snackbar.showNotification(
              "snackbar-success",
              "Report generated successfully"
            );
      },
      error: (error: any) => {
        console.log(error);
        this.isloading = false

        this.snackbar.showNotification(
          "snackbar-danger",
          "Report could not be generated successfully"
        );
      }
    })

  }
  generateCollectionsPerLocationsm() {
    // console.log(this.reportCollectionForm.value)


    this.isloading = true
    this.service.collectionsPerLocationrByMonth(this.reportCollectionFormm.value.month, this.reportCollectionFormm.value.year)
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
          a.download = response.filename;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();

          this.isloading = false;



          this.snackbar.showNotification(
            "snackbar-success",
            "Report generated successfully",
          );
        },
        (err) => {
          console.log(err);
          this.isloading = false

          this.snackbar.showNotification(
            "snackbar-danger",
            "Report could not be generated successfully",
          );
        }
      );

  }

  selectPickUpLocation() {
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

      this.collectionsPerLocationsForm.patchValue({
        pul: this.dialogData.data.name,
        locationId: this.dialogData.data.id
      });
    });
  }

  selectCollectionCenter() {
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

      this.reportCollectionForm3.patchValue({
        mcc: this.dialogData.data.name,
        centerId: this.dialogData.data.id
      })

      this.collectionsPerLocationsForm.patchValue({
        pul: this.dialogData.data.name,
        locationId: this.dialogData.data.id
      });

      this.mccMonthlyRouteSummary.patchValue({
        mcc: this.dialogData.data.name,
        locationId: this.dialogData.data.id
      })

      this.reportCollectionFormp.patchValue({
        mcc: this.dialogData.data.name,
        locationId: this.dialogData.data.id
      })
    });
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
      this.paymentFileForm.patchValue({
        pul: this.dialogData.data.name,
        locationId: this.dialogData.data.id
      });
    });
  }


  generatePaymentFile() {
    console.log("Paymentfile Form Data"+ this.paymentFileForm.value.pul)
    console.log("Paymentfile Form Data"+ this.paymentFileForm.value.locationId)
    let format=this.paymentFileForm.value.format
    this.isloading = true
    if (format == "pdf") {
    this.service.getPaymentFile(this.paymentFileForm.value.locationId,this.paymentFileForm.value.month, this.paymentFileForm.value.mode)
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
          a.download = response.filename;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();

          this.isloading = false;



          this.snackbar.showNotification(
            "Report generated successfully",
            "snackbar-success"
          );
        },
        (err) => {
          console.log(err);
          this.isloading = false

          this.snackbar.showNotification(
            "Report could not be generated successfully",
            "snackbar-danger"
          );
        }
      );
    }else if(format=="excel"){
      console.log("File format picked = " + format)
        console.log("Formated Date = " + this.date)
        const year = this.paymentFileForm.value.year
        this.service.paymentFileExcel(this.paymentFileForm.value.month, year).subscribe(
          (response: Blob) => {
            this.isloading = false
            const month = this.getMonthName();
            const filename = 'payroll-'+month+'-'+year+'.xlsx'; // Specify the desired filename with the appropriate extension
            console.log("filename", filename)
            saveAs(response, filename);
          },
          error => {
            this.isloading = false
            this.snackbar.showNotification("snackbar-danger", "unable to generate payroll")
            console.error('Failed to download report:', error);
          }
        );
    }

  }
  dateRangeValidator(group: FormGroup) {
    const from = group.get('from')?.value;
    const to = group.get('to')?.value;
  
    if (!from || !to) {
      return null;
    }
  
    return new Date(from) <= new Date(to)
      ? null
      : { dateRangeInvalid: true };
  }
  

  // generatePaymentFileDR() {
  //   this.from = this.datePipe.transform(this.paymentFileFormdr.value.from, 'yyyy-MM-dd');
  //   this.to = this.datePipe.transform(this.paymentFileFormdr.value.to, 'yyyy-MM-dd');
  //   let format = this.paymentFileFormdr.value.format;
  //   console.log("From "+ this.from)
  //   console.log("To "+ this.to)
  //   this.isloading = true
  //   if (format == "pdf") {
  //   this.service.getPaymentFileDR(this.from,this.to, this.paymentFileFormdr.value.mode)
  //     .subscribe(
  //       (response) => {
  //         console.log(response)
  //         let url = window.URL.createObjectURL(response.data);

  //         // if you want to open PDF in new tab
  //         window.open(url);

  //         let a = document.createElement("a");
  //         document.body.appendChild(a);
  //         a.setAttribute("style", "display: none");
  //         a.setAttribute("target", "blank");
  //         a.href = url;
  //         a.download = response.filename;
  //         a.click();
  //         window.URL.revokeObjectURL(url);
  //         a.remove();

  //         this.isloading = false;



  //         this.snackbar.showNotification(
  //           "Report generated successfully",
  //           "snackbar-success"
  //         );
  //       },
  //       (err) => {
  //         console.log(err);
  //         this.isloading = false

  //         this.snackbar.showNotification(
  //           "Report could not be generated successfully",
  //           "snackbar-danger"
  //         );
  //       }
  //     );
  //   }else if(format=="excel"){
  //     console.log("File format picked = " + format)
  //       console.log("Formated Date = " + this.date)
  //       this.service.paymentFileExcelDr(this.from,this.to, this.paymentFileFormdr.value.mode).subscribe(
  //         (response: Blob) => {
  //           this.isloading = false
  //           const filename = 'collections_per_date.xlsx'; // Specify the desired filename with the appropriate extension
  //           saveAs(response, filename);
  //         },
  //         error => {
  //           console.error('Failed to download report:', error);
  //         }
  //       );
  //   }

  // }

  generatePaymentFileDR() {
    if (this.paymentFileFormdr.invalid) {
      return;
    }
  
    const from = this.datePipe.transform(
      this.paymentFileFormdr.value.from,
      'yyyy-MM-dd'
    );
  
    const to = this.datePipe.transform(
      this.paymentFileFormdr.value.to,
      'yyyy-MM-dd'
    );
  
    this.isloading = true;
  
    this.service.paymentFileExcelDateRange(from, to).subscribe({
      next: (response: Blob) => {
        this.isloading = false;
  
        const filename = `payroll_${from}_to_${to}.xlsx`;
        saveAs(response, filename);
  
        this.snackbar.showNotification(
          "snackbar-success",
          "Payroll report generated successfully"
        );
      },
      error: (error) => {
        this.isloading = false;
  
        console.error(error);
        this.snackbar.showNotification(
          "snackbar-danger",
          "Failed to generate payroll report"
        );
      }
    });
  }
  

  generateCollectionsPerPickUpLocations() {
    this.isloading = true
   let format=this.collectionsPerLocationsForm.value.format
    const fromDate = this.datePipe.transform(this.collectionsPerLocationsForm.value.date, 'yyyy-MM-dd');
    const toDate = this.datePipe.transform(this.collectionsPerLocationsForm.value.to, "yyyy-MM-dd")

    if(format=="pdf"){
    this.service.collectionsPerPulByDate(this.collectionsPerLocationsForm.value.locationId, this.date)
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
          a.download = response.filename;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();

          this.isloading = false;

          this.snackbar.showNotification(
            "snackbar-success",
            "Report generated successfully",
          );
        },
        (err) => {
          console.log(err);
          this.isloading = false

          this.snackbar.showNotification(
            "snackbar-danger",
            "Report could not be generated successfully"
          );
        }
      );
      }else if (format == "excel") {
        console.log("File format picked = " + format)
        console.log("Formated Date = " + this.date)
        this.service.collectionsPerMCCandDateExcel(this.collectionsPerLocationsForm.value.locationId,fromDate, toDate).subscribe(
          (response: Blob) => {
            this.isloading = false
            const centerName = this.collectionsPerLocationsForm.value.pul
            const filename = centerName+'-Deliveries-'+fromDate+'to'+toDate+'.xlsx'; // Specify the desired filename with the appropriate extension
            saveAs(response, filename);

          this.snackbar.showNotification(
            "snackbar-success",
            "Report generated successfully",
          );
          },
          error => {
            this.isloading = false;
            console.error('Failed to download report:', error);
            this.snackbar.showNotification(
              "snackbar-danger",
              "Report could not be generated successfully"
            );
          }
        );
      }
  }


  generateTotalCollectionsPerPickUpLocations() {
    this.isloading = true
    console.log(this.collectionsPerLocationsForm.value)
    this.date = this.datePipe.transform(this.collectionsPerLocationsForm.value.date, 'yyyy-MM-dd');
    console.log("Formated date " + this.date)
    this.service.collectionsPerPulByDate(this.collectionsPerLocationsForm.value.locationId, this.date)
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
          a.download = response.filename;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();

          this.isloading = false;



          this.snackbar.showNotification(
            "Report generated successfully",
            "snackbar-success"
          );
        },
        (err) => {
          console.log(err);
          this.isloading = false

          this.snackbar.showNotification(
            "Report could not be generated successfully",
            "snackbar-danger"
          );
        }
      );
  }




  farmerCollectionsReport() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "500px"
    dialogConfig.data = {
      data: ""
    }
    this.dialog.open(FarmerStatementComponent, dialogConfig)


  }
  farmerProductReport() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "500px"
    dialogConfig.data = {
      data: ""
    }
    this.dialog.open(FarmerProductsReportComponent, dialogConfig)


  }
  farmerStatement() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "500px"
    dialogConfig.data = {
      data: ""
    }
    this.dialog.open(StatmentComponent, dialogConfig)


  }

  getMonthName(): string {
    const month = MONTHS.find(m => m.value === this.paymentFileForm.value.month);
    return month ? month.name : "inavalid-month";
  }

  DailyCOllectionReport() {

  }
  collectionsPerLocation(title: any) {

  }
  collectionsPerCollector(title: any) {

  }
  onClick() {

  }
}
