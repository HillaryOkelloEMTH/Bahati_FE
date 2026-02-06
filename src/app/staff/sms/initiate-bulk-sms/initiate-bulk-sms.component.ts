import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { SmsManagementComponent } from '../sms-management/sms-management.component';
import { SmsService } from '../sms.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarmerService } from '../../farmer/services/farmer.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-initiate-bulk-sms',
  templateUrl: './initiate-bulk-sms.component.html',
  styleUrls: ['./initiate-bulk-sms.component.sass']
})
export class InitiateBulkSmsComponent implements OnInit {

  sendSMSform: FormGroup;
  recipientsSelected = false;
  loading = false;
  templates: any;
  body: any;
  tempSelected: any;
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

  isdata: boolean = false;
  isLoading: boolean = false;

  constructor(public dialogRef: MatDialogRef<SmsManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private service: SmsService,
    private farmerService: FarmerService) { }
  subscription!: Subscription;


  ngOnInit(): void {
    this.getData();
    this.getTemplates();
    this.sendSMSform = this.fb.group({
      templateName: ["", [Validators.required]],
      templateBody: [""],
      recipients: new FormArray([])
    })
  }


  displayTemplateBody(event: any) {
    this.body = event.value.templateBody;
    if (this.body) {
      this.tempSelected = true;
    } else {
      this.tempSelected = false;
    }
  }

  getTemplates() {
    this.service.getAllTemplates().subscribe(
      (res) => {
        this.templates = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }


  onClick() {
    this.dialogRef.close();
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getData() {
    this.selected = "";
    this.isLoading = true;
    this.subscription = this.farmerService.getActiveFarmers(1).subscribe(res => {
      this.data = res;
      if (this.data.entity.length > 0) {
        this.isLoading = false;
        this.isdata = true;
        // Binding with the datasource
        this.dataSource = new MatTableDataSource(this.data.entity);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else {
        this.isdata = false;
        this.dataSource = new MatTableDataSource<any>(this.data);
      }
    }, error => {
      console.log('An error occurred:', error)

    })
  }

  submit()
  {

    this.sendSMSform.value.templateBody = this.sendSMSform.value.templateName.templateBody
    this.sendSMSform.value.templateName = this.sendSMSform.value.templateName.templateName
    let items: FarmerData[] = [];
    this.selection.selected.forEach( (value) => {
      let farmer: FarmerData = new FarmerData();
      farmer.memberNumber = value.farmer_no;
      farmer.name = value.name;
      farmer.phoneNumber = value.mobile_no;
      farmer.idNumber = value.id_number;
      items.push(farmer);
    });

    console.log("the cumber of receipients are ", items.length)

    this.sendSMSform.value.recipients = items;
    if(items.length > 0)
    {
      this.recipientsSelected = true;
    }
    else
    {
      this.recipientsSelected = false;
    }

    this.loading = true;
    this.subscription = this.service.sendBulkSMS(this.sendSMSform.value).subscribe(res => {
      this.snackbar.showNotification("snackbar-success", "Successful!");
      this.loading = false;
      this.sendSMSform.reset();
      this.dialogRef.close();
    }, err => {
      this.loading = false;
      this.dialogRef.close();
    })

  }

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

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
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

}

export class FarmerData {
  public memberNumber: string;
  public name: string;
  public phoneNumber: string;
  public idNumber: string;
}
