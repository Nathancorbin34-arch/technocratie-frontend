import { Routes } from '@angular/router';
import { Accueil } from './pages/accueil/accueil';
import { Connexion } from './pages/connexion/connexion';
import { Panier } from './pages/panier/panier';
import { Personnalisation } from './pages/personnalisation/personnalisation';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Accueil },
  { path: 'connexion', component: Connexion },
  { path: 'panier', component: Panier, canActivate: [authGuard] },
  { path: 'personnalisation', component: Personnalisation, canActivate: [authGuard] },
];