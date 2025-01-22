import { EventEmitter, Injectable } from '@angular/core';
import { Subfilter } from '../model/subfilter';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Filter } from '../model/filter';
import {BaseService} from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SubfilterService extends BaseService<Subfilter>{

  public emitEventSubfilter = new EventEmitter();

  public subfilter!: Subfilter;

  constructor(http: HttpClient) {
    super(http);
    this.endpoint =  `http://localhost:8080/subfilter`;
  }

  public getSubfilters(): Observable<Subfilter[]> {
    return this.http.get<Subfilter[]>(this.endpoint).pipe(
      tap((subfilters) => this.entitySubject.next(subfilters))
    );
  }

  getSubfilterByFilter(filter: Filter): Observable<Subfilter[]> {
    let url = `${this.endpoint}/filter/${filter.id}`;
    return this.http.get<Subfilter[]>(url).pipe(
      tap((subfilters) => this.entitySubject.next(subfilters))
    );
  }

}
