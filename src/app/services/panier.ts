import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface PanierItem {
  id: number;
  nom: string;
  prix: string;
  image: string;
  taille: string;
  quantite: number;
}

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  private items: PanierItem[] = this.chargerDepuisStorage();
  private panierSubject = new BehaviorSubject<PanierItem[]>(this.items);
  panier$ = this.panierSubject.asObservable();

  private chargerDepuisStorage(): PanierItem[] {
    try {
      const data = localStorage.getItem('panier');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private sauvegarderDansStorage() {
    localStorage.setItem('panier', JSON.stringify(this.items));
  }

  ajouterAuPanier(item: PanierItem) {
    const existant = this.items.find(
      i => i.id === item.id && i.taille === item.taille
    );
    if (existant) {
      existant.quantite += 1;
    } else {
      this.items.push({ ...item, quantite: 1 });
    }
    this.panierSubject.next([...this.items]);
    this.sauvegarderDansStorage();
  }

  supprimerDuPanier(id: number, taille: string) {
    this.items = this.items.filter(
      i => !(i.id === id && i.taille === taille)
    );
    this.panierSubject.next([...this.items]);
    this.sauvegarderDansStorage();
  }

  viderPanier() {
    this.items = [];
    this.panierSubject.next([]);
    this.sauvegarderDansStorage();
  }

  getNombreItems(): number {
    return this.items.reduce((total, i) => total + i.quantite, 0);
  }

  getTotal(): number {
    return this.items.reduce((total, i) => {
      const prix = parseFloat(i.prix.replace(',', '.').replace(' €', ''));
      return total + prix * i.quantite;
    }, 0);
  }

  getItems(): PanierItem[] {
    return [...this.items];
  }
}