import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserDetails(userId): Observable<any>{
    const getUserDetailsUrl = `${environment.apiUrl}/admin/api/v1/users/${userId}`;

    return this.http.get<any>(getUserDetailsUrl)
  }

  fetchAllActiveAccounts(): Observable<any>{
    const fetchAllActiveAccountsUrl = `${environment.apiUrl}/admin/api/v1/users/active-accounts`;

    return this.http.get<any>(fetchAllActiveAccountsUrl)
  }

  fetchAllUserAccounts(): Observable<any>{
    const fetchAllUserAccountsUrl = `${environment.apiUrl}/admin/api/v1/users/all-accounts`;

    return this.http.get<any>(fetchAllUserAccountsUrl)
  }
  getAllCollectors(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/collections/analytics/collectors`);
  }

  createUserAccounts(user): Observable<any>{
    const createUserAccountsUrl = `${environment.apiUrl}/admin/api/v1/users/create-user`;

    return this.http.post<any>(createUserAccountsUrl, user)
  }

  deleteUserAccount(userId): Observable<any>{
    const deleteUserAccountUrl = `${environment.apiUrl}/admin/api/v1/users/delete-user/${userId}`;

    return this.http.put<any>(deleteUserAccountUrl, {})
  }

  fetchAllDeletedUserAccounts(): Observable<any>{
    const fetchAllDeletedUserAccountsUrl = `${environment.apiUrl}/admin/api/v1/users/deleted-accounts`;

    return this.http.get<any>(fetchAllDeletedUserAccountsUrl)
  }

  lockUserAccount(userId): Observable<any>{
    const lockUserAccountUrl = `${environment.apiUrl}/admin/api/v1/users/lock-user/${userId}`;

    return this.http.put<any>(lockUserAccountUrl, {})
  }

  fetchAllLockedUserAccounts(): Observable<any>{
    const fetchAllLockedUserAccountsUrl = `${environment.apiUrl}/admin/api/v1/users/locked-accounts`;

    return this.http.get<any>(fetchAllLockedUserAccountsUrl, {})
  }

  restoreDeletedUserAccount(userId): Observable<any>{
    const restoreDeletedUserAccountUrl = `${environment.apiUrl}/admin/api/v1/users/restore-user/${userId}`;

    return this.http.put<any>(restoreDeletedUserAccountUrl, {})
  }

  unlockUserAccount(userId): Observable<any>{
    const unlockUserAccountUrl = `${environment.apiUrl}/admin/api/v1/users/unlock-user/${userId}`;

    return this.http.put<any>(unlockUserAccountUrl, {})
  }

  updateUserPassword(passwordDetails): Observable<any>{
    const updateUserPasswordUrl = `${environment.apiUrl}/admin/api/v1/users/update-user-password`;

    return this.http.put<any>(updateUserPasswordUrl, passwordDetails)
  }

  updateUserRole(roleDetails): Observable<any>{
    const updateUserRoleUrl = `${environment.apiUrl}/admin/api/v1/users/update-user-role`;

    return this.http.put<any>(updateUserRoleUrl, roleDetails)
  }

  updateUser(userId, user): Observable<any>{
    const updateUserUrl = `${environment.apiUrl}/admin/api/v1/users/update-user/${userId}`;

    return this.http.put<any>(updateUserUrl, user)
  }
}
