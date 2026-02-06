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
export class RoutesService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  routesUrl = `${environment.API}/api/v1/routes/`;

  public getRoutes(subcountyFk: number): Observable<any> {
    return this.http.get<any>(this.routesUrl+`get?subCountyFk=${subcountyFk}`);
  }

  addNewRoute(data: any): Observable<any> {
    return this.http.post(this.routesUrl + 'add', data, httpOptions);
  }

  updateRoute(data: any): Observable<any> {
    return this.http.put(this.routesUrl + 'update', data, httpOptions);
  }

  deleteRoute(id: any): Observable<any> {
    return this.http.delete(this.routesUrl + `delete/` + id, httpOptions);
  }
}
