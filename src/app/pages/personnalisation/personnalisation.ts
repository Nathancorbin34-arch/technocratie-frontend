import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PanierService, PanierItem } from '../../services/panier';
import { StocksService } from '../../services/stocks';
import { ParametresService } from '../../services/parametres';
import { AuthService } from '../../services/auth';
import { environment } from '../../../environments/environment';

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
  erreurStock: string = '';

  private apiUrl = environment.apiUrl;

  constructor(
    private panierService: PanierService,
    private router: Router,
    private http: HttpClient,
    private stocksService: StocksService,
    private parametresService: ParametresService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const items = this.panierService.getItems();
    if (items.length === 0) {
      this.router.navigate(['/panier']);
      return;
    }
    const expanded: PersonnalisationItem[] = [];
    items.forEach((item: PanierItem) => {
      for (let i = 0; i < item.quantite; i++) {
        expanded.push({
          item: { ...item, quantite: 1 },
          surnom: '',
          numero: ''
        });
      }
    });
    this.personnalisations = expanded;
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
    this.erreurStock = '';

    this.parametresService.getParametres().subscribe({
      next: (data) => {
        if (!data.commandes_ouvertes) {
          this.erreurStock = 'Les commandes ne sont pas ouvertes pour le moment !';
          this.chargement = false;
          this.cdr.detectChanges();
          return;
        }

        const items = this.panierService.getItems();
        this.stocksService.verifierDisponibilite(items).subscribe({
          next: (res) => {
            if (!res.disponible) {
              const msgs = res.indisponibles.map((i: any) =>
                `${i.nom} taille ${i.taille} : seulement ${i.disponible} disponible(s)`
              );
              this.erreurStock = msgs.join(' / ');
              this.chargement = false;
              this.cdr.detectChanges();
              return;
            }

            const itemsPersonnalises = this.personnalisations.map(p => ({
              ...p.item,
              surnom: p.surnom,
              numero: p.numero
            }));

            const clientEmail = this.authService.getClient()?.email;

            this.http.post<any>(`${this.apiUrl}/api/paiement/creer-session`, {
              items: itemsPersonnalises,
              clientEmail
            }).subscribe({
              next: (res) => {
                window.location.href = res.url;
              },
              error: (err) => {
                this.erreurStock = err.error?.message || 'Erreur lors du paiement';
                this.chargement = false;
                this.cdr.detectChanges();
              }
            });
          },
          error: (err) => {
            if (err.error?.indisponibles) {
              const msgs = err.error.indisponibles.map((i: any) =>
                `${i.nom} taille ${i.taille} : seulement ${i.disponible} disponible(s)`
              );
              this.erreurStock = msgs.join(' / ');
            } else {
              this.erreurStock = err.error?.message || 'Stock insuffisant !';
            }
            this.chargement = false;
            this.cdr.detectChanges();
          }
        });
      },
      error: () => {
        this.erreurStock = 'Erreur de connexion au serveur';
        this.chargement = false;
        this.cdr.detectChanges();
      }
    });
  }
}