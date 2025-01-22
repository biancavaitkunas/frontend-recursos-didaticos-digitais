import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends { id: number }> {
  public emitEvent = new EventEmitter();
  protected endpoint!: string;
  public entitySubject = new BehaviorSubject<T[]>([]);

  constructor(protected http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public insert(entity: T): Observable<T> {
    return this.http.post<T>(this.endpoint, JSON.stringify(entity), this.httpOptions).pipe(
        tap((newItem) => {
          const updatedItems = [...this.entitySubject.value, newItem]; // Adiciona o novo item
          this.entitySubject.next(updatedItems);
        //  this.getAll();
        })
      );
  }

  public getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.endpoint);
  }

  public get(id: number): Observable<T> {
    return this.http.get<T>(`${this.endpoint}/${id}`);
  }

  public update(entity: T): Observable<T> {
    return this.http.put<T>(`${this.endpoint}/${entity.id}`, entity, this.httpOptions).pipe(
      tap((updatedEntity) => {
        const updatedItems = this.entitySubject.value.map(item =>
          item.id === updatedEntity.id ? updatedEntity : item
        );
        this.entitySubject.next(updatedItems);
      })
    );
  }

  delete(entity: T): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${entity.id}`).pipe(
      tap(() => {
        this.entitySubject.next(this.entitySubject.value.filter(i => i.id !== entity.id));
      })
    );
  }
}
