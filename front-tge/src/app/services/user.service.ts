import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const API_URL = 'http://localhost:8000/api/users';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getAllUsers(){
    return this.http.get(API_URL);
  }

  deleteUser(id:any){
    return this.http.delete(API_URL+"/"+id)
  }
  }
