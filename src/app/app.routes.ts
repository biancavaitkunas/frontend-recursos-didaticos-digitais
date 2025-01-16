import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { PlatformRegistrationComponent } from './components/platform-registration/platform-registration.component';
import { FilterRegistrationComponent } from './components/filter-registration/filter-registration.component';
import { UserPermissionsComponent } from './components/user-permissions/user-permissions.component';
import { ViewPlatformComponent } from './components/view-platform/view-platform.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'register-form', component: RegisterFormComponent },
    { path: 'cadastro-plataforma', component: PlatformRegistrationComponent },
    { path: 'cadastro-filtro', component: FilterRegistrationComponent },
    { path: 'permissoes-usuario', component: UserPermissionsComponent },
    { path: 'plataformas', component: ViewPlatformComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' },
];
