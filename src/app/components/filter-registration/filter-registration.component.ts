import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SubheaderComponent } from "../subheader/subheader.component";
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../service/filter.service';
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

  constructor(private filterService: FilterService, private subfilterService: SubfilterService, private toastrService: ToastrService) {}

  public filter = {} as Filter
  public subfilter = {} as Subfilter
  public filters!: Filter[];
  public subfilters!: Subfilter[];

  selectedFilter = {} as Filter;
  selectedSubfilters!: Subfilter[];
  showNewFilterInput: boolean = false;
  showNewSubfilterInput: boolean = false;
  editingFilterId: number | null = null;
  editingSubfilterId: number | null = null;

  insertFilter() {
    this.filterService.insert(this.filter).subscribe(() => {
      this.toastrService.showSuccess('Filtro salvo!');
      this.filter.description = '';
      this.showNewFilterInput = false;
    });
  }

  insertSubfilter() {
    this.subfilter.filter = this.selectedFilter;

    this.subfilterService.insert(this.subfilter).subscribe(() => {
      this.subfilter.description = '';
      this.showNewSubfilterInput = false;
      this.toastrService.showSuccess('Subfiltro salvo!');
    });
  }

  updateSubfilter(subfilter: Subfilter) {
    this.subfilterService.update(subfilter).subscribe(() => {
      this.toastrService.showSuccess('Subfiltro atualizado!');
      this.editingSubfilterId = null;
    });
  }

  updateFilter(filter: Filter) {
    this.filterService.update(filter).subscribe(() => {
      this.toastrService.showSuccess('Filtro atualizado!');
      this.editingSubfilterId = null;
    });
  }

  selectFilter(filter: Filter) {
    this.selectedFilter = filter;
    this.getSubfilterByFilter();
  }

  addNewFilter(appear: boolean) {
    this.showNewFilterInput = appear;
  }

  addNewSubfilter(appear: boolean) {
    this.showNewSubfilterInput = appear;
  }

  editFilter(filter: Filter) {
    this.editingSubfilterId = filter.id;
  }

  editSubfilter(subfilter: Subfilter) {
    this.editingSubfilterId = subfilter.id;
  }

  removeFilter(filter: Filter) {
    this.filterService.delete(filter).subscribe(() => {
      this.filters = this.filters.filter(filter => filter !== filter);
    });
  }

  removeSubfilter(subfilter: Subfilter) {
    this.subfilterService.delete(subfilter).subscribe();
    this.getSubfilterByFilter();
     // this.subfilters = this.subfilters.filter(subfilter => subfilter.id !== subfilter.id);
  }

  public getSubfilterByFilter() {
    this.subfilterService.getSubfilterByFilter(this.selectedFilter).subscribe((data) => { this.selectedSubfilters = data });
  }

  ngOnInit(): void {
    this.filterService.getAll().subscribe((data) => { this.filters = data });

    this.subfilterService.entitySubject.subscribe((data) => {
      this.subfilters = data;
    });

    this.filterService.emitEventFilter.subscribe((data) => { this.filter = data });
    this.subfilterService.emitEventSubfilter.subscribe((data) => { this.subfilter = data });
  }
}
