import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss'
})
export class ProductModalComponent implements OnChanges {
  @Input() isproductmodaltoggled: boolean = false;
  @Input() productdetails: object = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productdetails']) {
      console.log(this.productdetails);
    }
  }

  public closeModal(page: string) {
    switch(page) {
      case 'user_cart':
        this.isproductmodaltoggled = false;
        window.postMessage({ type: 'productModalToggled', isProductModalToggled: this.isproductmodaltoggled }, window.location.origin);
        break;
    }
  }
}
