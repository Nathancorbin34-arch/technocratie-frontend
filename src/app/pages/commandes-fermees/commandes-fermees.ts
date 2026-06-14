import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-commandes-fermees',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './commandes-fermees.html',
  styleUrl: './commandes-fermees.css'
})
export class CommandesFermees {}