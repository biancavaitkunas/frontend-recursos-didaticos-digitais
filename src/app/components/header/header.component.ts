import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isUserMenuOpen = false;
  isShowSearchField = false;
  welcomeMessage!: string;

  constructor(private elementRef: ElementRef, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(currentUser => {
      const welcome = currentUser.gender == 'F' ? 'Bem-vinda' : 'Bem-vindo';
      this.welcomeMessage = `${welcome}, ${currentUser.firstName}!`
    });
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.authService.logout();
    this.navigateTo('/login');
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.isUserMenuOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.isUserMenuOpen = false;
    }
  }

}
