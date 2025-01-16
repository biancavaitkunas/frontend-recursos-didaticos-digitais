import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { PlatformSubfilter } from '../model/platform-subfilter';
import { Platform } from '../model/platform';
import { Subfilter } from '../model/subfilter';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PlatformSubfilterService extends BaseService<PlatformSubfilter> {

  public emitEventPlatformSubfilter = new EventEmitter();

  public platformSubfilter!: PlatformSubfilter;

  constructor(http: HttpClient) {
    super(http);
    this.endpoint =  `http://localhost:8080/platform_subfilter`;
  }

  /*public urlBase = `http://localhost:8080/platform_subfilter`
  private platformSubfilterSubject = new Subject<PlatformSubfilter[]>();
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };*/

  /*public insert(platform: Platform, subfilter: Subfilter): Observable<PlatformSubfilter> {
    this.platformSubfilter.platform = platform;
    this.platformSubfilter.subfilter = subfilter;
    return this.http.post<PlatformSubfilter>(this.urlBase, JSON.stringify(this.platformSubfilter), this.httpOptions).pipe(
        tap(() => {
          this.getFilters();
        })
      );
  }

  public delete(platformSubfilter: PlatformSubfilter): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${platformSubfilter.id}`);
  }

  getFilters(): Observable<PlatformSubfilter[]> {
    this.http
      .get<PlatformSubfilter[]>(this.urlBase)
      .subscribe((platform) => this.platformSubfilterSubject.next(platform));
    return this.platformSubfilterSubject.asObservable();
  }*/
}
