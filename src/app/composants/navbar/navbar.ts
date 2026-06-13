import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PanierService } from '../../services/panier';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  client: any = null;

  constructor(
    public panierService: PanierService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.client$.subscribe(client => {
      this.client = client;
    });
  }

  seDeconnecter() {
    this.authService.deconnecter();
    this.router.navigate(['/']);
  }
}