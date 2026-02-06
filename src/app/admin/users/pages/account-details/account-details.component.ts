import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AccountService } from '../../data/services/account.service';
import { Account } from '../../data/types/account';
import { ActiveAccountsComponent } from '../active-accounts/active-accounts.component';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.sass']
})
export class AccountDetailsComponent extends BaseComponent implements OnInit {

  account: any;
  userId: number;
  accessRights: [] = [];

  constructor(
    public dialogRef: MatDialogRef<ActiveAccountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private accountService: AccountService,
    private snackbar: SnackbarService
  ) {
    super();
  }

  ngOnInit(): void {
    this.account = this.data.account;

    this.accessRights = this.account.roles[0].accessRights;
    console.log(this.account);
  }

  logoutUser() {
    this.accountService
      .logoutUser({username: this.account.username})
      .pipe(takeUntil(this.subject))
      .subscribe((res) => {
        this.snackbar.showNotification(res.message, "snackbar-success");
        this.dialogRef.close();
      }, err => {
        console.log(err)
      });
  }
}
