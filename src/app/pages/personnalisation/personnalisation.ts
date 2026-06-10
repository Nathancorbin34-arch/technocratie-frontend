import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PanierService, PanierItem } from '../../services/panier';

interface PersonnalisationItem {
  item: PanierItem;
  surnom: string;
  numero: string;
}

@Component({
  selector: 'app-personnalisation',
  imports: [CommonModule, FormsModule],
  templateUrl: './personnalisation.html',
  styleUrl: './personnalisation.css',
})
export class Personnalisation implements OnInit {

  personnalisations: PersonnalisationItem[] = [];
  appliquerATous = false;
  chargement = false;

  constructor(
    private panierService: PanierService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const items = this.panierService.getItems();
    if (items.length === 0) {
      this.router.navigate(['/panier']);
      return;
    }
    this.personnalisations = items.map((item: PanierItem) => ({
      item,
      surnom: '',
      numero: ''
    }));
  }

  appliquerPremierATous() {
    if (this.personnalisations.length === 0) return;
    const premier = this.personnalisations[0];
    this.personnalisations = this.personnalisations.map(p => ({
      ...p,
      surnom: premier.surnom,
      numero: premier.numero
    }));
  }

  validerNumero(index: number, event: any) {
  let val = event.target.value.replace(/[^0-9]/g, '');
  if (val.length > 2) val = val.slice(0, 2);
  const num = parseInt(val);
  if (!isNaN(num) && num > 99) val = '99';
  this.personnalisations[index].numero = val;
  event.target.value = val;
}

  passerAuPaiement() {
    this.chargement = true;
    const items = this.personnalisations.map(p => ({
      ...p.item,
      surnom: p.surnom,
      numero: p.numero
    }));

    this.http.post<any>('http://localhost:3000/api/paiement/creer-session', {
      items
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