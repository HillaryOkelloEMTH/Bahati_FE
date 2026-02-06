import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { privileges } from '../types/privileges';

@Injectable({
  providedIn: 'root'
})
export class AccessControlService {
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  //private myPrivileges = privileges;
   myPrivileges = localStorage.getItem("userPrivileges");

  constructor(private _snackBar: MatSnackBar) { }

  hasPrivilege(requiredPrivileges: string[]): boolean {
    let hasAccess = false;
    requiredPrivileges.forEach(privilege => {
      if (this.myPrivileges.indexOf(privilege) !== -1) {
        hasAccess = true;
      }
    });

    if (!hasAccess) {
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
    }

    return hasAccess;
  }



  hasThisPrivilege(requiredPrivileges: string[]): boolean {
    let hasAccess = false;
    requiredPrivileges.forEach(privilege => {
      if (this.myPrivileges.indexOf(privilege) !== -1) {
        hasAccess = true;
      }
    });

    return hasAccess;
  }
}






// export class AccessControlService {

 

//   privileges = ['Dashboar', 'View Expense SubCategories', 'View Users'];

//   constructor( private _snackBar: MatSnackBar,) { }

//   hasAccess(requiredPrivileges: string[]): boolean {
//     let hasAccess = false;
//     requiredPrivileges.forEach(privilege => {
//       if (this.privileges.indexOf(privilege) !== -1) {
//         hasAccess = true;
//       }
//     });
//     return hasAccess;
//   }
// }


// this._snackBar.open(
  
//   "\n You do not have Access rights to this component. Consult System Administrator!! ",
//   "X",
//   {
//     horizontalPosition: this.horizontalPosition,
//     verticalPosition: this.verticalPosition,
//     duration: 20000,
//     panelClass: ["snackbar-danger", "snackbar-success"],
//   }
// );





// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class PrivilegeGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     const requiredPrivilege = route.data.requiredPrivilege;

//     if (this.authService.hasPrivilege(requiredPrivilege)) {
//       return true;
//     }

//     this.router.navigate(['/']);
//     return false;
//   }
// }
