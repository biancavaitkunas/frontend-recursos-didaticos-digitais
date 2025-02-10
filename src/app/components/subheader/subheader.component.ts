import { CommonModule } from '@angular/common';
import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {AppUser, UserRole} from '../../model/app-user';

@Component({
  selector: 'app-subheader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subheader.component.html',
  styleUrl: './subheader.component.scss'
})
export class SubheaderComponent implements OnInit {
  currentPageTitle = '';
  sidebarOpen = false;
  currentUser: AppUser | null = null;

  constructor(private router: Router, private elementRef: ElementRef, protected readonly authService: AuthService) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

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

}
