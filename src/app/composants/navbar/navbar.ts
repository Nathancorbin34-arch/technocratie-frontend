import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule, AsyncPipe } from '@angular/common';
import { PanierService } from '../../services/panier';
import { AuthService } from '../../services/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule, AsyncPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  client: any = null;
  nombreItems$!: Observable<number>;

  constructor(
    public panierService: PanierService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.client$.subscribe(client => {
      this.client = client;
    });
    this.nombreItems$ = this.panierService.panier$.pipe(
      map(items => items.reduce((total, i) => total + i.quantite, 0))
    );
  }

  seDeconnecter() {
    this.authService.deconnecter();
    this.router.navigate(['/']);
  }
}