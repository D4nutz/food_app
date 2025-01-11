import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.scss'
})
export class ProductBoxComponent {
  @Input() productname: string = '';
  @Input() productcategory: string = '';
  @Input() productcurrency: string = '';
  @Input() productoldPrice: string = '';
  @Input() productprice: string = '';

  isProductModalToggled: boolean = false;
  productDetails: object = {
    name: this.productname,
    category: this.productcategory,
  };

  public openModal(page: string) {
    switch(page) {
      case 'product_modal':
        this.isProductModalToggled = true;
        window.postMessage({ type: 'productModalToggled', isProductModalToggled: this.isProductModalToggled, productDetails: this.productDetails}, window.location.origin);
        break;
    }
  }
}
