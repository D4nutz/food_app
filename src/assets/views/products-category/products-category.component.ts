import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductBoxComponent } from '../../widgets/product-box/product-box.component';
import { initializeApp } from '../../../../node_modules/firebase/app';
import { getDatabase, ref, get } from '../../../../node_modules/firebase/database';

@Component({
  selector: 'app-products-category',
  standalone: true,
  imports: [CommonModule, ProductBoxComponent],
  templateUrl: './products-category.component.html',
  styleUrl: './products-category.component.scss'
})
export class ProductsCategoryComponent {
  @Input() selectedcategory: string = '';
  categoryProducts: Array<any> = [];
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

  constructor() {
    this.fetchUserProducts();
  }

  public fetchUserProducts() {
    get(this.productRef).then((snapshot) => {
      if (snapshot.exists()) {
        this.categoryProducts = snapshot.val();
      } else {
        console.log("No data available");
        this.categoryProducts = [];
      }
    })
    .catch((error) => {
      console.error("Error fetching user products:", error);
    });
  }
}
