import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FarmerService } from '../../services/farmer.service';
import { NotificationService } from 'src/app/data/services/notification.service';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { BulkComponent } from 'src/app/staff/sms/bulk/bulk.component';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { filter } from 'rxjs';
import { SmsService } from 'src/app/staff/sms/sms.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FarmerData } from 'src/app/staff/sms/initiate-bulk-sms/initiate-bulk-sms.component';
import { RoutesService } from 'src/app/admin/routes/routes.service';
import { LookupPickUpLocationsComponent } from 'src/app/staff/sales/pages/lookup-pick-up-locations/lookup-pick-up-locations.component';
import { ConfigService } from 'src/app/config/config.service';
import { ConfigsService } from 'src/app/staff/stock/configs/configs.service';

@Component({
  selector: 'app-farmer-status-lookup',
  templateUrl: './farmer-status-lookup.component.html',
  styleUrls: ['./farmer-status-lookup.component.scss']
})
export class FarmerStatusLookupComponent implements OnInit {
  farmers: any[] = []
  dataSource: MatTableDataSource<any>
  routeId: number
  months: number
  locationId: number
  loading: boolean = false
  isdata: boolean = false
  templateForm: FormGroup
  filterForm: FormGroup
  templateFilterCtrl = new FormControl('')
  filteredTemplates: any[] = []
  templates: any[] = []
  filterSummary: any
  readonly: boolean = false
  selectedIndex: number = 0
  selectedFarmers: FarmerData[] = []
  selectedCount: number = 0
  selectedTemplate: any
  routes: any
  dialogData: any

  selected = "";
  selection = new SelectionModel<any>(true, []);

  displayedColumns: string[] = [
    'select',
    'id',
    "username",
    "farmer_no",
    "mobile_no",
    "ID No.",
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog,private routeService: ConfigsService,private smsService: SmsService,private fb: FormBuilder,private service: FarmerService, private snackbar: NotificationService, public dialogRef: MatDialogRef<BulkComponent>) { }

  ngOnInit(): void {
    this.templateForm = this.fb.group({
      template: [null, Validators.required],
      message: ['', Validators.required],
    });

    this.filterForm = this.fb.group({
      filter: ['All', Validators.required],
      location: [''],
      center: [''],
      months: [1, [Validators.required, Validators.min(1)]],
    });

    this.getTemplates()
    this.getRoutes()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  onStepChange(event: StepperSelectionEvent) {
    this.selectedIndex = event.selectedIndex
  }

  clearTable(event: any) {
    this.farmers = []
    this.dataSource = new MatTableDataSource(this.farmers)
    this.dataSource.paginator = this.paginator
  }

  onTemplateChange(template: any) {
    console.log("template passed", template)
    this.readonly = true
    this.selectedTemplate = template
    this.templateForm.patchValue({
      message: template.templateBody
    });
    this.templateForm.get('message')?.updateValueAndValidity();
    this.templateForm.get('template')?.updateValueAndValidity();
  }


    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      if (this.isAllSelected()) {
        this.selection.clear();
      } else {
        this.selection.select(...this.dataSource.data);
      }

      this.selectedCount = this.selection.selected.length;
    }

  getTemplates() {
    this.smsService.getAllTemplates().subscribe(
      (res) => {
        this.templates = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getFarmers(): void {
    if (this.filterForm.valid) {
      this.loading = true;
      this.months = this.filterForm.value.months;

      if (this.filterForm.value.filter === 'Route') {
        this.getRouteActiveFarmers();
      } else if(this.filterForm.value.filter === 'Center') {
        this.getCenterActiveFarmers();
      } else {
        this.getAllActiveFarmers()
      }
    }
  }

  mapSelectedFarmers() {
      this.selection.selected.forEach( (value) => {
        let farmer: FarmerData = new FarmerData();
        farmer.memberNumber = value.farmer_no;
        farmer.name = value.username;
        farmer.phoneNumber = value.mobile_no;
        farmer.idNumber = value.id_number;
        this.selectedFarmers.push(farmer);
      });
  }

  requestBody() {
    return {
      "templateName": this.selectedTemplate.templateName,
      "templateBody": this.templateForm.value.message,
      "recipients": this.selectedFarmers
    }
  }

  getLocationOptions() {
    return this.filterForm.value.filter === 'route'
      ? this.routes
      : ['Center X', 'Center Y'];
  }

   getAllActiveFarmers():void {
    this.loading = true

    this.service.getActiveFarmers(this.months).subscribe({
      next: (res) => {
        this.loading = false;

        if (res.entity.length > 0) {
          this.farmers  =res.entity
          this.isdata = true
          this.dataSource = new MatTableDataSource(this.farmers)
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        } else {
          this.snackbar.alertWarning("No active farmers found")
        }
      },
      error: (err) => {
        this.loading = false

        this.snackbar.alertWarning(err)
        console.error(err)
      },
      complete: () => {}
    })
  }


   getRouteActiveFarmers():void {
    this.loading = true

    this.service.getRouteActiveFarmers(this.filterForm.value.location.id, this.months).subscribe({
      next: (res) => {
        this.loading = false;

        if (res.entity.length > 0) {
          this.isdata = true
          this.farmers = res.entity
          this.dataSource  = new MatTableDataSource(this.farmers)
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort

        } else {
          this.snackbar.alertWarning("No active farmers found")
        }
      },
      error: (err) => {
        this.loading = false

        this.snackbar.alertWarning(err)
        console.error(err)
      },
      complete: () => {}
    })
  }

  getRoutes() {
    this.routeService.getRoutes().subscribe((res) => {
      if (res.entity.length > 0) {
        this.routes = res.entity;
      } else {
        this.routes = [];
      }
    });
  }


   getCenterActiveFarmers():void {
    this.loading = true

    this.service.getCenterActiveFarmers(this.dialogData.id, this.months).subscribe({
      next: (res) => {
        this.loading = false;

        if (res.entity.length > 0) {
          this.farmers = res.entity

          this.isdata = true
          this.dataSource = new MatTableDataSource(this.farmers)
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        } else {
          this.snackbar.alertWarning("No active farmers found")
        }
      },
      error: (err) => {
        this.loading = false

        this.snackbar.alertWarning(err)
        console.error(err)
      },
      complete: () => {}
    })
  }

  sendMessage() {
    this.mapSelectedFarmers()

    this.loading = true;
    if (this.selectedTemplate != null && this.selectedTemplate != undefined && this.selectedFarmers.length > 0) {
      this.selectedTemplate.templateBody = this.templateForm.value.message
      this.selectedTemplate.templateName = this.selectedTemplate.templateName
      let items = this.requestBody()
      console.log("the message buildt is", items)
      this.loading = false
    } else {
      this.snackbar.alertWarning("Please select a template and farmers")
      this.loading = false
      return
    }

    this.smsService.sendBulkSMS(this.requestBody()).subscribe({
      next: (res) => {
        this.loading = false
        this.dialogRef.close();
        this.snackbar.alertSuccess(res.message);
      },
      error: (err) => {
        this.loading = false
        this.snackbar.alertWarning(err.message)
      }
    })

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
      this.dialogData = result.data;

      console.log("Dialog data", this.dialogData)

      this.filterForm.patchValue({
        location: this.dialogData.name,
      })
    });
  }

  close() {
    this.dialogRef.close();
  }

}
