import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CollaborationType } from '../model/collaboration-type';

@Injectable({
  providedIn: 'root'
})
export class CollaborationTypeService {

  public emitEventCollaborationType = new EventEmitter();

  public collaborationType!: CollaborationType;

  constructor(private http: HttpClient) {}
  public filterList!: CollaborationType[];

  public urlBase = `http://localhost:8080/collaboration_type`
  private collaborationTypeSubject = new Subject<CollaborationType[]>();
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public getCollaborationTypes(): Observable<CollaborationType[]> {
    this.http
      .get<CollaborationType[]>(this.urlBase)
      .subscribe((collaboration) => this.collaborationTypeSubject.next(collaboration));
    return this.collaborationTypeSubject.asObservable();
  }
}
