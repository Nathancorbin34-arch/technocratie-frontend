import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getStocks() {
    return this.http.get<any[]>(`${this.apiUrl}/api/stocks`);
  }

  verifierDisponibilite(items: any[]) {
    return this.http.post<any>(`${this.apiUrl}/api/stocks/verifier`, { items });
  }
}