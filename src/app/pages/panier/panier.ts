import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
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

  constructor(
    private panierService: PanierService,
    private router: Router
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
    this.router.navigate(['/personnalisation']);
  }
}