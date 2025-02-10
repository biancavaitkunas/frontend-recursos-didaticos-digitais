import {AppUser} from './app-user';

export interface LoginResponse {
  token: string;
  appUser: AppUser;
}
