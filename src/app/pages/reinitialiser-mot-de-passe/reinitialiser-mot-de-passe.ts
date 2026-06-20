import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-reinitialiser-mot-de-passe',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reinitialiser-mot-de-passe.html',
  styleUrl: './reinitialiser-mot-de-passe.css'
})
export class ReinitialiserMotDePasse implements OnInit {
  token = '';
  nouveauMotDePasse = '';
  confirmationMotDePasse = '';
  message = '';
  chargement = false;
  succes = false;

  private apiUrl = environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    if (!this.token) {
      this.message = 'Lien invalide';
    }
  }

  reinitialiser() {
    if (!this.nouveauMotDePasse || !this.confirmationMotDePasse) {
      this.message = 'Remplis les deux champs';
      return;
    }
    if (this.nouveauMotDePasse !== this.confirmationMotDePasse) {
      this.message = 'Les mots de passe ne correspondent pas';
      return;
    }
    if (this.nouveauMotDePasse.length < 6) {
      this.message = 'Le mot de passe doit contenir au moins 6 caractères';
      return;
    }

    this.chargement = true;
    this.message = '';

    this.http.post<any>(`${this.apiUrl}/api/auth/reinitialiser-mot-de-passe`, {
      token: this.token,
      nouveauMotDePasse: this.nouveauMotDePasse
    }).subscribe({
      next: () => {
        this.succes = true;
        this.chargement = false;
        setTimeout(() => this.router.navigate(['/connexion']), 2500);
      },
      error: (err) => {
        this.message = err.error?.message || 'Erreur lors de la réinitialisation';
        this.chargement = false;
      }
    });
  }
}