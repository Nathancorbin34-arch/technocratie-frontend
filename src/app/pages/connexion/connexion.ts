import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-connexion',
  imports: [CommonModule, FormsModule, RouterLink],
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

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  seConnecter() {
    this.messageErreur = '';
    this.http.post<any>(`${this.apiUrl}/api/auth/connexion`, {
      email: this.loginEmail,
      mot_de_passe: this.loginPassword
    }).subscribe({
      next: (res) => {
        this.authService.setClient(res.client, res.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.messageErreur = err.error.message || 'Erreur de connexion';
        this.cdr.detectChanges();
      }
    });
  }

  sInscrire() {
    this.messageErreur = '';
    this.http.post<any>(`${this.apiUrl}/api/auth/inscription`, {
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
        this.cdr.detectChanges();
      }
    });
  }
}