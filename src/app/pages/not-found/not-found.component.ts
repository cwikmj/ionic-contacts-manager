import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class NotFoundComponent {

  constructor(private router: Router) { }

  goToContacts() {
    this.router.navigate(['/contacts']);
  }
}
