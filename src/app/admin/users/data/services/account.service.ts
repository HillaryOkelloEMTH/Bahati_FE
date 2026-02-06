import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";

import { Account } from "../types/account";
import { Log } from "../types/log";
import { Role } from "../types/role";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  constructor(private http: HttpClient) { }

  //http://52.15.152.26:1905/urassauth/

  public listActiveAccounts(): Observable<Account[]> {
    const activeAccountsUrl = `${environment.apiUrl}/soa/users/view`;

    return this.http.get<Account[]>(activeAccountsUrl);
  }

  public fetchPendingAccounts(): Observable<any[]> {
    const fetchPendingAccountsUrl = `${environment.apiUrl}/soa/users/view/pending`;

    return this.http.get<any[]>(fetchPendingAccountsUrl);
  }

  public fetchApprovedAccounts(): Observable<any[]> {
    const fetchApprovedAccountsUrl = `${environment.apiUrl}/soa/users/view/approved`;

    return this.http.get<any[]>(fetchApprovedAccountsUrl);
  }

  public fetchRejectedAccounts(): Observable<any[]> {
    const fetchRejectedAccountsUrl = `${environment.apiUrl}/soa/users/view/rejected`;

    return this.http.get<any[]>(fetchRejectedAccountsUrl);
  }

  public generateAccountReportsPerStatus(params): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: params,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };

    const generateAccountReportsPerStatusUrl = `${environment.apiUrl}/api/v1/reports/users/user/status`;

    return this.http
      .get(generateAccountReportsPerStatusUrl, requestOptions)
      .pipe(
        map((response) => {
          return {
            filename: `System Users Report`,
            data: new Blob([response], { type: "application/pdf" }),
          };
        })
      );
  }

  public verifyAccount(params): Observable<any> {
    const verifyAccountUrl = `${environment.apiUrl}/soa/users/verify`;

    return this.http.get<any>(verifyAccountUrl, { params });
  }

  public addUser(account: any): Observable<{ message: string }> {
    const registerUrl = `${environment.apiUrl}/soa/users/signup`;

    return this.http.post<{ message: string }>(registerUrl, account);
  }

  public getRoles(): Observable<Role[]> {
    const rolesUrl = `${environment.apiUrl}/soa/roles/view`;

    return this.http.get<Role[]>(rolesUrl);
  }

  public updateRole(roleDetails): Observable<{ message: string }> {
    const updateRoleUrl = `${environment.apiUrl}/soa/users/updaterole`;

    return this.http.put<{ message: string }>(updateRoleUrl, roleDetails);
  }

  public activateUserAccount(userDetails): Observable<{ message: string }> {
    const activateUserAccountUrl = `${environment.apiUrl}/soa/users/activateaccount`;

    return this.http.put<{ message: string }>(
      activateUserAccountUrl,
      userDetails
    );
  }

  deactivateUserAccount(userDetails): Observable<{ message: string }> {
    const deactivateUserAccountUrl = `${environment.apiUrl}/soa/users/activateaccount`;

    return this.http.put<{ message: string }>(
      deactivateUserAccountUrl,
      userDetails
    );
  }

  public lockUserAccount(userDetails): Observable<{ message: string }> {
    const lockUserUrl = `${environment.apiUrl}/soa/users/lockaccount`;

    return this.http.put<{ message: string }>(lockUserUrl, userDetails);
  }

  public unlockUserAccount(userDetails): Observable<{ message: string }> {
    const lockUserUrl = `${environment.apiUrl}/soa/users/lockaccount`;

    return this.http.put<{ message: string }>(lockUserUrl, userDetails);
  }

  public deleteUser(username): Observable<{ message: string }> {
    const deleteUrl = `${environment.apiUrl}/soa/users/deleteaccount`;

    return this.http.put<{ message: string }>(deleteUrl, username);
  }

  public restoreDeletedAccount(username): Observable<{ message: string }> {
    const restoreDeletedaccountUrl = `${environment.apiUrl}/soa/users/restoreaccount`;

    return this.http.put<{ message: string }>(
      restoreDeletedaccountUrl,
      username
    );
  }

  public getUserById(userId): Observable<Account> {
    const usersUrl = `${environment.apiUrl}/soa/users/find/${userId}`;

    return this.http.get<Account>(usersUrl);
  }
  public getDeletedAccounts(): Observable<Account[]> {
    const deletedAccountsUrl = `${environment.apiUrl}/soa/users/deletedaccounts`;

    return this.http.get<Account[]>(deletedAccountsUrl);
  }

  public getLockedAccounts(): Observable<Account[]> {
    const lockedAccountsUrl = `${environment.apiUrl}/soa/users/lockedaccounts`;

    return this.http.get<Account[]>(lockedAccountsUrl);
  }

  public getInactiveAccounts(): Observable<Account[]> {
    const inactiveAccountsUrl = `${environment.apiUrl}/soa/users/inactiveaccounts`;

    return this.http.get<Account[]>(inactiveAccountsUrl);
  }

  public logoutUser(username): Observable<{ message: string }> {
    const logoutUrl = `${environment.apiUrl}/soa/auth/logout`;

    return this.http.post<{ message: string }>(logoutUrl, username);
  }

  public updateDepartment(userDetails): Observable<{ message: string }> {
    const updateDepartmentsUrl = `${environment.apiUrl}/soa/users/updatedepartment`;

    return this.http.put<{ message: string }>(
      updateDepartmentsUrl,
      userDetails
    );
  }

  public updateUserPassword(passwordDetails): Observable<{ message: string }> {
    const updateUserPasswordUrl = `${environment.apiUrl}/soa/users/updatepassword`;

    return this.http.put<{ message: string }>(
      updateUserPasswordUrl,
      passwordDetails
    );
  }

  public updateFirstTimePassword(
    passwordDetails
  ): Observable<{ message: string }> {
    const updateUserPasswordUrl = `${environment.apiUrl}/ebm/auth/resetpassword`;

    return this.http.put<{ message: string }>(
      updateUserPasswordUrl,
      passwordDetails
    );
  }

  public updateUser(user): Observable<{ message: string }> {
    const updateUserUrl = `${environment.apiUrl}/soa/users/update`;

    return this.http.put<{ message: string }>(updateUserUrl, user);
  }

  public getAccountLogs(username): Observable<Log[]> {
    const accountLogsUrl = `${environment.apiUrl}/soa/audit/alllogs/${username}`;

    return this.http.get<Log[]>(accountLogsUrl);
  }

  public getDailyAccountLogs(uname, stime): Observable<Log[]> {
    const dailyAccountLogsUrl = `${environment.apiUrl}/soa/audit/todaylogs`;

    return this.http.get<Log[]>(dailyAccountLogsUrl, {
      params: { uname, stime },
    });
  }

  addLimit(limitConfig: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/emtbulksmsapi/ebs/smslimits/add`,
      limitConfig
    );
  }

  public getLimitByUsername(userName): Observable<any> {
    const usersUrl = `${environment.apiUrl}/ebs/smslimits/list/${userName}`;

    return this.http.get<any>(usersUrl);
  }

  addEmailLimit(limitConfig: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/soa/limits/add`, limitConfig);
  }

  public updateUserDepartment(user): Observable<{ message: string }> {
    const updateUserUrl = `${environment.apiUrl}/soa/users/updatedepartment`;

    return this.http.put<{ message: string }>(updateUserUrl, user);
  }

  getDepartments(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/soa/departments/view`);
  }


  resendEmail(userId: any) {
    const params = new HttpParams()
      .set('userId', userId);

    const resendUrl = `${environment.apiUrl}/soa/users/resend-email`;

    return this.http.post<any>(resendUrl, null, { params });
  }


}
