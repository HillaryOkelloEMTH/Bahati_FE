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
export class CountiesService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }
  url = `${environment.apiUrl}/api/v1/county/`;

  public getCounties(): Observable<any> {
    return this.http.get<any>(this.url + 'get');
  }

  addNewCounty(data: any): Observable<any> {
    return this.http.post(this.url + 'add', data, httpOptions);
  }

  updateCounty(data: any): Observable<any> {
    return this.http.put(this.url + 'update', data, httpOptions);
  }

  deleteCounty(id: any): Observable<any> {
    return this.http.delete(this.url + `delete/` + id, httpOptions);
  }
}
