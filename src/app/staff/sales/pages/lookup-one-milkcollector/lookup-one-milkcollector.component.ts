import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/core/service/auth.service';
import { FloatAllocationComponent } from '../float-allocation/float-allocation.component';

@Component({
  selector: 'app-lookup-one-milkcollector',
  templateUrl: './lookup-one-milkcollector.component.html',
  styleUrls: ['./lookup-one-milkcollector.component.sass']
})
export class LookupOneMilkcollectorComponent implements OnInit {

  users: any;
  isLoading: boolean = true;

  displayedColumns: string[] = ["select", "username", "email"];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<any>(true, []);

  meetingDetails: any;
  meetingId: any;

  constructor(
    public dialogRef: MatDialogRef<FloatAllocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private accountService: AuthService,
  ) {

  }

  ngOnInit(): void {
    this.getActiveAccounts();
  }

  getActiveAccounts() {
    this.accountService.allActiveUsers()
      .subscribe(
        (res) => {
          this.users = res.userData;
          if (this.users.length > 0) {
            this.isLoading = false;
            this.dataSource = new MatTableDataSource<any>(this.users);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onSelectRow(data: any) {
    this.dialogRef.close({ data: data });
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
