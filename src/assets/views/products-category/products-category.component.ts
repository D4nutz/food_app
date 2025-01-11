import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductBoxComponent } from '../../widgets/product-box/product-box.component';

@Component({
  selector: 'app-products-category',
  standalone: true,
  imports: [CommonModule, ProductBoxComponent],
  templateUrl: './products-category.component.html',
  styleUrl: './products-category.component.scss'
})
export class ProductsCategoryComponent {
  @Input() selectedcategory: string = '';

  categoryProducts: Array<any> = [
    {name: 'Cotton T-shirt', category: 'Shirt', oldPrice: '50.00', price: '44.00', currency: '€'},
    {name: 'Cotton T-shirt', category: 'Shirt', oldPrice: '50.00', price: '44.00', currency: '€'},
    {name: 'Cotton T-shirt', category: 'Shirt', oldPrice: '50.00', price: '44.00', currency: '€'}
  ];
}
