import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Platform } from '../model/platform';
import { BaseService } from './base.service';
import { Subfilter } from '../model/subfilter';
import { PlatformDTO } from '../model/platform-dto';

@Injectable({
  providedIn: 'root'
})
export class PlatformService extends BaseService<Platform> {

  public emitEventPlatform = new EventEmitter();

  public platform!: Platform;
  public plat!: PlatformDTO;

  constructor(http: HttpClient) {
    super(http);
    this.endpoint =  `http://localhost:8080/platform`;
  }

  public urlBase = `http://localhost:8080/platform`
  private platformSubject = new Subject<Platform[]>();
  private platformDtoSubject = new Subject<PlatformDTO>();

  public create(platform: Platform, file: File, subfilters: Subfilter[]): Observable<string> {
    const formData = new FormData();
    formData.append('platform', JSON.stringify(platform));
    formData.append('file', file);
    formData.append('subfilters', JSON.stringify(subfilters, ['id']));
    return this.http.post<string>(`${this.urlBase}/logo`, formData);
  }

  public delete(platform: Platform): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${platform.id}`);
  }

  public getPlatformDTO(platformId: number): Observable<PlatformDTO> {
    this.http
      .get<PlatformDTO>(`${this.urlBase}/dto/${platformId}`)
      .subscribe({
        next: (dto: PlatformDTO) => {
          this.plat = dto;
          this.plat.logo = `data:image/png;base64,${dto.logo}`;
          console.log('LOGO: ' + this.plat.description)

          return this.plat;
            //dto.logo = `data:image/jpeg;base64,${dto.logo}`;
        }
      });
    return this.platformDtoSubject.asObservable();
  }

  public getPlatforms(): Observable<Platform[]> {
    this.http
      .get<Platform[]>(this.urlBase)
      .subscribe((platform) => this.platformSubject.next(platform));
    return this.platformSubject.asObservable();
  }
}
