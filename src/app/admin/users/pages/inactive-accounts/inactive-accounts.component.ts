import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'angular-feather/icons';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { AccountService } from '../../data/services/account.service';
import { Account } from '../../data/types/account';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { ActivateAccountComponent } from '../activate-account/activate-account.component';

@Component({
  selector: 'app-inactive-accounts',
  templateUrl: './inactive-accounts.component.html',
  styleUrls: ['./inactive-accounts.component.sass']
})
export class InactiveAccountsComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "username",
    "firstname",
    "lastname",
    "email",
    "status",
    "phonenumber",
    "viewDetails",
    "actions"
  ];
  inActiveAccounts: Account[] = [];
  dataSource!: MatTableDataSource<Account>;
  selection = new SelectionModel<Account>(true, []);
  index: number;
  id: number;
  isLoading = true;

  constructor(public accountService: AccountService, public dialog: MatDialog) {
    super();
   }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.getInActiveAccounts()
  }

  refresh(){
    this.getInActiveAccounts()
  }

  getInActiveAccounts() {
    this.accountService
      .getInactiveAccounts()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.inActiveAccounts = res;
          console.log(this.inActiveAccounts);

          if(this.inActiveAccounts.length > 0){
            this.isLoading = false;

            this.dataSource = new MatTableDataSource<Account>(this.inActiveAccounts);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  activateUserCall(user){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      user
    }
    const dialogRef = this.dialog.open(ActivateAccountComponent, dialogConfig)

    dialogRef.afterClosed().subscribe((result) => {
      this.getInActiveAccounts();
    });
  
  }

  detailsCall(account){
    this.dialog.open(AccountDetailsComponent, {
      data: {
        account: account,
        action: 'details',
      },
      //height: "70%",
      width: "500px",
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // context menu
  onContextMenu(event: MouseEvent, item: Account) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }

}
