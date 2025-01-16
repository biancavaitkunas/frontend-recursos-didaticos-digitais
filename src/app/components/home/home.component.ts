import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SubheaderComponent } from "../subheader/subheader.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SubheaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  lastWatched = [
    { logoUrl: 'kahoot-tutorial1.png', name: 'Kahoot' },
    { logoUrl: 'wordwall-tutorial1.png', name: 'Wordwall' },
  ];

  recommended = [
    { logoUrl: 'kahoot-tutorial1.png', name: 'Kahoot' },
    { logoUrl: 'wordwall-tutorial1.png', name: 'Wordwall' },
  ];

  constructor() { }

  ngOnInit(): void { }

  scrollLeft(carouselId: string): void {
    const carousel = document.getElementById(carouselId);
    if (carousel) {
      carousel.scrollBy({ left: -200, behavior: 'smooth' });
    }
  }

  scrollRight(carouselId: string): void {
    const carousel = document.getElementById(carouselId);
    if (carousel) {
      carousel.scrollBy({ left: 200, behavior: 'smooth' });
    }
  }
}
