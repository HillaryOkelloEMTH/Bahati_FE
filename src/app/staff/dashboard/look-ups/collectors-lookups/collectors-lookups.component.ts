import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs';
import { UserService } from 'src/app/data/services/user.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { MainComponent } from '../../templates/main/main.component';

@Component({
  selector: 'app-collectors-lookups',
  templateUrl: './collectors-lookups.component.html',
  styleUrls: ['./collectors-lookups.component.sass']
})
export class CollectorsLookupsComponent extends BaseComponent implements OnInit {
  users: any;
  isLoading: boolean = true;
  collectors: any[] = [];

  displayedColumns: string[] = ["username"];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<any>(true, []);

  meetingDetails: any;
  meetingId: any;

  constructor(
    public dialogRef: MatDialogRef<MainComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getMilkCollectors();
  }

  colData: any;
  getMilkCollectors() {
    this.userService.getAllCollectors().subscribe(res => {
      this.colData = res;
      if (this.colData.entity.length > 0) {
        console.log("Collectors found"+ res)
        this.collectors = this.colData.entity;
        this.isLoading = false;

        this.dataSource = new MatTableDataSource<any>(this.collectors
        );
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else {
        this.collectors = [];
      }
    })
  }

  // getActiveAccounts() {
  //   this.userService
  //     .getAllCollectors()
  //     .pipe(takeUntil(this.subject))
  //     .subscribe(
  //       (res) => {
  //         let users = res.userData;

  //         users.forEach(user => {
  //           console.log(user)
  //           if(user.roles[0].name == "ROLE_COLLECTOR"){
  //             this.collectors.push(user);
  //           }
  //         })

  //         if (this.collectors.length > 0) {
  //           this.isLoading = false;

  //           this.dataSource = new MatTableDataSource<any>(
  //             this.collectors
  //           );
  //           this.dataSource.paginator = this.paginator;
  //           this.dataSource.sort = this.sort;
  //         } else {
  //           this.isLoading = false;
  //         }
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  // }

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

  selectActionSubjects(){
    console.log("Action Subjects ", this.selection.selected);

    this.dialogRef.close({ event: "close", data: this.selection.selected });
  }

  onSelectRow(data: any) {
    this.dialogRef.close({ event: "close", data: data });
  }

  onNoClick(){
    this.dialogRef.close();
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllUsers(){
    this.userService.fetchAllActiveAccounts().pipe(takeUntil(this.subject)).subscribe(res => {
      let users = res.userData;

      users.forEach(user => {
        console.log(user)
        if(user.roles[0].name == "ROLE_COLLECTOR"){
          this.collectors.push(user);
        }
      })
    }, err => {
      console.log(err)
    })
  }

}
