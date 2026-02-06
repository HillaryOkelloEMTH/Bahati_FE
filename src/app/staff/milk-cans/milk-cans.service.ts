import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MilkCansService {

  constructor(private http: HttpClient) { }

  getAllCans(): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/can/fetch`;
    return this.http.get<any>(url)
  }

  updateCan(data): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/can/update`;
    return this.http.put<any>(url, data)
  }

  createCan(data): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/can/add`;
    return this.http.post<any>(url, data)
  }

  deleteCan(id: any): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/can/${id}`;
    return this.http.delete<any>(url, {})
  }
}
