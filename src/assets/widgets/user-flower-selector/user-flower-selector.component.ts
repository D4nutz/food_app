import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-user-flower-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-flower-selector.component.html',
  styleUrl: './user-flower-selector.component.scss'
})
export class UserFlowerSelectorComponent {
  @Input() ismobile = '';
}
