import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserchartAnalyticsService {

  constructor(private http:HttpClient) { }

  getActionItemsYearwise():Observable<any> {
    return this.http.get<any>('');
  }


  // getUserActionItemMonthwise(year,status,email):Observable<any>{
  //   return this.http.get<any>(`api/action-items/usertaskclosure?year=`+year+`&status=`+status+`&email=`+email)
  // }
  getUserActionItemMonthwise(year,email):Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/api/action-items/user/analytics/action-items/month-wise?year=`+year+`&email=`+email)
  }
  //get action item years
  getAllActionItemsYears():Observable<any>{

    return this.http.get<any>(`${environment.apiUrl}/api/action-items/years`)
  }

  getUserMeetingAttendance(email:string):Observable<any>{

    return this.http.get<any>(`${environment.apiUrl}/api/meeting/meeting/attendance?email=`+email)
  }
  getCounts(email,status){
    return this.http.get(`${environment.apiUrl}/api/action-items/user/analytics/user/taskCounts?email=`+email+`&status=`+status,httpOptions)
    
  }

  getUpcomingmeetings(email:string,days:number):Observable<any>{


    return this.http.get<any>(`${environment.apiUrl}/api/action-items/user/analytics/meetings/upcoming?email=`+email+`+&days=`+days)
  }
  getUpcomingtasks(email:string,days:number):Observable<any>{

    return this.http.get<any>(`${environment.apiUrl}/api/action-items/user/analytics/tasks/upcoming?email=`+email+`&days=`+days)
  }

  getMeetingsPerdate(email:string):Observable<any>{

    return this.http.get<any>(`${environment.apiUrl}/api/action-items/user/analytics/meetings/date?email=`+email)
  }
  
 
}
