import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accueil',
  imports: [CommonModule],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})
export class Accueil {

  products = [
    {
      nom: 'Maillot Technocratie',
      prix: '44,99 €',
      images: [
        'assets/images/technocratie-front.jpg',
        'assets/images/technocratie-back.jpg'
      ]
    },
    {
      nom: 'Rawcratie',
      prix: '44,99 €',
      images: [
        'assets/images/rawcratie-front.jpg',
        'assets/images/rawcratie-back.jpg'
      ]
    },
    {
      nom: 'Uptempocratie',
      prix: '44,99 €',
      images: [
        'assets/images/uptempocratie-front.jpg',
        'assets/images/uptempocratie-back.jpg'
      ]
    },
    {
      nom: 'Zaagocratie',
      prix: '44,99 €',
      images: [
        'assets/images/zaagocratie-front.jpg',
        'assets/images/zaagocratie-back.jpg'
      ]
    }
  ];

  activeImages = [0, 0, 0, 0];

  nextImage(index: number) {
    this.activeImages[index] =
      this.activeImages[index] === 0 ? 1 : 0;
  }

  prevImage(index: number) {
    this.activeImages[index] =
      this.activeImages[index] === 0 ? 1 : 0;
  }
}