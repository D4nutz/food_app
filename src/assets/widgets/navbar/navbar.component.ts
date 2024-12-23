import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchBarComponent, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {
  @Input() ismobile = '';

  isProfileToggled: boolean = false;
  

  constructor() {

  }

  public openModal(page: string) {
    switch(page) {
      case 'player_profile':
        this.isProfileToggled = true;
        window.postMessage({ type: 'userProfileToggled', isProfileToggled: this.isProfileToggled }, window.location.origin);
        break;

    }
  }
}



