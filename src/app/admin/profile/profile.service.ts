import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }
  url = `${environment.apiUrl}/api/v1/profile/`;

  public getProfile(): Observable<any> {
    return this.http.get<any>(this.url + 'fetch');
  }

  addNewProfile(data: any): Observable<any> {
    return this.http.post(this.url + 'create', data, httpOptions);
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put(this.url + 'update', data, httpOptions);
  }

  deleteProfile(id: any): Observable<any> {
    return this.http.delete(this.url + id, httpOptions);
  }
}
