import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UsertasksService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http:HttpClient) { 

  }



  getUserTasks(email,status){
    return this.http.get(`${environment.apiUrl}/api/action-subject/actionitems/email?email=`+email+`&status=`+status,httpOptions)
  }
  getUserActions(email){
    return this.http.get(`${environment.apiUrl}/api/action-subject/actionitems/user/email?email=`+email,httpOptions)
  }
  

  addNote(data){
    return this.http.post(`${environment.apiUrl}/api/v1/notes/create`,data)

  }
  sendClosureRequest(data:any){
    return this.http.post(`${environment.apiUrl}/api/action-items/closing/request`,data)
  }
  getTaskById(id:number){
    return this.http.get(`${environment.apiUrl}/api/action-items/fetch/byId/`+id)
  }

  getUserNotes(username:string){
    return this.http.get(`${environment.apiUrl}/api/v1/notes/fetch?username=`+username)
  }

  getUserReviews(username:string,taskId:number){
    return this.http.get(`${environment.apiUrl}/api/action-items/reviews/user?username=`+username+ `&taskId=`+taskId)
  }

  getFileNotes(noteId:number){
    return this.http.get(`${environment.apiUrl}/api/v1/notes/task/`+noteId)
  }


  fetchUserClosingRequests(username:string){
    return this.http.get(`${environment.apiUrl}/api/action-items/user/closingrequests?username=`+username)
  }
  
  

 


}
