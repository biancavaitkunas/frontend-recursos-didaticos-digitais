import { EventEmitter, Injectable } from '@angular/core';
import { Filter } from '../model/filter';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterServiceService {

  public emitEventFilter = new EventEmitter();

  public filter!: Filter;

  constructor(private http: HttpClient) {}
  public filterList!: Filter[];

  public urlBase = `http://localhost:8080/filter`
  private filterSubject = new Subject<Filter[]>();
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public insert(filter: Filter): Observable<Filter> {
    return this.http.post<Filter>(this.urlBase, JSON.stringify(filter), this.httpOptions).pipe(
        tap(() => {
          this.getFilters();
        })
      );
  }

  public delete(filter: Filter): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${filter.id}`);
  }

  getFilters(): Observable<Filter[]> {
    this.http
      .get<Filter[]>(this.urlBase)
      .subscribe((filter) => this.filterSubject.next(filter));
    return this.filterSubject.asObservable();
  }
}
