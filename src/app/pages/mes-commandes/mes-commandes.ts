import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-mes-commandes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mes-commandes.html',
  styleUrl: './mes-commandes.css'
})
export class MesCommandes implements OnInit {

  commandes: any[] = [];
  chargement = true;
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.http.get<any[]>(`${this.apiUrl}/api/auth/mes-commandes`, { headers }).subscribe({
      next: (data) => {
        this.commandes = data;
        this.chargement = false;
      },
      error: (err) => {
        console.error(err);
        this.chargement = false;
      }
    });
  }
}