import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { CountiesLookupComponent } from '../../counties/counties-lookup/counties-lookup.component';
import { ManageCountiesComponent } from '../../counties/manage-counties/manage-counties.component';
import { SubcountiesService } from '../subcounties.service';

@Component({
  selector: 'app-add-subcounty',
  templateUrl: './add-subcounty.component.html',
  styleUrls: ['./add-subcounty.component.sass']
})
export class AddSubcountyComponent implements OnInit {

  addSubCountyForm: FormGroup;
  loading = false;
  county: any;
  name: any;

  items: Wards[] = [];
  selection = new SelectionModel<any>(true, []);
  dialogData: any;
  wardsSelected = [];

  displayedColumns: string[] = ["ward","action"];
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
    this.addSubCountyForm = this.fb.group({
      name: ["", [Validators.required]],
      countyName: ["", [Validators.required]],
      countyFk: ["", [Validators.required]],
      wardName: [""],
      wards: new FormArray([])
    })
  }

  

  addWards() {
    let ward:Wards = new Wards();
    ward.name = this.addSubCountyForm.value.wardName;
    this.items.push(ward);
    this.dataSource = new MatTableDataSource<any>(this.items);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.addSubCountyForm.value.wards = this.items;
    this.addSubCountyForm.value.wardName = "";
  }

  pickCountyDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.data = {
      user: '',
    };
    const dialogRef = this.dialog.open(CountiesLookupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.county = result.data;
      this.addSubCountyForm.patchValue({
        countyFk: this.county.id,
        countyName: this.county.name,
      });
    });
  }

  onSubmit() {
    this.loading = true;
    console.log(this.addSubCountyForm.value)
    this.subscription = this.service.addNewSubCounty(this.addSubCountyForm.value).subscribe(res => {
      this.loading = false;
      console.log("Response : "+ res)
      this.snackbar.showNotification("snackbar-success", res.message);
      this.addSubCountyForm.reset();
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
    this.addSubCountyForm.value.wards = this.items;
  }

}

export class Wards {
  public name: string;
}
