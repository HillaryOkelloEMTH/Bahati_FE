import { SelectionModel } from "@angular/cdk/collections";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { takeUntil } from "rxjs";
import { UserService } from "src/app/data/services/user.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { Account } from "../../data/types/account";
import { AccountDetailsComponent } from "../account-details/account-details.component";
import { RestoreAccountComponent } from "../restore-account/restore-account.component";

@Component({
  selector: "app-deleted-accounts",
  templateUrl: "./deleted-accounts.component.html",
  styleUrls: ["./deleted-accounts.component.sass"],
})
export class DeletedAccountsComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "username",
    "firstname",
    "lastname",
    "email",
    "status",
    "phonenumber",
    "viewDetails",
    "actions",
  ];

  deletedAccounts: Account[] = [];
  dataSource!: MatTableDataSource<Account>;
  selection = new SelectionModel<Account>(true, []);
  index: number;
  id: number;
  isLoading = true;

  constructor(
    // private accountService: AccountService,
    private userService: UserService,
    public dialog: MatDialog
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
    this.getDeletedAccounts();
  }

  refresh() {
    this.getDeletedAccounts();
  }

  getDeletedAccounts() {
    this.userService.fetchAllDeletedUserAccounts()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.deletedAccounts = res.userData;

          if (this.deletedAccounts.length > 0) {
            this.isLoading = false;

            this.dataSource = new MatTableDataSource<Account>(
              this.deletedAccounts
            );
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        
        },
        (err) => {
          console.log(err);
        }
      );
  }

  detailsCall(account) {
    this.dialog.open(AccountDetailsComponent, {
      data: {
        account: account,
        action: "details",
      },
      width: "800px",
    });
  }

  restoreUserAccountCall(account) {
   const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      account,
    };
    const dialogRef =  this.dialog.open(RestoreAccountComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(res => {
      this.getDeletedAccounts()
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onContextMenu(event: MouseEvent, item: Account) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}
