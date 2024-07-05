import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  registerUser = `http://localhost:3000/users`;
  records = `http://localhost:3000/records`;
  sendEmail = `https://6c5czz9u6a.execute-api.us-east-1.amazonaws.com/default/send-email`;

  headers = {
    'Content-Type': 'application/json'
  }
  options = { headers: this.headers };

  constructor(private http: HttpClient) { }

  addUser(data:any): Observable<any>{
    return this.http.post(this.registerUser,data,this.options);
  }

  checkUser(): Observable<any>{
    return this.http.get(this.registerUser,this.options)
  }

  email(data:any): Observable<any>{
    return this.http.post(this.sendEmail,data,this.options);
  }

  getRecords(): Observable<any>{
    return this.http.get(this.records,this.options)
  }

  addRecord(data:any): Observable<any>{
    return this.http.post(this.records,data,this.options);
  }
  
  updateRecord(id:any,data:any): Observable<any>{
    let path = `${this.records}/${id}`
    return this.http.put(path,data,this.options);
  }

  deleteRecord(data:any): Observable<any>{
    let path = `${this.records}/${data}`
    return this.http.delete(path,this.options);
  }
}
