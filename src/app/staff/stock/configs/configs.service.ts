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
export class ConfigsService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  url = `${environment.API}/api/v1/product/configuration/`;
  pricesUrl = `${environment.API}/api/v1/product-prices/`;

  public getRouteConfigs(centerName: any): Observable<any> {
    return this.http.get<any>(this.url + `get/config?centerName=${centerName}`, httpOptions);
  }

  public getProductPrices(): Observable<any> {
    return this.http.get<any>(this.pricesUrl + 'all');
  }

  public getConfigsById(productId:any): Observable<any> {
    return this.http.get<any>(this.url + 'id?productconfigId='+productId);
  }

  addNewConfiguration(data: any): Observable<any> {
    return this.http.post(this.url + 'add', data, httpOptions);
  }

  addNewCenterConfig(data: any): Observable<any> {
    return this.http.post(this.url + 'add', data, httpOptions);
  }

  getAllCenterConfigs(): Observable<any> {
    return this.http.get(this.url + 'get', httpOptions);
  }

  createProductPrice(productId: any, locationId: any, sellingPrice: any, effectiveFrom: any) {
    return this.http.post(this.pricesUrl+ `create/`+`${productId}/${locationId}?sellingPrice=${sellingPrice}&effectiveFrom=${effectiveFrom}`, {}, httpOptions);
  }

  updateConfiguration(data: any, filterType: any): Observable<any> {
    return this.http.put(this.url + `update?filterType=${filterType}`, data, httpOptions);
  }

  deleteConfiguration(id: any): Observable<any> {
    return this.http.delete(this.url + `delete/` + id, httpOptions);
  }

  getRoutes(): Observable<any> {
    const params = new HttpParams().set("subCountyFk", 0)
    return this.http.get<any>(`${environment.API}/api/v1/routes/get`, {...httpOptions, params: params});
  }

  getTransporters(): Observable<any>{
    return this.http.get(`${environment.apiUrl}/api/v1/users/by-role/5`);
  }
}
