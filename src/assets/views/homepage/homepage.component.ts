import { Component, Input, Output } from '@angular/core';
import { NavbarComponent } from '../../widgets/navbar/navbar.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { UserCartComponent } from '../user-cart/user-cart/user-cart.component';
import { ProductsCategoryComponent } from '../products-category/products-category.component';
import { ProductModalComponent } from '../product-modal/product-modal.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NavbarComponent,
    UserProfileComponent,
    UserCartComponent,
    ProductsCategoryComponent,
    ProductModalComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  @Input() ismobile = '';
  @Output() isprofiletoggled:boolean = false;
  @Output() iscarttoggled:boolean = false;
  @Output() isproductmodaltoggled:boolean = false;
  @Output() productdetails:object = [];
  @Output() selectedcategory:string = 'shirt';
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
        }
      }));
   }
  }
}
