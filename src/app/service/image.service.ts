import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Platform } from '../model/platform';
import { Observable, Subject } from 'rxjs';
import { Image } from '../model/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  public emitEvent = new EventEmitter();
  private endpoint = `http://localhost:8080/image`;

  constructor(private http: HttpClient) {}

  public postImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<string>(this.endpoint, formData);
  } 


  public getLogo(id: number): Observable<Blob> {
    const apiUrl = `http://localhost:8080/image/platform/${id}`;
    return this.http.get(apiUrl, { responseType: 'blob' });
  }
}
