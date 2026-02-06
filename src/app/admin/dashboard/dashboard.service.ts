import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  deptsUrl = `${environment.apiUrl}/api/v1/department/`;
  usersUrl = `${environment.apiUrl}/api/action-items/user/analytics/`;


  public getDepartmentsPerSubsidiary(): Observable<any> {
    return this.http.get(this.deptsUrl + 'departments/subsidiary');
  }

  public getUsersPerDepartment(): Observable<any> {
    return this.http.get(this.usersUrl + 'user/department');
  }

  // public getDashboardWigetsAnalytics(): Observable<any> {
  //   return this.http.get(this.usersUrl + 'counts');
  // }

  public getUsersPerRole(): Observable<any> {
    return this.http.get(this.usersUrl + 'users/role');
  }

  public getMeetingsPerCategory(): Observable<any> {
    return this.http.get(this.usersUrl + 'meetings/meetingcategory');
  }
}
