import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  public getTodaysCollections(date: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/collections/specific/date?date=${date}`, httpOptions)
    return timer(0, 5000).pipe(
      switchMap(() => this.http.get(`${environment.apiUrl}/api/v1/collections/specific/date?date=${date}`, httpOptions))
    )
  }
  public getAllFarmers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/farmer/get`,httpOptions);
  }

  public getDateCollections(from:any, to: any): Observable<any> {
    console.log("Calling api..")
    return this.http.get(`${environment.apiUrl}/api/v1/collections/date-range/totals?from=${from}&to=${to}` ,httpOptions)
    return timer(0, 5000).pipe(
      switchMap(() => this.http.get(`${environment.apiUrl}/api/v1/collections/date-range/totals?from=${from}&to=${to}`, httpOptions))
    )
  }

  public getDateDangeCollections(from:any,to:any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/collections/date/range/records?fromdate=`+from+`&&toDate=`+to,httpOptions);
  }

  public getPickUpLocationCollections(pickUpLocationId:any, from: any, to: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/collections/record/pickupLocations?pickUpLocation=`+pickUpLocationId+`&from=${from}&to=${to}`,httpOptions);
  }
  public getRouteCollections(routeId:any, from: any, to: any): Observable<any> {
      console.log("Calling api route d=id ,"+ routeId)
      return this.http.get(`${environment.apiUrl}/api/v1/collections/date-range/route-records?routeId=`+routeId+`&startDate=${from}&endDate=${to}`,httpOptions);
    }
  public getFarmerCollections(farmerNo: any, from: any, to: any): Observable<any> {
    console.log("Calling API for farmerNo = " + farmerNo);
    return this.http.get(`${environment.apiUrl}/api/v1/collections/farmer/date/range/summary/${farmerNo}/${from}/${to}`, httpOptions);
  }




  public getAllCollectionsRecords(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/collections/records/all`,httpOptions)
    // return timer(0, 5000).pipe(
    //   switchMap(() => this.http.get(`${environment.apiUrl}/api/v1/collections/records/all`,httpOptions))
    // )
  }



  // public getDashboardWigetsAnalytics(): Observable<any> {
  //   return this.http.get(`${environment.apiUrl}api/v1/collections/collections/today`,httpOptions);
  // }

  // public getUsersPerRole(): Observable<any> {
  //   return this.http.get(`${environment.apiUrl}api/v1/collections/collections/today`,httpOptions);
  // }


}
