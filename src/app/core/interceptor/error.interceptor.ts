import { AuthService } from "../service/auth.service";
import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry, switchMap } from "rxjs/operators";
import { Router } from "@angular/router";
import { TokenStorageService } from "../service/token-storage.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService, private router: Router, private tokenStorage: TokenStorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          // Refresh token if the status code is 401
          return this.authenticationService.refreshToken().pipe(
            switchMap((res: any) => {
              // retrying request.
              console.log("generated token is "+res)
              if (res.statusCode === 200) {
                const token = res.entity
                this.tokenStorage.saveToken(token, this.tokenStorage.getRefreshToken())

                const clonedReq = request.clone({
                headers: request.headers.set('Authorization', `Bearer ${token}`)})
                return next.handle(clonedReq)
              } else {
                this.authenticationService.signout();
                this.router.navigate(['/authentication/signin']);
                return throwError(() => new Error('Unable to refresh token'));
              }
            }),
              catchError((refreshErr) => {
                console.error('Refresh token error:', refreshErr);
                  this.authenticationService.signout();
                  this.router.navigate(['/authentication/signin']);
                return throwError(() => refreshErr);
              })
          )
        }

        const error = err.error.message || err.statusText;
        return throwError(() => new Error(error));
      })
    );
  }
}
