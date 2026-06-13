import { Routes } from '@angular/router';
import { Accueil } from './pages/accueil/accueil';
import { Connexion } from './pages/connexion/connexion';
import { Panier } from './pages/panier/panier';
import { Personnalisation } from './pages/personnalisation/personnalisation';
import { Admin } from './pages/admin/admin';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
  { path: '', component: Accueil },
  { path: 'connexion', component: Connexion },
  { path: 'panier', component: Panier, canActivate: [authGuard] },
  { path: 'personnalisation', component: Personnalisation, canActivate: [authGuard] },
  { path: 'admin', component: Admin, canActivate: [adminGuard] },
];