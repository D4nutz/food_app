import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { initializeApp } from '../../../../node_modules/firebase/app';
import { getDatabase, ref, get } from '../../../../node_modules/firebase/database';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  emailFilled: string = '';
  passwordFilled: string = '';
  isUserloggedIn: boolean = false;
  showPassword: boolean = false;

  usersData: { [key: string]: any } = {};
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
  productRef: any = ref(this.db, 'usersAccounts');

  constructor() {
    this.fetchUserProducts();
  
    if (typeof localStorage !== 'undefined') {
      let loginStatus = localStorage.getItem('alreadyLogginIn');
      if (loginStatus === 'true') {
        this.isUserloggedIn = true;
        window.postMessage({ type: 'isUserloggedIn', isUserloggedIn: this.isUserloggedIn }, window.location.origin);
      }
    } else {
      console.warn('localStorage is not available in this environment.');
    }
  }

  public fetchUserProducts(searchedValue ? : string) {
    get(this.productRef).then((snapshot) => {
      if (snapshot.exists()) {
        this.usersData = snapshot.val();
        console.log(this.usersData);
      } else {
        console.log("No data available");
        this.usersData = {};
      }
    })
    .catch((error) => {
      console.error("Error fetching user products:", error);
    });
  }

  // Handle the form submission for login
  onLoginSubmit(): void {
    Object.values(this.usersData).forEach((acc) => {
      if (this.emailFilled === acc.username && this.passwordFilled === acc.password) {
        this.isUserloggedIn = true;
        localStorage.setItem("alreadyLogginIn", 'true');
        window.postMessage({ type: 'isUserloggedIn', isUserloggedIn: this.isUserloggedIn}, window.location.origin);
      }
    })
  }

  public revealPassword() {
    this.showPassword = !this.showPassword;
  }
}
