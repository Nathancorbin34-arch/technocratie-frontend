import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PanierService, PanierItem } from '../../services/panier';

@Component({
  selector: 'app-panier',
  imports: [CommonModule, RouterLink],
  templateUrl: './panier.html',
  styleUrl: './panier.css',
})
export class Panier implements OnInit {

  items: PanierItem[] = [];
  total = 0;
  chargement = false;

  constructor(
    private panierService: PanierService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.panierService.panier$.subscribe(items => {
      this.items = items;
      this.total = this.panierService.getTotal();
    });
  }

  supprimer(id: number, taille: string) {
    this.panierService.supprimerDuPanier(id, taille);
  }

  vider() {
    this.panierService.viderPanier();
  }

  passerCommande() {
    this.chargement = true;
    this.http.post<any>('http://localhost:3000/api/paiement/creer-session', {
      items: this.items
    }).subscribe({
      next: (res) => {
        window.location.href = res.url;
      },
      error: (err) => {
        console.error('Erreur paiement:', err);
        this.chargement = false;
      }
    });
  }
}