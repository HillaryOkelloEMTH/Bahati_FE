import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http: HttpClient) { }

  getBahatiDailySummary(month: any, year: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/collections/analytics/daily-summary/${month}/${year}`);
  }

  getCollectorCollectionSPerMonth(params): Observable<any>{
    const getCollectionSPerMonthUrl = `${environment.apiUrl}/api/v1/collections/analytics/collection/collector/month`;
    return this.http.get<any>(getCollectionSPerMonthUrl, { params })
  }

  getCollectorCountPerMonth(params): Observable<any>{
    const getCollectorCountPerMonthUrl = `${environment.apiUrl}/api/v1/collections/analytics/collection/count/collector`;

    return this.http.get<any>(getCollectorCountPerMonthUrl, { params })
  }

  getCollectionsPerMonth(params): Observable<any>{
    const getCollectionsPerMonthUrl = `${environment.apiUrl}/api/v1/collections/analytics/collection/month`;

    return this.http.get<any>(getCollectionsPerMonthUrl, { params })
  }



  getCollectionSPerMonth(): Observable<any>{
    const getCollectionSPerMonthUrl = `${environment.apiUrl}/api/v1/collections/analytics/collection/day`;

    return this.http.get<any>(getCollectionSPerMonthUrl)
  }

  getCollectorData(): Observable<any>{
    const getCollectorDataUrl = `${environment.apiUrl}/api/v1/collections/analytics/collection/day`;

    return this.http.get<any>(getCollectorDataUrl)
  }

  getCollectorSessionData(params): Observable<any>{
    const getCollectorSessionDataUrl = `${environment.apiUrl}/api/v1/collections/analytics/collector/sessions`;

    return this.http.get<any>(getCollectorSessionDataUrl, { params })
  }

  getCollectionsAnalysisPerDate(params): Observable<any>{
    const getCollectionsAnalysisPerDateUrl = `${environment.apiUrl}/api/v1/collections/analytics/date`;

    return this.http.get<any>(getCollectionsAnalysisPerDateUrl, { params })
  }

  getQuantityPerLocation(): Observable<any>{
    const getQuantityPerLocationUrl = `${environment.apiUrl}/api/v1/collections/analytics/quantity/location`;

    return this.http.get<any>(getQuantityPerLocationUrl)
  }

  getRoleUsers(): Observable<any>{
    const getQuantityPerLocationUrl = `${environment.apiUrl}/api/v1/collections/analytics/roleUsers`;

    return this.http.get<any>(getQuantityPerLocationUrl)
  }

  getCollectionAnalysisPerDate(): Observable<any>{
    const getCollectionAnalysisPerDateUrl = `${environment.apiUrl}/api/v1/collections/analytics/year`;

    return this.http.get<any>(getCollectionAnalysisPerDateUrl)
  }
}
