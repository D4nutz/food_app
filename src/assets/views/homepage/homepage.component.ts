import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../widgets/navbar/navbar.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { UserCartComponent } from '../user-cart/user-cart/user-cart.component';
import { ProductsCategoryComponent } from '../products-category/products-category.component';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { UserLoginComponent } from '../user-login/user-login.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    UserProfileComponent,
    UserCartComponent,
    ProductsCategoryComponent,
    ProductModalComponent,
    UserLoginComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  @Input() ismobile = '';
  @Output() selectedcategory:string = 'shirt';
  @Output() searchedproduct:string = '';
  @Output() isprofiletoggled:boolean = false;
  @Output() iscarttoggled:boolean = false;
  @Output() isproductmodaltoggled:boolean = false;
  @Output() newproductincart:boolean = false;
  @Output() isuserloggedin:boolean = false;
  @Output() productdetails:object = [];
  @Output() productscategory:Array<any> = [];

  constructor() {
    if (typeof window !== "undefined") {
      window.addEventListener( "message", ((e) => {
        switch(e.data.type) {
          case "userProfileToggled":
            this.isprofiletoggled = e.data.isProfileToggled;
            break;
          case "userCartToggled":
            this.iscarttoggled = e.data.isCartToggled;
            break;
          case "productModalToggled":
            this.isproductmodaltoggled = e.data.isProductModalToggled;
            this.productdetails = e.data.productDetails;
            break;
          case "newProductInCart":
            this.newproductincart = e.data.newProductInCart;
            break;
          case "searchedProduct":
            this.searchedproduct = e.data.searchedProduct;
            break;
          case "isUserloggedIn":
            this.isuserloggedin = e.data.isUserloggedIn;
            break;
        }
      }));
   }
  }
}
