import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/products/all`;
    return this.http.get<any>(url)
  }

 getMccAllocations(locationId: number | string): Observable<any> {
  const url = `${environment.apiUrl}/api/v1/mcc-allocations/get/${locationId}`;
  return this.http.get<any>(url);
}


  updateProduct(id:any,data): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/products/update/${id}`;
    return this.http.put<any>(url, data)
  }

  createProduct(data): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/products/add`;
    return this.http.post<any>(url, data)
  }

  deleteProduct(id:any): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/products/${id}`;
    return this.http.delete<any>(url, {})
  }
}
