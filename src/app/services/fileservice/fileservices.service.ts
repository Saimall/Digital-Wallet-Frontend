import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../authenticationservice/authservice.service';
import { FileModel } from '../../model/filemodel';
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

  addFileCard(fileCard: FormData): Observable<FileModel> {
    return this.http.post<FileModel>(`${this.baseUrl}/add`, fileCard, { headers: this.getHeaders() });
  }
  getFilecard(number:number):Observable<FileModel>{
   return this.http.get<FileModel>(`${this.baseUrl}/getbynumber/${number}`,{headers: this.getHeaders()}); 
  }

  getFileCards(familyid: number): Observable<FileModel[]> {
    return this.http.get<FileModel[]>(`${this.baseUrl}/get/${familyid}`, { headers: this.getHeaders() });
  }

  updateFileCard(number: number, fileCard: FormData): Observable<FileModel> {
    return this.http.put<FileModel>(`${this.baseUrl}/update/${number}`, fileCard, { headers: this.getHeaders() });
  }

  deleteFileCard(number: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${number}`, { headers: this.getHeaders() });
  }
}
