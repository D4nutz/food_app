import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { initializeApp } from '../../../../node_modules/firebase/app';
import { getDatabase, ref, push, child } from '../../../../node_modules/firebase/database';

@Component({
  selector: 'app-product-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.scss'
})
export class ProductBoxComponent {
  @Input() productname: string = '';
  @Input() productimg: string = '';
  @Input() productcategory: string = '';
  @Input() productcurrency: string = '';
  @Input() productoldPrice: string = '';
  @Input() productprice: string = '';
  @Input() productkey: string = '';

  firebaseConfig: Object = {
    apiKey: "AIzaSyBJOWKjzQIW0ButOwxZam4LzJRiJ2L32u0",
    authDomain: "dashboard-disertatie.firebaseapp.com",
    databaseURL: "https://dashboard-disertatie-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "dashboard-disertatie",
    storageBucket: "dashboard-disertatie.firebasestorage.app",
    messagingSenderId: "589123331886",
    appId: "1:589123331886:web:588c47b25a2726a55ffcbf",
    measurementId: "G-2EYTZYVY5T"
  };
  app: any = initializeApp(this.firebaseConfig);
  db: any = getDatabase(this.app);
  productRef: any = ref(this.db, `userProducts`);

  isProductModalToggled: boolean = false;
  productDetails: object = {
    name: this.productname,
    category: this.productcategory,
  };

  constructor () {
  }

  public addCartProduct() {
    let elementToBePushed = {
      "name": this.productname,
      "category": this.productcategory,
      "pieces": 1,
      "img": this.productimg,
      "price": this.productprice,
      "currency": this.productcurrency
    }

    const childRef = child(this.productRef, this.productkey);

    push(childRef, elementToBePushed).then((res: any) => {
      console.log('element pushed', res);
    })
    .catch((error: any) => {
      console.error('Error while pushing the element', error);
    });

    window.postMessage({ type: 'newProductInCart', newProductInCart: true}, window.location.origin);
  }

  public openModal(page: string) {
    switch(page) {
      case 'product_modal':
        this.isProductModalToggled = true;
        window.postMessage({ type: 'productModalToggled', isProductModalToggled: this.isProductModalToggled, productDetails: this.productDetails}, window.location.origin);
        break;
    }
  }
}
