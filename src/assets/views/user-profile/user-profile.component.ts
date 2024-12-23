import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})

export class UserProfileComponent implements OnChanges {
  @Input() isprofiletoggled: boolean = false;

  userData: Array<any> = [
    {label: 'First Name', content: 'Joe'},
    {label: 'Last Name', content: 'Doe'},
    {label: 'Gender', content: 'M'},
    {label: 'Date Of Birth', content: '12/06/2024'},
    {label: 'Country', content: 'Romania'},
    {label: 'Phone', content: '053413212131'},
    {label: 'Email', content: 'joeDoe@hotmail.com'},
    {label: 'Orders', content: '69'},
  ];

  constructor() {
  }

  public closeModal(page: string) {
    switch(page) {
      case 'player_profile':
        this.isprofiletoggled = false;
        window.postMessage({ type: 'userProfileToggled', isProfileToggled: this.isprofiletoggled }, window.location.origin);
        break;

    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isprofiletoggled']) {
      console.log(this.isprofiletoggled);
    }
  }
}


