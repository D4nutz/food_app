import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})


export class UserProfileComponent {
  isProfileToggled: boolean = false;

  consturctor() {
    console.log('loaded'
    )
  }
}



