import { SelectionModel } from '@angular/cdk/collections';
import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AccountService } from '../../data/services/account.service';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { DeleteAccountComponent } from '../delete-account/delete-account.component';
import { LockAccountComponent } from '../lock-account/lock-account.component';
import { UpdateAccountComponent } from '../update-account/update-account.component';

@Component({
  selector: 'app-rejected-accounts',
  templateUrl: './rejected-accounts.component.html',
  styleUrls: ['./rejected-accounts.component.sass'],
})
export class RejectedAccountsComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'username',
    'firstname',
    'lastname',
    'department',
    'email',
    'phonenumber',
    'status',
    'actions',
  ];
  users: any[] = [];
  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  index: number;
  id: number;
  isLoading = true;

  constructor(
    private accountService: AccountService,
    public dialog: MatDialog,
    private router: Router,
    private snackbar: SnackbarService
  ) {
    super();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit(): void {
    this.getAllUsers();
  }

  refresh() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.accountService
      .fetchRejectedAccounts()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.users = res;

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
    dialogConfig.width = '500px';
    dialogConfig.data = {
      user,
    };
    this.dialog.open(UpdateAccountComponent, dialogConfig);

    console.log(user);
  }

  detailsCall(account) {
    this.dialog.open(AccountDetailsComponent, {
      data: {
        account: account,
        action: 'details',
      },
      width: '500px',
    });
  }

  lockAccountCall(account) {
    this.dialog.open(LockAccountComponent, {
      data: {
        account: account,
        action: 'details',
      },
      width: '500px',
    });
  }

  deleteCall(account) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = {
      account,
    };
    this.dialog.open(DeleteAccountComponent, dialogConfig);
  }

  generateAccountsReports() {
    const params = new HttpParams().set('status', 'Rejected');

    this.accountService
      .generateAccountReportsPerStatus(params)
      .pipe(takeUntil(this.subject))
      .subscribe((result) => {
        let url = window.URL.createObjectURL(result.data);

        // if you want to open PDF in new tab
        window.open(url);

        let a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.setAttribute('target', 'blank');
        a.href = url;
        a.download = result.filename;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();

        this.snackbar.showNotification(
          'Purchase Order generated successfully',
          'snackbar-success'
        );
      });
  }

  updateUser(userId) {
    this.router.navigate([`admin/user-accounts/modify-account/${userId}`]);
  }

  viewAccountLogs(userId) {
    this.router.navigate([`admin/user-accounts/account-logs/${userId}`]);
  }

  addNew() {
    this.router.navigate(['/admin/user-accounts/add-account']);
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
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
}
