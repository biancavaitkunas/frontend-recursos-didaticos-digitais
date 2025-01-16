import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SubheaderComponent } from "../subheader/subheader.component";
import { FormsModule } from '@angular/forms';
import { FilterServiceService } from '../../service/filter-service.service';
import { Filter } from '../../model/filter';
import { SubfilterService } from '../../service/subfilter.service';
import { Subfilter } from '../../model/subfilter';
import { ToastrService } from '../../service/toastr.service';

@Component({
  selector: 'app-filter-registration',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SubheaderComponent, FormsModule],
  templateUrl: './filter-registration.component.html',
  styleUrls: ['./filter-registration.component.scss']
})
export class FilterRegistrationComponent implements OnInit {

  public emitEventFilter = new EventEmitter();
  public emitEventSubfilter = new EventEmitter();

  constructor(private filterService: FilterServiceService, private subfilterService: SubfilterService, private toastrService: ToastrService) {}

  public filter = {} as Filter
  public subfilter = {} as Subfilter
  public filters!: Filter[];
  public subfilters!: Subfilter[];

  selectedFilter: any = null;
  selectedSubfilters!: Subfilter[];
  newSubfilterName: string = '';
  showNewFilterInput: boolean = false;
  showNewSubfilterInput: boolean = false;

  public insertFilter() {
    this.filterService.insert(this.filter).subscribe(() => {
      this.toastrService.showSuccess('Filtro salvo!');
      this.showNewSubfilterInput = false;
    });
  }

  public insertSubfilter() {
    this.subfilter.filter = this.selectedFilter;
    this.subfilterService.insert(this.subfilter).subscribe(() => {
      this.newSubfilterName = '';
      this.showNewSubfilterInput = false;
      this.toastrService.showSuccess('Subfiltro salvo!');
    })
  }

  selectFilter(filter: any) {
    this.selectedFilter = filter;
    this.getSubfilterByFilter();
  }

  addNewFilter(appear: boolean) {
    this.showNewFilterInput = appear;
  }

  addNewSubfilter(appear: boolean) {
    this.showNewSubfilterInput = appear;
  }

  editFilter(filter: any) {
    // Lógica para editar o filtro
  }

  editSubfilter(subfilter: number) {
    // Lógica para editar o subfiltro
  }

  removeFilter(filter: Filter) {
    this.filterService.delete(filter).subscribe();
  }

  removeSubfilter(subfilter: Subfilter) {
    this.subfilterService.delete(subfilter).subscribe();
  }

  public getSubfilterByFilter() {
    this.subfilterService.getSubfilterByFilter(this.selectedFilter).subscribe((data) => { this.selectedSubfilters = data });
  }

  ngOnInit(): void {
    this.filterService.getFilters().subscribe((data) => {this.filters = data})
    this.subfilterService.getSubfilters().subscribe((data) => {this.subfilters = data})
    this.filterService.emitEventFilter.subscribe((data) => { this.filter = data });
    this.subfilterService.emitEventSubfilter.subscribe((data) => { this.subfilter = data });
  }
}
