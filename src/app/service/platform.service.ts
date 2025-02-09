import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject, tap} from 'rxjs';
import { Platform } from '../model/platform';
import { BaseService } from './base.service';
import { PlatformDTO } from '../model/platform-dto';
import {Subfilter} from '../model/subfilter';

@Injectable({
  providedIn: 'root'
})
export class PlatformService extends BaseService<Platform> {

  public emitEventPlatform = new EventEmitter();
  public platform!: Platform;
  public plat!: PlatformDTO;

  constructor(http: HttpClient) {
    super(http);
    this.endpoint = `http://localhost:8080/platform`;
  }

  public urlBase = `http://localhost:8080/platform`;
  private platformSubject = new Subject<Platform[]>();
  private platformDtoSubject = new Subject<PlatformDTO>();
  private platformsDtoSubject = new Subject<PlatformDTO[]>();

  private platformBehaviorSubject = new BehaviorSubject<Platform>({} as Platform);
  platform$ = this.platformSubject.asObservable();

  public create(formData: FormData, subfilters: Subfilter[]): Observable<string> {
    formData.append('subfilters', JSON.stringify(subfilters, ['id']));
    return this.http.post<string>(`${this.urlBase}/logo`, formData);
  }

  public getPlatformDTO(platformId: number): Observable<PlatformDTO> {
    return this.http.get<PlatformDTO>(`${this.urlBase}/dto/${platformId}`).pipe(
      tap((dto: PlatformDTO) => {
        this.plat = dto;
        this.plat.logo = `data:image/png;base64,${dto.logo}`;
        this.plat.presentationImage = `data:image/png;base64,${dto.presentationImage}`;
        this.plat.textTutorial = `data:image/png;base64,${dto.textTutorial}`;
        this.platformDtoSubject.next(this.plat);
      })
    );
  }

  public getAllPlatformsDTO(): Observable<PlatformDTO[]> {
    return this.http.get<PlatformDTO[]>(`${this.urlBase}/dto/list`).pipe(
      tap((dtos: PlatformDTO[]) => {
        dtos.forEach(dto => {
          dto.logo = `data:image/png;base64,${dto.logo}`;
          dto.presentationImage = `data:image/png;base64,${dto.presentationImage}`;
          dto.textTutorial = `data:image/png;base64,${dto.textTutorial}`;
        });
        this.platformsDtoSubject.next(dtos);
      })
    );
  }

  public getPlatforms(): Observable<Platform[]> {
    this.http
      .get<Platform[]>(this.urlBase)
      .subscribe((platform) => this.platformSubject.next(platform));
    return this.platformSubject.asObservable();
  }

  updatePlatform(updatedPlatform: Platform) {
    this.platformBehaviorSubject.next(updatedPlatform);
  }

  getCurrentPlatform(): Platform {
    return this.platformBehaviorSubject.getValue();
  }
}
