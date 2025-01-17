import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [MatIconModule, CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  searchInnerValue: string = '';
  private searchSubject = new Subject<string>();

  constructor() {
    // Subscribe to the searchSubject and debounce the user input
    this.searchSubject.pipe(debounceTime(300)).subscribe(searchTerm => {
      this.searchProduct(searchTerm);
    });
  }

  onSearchInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.searchSubject.next(input); // Emit the input value to the subject
  }

  searchProduct(searchTerm: string): void {
    window.postMessage({ type: 'searchedProduct', searchedProduct: searchTerm}, window.location.origin);
    // Perform the actual search logic here
  }
}
