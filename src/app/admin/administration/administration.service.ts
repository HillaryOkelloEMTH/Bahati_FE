import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  constructor(private http: HttpClient) { }

  bulkDeliveryUpload(data: any, username: any, mobile: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/v1/collections/add/bulk?username=${username}&mobile=${mobile}`, data);
  }

  getTodaysUploads(date: any):  Observable<any>{
    return this.http.get(`${environment.apiUrl}/api/v1/collections/bulk/by-date/${date}/${date}`);
  }

  filterBulkUploads(from: any, to: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/collections/bulk/by-date/${from}/${to}`);
  }
}
