import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../authenticationservice/authservice.service';
import { Medicalmodel } from '../../model/medicalmodel';

@Injectable({
  providedIn: 'root'
})
export class MedicalserviceService {

  private baseUrl = 'http://localhost:8060/healthcard'; // Update with your backend URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  addMedicalCard(medicalCard: Medicalmodel): Observable<Medicalmodel> {
    return this.http.post<Medicalmodel>(`${this.baseUrl}/add`, medicalCard, { headers: this.getHeaders() });
  }
  getMedicalcard(number:number):Observable<Medicalmodel>{
   return this.http.get<Medicalmodel>(`${this.baseUrl}/getbynumber/${number}`,{headers: this.getHeaders()}); 
  }

  getMedicalCards(familyid: number): Observable<Medicalmodel[]> {
    return this.http.get<Medicalmodel[]>(`${this.baseUrl}/get/${familyid}`, { headers: this.getHeaders() });
  }

  updateMedicalCard(number: number, medicalCard: Medicalmodel): Observable<Medicalmodel> {
    return this.http.put<Medicalmodel>(`${this.baseUrl}/update/${number}`, medicalCard, { headers: this.getHeaders() });
  }

  deleteMedicalCard(number: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${number}`, { headers: this.getHeaders() });
  }
}
