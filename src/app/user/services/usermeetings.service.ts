import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UsermeetingsService {
  baseurl = `${environment.apiUrl}`;

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getUsermeetings(email) {
    return this.http.get(`${environment.apiUrl}/api/attendees/fetch/all/email?email=` + email, httpOptions)
  }

  getmeetingdetails(meetingId) {
    return this.http.get(`${environment.apiUrl}/api/meeting/fetch/meeting/` + meetingId, httpOptions)
  }
  getMinute(Id) {
    return this.http.get(`${environment.apiUrl}/api/meeting/meeting/minutes?id=` + Id, httpOptions)
  }

 downloadMinute(meeetingId,minuteId) {
    return this.http.get(`${environment.apiUrl}/api/minutes/download?meetingid=`+meeetingId+`&minuteid=` + minuteId, httpOptions)
  }




}
