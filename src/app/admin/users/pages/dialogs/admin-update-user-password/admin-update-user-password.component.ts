import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { UserService } from 'src/app/data/services/user.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ActiveAccountsComponent } from '../../active-accounts/active-accounts.component';

@Component({
  selector: 'app-admin-update-user-password',
  templateUrl: './admin-update-user-password.component.html',
  styleUrls: ['./admin-update-user-password.component.sass']
})
export class AdminUpdateUserPasswordComponent extends BaseComponent implements OnInit {
  user: any
  userId: any;
  loading: boolean;
  accountForm: FormGroup;
  
  constructor(
    public dialogRef: MatDialogRef<ActiveAccountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    // private accountService: AccountService,
    private userService: UserService,
    private snackbar: SnackbarService,
    private router: Router
  ) {
    super();

    this.user = data.user;

    this.userId = this.user.id;
  }

  ngOnInit(): void {
    console.log("User Data", this.data)
    console.log(this.data.user.roles[0].name);
    this.updateAccountForm();
    // this.getRoles();
    
  }

  

  updateAccountForm() {
    this.accountForm = this.fb.group({
      username: [this.user.username, [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(4)]],
    });
  }

  updateAccount() {
    this.loading = true;

    this.userService
      .updateUserPassword(this.accountForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          // this.updateDepartment();

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
 

  onNoClick() {
    this.dialogRef.close();
  }

}
