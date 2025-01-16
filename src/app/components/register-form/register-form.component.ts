import { Component, OnInit } from '@angular/core';
import { AppUserService } from '../../service/app-user.service';
import { AppUser } from '../../model/app-user';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ToastrService } from '../../service/toastr.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent implements OnInit {

  constructor(private router: Router, private userService: AppUserService, private toastrService: ToastrService) { }

  public user = {} as AppUser;

  public insertUser() {
    if (this.validateRegistration()) {
      this.userService.insert(this.user).subscribe(() => {
        this.onLogin
      });
    }
  }

  onLogin() {
    const isAuthenticated = true;

    if (isAuthenticated) {
      this.router.navigate(['/home']);
    } else {
      console.error('Login falhou');
    }
  }

  private validateRegistration(): boolean {
    if (this.user.firstName = '') {
      this.toastrService.showSuccess('Filtro salvo!');
      return false;
    }
    return true;
  }

  ngOnInit(): void {
    this.userService.emitEvent.subscribe((data) => { this.user = data });
  }
}
