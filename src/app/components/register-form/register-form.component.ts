import {Component, OnInit} from '@angular/core';
import {AppUser} from '../../model/app-user';
import {FormsModule} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {ToastrService} from '../../service/toastr.service';
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
      this.authService.register(this.appUser).subscribe({
        next: (user: AppUser) => {
          if (user) {
            this.toastrService.showSuccess('Cadastro realizado com sucesso!');
            this.router.navigate(['/login']);
          } else {
            this.toastrService.showError('Erro inesperado ao cadastrar. Tente novamente.');
          }
        },
        error: (err) => {
          this.toastrService.showError('Erro ao cadastrar: ' + (err.error?.message || 'Tente novamente mais tarde.'));
        }
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
