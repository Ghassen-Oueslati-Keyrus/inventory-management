import { Injectable } from '@angular/core';
import { Devis } from '../interfaces/devis';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DevisService {

  private baseUrl = 'http://localhost:8000/api/devis';

  constructor(private http: HttpClient) { }

  getAllDevis(): Observable<Devis[]> {
    return this.http.get<Devis[]>(`${this.baseUrl}`);
  }

  createDevis(devis: Devis): Observable<Devis> {
    return this.http.post<Devis>(`${this.baseUrl}`, devis);
  }

  getDevisById(id: number): Observable<Devis> {
    return this.http.get<Devis>(`${this.baseUrl}/${id}`);
  }

  deleteDevis(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
