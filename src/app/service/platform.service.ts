import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
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

  public create(platform: Platform, file: File, subfilters: Subfilter[]): Observable<string> {
    const formData = new FormData();
    formData.append('platform', JSON.stringify(platform));
    formData.append('file', file);
    formData.append('subfilters', JSON.stringify(subfilters, ['id']));
    return this.http.post<string>(`${this.urlBase}/logo`, formData);
  }

  public getPlatformDTO(platformId: number): Observable<PlatformDTO> {
    return this.http.get<PlatformDTO>(`${this.urlBase}/dto/${platformId}`).pipe(
      tap((dto: PlatformDTO) => {
        this.plat = dto;
        this.plat.logo = `data:image/png;base64,${dto.logo}`; // Aqui convertemos o logo para o formato correto
        this.platformDtoSubject.next(this.plat); // Emite os dados corretamente
      })
    );
  }

  public getAllPlatformsDTO(): Observable<PlatformDTO[]> {
    return this.http.get<PlatformDTO[]>(`${this.urlBase}/dto/list`).pipe(
      tap((dtos: PlatformDTO[]) => {
        // Para cada plataforma na lista, convertemos a logo para o formato correto
        dtos.forEach(dto => {
          dto.logo = `data:image/png;base64,${dto.logo}`;
        });
        this.platformsDtoSubject.next(dtos); // Emite a lista atualizada de plataformas
      })
    );
  }

  public getPlatforms(): Observable<Platform[]> {
    this.http
      .get<Platform[]>(this.urlBase)
      .subscribe((platform) => this.platformSubject.next(platform));
    return this.platformSubject.asObservable();
  }
}
