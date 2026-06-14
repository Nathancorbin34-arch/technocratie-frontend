import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierService } from '../../services/panier';
import { StocksService } from '../../services/stocks';
import { ParametresService } from '../../services/parametres';

@Component({
  selector: 'app-accueil',
  imports: [CommonModule],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})
export class Accueil implements OnInit {

  constructor(
    private panierService: PanierService,
    private stocksService: StocksService,
    private parametresService: ParametresService,
    private cdr: ChangeDetectorRef
  ) {}

  toast: { message: string, type: 'success' | 'error' } | null = null;
  toastTimeout: any = null;
  stocks: any[] = [];
  commandesOuvertes = true;

  products = [
    {
      id: 1,
      nom: 'Maillot Technocratie',
      prix: '44,99 €',
      images: ['assets/images/technocratie-front.jpg', 'assets/images/technocratie-back.jpg'],
      tailleSelectionnee: ''
    },
    {
      id: 2,
      nom: 'Rawcratie',
      prix: '44,99 €',
      images: ['assets/images/rawcratie-front.jpg', 'assets/images/rawcratie-back.jpg'],
      tailleSelectionnee: ''
    },
    {
      id: 3,
      nom: 'Uptempocratie',
      prix: '44,99 €',
      images: ['assets/images/uptempocratie-front.jpg', 'assets/images/uptempocratie-back.jpg'],
      tailleSelectionnee: ''
    },
    {
      id: 4,
      nom: 'Zaagocratie',
      prix: '44,99 €',
      images: ['assets/images/zaagocratie-front.jpg', 'assets/images/zaagocratie-back.jpg'],
      tailleSelectionnee: ''
    }
  ];

  tailles = ['XS', 'S', 'M', 'L', 'XL'];
  activeImages = [0, 0, 0, 0];
  touchStartX = 0;
  touchEndX = 0;

  ngOnInit() {
    this.stocksService.getStocks().subscribe({
      next: (stocks) => {
        this.stocks = stocks;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erreur stocks:', err)
    });

    this.parametresService.getParametres().subscribe({
      next: (data) => {
        this.commandesOuvertes = data.commandes_ouvertes;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erreur parametres:', err)
    });
  }

  getStock(nomProduit: string, taille: string): number {
    const stock = this.stocks.find(s => s.produit_nom === nomProduit && s.taille === taille);
    return stock ? stock.quantite : 0;
  }

  tailleDisponible(nomProduit: string, taille: string): boolean {
    if (!this.commandesOuvertes) return false;
    return this.getStock(nomProduit, taille) > 0;
  }

  afficherToast(message: string, type: 'success' | 'error') {
    this.toast = { message, type };
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => this.toast = null, 3000);
  }

  nextImage(index: number) {
    this.activeImages[index] = this.activeImages[index] === 0 ? 1 : 0;
    this.updateSlider(index);
  }

  prevImage(index: number) {
    this.activeImages[index] = this.activeImages[index] === 0 ? 1 : 0;
    this.updateSlider(index);
  }

  updateSlider(index: number) {
    const sliders = document.querySelectorAll('.product-image-track');
    const slider = sliders[index] as HTMLElement;
    if (slider) {
      if (this.activeImages[index] === 1) {
        slider.classList.add('show-back');
      } else {
        slider.classList.remove('show-back');
      }
    }
  }

  onTouchStart(event: TouchEvent, index: number) {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent, index: number) {
    this.touchEndX = event.changedTouches[0].clientX;
    const diff = this.touchStartX - this.touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) this.nextImage(index);
      else this.prevImage(index);
    }
  }

  selectionnerTaille(productIndex: number, taille: string) {
    if (!this.commandesOuvertes) return;
    const p = this.products[productIndex];
    if (!this.tailleDisponible(p.nom, taille)) return;
    p.tailleSelectionnee = taille;
  }

  ajouterAuPanier(productIndex: number) {
    if (!this.commandesOuvertes) {
      this.afficherToast('Les commandes ne sont pas ouvertes pour le moment !', 'error');
      return;
    }
    const p = this.products[productIndex];
    if (!p.tailleSelectionnee) {
      this.afficherToast('Sélectionne une taille avant d\'ajouter au panier !', 'error');
      return;
    }
    if (!this.tailleDisponible(p.nom, p.tailleSelectionnee)) {
      this.afficherToast(`${p.nom} en ${p.tailleSelectionnee} n'est plus disponible !`, 'error');
      return;
    }

    const dejaDansPanier = this.panierService.getItems()
      .filter(i => i.nom === p.nom && i.taille === p.tailleSelectionnee)
      .reduce((total, i) => total + i.quantite, 0);

    const stockDispo = this.getStock(p.nom, p.tailleSelectionnee);

    if (dejaDansPanier + 1 > stockDispo) {
      this.afficherToast(`Stock insuffisant ! Il ne reste que ${stockDispo} ${p.nom} en ${p.tailleSelectionnee}`, 'error');
      return;
    }

    this.panierService.ajouterAuPanier({
      id: p.id,
      nom: p.nom,
      prix: p.prix,
      image: p.images[0],
      taille: p.tailleSelectionnee,
      quantite: 1
    });
    this.afficherToast(`✓ ${p.nom} (${p.tailleSelectionnee}) ajouté au panier !`, 'success');
  }
}