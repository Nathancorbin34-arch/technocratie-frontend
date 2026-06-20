import { Routes } from '@angular/router';
import { Accueil } from './pages/accueil/accueil';
import { Connexion } from './pages/connexion/connexion';
import { Panier } from './pages/panier/panier';
import { Personnalisation } from './pages/personnalisation/personnalisation';
import { Admin } from './pages/admin/admin';
import { CommandeConfirmee } from './pages/commande-confirmee/commande-confirmee';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';
import { CommandesFermees } from './pages/commandes-fermees/commandes-fermees';
import { MesCommandes } from './pages/mes-commandes/mes-commandes';
import { MentionsLegales } from './pages/mentions-legales/mentions-legales';
import { Cgv } from './pages/cgv/cgv';
import { MotDePasseOublie } from './pages/mot-de-passe-oublie/mot-de-passe-oublie';
import { ReinitialiserMotDePasse } from './pages/reinitialiser-mot-de-passe/reinitialiser-mot-de-passe';

export const routes: Routes = [
  { path: '', component: Accueil },
  { path: 'connexion', component: Connexion },
  { path: 'panier', component: Panier, canActivate: [authGuard] },
  { path: 'personnalisation', component: Personnalisation, canActivate: [authGuard] },
  { path: 'admin', component: Admin, canActivate: [adminGuard] },
  { path: 'commande-confirmee', component: CommandeConfirmee },
  { path: 'commandes-fermees', component: CommandesFermees },
  { path: 'mes-commandes', component: MesCommandes, canActivate: [authGuard] },
  { path: 'mentions-legales', component: MentionsLegales },
  { path: 'cgv', component: Cgv },
  { path: 'mot-de-passe-oublie', component: MotDePasseOublie },
{ path: 'reinitialiser-mot-de-passe', component: ReinitialiserMotDePasse },
];