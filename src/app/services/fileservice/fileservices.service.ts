import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../authenticationservice/authservice.service';
import { Filemodel } from '../../model/filemodel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileservicesService {

  private baseUrl = 'http://localhost:8060/files'; // Update with your backend URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  addFileCard(fileCard: Filemodel): Observable<Filemodel> {
    return this.http.post<Filemodel>(`${this.baseUrl}/add`, fileCard, { headers: this.getHeaders() });
  }
  getFilecard(number:number):Observable<Filemodel>{
   return this.http.get<Filemodel>(`${this.baseUrl}/getbynumber/${number}`,{headers: this.getHeaders()}); 
  }

  getFileCards(familyid: number): Observable<Filemodel[]> {
    return this.http.get<Filemodel[]>(`${this.baseUrl}/get/${familyid}`, { headers: this.getHeaders() });
  }

  updateFileCard(number: number, fileCard: Filemodel): Observable<Filemodel> {
    return this.http.put<Filemodel>(`${this.baseUrl}/update/${number}`, fileCard, { headers: this.getHeaders() });
  }

  deleteFileCard(number: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${number}`, { headers: this.getHeaders() });
  }
}
