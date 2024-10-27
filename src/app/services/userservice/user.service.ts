import { Injectable } from '@angular/core';



import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8060/user'; // Replace with your backend API URL

  familyid:number=0;
  constructor(private http: HttpClient) { }

  register(user: { username: string; password: string; familyid: string }): Observable<any> {

   
    return this.http.post(`${this.apiUrl}/add`, user);
  }

  validateUser(username: string, password: string): Observable<any> {
    
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }
}