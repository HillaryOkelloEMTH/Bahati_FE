import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }



  generatefarmerCollections(farmerN0: any, from: any, to: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: farmerN0,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.apiUrl}/api/v1/reports/farmer/collections?farmerNo=${farmerN0}&from=${from}&to=${to}`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        return {
          filename: "FarmerCollections",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  generatefarmerProducts(farmerN0: any, month: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: farmerN0, month,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.apiUrl}/api/v1/reports/farmer/product/allocations?farmer_no=` + farmerN0 + `&month=` + month;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        return {
          filename: "FarmerCollections",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }

  generateMccAllocations(locationId: any, month: any, year: any): Observable<any> {
    let headers = new HttpHeaders();
    // headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      headers: headers,
      responseType: "blob" as 'json',
      withCredentials: false,
    };
    let API_URL = `${environment.apiUrl}/api/v1/reports/allocations/mcc/${locationId}/${month}/${year}`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        console.log("response data", response)
        // if (condition) {

        // }
        return {
          filename: "allocations",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }

  generatefarmerStatement(farmerNo: any, from: any, to: any): Observable<any> {
    console.log("Calling api  ....")
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: farmerNo, from, to,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.apiUrl}/api/v1/reports/farmer/statement?farmerNo=` + farmerNo + `&from=` + from + `&to=` + to;
    console.log("API== " + API_URL)

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        return {
          filename: "FarmerStatement",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  collectionsPerDate(date: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: date,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.apiUrl}/api/v1/reports/date?date=` + date;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        return {
          filename: "CollectionsPerDate",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  collectionsPerDateExcel(date: string): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    let API_URL = `${environment.apiUrl}/api/v1/excel/reports/collectionsPerDate?date=` + date;
    console.log("Calling api " + API_URL)

    return this.http.get(API_URL, { headers, responseType: 'blob' });
  }
  collectionsPerMCCandDateExcel(lid:any,from: string, to): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    let API_URL = `${environment.apiUrl}/api/v1/excel/reports/location/date-range?lid=${lid}&from=${from}&to=${to}`;
    console.log("Calling api " + API_URL)

    return this.http.get(API_URL, { headers, responseType: 'blob' });
  }

  paymentFileExcel(month:any, year:any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    let API_URL = `${environment.apiUrl}/api/v1/excel/reports/payroll/${month}/${year}`;


    return this.http.get(API_URL, { headers, responseType: 'blob', });
  }

  mccMonthlyRouteSummary(month:any, locationId:any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    let API_URL = `${environment.apiUrl}/api/v1/excel/reports/route-summary-center/monthly/${month}/${locationId}`;


    return this.http.get(API_URL, { headers, responseType: 'blob', });
  }

  paymentFileExcelDr(from:any,to:any,mode:any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    let API_URL = `${environment.apiUrl}/api/v1/excel/reports/collections/paymentfile/dates?from=`+from+`&to=` + to+`&mode=`+mode;
    console.log("Calling api " + API_URL)

    return this.http.get(API_URL, { headers, responseType: 'blob' });
  }


  bahatiDailyDeliverySummary(date: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.apiUrl}/api/v1/reports/bahati/daily-summary/${date}`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        return {
          filename: "BahatiDailySummary",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  collectionsPerPulByDate(locationId: any, date: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: locationId, date,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.apiUrl}/api/v1/reports/collections/per/pickUpLocation?pickUpLocationId=` + locationId + `&date=` + date;

    console.log("Calling api == " + API_URL)

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        return {
          filename: "CollectionsPerCollectors",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }

  getMCCRouteSummaryByDate(date: any, centerId: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    let API_URL = `${environment.apiUrl}/api/v1/excel/reports/route-summary-center/${date}/${centerId}`;
    console.log("Calling api " + API_URL)

    return this.http.get(API_URL, { headers, responseType: 'blob' });
  }

  mccDailyRouteSummary(mccId: any, date: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: date,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.apiUrl}/api/v1/reports/mcc/daily-summary/${mccId}/${date}`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        return {
          filename: "dailyroutesummary",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  monthlyRouteSummary(mccId: any, month: any, year: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.apiUrl}/api/v1/reports/mcc/monthly-summary/${mccId}/${month}/${year}`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        return {
          filename: "MccMonthlyRouteSummary",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  collectionsPerLocationrByMonth(month: any, year: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: month,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.apiUrl}/api/v1/reports/bahati/monthly-summary/${month}/${year}`;

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        return {
          filename: "BapMonthSummary",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  getPaymentFile(locationId:any,month: any, mode: any): Observable<any> {
    console.log("..Calling api  ....")
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: month, mode,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.apiUrl}/api/v1/reports/paymentfile?pickupLocationId=`+locationId+`&month=` + month + `&paymentMode=` + mode;
    console.log("Calling api"+ API_URL)

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        return {
          filename: month + "-PaymentFile",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }
  getPaymentFileDR(from:any,to: any, mode: any): Observable<any> {
    console.log("..Calling api  ....")
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");

    let requestOptions: any = {
      params: from,to, mode,
      headers: headers,
      responseType: "blob",
      withCredentials: false,
    };
    let API_URL = `${environment.apiUrl}/api/v1/reports/paymentfile/date/range?from=`+from+`&to=` + to + `&paymentMode=` + mode;
    console.log("Calling api"+ API_URL)

    return this.http.get(API_URL, requestOptions).pipe(
      map((response) => {
        return {
          filename: "DateRange" + "-PaymentFile",
          data: new Blob([response], { type: "application/pdf" }),
        };
      })
    );
  }

  paymentFileExcelDateRange(from: string, to: string): Observable<Blob> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  
    const API_URL =
      `${environment.apiUrl}/api/v1/excel/reports/payroll/date-range` +
      `?startDate=${from}&endDate=${to}`;
  
    console.log('Calling api', API_URL);
  
    return this.http.get(API_URL, {
      headers,
      responseType: 'blob'
    });
  }
  

}
