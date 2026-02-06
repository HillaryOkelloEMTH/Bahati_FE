import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { UserService } from "src/app/data/services/user.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { AccountService } from "../../data/services/account.service";
import { Account } from "../../data/types/account";
import { ActiveAccountsComponent } from "../active-accounts/active-accounts.component";

@Component({
  selector: "app-lock-account",
  templateUrl: "./lock-account.component.html",
  styleUrls: ["./lock-account.component.sass"],
})
export class LockAccountComponent extends BaseComponent implements OnInit {
  account: Account;
  userId: number;
  loading: boolean;

  constructor(
    public dialogRef: MatDialogRef<ActiveAccountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private userService: UserService
    // private accountService: AccountService
  ) {
    super();
  }

  ngOnInit(): void {
    this.account = this.data.account;

    this.userId = this.data.account.id;
  }

  confirmLock() {
    this.loading = true;
    this.userService
      .lockUserAccount(this.userId)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          if(res.statusCode == 200 || res.statusCode == 201){
            this.snackbar.showNotification(res.message, "snackbar-success");

             this.dialogRef.close();
          }else {
            this.snackbar.showNotification(res.message, "snackbar-danger")

            this.loading = false;
          }
        },
        (err) => {
          this.snackbar.showNotification(err.error.error, "snackbar-danger");
          console.log(err);
          this.loading = false;
        }
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
