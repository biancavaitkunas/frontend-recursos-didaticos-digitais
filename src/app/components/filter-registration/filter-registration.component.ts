import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {SubheaderComponent} from "../subheader/subheader.component";
import {FormsModule} from '@angular/forms';
import {FilterService} from '../../service/filter.service';
import {Filter} from '../../model/filter';
import {SubfilterService} from '../../service/subfilter.service';
import {Subfilter} from '../../model/subfilter';
import {ToastrService} from '../../service/toastr.service';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-filter-registration',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SubheaderComponent, FormsModule],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ]),
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ],
  templateUrl: './filter-registration.component.html',
  styleUrls: ['./filter-registration.component.scss']
})
export class FilterRegistrationComponent implements OnInit {

  constructor(private filterService: FilterService, private subfilterService: SubfilterService, private toastrService: ToastrService) {}

  public filter = {} as Filter
  public subfilter = {} as Subfilter
  public filters!: Filter[];
  public subfilters!: Subfilter[];

  selectedFilter: Filter | null = null;
  selectedSubfilters!: Subfilter[];
  showNewFilterInput: boolean = false;
  showNewSubfilterInput: boolean = false;
  editingSubfilterId: number | null = null;

  toggleNewFilter() {
    this.showNewFilterInput = !this.showNewFilterInput;
  }

  toggleNewSubfilter() {
    this.showNewSubfilterInput = !this.showNewSubfilterInput;
  }

  insertFilter() {
    this.filterService.insert(this.filter).subscribe((newFilter) => {
      this.toastrService.showSuccess('Filtro salvo!');
      this.filters.push(newFilter);
      this.filter = {} as Filter;
      this.showNewFilterInput = false;
    });
  }

  insertSubfilter() {
    if (!this.selectedFilter) return;

    this.subfilter.filter = this.selectedFilter;

    this.subfilterService.insert(this.subfilter).subscribe((newSubfilter) => {
      this.toastrService.showSuccess('Subfiltro salvo!');
      this.selectedSubfilters.push(newSubfilter);
      this.subfilter = {} as Subfilter;
      this.showNewSubfilterInput = false;
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

  removeFilter(filter: Filter) {
    this.filterService.delete(filter).subscribe(() => {
      this.filters = this.filters.filter(f => f.id !== filter.id);
      this.toastrService.showSuccess('Filtro removido!');
      if (this.selectedFilter?.id === filter.id) {
        this.selectedFilter = null;
        this.selectedSubfilters = [];
      }
    });
  }

  removeSubfilter(subfilter: Subfilter) {
    this.subfilterService.delete(subfilter).subscribe(() => {
      this.selectedSubfilters = this.selectedSubfilters.filter(s => s.id !== subfilter.id);
      this.toastrService.showSuccess('Subfiltro removido!');
    });
  }

  getSubfilterByFilter() {
    if (!this.selectedFilter) return;

    this.subfilterService.getSubfilterByFilter(this.selectedFilter).subscribe((data) => {
      this.selectedSubfilters = data;
    });
  }

  loadFilters() {
    this.filterService.getAll().subscribe((data) => { this.filters = data });
  }

  ngOnInit(): void {
    this.loadFilters();

    this.subfilterService.entitySubject.subscribe((data) => {
      this.subfilters = data;
    });

    this.filterService.emitEventFilter.subscribe((data) => {
      this.filter = data;
    });

    this.subfilterService.emitEventSubfilter.subscribe((data) => {
      this.subfilter = data;
    });
  }
}
