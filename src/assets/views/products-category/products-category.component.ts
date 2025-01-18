import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductBoxComponent } from '../../widgets/product-box/product-box.component';
import { initializeApp } from '../../../../node_modules/firebase/app';
import { getDatabase, ref, get } from '../../../../node_modules/firebase/database';

interface ProductDetails {
  name: string;
  category: string;
  pieces: number; // Use `number` instead of `string` if summing pieces
  price: string;
  currency: string;
}

interface categoryProducts {
  [parentKey: string]: {
    [productKey: string]: ProductDetails;
  };
}

@Component({
  selector: 'app-products-category',
  standalone: true,
  imports: [CommonModule, ProductBoxComponent],
  templateUrl: './products-category.component.html',
  styleUrl: './products-category.component.scss'
})
export class ProductsCategoryComponent implements OnChanges {
  @Input() selectedcategory: string = '';
  @Input() searchedproduct: string = '';

  categoryProducts: categoryProducts = {};
  porductsToBeDisplayed: { [key: string]: any } = {};
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
  productRef: any = ref(this.db, 'categoryProducts');

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchedproduct'] && !changes['searchedproduct'].isFirstChange()) {
      const newValue = changes['searchedproduct'].currentValue;
      this.fetchUserProducts(newValue);
    }
  }

  constructor() {
    this.fetchUserProducts();
  }

  public fetchUserProducts(searchedValue ? : string) {
    get(this.productRef).then((snapshot) => {
      if (snapshot.exists()) {
        this.categoryProducts = snapshot.val();

        if (this.porductsToBeDisplayed) {
          this.porductsToBeDisplayed = {};
        }

        Object.entries(this.categoryProducts).forEach(([parentKey, productParent]) => {
          Object.entries(productParent).forEach(([productKey, product]) => {
            if (this.porductsToBeDisplayed[parentKey]) {
              // If the category already exists, update pieces by summing them up
              this.porductsToBeDisplayed[parentKey].pieces += product.pieces;
            } else {
              if (searchedValue) {
                // If a search value is provided, perform a case-insensitive comparison
                if (product.name.toLowerCase().includes(searchedValue.toLowerCase())) {
                  // Add the product to porductsToBeDisplayed and attach the key
                  this.porductsToBeDisplayed[parentKey] = {
                    ...product, // Shallow copy to ensure no mutations
                    key: parentKey, // Attach the key
                  };
                }
              } else {
                // If no search value is provided, add the product as the first entry for the category
                this.porductsToBeDisplayed[parentKey] = {
                  ...product, // Shallow copy
                  key: parentKey, // Attach the key
                };
              }
            }
          });
        });
        
        
      } else {
        console.log("No data available");
        this.categoryProducts = {};
      }
    })
    .catch((error) => {
      console.error("Error fetching user products:", error);
    });
  }
}
