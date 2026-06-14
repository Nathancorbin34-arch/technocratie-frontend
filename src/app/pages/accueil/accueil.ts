import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierService } from '../../services/panier';

@Component({
  selector: 'app-accueil',
  imports: [CommonModule],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})
export class Accueil {

  constructor(private panierService: PanierService) {}

  toast: { message: string, type: 'success' | 'error' } | null = null;
  toastTimeout: any = null;

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
    this.products[productIndex].tailleSelectionnee = taille;
  }

  ajouterAuPanier(productIndex: number) {
    const p = this.products[productIndex];
    if (!p.tailleSelectionnee) {
      this.afficherToast('Sélectionne une taille avant d\'ajouter au panier !', 'error');
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