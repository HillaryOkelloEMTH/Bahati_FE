import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface PaymentMode {
  id: number;
  active: boolean;
  name: string;
  createdAt?: string;
}

export interface BankOption {
  id: number;
  code: string;
  name: string[];
  description?: string;
  active: boolean;
  categoryName: string;
  categoryId?: number;
  createdOn: string;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PaymentManagementService {
  constructor(private http: HttpClient) {}

  getPaymentModes(): Observable<PaymentMode[]> {
    return this.http.get<PaymentMode[]>(`${environment.apiUrl}/api/v1/payments/mode`, httpOptions);
  }

  addPaymentMode(mode: PaymentMode): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/v1/payments/mode`, mode, httpOptions);
  }

  updatePaymentMode(mode: PaymentMode): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/v1/payments/mode/${mode.id}`, mode, httpOptions);
  }
  

  deletePaymentMode(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/v1/payments/mode/soft-delete/${id}`, httpOptions);
  }

 
togglePaymentModeStatus(id:number){
  return this.http.put(`${environment.apiUrl}/api/v1/payments/payment-mode/${id}/toggle-status`,{})
}

}
