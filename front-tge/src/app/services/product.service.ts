import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError  } from 'rxjs';
import { Product } from '../interfaces/product';
import { catchError } from 'rxjs/operators';
const httpOptions = {
  withCredentials : true,
};
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private BaseURL = 'http://localhost:8000/api/products';

  constructor(private httpClient : HttpClient) { }

  getProducts(){
    return this.httpClient.get<Product[]>(this.BaseURL+"/getAllProducts");
  }
  
  findByCategoryIds(ids: number[]){
    const params = {ids: ids.join() };
    return this.httpClient.get<Product[]>(`${this.BaseURL}/byCategoryIds`, { params });
  }

  findByCategoryId(id: any){
    return this.httpClient.get<Product[]>(`${this.BaseURL}/byCategoryId/${id}`);
  }

  getProductById(id : any){
    return this.httpClient.get<Product>(`${this.BaseURL}/${id}`);
  }

  createProduct(prod : FormData) : Observable<Product> {
    return this.httpClient.post<Product>(this.BaseURL, prod, httpOptions);
  }

  updateProduct(id: number,prod : Product){
    return this.httpClient.put<Product>(`${this.BaseURL}/${id}`,prod);
  }

  deleteProduct(id:number){
    return this.httpClient.delete(`${this.BaseURL}/${id}`)
  }

  getNewProducts() {
    return this.httpClient.get<Product[]>(`${this.BaseURL}/new`);
  }


  getProductBrands(): Observable<any> {
    return this.httpClient.get<any>(this.BaseURL+"/brands");
  }

  getProductsByBrands(brands: string[]): Observable<Product[]> {
    const params = { brands: brands.join(',') };
    return this.httpClient.get<Product[]>(`${this.BaseURL}/by-brands`, { params });
  }
}
