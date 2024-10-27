import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ottmodel } from '../../model/ottmodel';
import { AuthService } from '../authenticationservice/authservice.service';

@Injectable({
  providedIn: 'root'
})
export class OttserviceService {
  private baseUrl = 'http://localhost:8060/ott'; 

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  addOttCard(ottCard: Ottmodel): Observable<Ottmodel> {
    return this.http.post<Ottmodel>(`${this.baseUrl}/add`, ottCard, { headers: this.getHeaders() });
  }
  getOttcard(number:number):Observable<Ottmodel>{
   return this.http.get<Ottmodel>(`${this.baseUrl}/getbynumber/${number}`,{headers: this.getHeaders()}); 
  }

  getOttCards(familyid: number): Observable<Ottmodel[]> {
    return this.http.get<Ottmodel[]>(`${this.baseUrl}/get/${familyid}`, { headers: this.getHeaders() });
  }

  updateOttCard(number: number, ottCard: Ottmodel): Observable<Ottmodel> {
    return this.http.put<Ottmodel>(`${this.baseUrl}/update/${number}`, ottCard, { headers: this.getHeaders() });
  }

  deleteOttCard(number: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${number}`, { headers: this.getHeaders() });
  }

}
