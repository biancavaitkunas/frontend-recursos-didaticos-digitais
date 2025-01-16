import { EventEmitter, Injectable } from '@angular/core';
import { Subfilter } from '../model/subfilter';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Filter } from '../model/filter';

@Injectable({
  providedIn: 'root'
})
export class SubfilterService {

  public emitEventSubfilter = new EventEmitter();

  public subfilter!: Subfilter;

  constructor(private http: HttpClient) {}
  public subfilterList!: Subfilter[];

  public urlBase = `http://localhost:8080/subfilter`
  private subfilterSubject = new Subject<Subfilter[]>();
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public insert(subfilter: Subfilter): Observable<Subfilter> {
    return this.http.post<Subfilter>(this.urlBase, JSON.stringify(subfilter), this.httpOptions).pipe(
        tap(() => {
          this.getSubfilters();
        })
      );
  }

  public delete(subfilter: Subfilter): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${subfilter.id}`);
  }

  public getSubfilters(): Observable<Subfilter[]> {
    this.http
      .get<Subfilter[]>(this.urlBase)
      .subscribe((subfilter) => this.subfilterSubject.next(subfilter));
    return this.subfilterSubject.asObservable();
  }

  getSubfilterByFilter(filter: Filter): Observable<Subfilter[]> {
    let url = `${this.urlBase}/filter/${filter.id}`;
    this.http
      .get<Subfilter[]>(url)
      .subscribe((race) => this.subfilterSubject.next(race));
    return this.subfilterSubject.asObservable();
  }
}
