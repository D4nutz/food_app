import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductBoxComponent } from '../../widgets/product-box/product-box.component';
import { initializeApp } from '../../../../node_modules/firebase/app';
import { getDatabase, ref, onValue, get, set, update, orderByChild, query } from '../../../../node_modules/firebase/database';

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

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyBJOWKjzQIW0ButOwxZam4LzJRiJ2L32u0",
      authDomain: "dashboard-disertatie.firebaseapp.com",
      databaseURL: "https://dashboard-disertatie-default-rtdb.europe-west1.firebasedatabase.app/",
      projectId: "dashboard-disertatie",
      storageBucket: "dashboard-disertatie.firebasestorage.app",
      messagingSenderId: "589123331886",
      appId: "1:589123331886:web:588c47b25a2726a55ffcbf",
      measurementId: "G-2EYTZYVY5T"
    };

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    const productRef = ref(db, 'categoryProducts');

    onValue( productRef, (snapshot) =>{
      this.categoryProducts = snapshot.val();
    });
  }
}
