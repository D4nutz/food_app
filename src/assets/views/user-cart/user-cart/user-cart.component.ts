import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-cart',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './user-cart.component.html',
  styleUrl: './user-cart.component.scss'
})
export class UserCartComponent {
  @Input() iscarttoggled: boolean = false;

  userProducts: Array<any> = [
    {name: 'Cotton T-shirt', category: 'Shirt', pieces: '1', price: '44.00', currency: '€'},
    {name: 'Cotton T-shirt', category: 'Shirt', pieces: '1', price: '44.00', currency: '€'},
    {name: 'Cotton T-shirt', category: 'Shirt', pieces: '1', price: '44.00', currency: '€'}
  ];

  constructor() {
  }

  public closeModal(page: string) {
    switch(page) {
      case 'user_cart':
        this.iscarttoggled = false;
        window.postMessage({ type: 'userCartToggled', isCartToggled: this.iscarttoggled }, window.location.origin);
        break;
    }
  }
}
