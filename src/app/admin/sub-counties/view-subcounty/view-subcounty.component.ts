import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ManageCountiesComponent } from '../../counties/manage-counties/manage-counties.component';
import { SubcountiesService } from '../subcounties.service';

@Component({
  selector: 'app-view-subcounty',
  templateUrl: './view-subcounty.component.html',
  styleUrls: ['./view-subcounty.component.sass']
})
export class ViewSubcountyComponent implements OnInit {

  editSubCountyForm: FormGroup;
  loading = false;
  county: any;
  name: any;
  items: Wards[] = [];

  selection = new SelectionModel<any>(true, []);
  dialogData: any;
  wardsSelected = [];

  displayedColumns: string[] = ["ward"];
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
}

export class Wards {
  public name: string;
}
