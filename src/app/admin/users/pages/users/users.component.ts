import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { UserService } from 'src/app/data/services/user.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { DeleteAccountComponent } from '../delete-account/delete-account.component';
import { AdminUpdateUserPasswordComponent } from '../dialogs/admin-update-user-password/admin-update-user-password.component';
import { LockAccountComponent } from '../lock-account/lock-account.component';
import { ModifyAccountComponent } from '../modify-account/modify-account.component';
import { RestoreAccountComponent } from '../restore-account/restore-account.component';
import { UnlockAccountComponent } from '../unlock-account/unlock-account.component';
import { UpdateAccountComponent } from '../update-account/update-account.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "username",
    "firstname",
    "lastname",
    "phonenumber",
    "status",
    "update",
    "updatePassword",
    "actions",
  ];
  users: any[] = [];
  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  index: number;
  id: number;
  isLoading = true;

  constructor(
    // private accountService: AccountService,
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router,
    private snackbar: SnackbarService
  ) {
    super();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.getAllUsers();
  }

  refresh() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.fetchAllUserAccounts()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.users = res.userData;

          console.log("Users ", this.users)

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

  editCall(user) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      user,
    };

    const dilaogRef = this.dialog.open(UpdateAccountComponent, dialogConfig);

    dilaogRef.afterClosed().subscribe(res => {
      this.getAllUsers();
    })

    console.log(user);
  }

  updateUserpassword(user) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      user,
    };

    const dilaogRef = this.dialog.open(AdminUpdateUserPasswordComponent, dialogConfig);

    dilaogRef.afterClosed().subscribe(res => {
      this.getAllUsers();
    })

    console.log(user);
  }

  detailsCall(account) {
   const dialogRef =  this.dialog.open(AccountDetailsComponent, {
      data: {
        account: account,
        action: "details",
      },
      width: "800px",
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getAllUsers();
    })
  }

  lockAccountCall(account){
    const dialogRef = this.dialog.open(LockAccountComponent, {
      data: {
        account: account,
        action: "details",
      },
      width: "500px",
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getAllUsers();
    })
  }

  unLockAccountCall(account){
    const dialogRef = this.dialog.open(UnlockAccountComponent, {
      data: {
        account: account,
        action: "details",
      },
      width: "500px",
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getAllUsers();
    })
  }

  deleteCall(account) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      account,
    };

    const dialogRef = this.dialog.open(DeleteAccountComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(res => {
      this.getAllUsers();
    })
  }

  restoreAccount(account) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      account,
    };

    const dialogRef = this.dialog.open(RestoreAccountComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(res => {
      this.getAllUsers();
    })
  }

  updateUser(account) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {
      account,
    };

    const dialogRef = this.dialog.open(ModifyAccountComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(res => {
      this.getAllUsers();
    })
  }

  viewAccountLogs(userId) {
    this.router.navigate([`admin/user-accounts/account-logs/${userId}`]);
  }

  addNew() {
    this.router.navigate(["/admin/user-accounts/add-account"]);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // context menu
  onContextMenu(event: MouseEvent, item: any) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }

}
