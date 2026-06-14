import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-commande-confirmee',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './commande-confirmee.html',
  styleUrl: './commande-confirmee.css'
})
export class CommandeConfirmee implements OnInit {
  sessionId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sessionId = this.route.snapshot.queryParamMap.get('session_id');
  }
}