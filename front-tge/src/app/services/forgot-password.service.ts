import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';


const RESET_API = 'http://localhost:8000/api/reset/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials : true
};

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient) { }

  getUserByPasswordToken(token: any) : Observable<User> {
    return this.http.get<User>(RESET_API+token, httpOptions);
  }

  saveResetPasswordToken(email : any): Observable<User> {
    return this.http.put<User>(RESET_API+'password/'+ email, httpOptions);
    } 

    resetPassword(token: any, user: User): Observable<User>{
      return this.http.put<User>(RESET_API+token,user,httpOptions);
    }
}
