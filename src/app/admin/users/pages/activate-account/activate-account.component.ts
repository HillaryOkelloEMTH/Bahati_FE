import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base/base.component';

import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AccountService } from '../../data/services/account.service';
import { Account } from '../../data/types/account';
import { InactiveAccountsComponent } from '../inactive-accounts/inactive-accounts.component';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.sass']
})
export class ActivateAccountComponent extends BaseComponent implements OnInit {
 account: Account
  userId: number;

  constructor(public dialogRef: MatDialogRef<InactiveAccountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private accountService: AccountService) {
      super();
     }

 ngOnInit(): void {
    this.account = this.data.user;

    this.userId = this.data.user.id;
  }

  confirmActivateAccount() {
    console.log({ username: this.account.username, status: true });
    this.accountService
      .activateUserAccount({ username: this.account.username, status: true })
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification(res.message, "snackbar-success");
          this.dialogRef.close();
         // console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  confirmRestoreAccount() {
    console.log({ username: this.account.username })
    this.accountService
      .restoreDeletedAccount({ username: this.account.username })
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification(res.message, "snackbar-success");
          this.dialogRef.close();
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
