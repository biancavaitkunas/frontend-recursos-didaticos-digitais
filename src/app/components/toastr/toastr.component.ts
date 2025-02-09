import { Component, Input } from '@angular/core';
import {CommonModule, NgClass} from '@angular/common';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss'],
  imports: [
    NgClass,
    CommonModule,
  ],
  standalone: true
})
export class ToastrComponent {
  @Input() message!: string;
  @Input() type: 'success' | 'error' = 'success';
}
