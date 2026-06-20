import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-mot-de-passe-oublie',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './mot-de-passe-oublie.html',
  styleUrl: './mot-de-passe-oublie.css'
})
export class MotDePasseOublie {
  email = '';
  message = '';
  chargement = false;
  envoye = false;

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  envoyer() {
    if (!this.email) {
      this.message = 'Entre ton adresse email';
      return;
    }
    this.chargement = true;
    this.message = '';

    this.http.post<any>(`${this.apiUrl}/api/auth/mot-de-passe-oublie`, { email: this.email }).subscribe({
      next: () => {
        this.envoye = true;
        this.chargement = false;
      },
      error: (err) => {
        this.message = err.error?.message || 'Erreur lors de l\'envoi';
        this.chargement = false;
      }
    });
  }
}