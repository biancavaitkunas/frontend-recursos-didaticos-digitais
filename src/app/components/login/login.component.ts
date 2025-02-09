import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {ToastrService} from '../../service/toastr.service';
import {LoadingComponent} from '../loading/loading.component';
import {LoadingService} from '../../service/loading.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username!: string;
  password!: string;
  loading = false;

  constructor(private router: Router, private readonly authService: AuthService, private toastrService: ToastrService, private loadingService: LoadingService) {
  }

  login() {
    if (!this.validateForm()) return;

    this.loadingService.show();
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.toastrService.showSuccess('Login realizado com sucesso!');
        this.router.navigate(['/home']);
        this.loadingService.hide();
      },
      error: (error) => {
        this.toastrService.showError(error.message);
        this.loading = false;
        this.loadingService.hide();
      }
    });
  }

  private validateForm(): boolean {
    if (!this.username) {
      this.toastrService.showError('Usuário obrigatório!')
      return false;
    }

    if (!this.password) {
      this.toastrService.showError('Senha obrigatória!')
      return false;
    }

    return true;
  }
}
