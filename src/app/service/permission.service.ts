import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Permission } from '../model/permission';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService extends BaseService<Permission>{

  public permission!: Permission;

  constructor(http: HttpClient) {
    super(http);
    this.endpoint =  `http://localhost:8080/permission`;
  }
}
