import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { AuthService } from "src/app/data/services/auth.service";
import { NotificationService } from "src/app/data/services/notification.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.sass"],
})
export class ResetPasswordComponent extends BaseComponent implements OnInit {
  authForm: FormGroup;
  submitted = false;
  returnUrl: string;
  token: String;

  loading = false;
  error = "";
  hide = true;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = "";
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    // private authService: AuthService,
    private authService: AuthService,
    private snackbar: SnackbarService,
    private notificationAPI: NotificationService,
  ) {
    super();
  }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.subject)).subscribe(param => {
      console.log(param.token);

      this.token = param.token
    })

    this.authForm = this.formBuilder.group({
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(6)]],
      resetPasswordToken:  [this.token, [Validators.required]]
    });

    console.log(this.authForm.value);
    
  }
  get f() {
    return this.authForm.controls;
  }


  onSubmit() {
    if (this.authForm.value.password == this.authForm.value.confirmPassword) {
      console.log("Reset Password Form", this.authForm.value);



      this.authService.resetPassword(this.authForm.value).subscribe(
        (res) => {

          console.log(res)
          if (res.statusCode == 200 || res.statusCode == 201) {
            this.snackbar.showNotification("snackbar-success", res.message);

            this.router.navigate(["/authentication/signin"]);
          } else {
            this.snackbar.showNotification("snackbar-danger", res.message);

            this.loading = false;
          }
        },
        (err) => {
          this.snackbar.showNotification("snackbar-danger", err.error.error);
          console.log(err);
          this.loading = false;
        }
      );
    } else {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Passwords do not match !"
      );
    }
  }
}
