import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParametresService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getParametres() {
    return this.http.get<any>(`${this.apiUrl}/api/admin/parametres`);
  }
}