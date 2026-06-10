import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  seConnecter() {
    console.log('Connexion:', this.loginEmail);
  }

  sInscrire() {
    console.log('Inscription:', this.email);
  }
}