import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface PaymentMode {
  id: number;
  name: string;
}

export interface ResponsePayload <T> {
  statusCode: number;
  message: string;
  entity?: T;
}

export interface BankOption {
  id: number;
  code: string;
  name: string;
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

  getPaymentModes(): Observable<ResponsePayload<PaymentMode[]>> {
    return this.http.get<ResponsePayload<PaymentMode[]>>(`${environment.apiUrl}/api/v1/payments/mode`, httpOptions);
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

  getPaymentOptions(): Observable<BankOption[]> {
    return this.http.get<BankOption[]>(`${environment.apiUrl}/api/v1/payments/options`, httpOptions);
  }

  addPaymentOption(option: Partial<BankOption>): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/v1/payments/options`, option, httpOptions);
  }

  updatePaymentOption(option: BankOption): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/v1/payments/options/${option.id}`, option, httpOptions);
  }

  deletePaymentOption(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/v1/payments/options/soft-delete/${id}`, httpOptions);
  }
}
