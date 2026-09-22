import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface PaymentMode {
  id: number;
  name: string;
}

export interface BankOption {
  id: number;
  name: string;
  code: string;
  description: string;
  active: boolean;
  categoryId: number;
  categoryName: string;
}

export interface FarmerCounts {
  months: number;
  activeCount: number;
  dormantCount: number;
  neverDeliveredCount: number;
  totalFarmers: number;
}

export interface FarmerAnalyticsResponse {
  count: number;
  farmers: any[];
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FarmerService {
  constructor(private http: HttpClient) {}

  public getFarmers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/farmer/all`, httpOptions);
  }

  public getFarmerCounts(): Observable<{ entity: FarmerCounts }> {
    return this.http.get<{ entity: FarmerCounts }>(`${environment.apiUrl}/api/v1/farmer/counts`, httpOptions);
  }

  public getDormantFarmers(months: number): Observable<{ entity: FarmerAnalyticsResponse }> {
    return this.http.get<{ entity: FarmerAnalyticsResponse }>(`${environment.apiUrl}/api/v1/farmer/dormant?months=${months}`, httpOptions);
  }

  public getActiveFarmerStats(months: number): Observable<{ entity: FarmerAnalyticsResponse }> {
    return this.http.get<{ entity: FarmerAnalyticsResponse }>(`${environment.apiUrl}/api/v1/farmer/active/stats?months=${months}`, httpOptions);
  }

  public getTopFarmers(months: number): Observable<{ entity: FarmerAnalyticsResponse }> {
    return this.http.get<{ entity: FarmerAnalyticsResponse }>(`${environment.apiUrl}/api/v1/farmer/top?months=${months}`, httpOptions);
  }

  public getBottomFarmers(months: number): Observable<{ entity: FarmerAnalyticsResponse }> {
    return this.http.get<{ entity: FarmerAnalyticsResponse }>(`${environment.apiUrl}/api/v1/farmer/bottom?months=${months}`, httpOptions);
  }

  public getActiveFarmers(months: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/farmer/active/all?months=${months}`, httpOptions);
  }

  public getRouteActiveFarmers(routeId: number, months?: number): Observable<any> {
  const monthParam = months ? `&months=${months}` : '';
  return this.http.get(`${environment.apiUrl}/api/v1/farmer/active/route?routeId=${routeId}${monthParam}`, httpOptions);
}


  public getCenterActiveFarmers(locationId: number, months?: number): Observable<any> {
  const monthParam = months ? `&months=${months}` : '';
  return this.http.get(`${environment.apiUrl}/api/v1/farmer/active/location?locationId=${locationId}${monthParam}`, httpOptions);
}


  public getByFarmersByFarmerNo(farmer_no: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/farmer/membernumber?farmer_number=${farmer_no}`, httpOptions);
  }

  public getFarmersById(id: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/farmer/farmer/id?farmerId=${id}`, httpOptions);
  }

  public registerFarmer(farmer: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/v1/farmer/add`, farmer, httpOptions);
  }

  public updateFarmer(farmer: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/v1/farmer/update`, farmer, httpOptions);
  }

  public getSubCounties(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/v1/Subcounty/fetch`, httpOptions);
  }

  public getSubCountyById(id: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/v1/Subcounty/${id}`, httpOptions);
  }

  public getFarmerStatement(id: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/v1/reports/farmer/statement?farmerid=${id}`, httpOptions);
  }
  public getPaymentModes(): Observable<PaymentMode[]> {
    return this.http.get<PaymentMode[]>(`${environment.apiUrl}/api/v1/payments/mode`, httpOptions);
  }

   public getPaymentOptions(): Observable<BankOption[]> {
    return this.http.get<BankOption[]>(`${environment.apiUrl}/api/v1/payments/options`, httpOptions);
  }

}
