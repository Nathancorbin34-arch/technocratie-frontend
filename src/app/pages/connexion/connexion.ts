import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-connexion',
  imports: [CommonModule, FormsModule],
  templateUrl: './connexion.html',
  styleUrl: './connexion.css',
})
export class Connexion {
  mode: 'connexion' | 'inscription' = 'connexion';

  loginEmail = '';
  loginPassword = '';

  prenom = '';
  nom = '';
  email = '';
  tel = '';
  adresse = '';
  cp = '';
  ville = '';
  password = '';

  messageErreur = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  seConnecter() {
    this.messageErreur = '';
    this.http.post<any>('http://localhost:3000/api/auth/connexion', {
      email: this.loginEmail,
      mot_de_passe: this.loginPassword
    }).subscribe({
      next: (res) => {
        this.authService.setClient(res.client, res.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.messageErreur = err.error.message || 'Erreur de connexion';
      }
    });
  }

  sInscrire() {
    this.messageErreur = '';
    this.http.post<any>('http://localhost:3000/api/auth/inscription', {
      prenom: this.prenom,
      nom: this.nom,
      email: this.email,
      telephone: this.tel,
      adresse: this.adresse,
      code_postal: this.cp,
      ville: this.ville,
      mot_de_passe: this.password
    }).subscribe({
      next: (res) => {
        this.authService.setClient(res.client, res.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.messageErreur = err.error.message || 'Erreur lors de la création du compte';
      }
    });
  }
}