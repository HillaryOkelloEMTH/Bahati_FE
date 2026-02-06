import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { UserService } from "src/app/data/services/user.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { ActiveAccountsComponent } from "../active-accounts/active-accounts.component";
import { RolesLookupComponent } from "../dialogs/roles-lookup/roles-lookup.component";

@Component({
  selector: "app-modify-account",
  templateUrl: "./modify-account.component.html",
  styleUrls: ["./modify-account.component.sass"],
})
export class ModifyAccountComponent extends BaseComponent implements OnInit {
  user: any;
  userId: any;
  loading: boolean;
  accountForm: FormGroup;

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ActiveAccountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService,
    private snackbar: SnackbarService,
    private router: Router
  ) {
    super();

    this.user = data.account;

    this.userId = this.user.id;
  }

  ngOnInit(): void {
    console.log("User Data", this.data);

    this.updateAccountForm();
    // this.getRoles();
  }

  updateAccountForm() {
    this.accountForm = this.fb.group({
      roleId: ["", [Validators.required]],
      username: [this.user.username, [Validators.required]]
    });
  }

  updateAccount() {
    this.loading = true;

    this.userService
      .updateUserRole(this.accountForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          if (res.statusCode == 200 || res.statusCode == 201) {
            this.snackbar.showNotification(res.message, "snackbar-success");

            this.dialogRef.close();
          } else {
            this.snackbar.showNotification(res.message, "snackbar-danger");

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

  roleLookup(){
    const dialogRef = this.dialog.open(RolesLookupComponent, {
      width: "500px",
      data: {
        action: "Meeting Categories Lookup",
      },
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        console.log("Result ", result);
        this.accountForm.patchValue({
          roleId: result.data.id,
        });
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
