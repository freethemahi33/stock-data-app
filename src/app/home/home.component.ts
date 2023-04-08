import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  searchSymbol: string = '';

  constructor(private router: Router) {}

  search() {
    this.router.navigate(['/data', this.searchSymbol]);
  }
}

