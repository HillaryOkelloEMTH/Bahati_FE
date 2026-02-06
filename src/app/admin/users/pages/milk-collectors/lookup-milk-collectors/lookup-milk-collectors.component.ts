import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddPickupComponent } from 'src/app/admin/pick-up-locations/add-pickup/add-pickup.component';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-lookup-milk-collectors',
  templateUrl: './lookup-milk-collectors.component.html',
  styleUrls: ['./lookup-milk-collectors.component.sass']
})
export class LookupMilkCollectorsComponent implements OnInit {

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
    public dialogRef: MatDialogRef<AddPickupComponent>,
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


  username: any;
  email: any;

  selectMilkCollectors() {
    let items: MilkCollectors[] = [];
    this.selection.selected.forEach(function (value) {
      let milkCollectors: MilkCollectors = new MilkCollectors();
      milkCollectors.username = value.username;
      items.push(milkCollectors);
    });

    this.dialogRef.close({ event: "close", data: items });
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

export class MilkCollectors {
  public username: string;
}