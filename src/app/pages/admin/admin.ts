import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin',
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {

  onglet: 'commandes' | 'clients' | 'stats' = 'commandes';
  commandes: any[] = [];
  clients: any[] = [];
  stats: any = {};
  chargement = false;

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.chargerCommandes();
    this.chargerClients();
    this.chargerStats();
  }

  chargerCommandes() {
    this.http.get<any[]>(`${this.apiUrl}/api/admin/commandes`).subscribe({
      next: (data) => this.commandes = data,
      error: (err) => console.error(err)
    });
  }

  chargerClients() {
    this.http.get<any[]>(`${this.apiUrl}/api/admin/clients`).subscribe({
      next: (data) => this.clients = data,
      error: (err) => console.error(err)
    });
  }

  chargerStats() {
    this.http.get<any>(`${this.apiUrl}/api/admin/stats`).subscribe({
      next: (data) => this.stats = data,
      error: (err) => console.error(err)
    });
  }
}