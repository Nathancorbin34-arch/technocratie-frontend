import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private clientSubject = new BehaviorSubject<any>(this.getClientFromStorage());
  client$ = this.clientSubject.asObservable();

  private getClientFromStorage() {
    const clientStr = localStorage.getItem('client');
    return clientStr ? JSON.parse(clientStr) : null;
  }

  setClient(client: any, token: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('client', JSON.stringify(client));
    this.clientSubject.next(client);
  }

  deconnecter() {
    localStorage.removeItem('token');
    localStorage.removeItem('client');
    this.clientSubject.next(null);
  }

  getClient() {
    return this.clientSubject.value;
  }

  estConnecte(): boolean {
    return !!localStorage.getItem('token');
  }
}