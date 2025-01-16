import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";
import { SubheaderComponent } from "../subheader/subheader.component";
import { AppUser } from '../../model/app-user';
import { AppUserService } from '../../service/app-user.service';
import { CollaborationType } from '../../model/collaboration-type';
import { CollaborationTypeService } from '../../service/collaboration-type.service';
import { PermissionService } from '../../service/permission.service';
import { Permission } from '../../model/permission';

@Component({
  selector: 'app-user-permissions',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, SubheaderComponent],
  templateUrl: './user-permissions.component.html',
  styleUrl: './user-permissions.component.scss'
})
export class UserPermissionsComponent implements OnInit {

  constructor(private userService: AppUserService, private collaborationTypeService: CollaborationTypeService, private permissionService: PermissionService) { }

  users!: AppUser[];
  collaborationTypes!: CollaborationType[];
  permissions!: Permission[];
  usersSearch!: AppUser[];
  searchResults!: AppUser[];
  searchQuery: string = '';
  selectedUser!: AppUser;
  permissionsModalOpen: boolean = false;
  searchModalOpen: boolean = false;

  openPermissionsModal(user: AppUser) {
    this.selectedUser = user;
    this.permissionsModalOpen = true;
  }

  closePermissionsModal() {
    this.permissionsModalOpen = false;
    //this.selectedUser = null;
  }

  savePermissions() {
    console.log('Permissões salvas para:', this.selectedUser);
    this.closePermissionsModal();
  }

  openSearchModal() {
    this.searchModalOpen = true;
  }

  closeSearchModal() {
    this.searchModalOpen = false;
    this.searchQuery = '';
    this.searchResults = [];
  }

  public searchUsers(login: string) {
    this.userService.getUsersByLogin(login).subscribe((data) => this.searchResults = data);
  }

  ngOnInit(): void {
    this.userService.getAll().subscribe((data) => {this.users = data})
    this.userService.emitEvent.subscribe((data) => { this.users = data });
    this.collaborationTypeService.getCollaborationTypes().subscribe((data) => {this.collaborationTypes = data})
    this.collaborationTypeService.emitEventCollaborationType.subscribe((data) => { this.collaborationTypes = data });
    this.permissionService.getAll().subscribe((data) => {this.permissions = data})
    this.permissionService.emitEvent.subscribe((data) => { this.permissions = data });
  }
}
