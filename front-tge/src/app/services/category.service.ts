import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';

const httpOptions = {
  withCredentials : true,
}; 
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private BaseURL = 'http://localhost:8000/api/categories';

  constructor(private httpClient : HttpClient) { }

  getCategories(): Observable<Category[]>{
    return this.httpClient.get<Category[]>(this.BaseURL,httpOptions);
  }

  getCategoryById(id : any):Observable<Category>{
    return this.httpClient.get<Category>(`${this.BaseURL}/${id}`,httpOptions);
  }

  createCategory(cat : Category): Observable<Category>{
    return this.httpClient.post<Category>(this.BaseURL, cat,httpOptions);
  }

  updateCategory(id: number,cat : Category):Observable<Category>{
    return this.httpClient.put<Category>(`${this.BaseURL}/${id}`,cat,httpOptions);
  }

  deleteCategory(id:number):Observable<any>{
    return this.httpClient.delete(`${this.BaseURL}/${id}`,httpOptions)
  }
}