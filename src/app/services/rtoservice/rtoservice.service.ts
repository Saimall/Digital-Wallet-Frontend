import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../authenticationservice/authservice.service';
import { Rtomodel } from '../../model/rtomodel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RtoserviceService {

  private baseUrl = 'http://localhost:8060/rto'; // Update with your backend URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  addRtoCard(rtoCard: Rtomodel): Observable<Rtomodel> {
    return this.http.post<Rtomodel>(`${this.baseUrl}/add`, rtoCard, { headers: this.getHeaders() });
  }
  getRtocard(number:number):Observable<Rtomodel>{
   return this.http.get<Rtomodel>(`${this.baseUrl}/getbynumber/${number}`,{headers: this.getHeaders()}); 
  }

  getRtoCards(familyid: number): Observable<Rtomodel[]> {
    return this.http.get<Rtomodel[]>(`${this.baseUrl}/get/${familyid}`, { headers: this.getHeaders() });
  }

  updateRtoCard(number: number, rtoCard: Rtomodel): Observable<Rtomodel> {
    return this.http.put<Rtomodel>(`${this.baseUrl}/update/${number}`, rtoCard, { headers: this.getHeaders() });
  }

  deleteRtoCard(number: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${number}`, { headers: this.getHeaders() });
  }
}
