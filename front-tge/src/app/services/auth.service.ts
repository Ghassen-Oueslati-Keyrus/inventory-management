import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Role } from '../interfaces/role';

const AUTH_API = 'http://localhost:8000/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials : true
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(username: string,firstName: string, lastName: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        firstName,
        lastName,
        email,
        password,
      },
      httpOptions
    );
  }
  newUser(username: string,firstName: string, lastName: string, email: string,role: string[], password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        firstName,
        lastName,
        email,
        role,
        password,
      },
      httpOptions
    );
  }
  changePassword(passwords : any){
    return this.http.put(AUTH_API+"changePassword",passwords, httpOptions);
  }
  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', {}, httpOptions);
  }
  getUserByEmail(email: any) : Observable<User> {
    return this.http.get<User>(AUTH_API+"email/"+email, httpOptions);
  }
  getUserByUsername(username: any) : Observable<User> {
    return this.http.get<User>(AUTH_API+"username/"+username);
  }

  verifiedEmail(code : any,user:any): Observable<User> {
    return this.http.put<User>(AUTH_API+"verify/"+ code,user, httpOptions);
    } 

    getUserByVerificationCode(code: any) : Observable<User> {
      return this.http.get<User>(AUTH_API+"verify/"+code, httpOptions);
    }
    
  changeProfile(data : any): Observable<User> {
    return this.http.put<User>(AUTH_API + "change-profile" , data, httpOptions);
  }
}
