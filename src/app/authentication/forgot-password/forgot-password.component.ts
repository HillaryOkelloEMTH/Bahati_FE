import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { NotificationService } from "src/app/data/services/notification.service";
import { SnackbarService } from "src/app/shared/snackbar.service";
import { AuthService } from "src/app/data/services/auth.service";
@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent extends BaseComponent implements OnInit {
  authForm: FormGroup;
  submitted = false;
  returnUrl: string;
  usernameSelected: boolean = false;
  mobileSelected: boolean = false;
  emailSelected: boolean = true;

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
    private authService: AuthService,
    private snackbar: SnackbarService,
    private notificationAPI: NotificationService
  ) {
    super();
  }
  ngOnInit() {
    this.authForm = this.formBuilder.group({
    email: ["", [Validators.email]],
      mobile: ["", [Validators.pattern('^[0-9]{10}$')]],
      username: [""],
    });
    
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }
  get f() {
    return this.authForm.controls;
  }

  selectOption(event) {
    console.log(event.value);
    if (event.value == "Email") {
      this.emailSelected = true;
      this.mobileSelected = false;
      this.usernameSelected = false;
      this.authForm.reset();
    } else if (event.value == "Username") {
      this.emailSelected = false;
      this.mobileSelected = false;
      this.usernameSelected = true;
      this.authForm.reset();
    } else if (event.value == "Mobile") {
      this.emailSelected = false;
      this.mobileSelected = true;
      this.usernameSelected = false;
      this.authForm.reset();
    } else {
      this.emailSelected = false;
      this.mobileSelected = false;
      this.usernameSelected = false;
    }
  }

  onSubmit() {
  

    if(this.emailSelected){
      if(this.authForm.value.email == '' || this.authForm.value.email == null || this.authForm.value.email == undefined){
        this.snackbar.showNotification("snackbar-danger", "Please provide a valid email !")
      }else {
        this.submitted = true;
        this.loading = true;
        this.error = "";

        this.authService.forgotPasswordDetails(this.authForm.value).subscribe(res => {
          if(res.statusCode == 200 || res.statusCode == 201){
            this.snackbar.showNotification("snackbar-success", res.message);

           this.router.navigate(['/authentication/signin'])
          }else {
            this.snackbar.showNotification("snackbar-danger", res.message)

            this.loading = false;
          }
        }, err => {
          this.snackbar.showNotification("snackbar-danger", err.error.error);
          console.log(err);
          this.loading = false;
        })
      }
    }else if(this.mobileSelected){
      if(this.authForm.value.mobile == '' || this.authForm.value.mobile == null || this.authForm.value.mobile == undefined){
        this.snackbar.showNotification("snackbar-danger", "Please provide a valid mobile number !")
      }else {
        this.submitted = true;
        this.loading = true;
        this.error = "";

        this.authService.forgotPasswordDetails(this.authForm.value).subscribe(res => {
          if(res.statusCode == 200 || res.statusCode == 201){
            this.snackbar.showNotification("snackbar-success", res.message);

           this.router.navigate(['/authentication/signin'])
          }else {
            this.snackbar.showNotification("snackbar-danger", res.message)

            this.loading = false;
          }
        }, err => {
          this.snackbar.showNotification("snackbar-danger", err.error.error);
          console.log(err);
          this.loading = false;
        })
      }
    }else if(this.usernameSelected){
      if(this.authForm.value.username == '' || this.authForm.value.username == null || this.authForm.value.username == undefined){
        this.snackbar.showNotification("snackbar-danger", "Please provide a username !")
      }else {
        this.submitted = true;
        this.loading = true;
        this.error = "";

        this.authService.forgotPasswordDetails(this.authForm.value).subscribe(res => {
          if(res.statusCode == 200 || res.statusCode == 201){
            this.snackbar.showNotification("snackbar-success", res.message);

           this.router.navigate(['/authentication/signin'])
          }else {
            this.snackbar.showNotification("snackbar-danger", res.message)

            this.loading = false;
          }
        }, err => {
          this.snackbar.showNotification("snackbar-danger", err.error.error);
          console.log(err);
          this.loading = false;
        })
      }
    }else {
      this.snackbar.showNotification("snackbar-danger", "Invalid email, mobile or username !")
    }
  }
}
