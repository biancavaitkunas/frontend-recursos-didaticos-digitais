import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {
  public emitEvent = new EventEmitter();
  protected endpoint!: string;

  constructor(protected http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public insert(entity: T): Observable<T> {
    return this.http.post<T>(this.endpoint, JSON.stringify(entity), this.httpOptions).pipe(
        tap(() => {
          this.getAll();
        })
      );
  }

  public getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.endpoint);
  }

  public get(id: number): Observable<T> {
    return this.http.get<T>(`${this.endpoint}/${id}`);
  }
}
