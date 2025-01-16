import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { StatusPlatform } from '../model/status-platform';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusPlatformService extends BaseService<StatusPlatform> {

  public statusPlatform!: StatusPlatform;

  constructor(http: HttpClient) {
    super(http);
    this.endpoint =  `http://localhost:8080/status_platform`;
  }
}
