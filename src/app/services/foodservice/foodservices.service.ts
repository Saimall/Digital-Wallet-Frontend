import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../authenticationservice/authservice.service';
import { Foodmodel } from '../../model/foodmodel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodservicesService {
  private baseUrl = 'http://localhost:8060/foodcard';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  addFoodCard(foodCard: Foodmodel): Observable<Foodmodel> {
    return this.http.post<Foodmodel>(`${this.baseUrl}/add`, foodCard, { headers: this.getHeaders() });
  }
  getFoodcard(number:number):Observable<Foodmodel>{
   return this.http.get<Foodmodel>(`${this.baseUrl}/getbynumber/${number}`,{headers: this.getHeaders()}); 
  }

  getFoodCards(familyid: number): Observable<Foodmodel[]> {
    return this.http.get<Foodmodel[]>(`${this.baseUrl}/get/${familyid}`, { headers: this.getHeaders() });
  }

  updateFoodCard(number: number, foodCard: Foodmodel): Observable<Foodmodel> {
    return this.http.put<Foodmodel>(`${this.baseUrl}/update/${number}`, foodCard, { headers: this.getHeaders() });
  }

  deleteFoodCard(number: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${number}`, { headers: this.getHeaders() });
  }



}
