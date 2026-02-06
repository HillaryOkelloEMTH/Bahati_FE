import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AccessControlService } from './_AccessControlService.service';


@Injectable({
  providedIn: 'root'
})
export class RoutePrivilegeGuard implements CanActivate {

  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  
  constructor(private authService: AccessControlService, private router: Router, private _snackBar: MatSnackBar) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredPrivilege = route.data.requiredPrivilege;

    if (this.authService.hasPrivilege(requiredPrivilege)) {
      return true;
    }

    // this.router.navigate(['/']);

    this._snackBar.open(
      "You do not have the necessary permissions to access this resource!",
      "X",
      {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 20000,
        panelClass: ["snackbar-danger"]
      }
    );
    
    // throw new Error("User does not have access to this route.");

    return false;
  }
}
