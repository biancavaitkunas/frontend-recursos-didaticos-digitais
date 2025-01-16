import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { AppUser } from '../model/app-user';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AppUserService extends BaseService<AppUser> {

  public user!: AppUser;

  constructor(http: HttpClient) {
    super(http);
    this.endpoint =  `http://localhost:8080/app_user`;
  }

  private userSubject = new Subject<AppUser[]>();

  public getUsersByLogin(login: string): Observable<AppUser[]> {
    this.http.get<AppUser[]>(`${this.endpoint}/login/${login}`).subscribe((user) => this.userSubject.next(user));
    return this.userSubject.asObservable();
  }

  public getById(id: number): Observable<AppUser> {
    return this.http.get<AppUser>(`${this.endpoint}/${id}`);
    //return this.userSubject.asObservable();
  }

}
