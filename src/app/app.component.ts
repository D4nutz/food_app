import { Component, Inject, PLATFORM_ID, NgModule } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomepageComponent } from '../assets/views/homepage/homepage.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomepageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'food_app';
  ismobile:boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkDevice();
    }
  }

  checkDevice() {
    const minWidth = 768; // Minimum width for desktop devices
    this.ismobile = window.innerWidth < minWidth || screen.width < minWidth;
  }
}



