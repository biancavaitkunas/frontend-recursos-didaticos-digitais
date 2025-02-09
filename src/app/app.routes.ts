import {provideRouter, Routes} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { PlatformRegistrationComponent } from './components/platform-registration/platform-registration.component';
import { FilterRegistrationComponent } from './components/filter-registration/filter-registration.component';
import { UserPermissionsComponent } from './components/user-permissions/user-permissions.component';
import { ViewPlatformComponent } from './components/view-platform/view-platform.component';
import {PlatformListComponent} from './components/platform-list/platform-list.component';
import {PerfilManagerComponent} from './components/perfil-manager/perfil-manager.component';
import {AuthGuard} from './guard/auth-guard';
import {AccessDeniedComponent} from './components/access-denied/access-denied.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'access-denied', component: AccessDeniedComponent, canActivate: [AuthGuard] },
    { path: 'register-form', component: RegisterFormComponent },
    { path: 'cadastro-plataforma', component: PlatformRegistrationComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
    { path: 'cadastro-filtro', component: FilterRegistrationComponent, canActivate: [AuthGuard] },
    { path: 'permissoes-usuario', component: UserPermissionsComponent, canActivate: [AuthGuard] },
    { path: 'plataformas/:id', component: ViewPlatformComponent, canActivate: [AuthGuard] },
    { path: 'plataformas-list', component: PlatformListComponent, canActivate: [AuthGuard] },
    { path: 'perfil', component: PerfilManagerComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' },
];

