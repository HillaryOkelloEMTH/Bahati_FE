import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PickupService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }
  url = `${environment.apiUrl}/api/v1/pickuplocations/`;

  public getLocations(): Observable<any> {
    return this.http.get<any>(this.url + 'fetch');
  }
  public getRoutes(): Observable<any> {
    const param = new HttpParams().set("subCountyFk", 0)
    return this.http.get<any>(`${environment.apiUrl}/api/v1/routes/get`, {...httpOptions, params: param} );
  }

  public getLocationById(id:any): Observable<any> {
    return this.http.get<any>(this.url + id);
  }

  addNewLocation(data: any): Observable<any> {
    return this.http.post(this.url + 'add', data, httpOptions);
  }

  updateLocation(data: any): Observable<any> {
    return this.http.put(this.url + 'update', data, httpOptions);
  }

  deleteLocation(id: any): Observable<any> {
    return this.http.delete(this.url + id, httpOptions);
  }
}
