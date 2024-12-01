import { Component, Input } from '@angular/core';
import { NavbarComponent } from '../../widgets/navbar/navbar.component';
import { UserFlowerSelectorComponent } from '../../widgets/user-flower-selector/user-flower-selector.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavbarComponent, UserFlowerSelectorComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  @Input() ismobile = '';
}
