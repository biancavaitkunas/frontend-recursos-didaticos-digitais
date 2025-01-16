import { Component, ElementRef, HostListener } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isUserMenuOpen = false;
  isShowSearchField = false;

  constructor(private elementRef: ElementRef, private router: Router) {}

  showSearchField() {
    this.isShowSearchField = true;
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.isUserMenuOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.isUserMenuOpen = false;
    }
  }

}
