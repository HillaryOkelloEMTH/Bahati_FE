import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/service/auth.service";
import { Role } from "src/app/core/models/role";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { NotificationService } from "src/app/data/services/notification.service";
import { SnackbarService } from "src/app/shared/snackbar.service";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  authForm: FormGroup;
  submitted = false;
  loading = false;
  error = "";
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private notificationService: NotificationService,
    private snackbar: SnackbarService
  ) {
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }
  get f() {
    return this.authForm.controls;
  }

  onSubmit() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)


    this.submitted = true;
    this.loading = true;
    this.error = "";
    if (this.authForm.invalid) {
      this.error = "Username and Password not valid !";
      return;
    } else {
      this.authService.login(this.authForm.value).subscribe(response => {
        const res = response.entity
        this.tokenStorage.saveToken(res.token, res.refreshToken);
        console.log("user data", res)
        this.tokenStorage.saveUser(res);
        const role = res.roles[0].name;
        if (role == Role.Admin) {
          this.router.navigate(['/admin/dashboard'])
        } else if (role == Role.Staff) {
          this.router.navigate(['/staff/dashboard'])
        } else if (role == Role.Collector) {
          this.router.navigate(['sales/dashboard'])
        } else {
          this.error = "Invalid Login";
        }

        this.submitted = false;
        this.loading = false;
        this.snackbar.showNotification('snackbar-success', "Login successful. Welcome "+res.username+"!");

      }, err => {
        this.error = err;
        this.submitted = false;
        this.loading = false;

        this.notificationService.alertWarning(this.error)
      })
    }
  }
}
