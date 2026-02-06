import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  constructor(private http: HttpClient) { }

  getAllSMS(): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/sms/notifications`;
    return this.http.get<any>(url)
  }

  sendSMS(phoneNo: any, message: any): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/sms/sendSMS?message=${message}&phone=${phoneNo}`;
    return this.http.post<any>(url, {})
  }

  //sms templates
  createTemplate(data:any): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/smsTemplates/add`;
    return this.http.post<any>(url, data,{})
  }

  editTemplate(data:any): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/smsTemplates/edit`;
    return this.http.put<any>(url, data,{})
  }

  getAllTemplates(): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/smsTemplates/all`;
    return this.http.get<any>(url)
  }

  deleteTemplate(id:any): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/smsTemplates/delete/`+id;
    return this.http.delete<any>(url)
  }

  getByDateRange(from: string, to: any): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/bulk-sms/find/date-range?from=` + from + `&to=` + to;
    return this.http.get<any>(url)
  }

  getBulkProcessingCodes(): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/bulkSMS/bulkCodes`;
    return this.http.get<any>(url)
  }

  getBulkSMSByCode(code:any): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/bulkSMS/findBy?code=`+code;
    return this.http.get<any>(url)
  }

  sendBulkSMS(data:any)
  {
    const url = `${environment.apiUrl}/api/v1/bulk-sms/bulk`;
    return this.http.post<any>(url, data,{})
  }
}
