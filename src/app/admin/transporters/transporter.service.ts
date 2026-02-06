import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransporterService {

  constructor(private http: HttpClient) { }

  getTransporters(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/transporter/all`);
  }

  addTransporter(routeId: any, username: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/transporter/${routeId}/${username}`)
  }
}
