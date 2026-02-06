import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TransporterService } from '../transporter.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.sass']
})
export class ManageComponent implements OnInit {
  dataSource: any
  displayedColumns = ['id', 'username', 'active', 'createdOn', 'route', 'actions']
  loading: boolean = false
  data: boolean = false

  @ViewChild(MatPaginator, {static: true}) paginator : MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private service: TransporterService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.get()
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value
    this.dataSource.filter = value.trim().toLowerCase()
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  refresh() {
    this.get()
  }
  create() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = '60%'
    dialogConfig.data = {
      data: ""
    }
    this.dialog.open(AddDialogComponent, dialogConfig)
  }
  get() {
    this.loading = true
    this.service.getTransporters().subscribe({
      next: (res) =>  {
        this.loading = false;
        console.log("data", res)
        if (res.entity.length > 0) {
          this.data = true
          this.dataSource = new MatTableDataSource(res.entity)
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        } else {
          this.data = false
          this.dataSource = new MatTableDataSource(null)
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        }
      },
      error: (error) => {
        console.log("caught error", error)
      },
      complete: () => {}
    })
  }
  edit(user: any) {}

}
