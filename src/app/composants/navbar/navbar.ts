import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PanierService } from '../../services/panier';

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
    private router: Router
  ) {}

  ngOnInit() {
    const clientStr = localStorage.getItem('client');
    if (clientStr) {
      this.client = JSON.parse(clientStr);
    }
  }

  seDeconnecter() {
    localStorage.removeItem('token');
    localStorage.removeItem('client');
    this.client = null;
    this.router.navigate(['/']);
  }
}