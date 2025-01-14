import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { initializeApp } from '../../../../../node_modules/firebase/app';
import { getDatabase, ref, onValue, remove, get, set, update, orderByChild, query } from '../../../../../node_modules/firebase/database';

@Component({
  selector: 'app-user-cart',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './user-cart.component.html',
  styleUrl: './user-cart.component.scss'
})
export class UserCartComponent {
  @Input() iscarttoggled: boolean = false;
  userProducts:Array<any> = [];
  firebaseConfig:Object = {
    apiKey: "AIzaSyBJOWKjzQIW0ButOwxZam4LzJRiJ2L32u0",
    authDomain: "dashboard-disertatie.firebaseapp.com",
    databaseURL: "https://dashboard-disertatie-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "dashboard-disertatie",
    storageBucket: "dashboard-disertatie.firebasestorage.app",
    messagingSenderId: "589123331886",
    appId: "1:589123331886:web:588c47b25a2726a55ffcbf",
    measurementId: "G-2EYTZYVY5T"
  };

  app:any = initializeApp(this.firebaseConfig);
  db:any = getDatabase(this.app);
  productRef:any = ref(this.db, 'userProducts');

  constructor() {
    this.fetchUserProducts();
  }

  public fetchUserProducts() {
    get(this.productRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.userProducts = snapshot.val();
        } else {
          console.log("No data available");
          this.userProducts = [];
        }
      })
      .catch((error) => {
        console.error("Error fetching user products:", error);
      });
  }

  public deleteProduct(index: number) {
    // Remove the product from the local array
    this.userProducts.splice(index, 1);
  
    // Reference the entire `userProducts` node in the database
    const itemRef = ref(this.db, `userProducts`);
  
    // Replace the array in Firebase with the updated array
    set(itemRef, this.userProducts)
      .then(() => {
        console.log('Product deleted successfully');
        this.fetchUserProducts(); // Refresh the local list
      })
      .catch((error) => {
        console.error("Error removing product: ", error);
      });
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
