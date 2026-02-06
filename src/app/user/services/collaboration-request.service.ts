import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CollaborationRequestService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http:HttpClient) { 

  }


  sendCollaborationRequest(data:any){
    return this.http.post(`${environment.apiUrl}/api/v1/collaboration/create`,data)
  }
  fetchCollaborationRequest(username:string){
    return this.http.get(`${environment.apiUrl}/api/v1/collaboration/fetch/user?username=`+username)
  }
  fetchUserClosingRequests(status:string,username:string){
    return this.http.get(`${environment.apiUrl}/api/action-items/user/closingrequests?reviewStatus=`+status+`&username=`+username)
  }
}
