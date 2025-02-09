import { Component, OnInit } from '@angular/core';
import { AppUserService } from '../../service/app-user.service';
import { AppUser } from '../../model/app-user';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ToastrService } from '../../service/toastr.service';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private toastrService: ToastrService) { }

  public appUser = {} as AppUser;

  public insertUser() {
    if (this.validateRegistration()) {
      this.authService.register(this.appUser).subscribe(() => {
        this.router.navigate(['/login']);
        this.toastrService.showSuccess('Cadastro realizado com sucesso!');
      });
    }
  }

  private validateRegistration(): boolean {
    if (!this.appUser.firstName || !this.appUser.lastName || !this.appUser.email) {
      this.toastrService.showError('Todos os campos são obrigatórios!');
      return false;
    }
    return true;
  }

  ngOnInit(): void {
  }
}
