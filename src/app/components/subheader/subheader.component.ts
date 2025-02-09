import { CommonModule } from '@angular/common';
import {Component, ElementRef, HostListener} from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {UserRole} from '../../model/app-user';

@Component({
  selector: 'app-subheader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subheader.component.html',
  styleUrl: './subheader.component.scss'
})
export class SubheaderComponent {
  currentPageTitle = '';
  sidebarOpen = false;

  constructor(private router: Router, private elementRef: ElementRef, protected readonly authService: AuthService) { }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  navigateTo(route: string) {
    this.currentPageTitle = route;
    this.router.navigate([route]);
    this.sidebarOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.sidebarOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.sidebarOpen = false;
    }
  }

  protected readonly UserRole = UserRole;
}
