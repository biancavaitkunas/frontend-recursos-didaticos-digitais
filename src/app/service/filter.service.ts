import { EventEmitter, Injectable } from '@angular/core';
import { Filter } from '../model/filter';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import {BaseService} from './base.service';
import {Subfilter} from '../model/subfilter';

@Injectable({
  providedIn: 'root'
})
export class FilterService extends BaseService<Filter> {

  public emitEventFilter = new EventEmitter();

  public filter!: Filter;

  constructor(http: HttpClient) {
    super(http);
    this.endpoint =  `http://localhost:8080/filter`;
  }

  getFilters(): Observable<Filter[]> {
    return this.getAll();
  }
}
