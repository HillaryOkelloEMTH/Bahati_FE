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
export class DepartmentsService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  deptsUrl = `${environment.apiUrl}/api/v1/department/`;


  public getDepartments(): Observable<any> {
    return this.http.get(this.deptsUrl + 'get');
  }

  addNewDepartment(data: any): Observable<any> {
    return this.http.post(this.deptsUrl + 'add', data, httpOptions);
  }

  deleteDeparment(id: any): Observable<any> {
    return this.http.delete(this.deptsUrl + `delete/` + id, httpOptions);
  }

  updateDeparment(data: any): Observable<any> {
    return this.http.put(this.deptsUrl + `update`, data, httpOptions);
  }
}
