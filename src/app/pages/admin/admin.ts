import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {

  onglet: 'commandes' | 'clients' | 'stats' | 'stocks' = 'commandes';
  commandes: any[] = [];
  clients: any[] = [];
  stats: any = {};
  stocks: any[] = [];
  chargement = false;
  commandesOuvertes = true;

  private apiUrl = environment.apiUrl;

  produits = ['Maillot Technocratie', 'Rawcratie', 'Uptempocratie', 'Zaagocratie'];
  tailles = ['XS', 'S', 'M', 'L', 'XL'];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.chargerCommandes();
    this.chargerClients();
    this.chargerStats();
    this.chargerStocks();
    this.chargerParametres();
  }

  chargerParametres() {
    this.http.get<any>(`${this.apiUrl}/api/admin/parametres`).subscribe({
      next: (data) => {
        this.commandesOuvertes = data.commandes_ouvertes;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  toggleCommandes() {
    const nouvelEtat = !this.commandesOuvertes;
    this.http.put(`${this.apiUrl}/api/admin/parametres/commandes`, { ouvert: nouvelEtat }).subscribe({
      next: () => {
        this.commandesOuvertes = nouvelEtat;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  exporterPDF() {
    window.open(`${this.apiUrl}/api/export/commandes-pdf`, '_blank');
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

  chargerStocks() {
    this.http.get<any[]>(`${this.apiUrl}/api/stocks`).subscribe({
      next: (data) => {
        this.stocks = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  getStock(produit: string, taille: string): number {
    const stock = this.stocks.find(s => s.produit_nom === produit && s.taille === taille);
    return stock ? stock.quantite : 0;
  }

  modifierStock(produit: string, taille: string, quantite: number) {
    if (quantite < 0) quantite = 0;
    this.http.put(`${this.apiUrl}/api/stocks/${encodeURIComponent(produit)}/${taille}`, { quantite }).subscribe({
      next: () => {
        const index = this.stocks.findIndex(s => s.produit_nom === produit && s.taille === taille);
        if (index !== -1) {
          this.stocks[index] = { ...this.stocks[index], quantite };
          this.stocks = [...this.stocks];
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error(err)
    });
  }
}