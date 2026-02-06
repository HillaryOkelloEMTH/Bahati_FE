import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { CountiesLookupComponent } from '../../counties/counties-lookup/counties-lookup.component';
import { ManageCountiesComponent } from '../../counties/manage-counties/manage-counties.component';
import { SubcountiesService } from '../subcounties.service';

@Component({
  selector: 'app-edit-subcounty',
  templateUrl: './edit-subcounty.component.html',
  styleUrls: ['./edit-subcounty.component.sass']
})
export class EditSubcountyComponent implements OnInit {

  editSubCountyForm: FormGroup;
  loading = false;
  county: any;
  name: any;
  items: Wards[] = [];

  selection = new SelectionModel<any>(true, []);
  dialogData: any;
  wardsSelected = [];

  displayedColumns: string[] = ["ward", "action"];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialogRef: MatDialogRef<ManageCountiesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private service: SubcountiesService,
    private dialog: MatDialog) { }
  subscription!: Subscription;


  ngOnInit(): void {
    this.editSubCountyForm = this.fb.group({
      name: [this.data.county.subcounty],
      countyName: [this.data.county.county],
      countyFk: [""],
      wardName: [""],
      id: [this.data.county.id],
      wards: new FormArray([])
    });
    this.getWards();
  }

  response: any;
  getWards() {
    this.subscription = this.service.getSubCountyById(this.data.county.id).subscribe(res => {
      this.response = res;
      this.items = this.response.entity.wards;
      this.editSubCountyForm.patchValue({ countyFk: this.response.entity.countyFk })
      this.dataSource = new MatTableDataSource<any>(this.items);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.editSubCountyForm.value.wards = this.items;
    })
  }


  addWards() {
    let ward: Wards = new Wards();
    ward.name = this.editSubCountyForm.value.wardName;
    this.items.push(ward);
    this.dataSource = new MatTableDataSource<any>(this.items);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.editSubCountyForm.value.wards = this.items;
    this.editSubCountyForm.value.wardName = "";
  }

  pickCountyDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      user: '',
    };
    const dialogRef = this.dialog.open(CountiesLookupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.county = result;
      this.editSubCountyForm.patchValue({
        countyFk: this.county.id,
        countyName: this.county.name,
      });
    });
  }

  onSubmit() {
    this.loading = true;
    console.log(this.editSubCountyForm.value)
    this.subscription = this.service.updateSubCounty(this.editSubCountyForm.value).subscribe(res => {
      this.loading = false;
      this.snackbar.showNotification("snackbar-success", "Successful!");
      this.editSubCountyForm.reset();
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

  removeWard(index: any) {
    this.items.splice(index, 1);
    this.dataSource = new MatTableDataSource<any>(this.items);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.editSubCountyForm.value.wards = this.items;
  }

}

export class Wards {
  public name: string;
}
