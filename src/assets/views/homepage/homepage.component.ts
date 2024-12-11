import { Component, Input } from '@angular/core';
import { NavbarComponent } from '../../widgets/navbar/navbar.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavbarComponent, UserProfileComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  @Input() ismobile = '';

  constructor() {

  }
}
