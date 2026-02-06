import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { UserService } from "src/app/data/services/user.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { Role } from "../../data/types/role";
import { RolesLookupComponent } from "../dialogs/roles-lookup/roles-lookup.component";

@Component({
  selector: "app-add-account",
  templateUrl: "./add-account.component.html",
  styleUrls: ["./add-account.component.sass"],
})
export class AddAccountComponent extends BaseComponent implements OnInit {
  userForm: FormGroup;
  userLimit: FormGroup;
  roles: Role[] = [];
  departments: any[] = [
    { name: "Infrastructure" },
    { name: "Finance" },
    { name: "Security" },
  ];

  loading = false;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackbar: SnackbarService
  ) {
    super();
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ["", [Validators.required]],
      first_name: [""],
      last_name: [""],
      mobile: ["", [Validators.required]],
      role: [""],
      user_name: ["", [Validators.required]],
    });

  }

  onCancel() {
    this.router.navigate([`/admin/user-accounts/all`]);
  }

  roleLookup() {
    const dialogRef = this.dialog.open(RolesLookupComponent, {
      width: "800px",
      data: {
        action: "Meeting Categories Lookup",
      },
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        console.log("Result ", result);
        this.userForm.patchValue({
          role: result.data.id,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addUser() {
    this.loading = true;

    this.userService.createUserAccounts(this.userForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.loading = false;

          console.log(res);

          if(res.statusCode == 200 || res.statusCode == 201){
            this.snackbar.showNotification(res.message, "snackbar-success");

             this.router.navigate([`/admin/user-accounts/all`]);
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
}
