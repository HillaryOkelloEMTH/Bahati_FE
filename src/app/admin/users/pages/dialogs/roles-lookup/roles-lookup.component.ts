import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs';
import { RoleService } from 'src/app/data/services/role.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { AddAccountComponent } from '../../add-account/add-account.component';

@Component({
  selector: 'app-roles-lookup',
  templateUrl: './roles-lookup.component.html',
  styleUrls: ['./roles-lookup.component.sass']
})
export class RolesLookupComponent extends BaseComponent implements OnInit {
  roles: any;
  isLoading: boolean = true;

  displayedColumns: string[] = ["id", "name", "creationDate"];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<any>(true, []);

  meetingDetails: any;
  meetingId: any;

  constructor(
    public dialogRef: MatDialogRef<AddAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    // private agendasCategoryService: AgendasCategoryService
    private roleService: RoleService
  ) {
    super();
    this.meetingDetails = data.data;

    console.log("Meeting Details", this.meetingDetails);
  }

  ngOnInit(): void {
    this.fetchAllMeetings();
  }

  fetchAllMeetings() {
    this.roleService.getAllActiveRoles()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {

          this.roles = res.roleData;
          if (this.roles.length > 0) {
            this.isLoading = false;

            this.dataSource = new MatTableDataSource<any>(this.roles);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          } else {
            this.isLoading = false;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onSelectRow(data: any) {
    this.dialogRef.close({ event: "close", data: data });
  }


  onNoClick() {
    this.dialogRef.close();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
