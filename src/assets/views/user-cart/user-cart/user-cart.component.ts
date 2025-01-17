import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { initializeApp } from '../../../../../node_modules/firebase/app';
import { getDatabase, ref, get } from '../../../../../node_modules/firebase/database';
import mqtt from 'mqtt';

interface ProductDetails {
  name: string;
  category: string;
  pieces: number; // Use `number` instead of `string` if summing pieces
  price: string;
  currency: string;
}

interface UserProducts {
  [parentKey: string]: {
    [productKey: string]: ProductDetails;
  };
}

@Component({
  selector: 'app-user-cart',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './user-cart.component.html',
  styleUrl: './user-cart.component.scss'
})
export class UserCartComponent {
  @Input() iscarttoggled: boolean = false;
  @Input() newproductincart: boolean = false;
  
  userProducts: UserProducts = {};
  arrayByCategory: { [key: string]: any } = {};
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

  app:any = initializeApp(this.firebaseConfig);
  db:any = getDatabase(this.app);
  productRef:any = ref(this.db, 'userProducts');

  mqttClient:any;
  constructor() {
    this.fetchUserProducts();
    
    if (typeof window !== "undefined") {
      window.addEventListener( "message", ((e) => {
        switch(e.data.type) {
          case "newProductInCart":
            this.newproductincart = e.data.newProductInCart;
            this.fetchUserProducts();
            break;
        }
      }));
   }
  }
  
  public publishMessage() {
    console.log(mqtt);
    this.mqttClient = mqtt.connect('ws://broker.emqx.io:8083/mqtt'); // sau alt broker pe care îl folosești
  
    this.mqttClient.on('connect', () => {
      console.log('Conectat la brokerul MQTT!');
      this.mqttClient.publish('magazinRobotizat/comenzi', `Comanda este ${JSON.stringify(this.arrayByCategory)}`);
    });
  
    this.mqttClient.on('error', (err:any) => {
      console.error('Eroare MQTT:', err);
    });
  }

  public fetchUserProducts() {
    get(this.productRef).then((snapshot) => {
      if (snapshot.exists()) {
        this.userProducts = snapshot.val();

        if (this.arrayByCategory) {
          this.arrayByCategory = {};
        }

        Object.entries(this.userProducts).forEach(([parentKey, productParent]) => {
          Object.entries(productParent).forEach(([productKey, product]) => {
            if (this.arrayByCategory[parentKey]) {
              // Update pieces by summing up
              this.arrayByCategory[parentKey].pieces += product.pieces;
            } else {
              // Initialize category with the first product
              this.arrayByCategory[parentKey] = { ...product }; // Use a shallow copy
            }
          });
        });
        
      } else {
        console.log("No data available");
        this.userProducts = {};
      }
    })
    .catch((error) => {
      console.error("Error fetching user products:", error);
    });
  }

  // public deleteProduct(index: number) {
  //   // Remove the product from the local array
  //   this.userProducts.splice(index, 1);
  
  //   // Reference the entire `userProducts` node in the database
  //   const itemRef = ref(this.db, `userProducts`);
  
  //   // Replace the array in Firebase with the updated array
  //   set(itemRef, this.userProducts)
  //     .then(() => {
  //       console.log('Product deleted successfully');
  //       this.fetchUserProducts(); // Refresh the local list
  //     })
  //     .catch((error) => {
  //       console.error("Error removing product: ", error);
  //     });
  // }
  
  public closeModal(page: string) {
    switch(page) {
      case 'user_cart':
        this.iscarttoggled = false;
        window.postMessage({ type: 'userCartToggled', isCartToggled: this.iscarttoggled }, window.location.origin);
        break;
    }
  }

}
