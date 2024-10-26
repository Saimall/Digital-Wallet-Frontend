// atm.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Atmmodel } from '../../model/atmmodel';
import { AuthService } from '../authenticationservice/authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AtmService {
  private baseUrl = 'http://localhost:8060/atm'; // Update with your backend URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  addAtmCard(atmCard: Atmmodel): Observable<Atmmodel> {
    return this.http.post<Atmmodel>(`${this.baseUrl}/add`, atmCard, { headers: this.getHeaders() });
  }

  getAtmCards(familyid: number): Observable<Atmmodel[]> {
    return this.http.get<Atmmodel[]>(`${this.baseUrl}/get/${familyid}`, { headers: this.getHeaders() });
  }

  updateAtmCard(number: number, atmCard: Atmmodel): Observable<Atmmodel> {
    return this.http.put<Atmmodel>(`${this.baseUrl}/update/${number}`, atmCard, { headers: this.getHeaders() });
  }

  deleteAtmCard(number: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${number}`, { headers: this.getHeaders() });
  }
}
