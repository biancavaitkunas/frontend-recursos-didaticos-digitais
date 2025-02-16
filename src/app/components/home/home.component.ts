import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SubheaderComponent } from "../subheader/subheader.component";
import { CommonModule } from '@angular/common';
import {PlatformDTO} from '../../model/platform-dto';
import {PlatformService} from '../../service/platform.service';
import {SafeUrlPipe} from '../../utils/safe-url-pipe';
import {Router} from '@angular/router';
import {Filter} from '../../model/filter';
import {Subfilter} from '../../model/subfilter';
import {FilterService} from '../../service/filter.service';
import {SubfilterService} from '../../service/subfilter.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SubheaderComponent, SafeUrlPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public lastWatched: PlatformDTO[] = [];
  public recommended: PlatformDTO[] = [];
  public platforms: PlatformDTO[] = [];
  public filteredPlatforms: PlatformDTO[] = [];
  public searchQuery: string = '';
  public filters: Filter[] = [];
  public subfilters: Subfilter[] = [];
  public isFilterModalOpen = false;
  public selectedFilters: string[] = [];

  fetchPlatforms(): void {
    this.platformService.getAllPlatformsDTO().subscribe((data) => {
      this.platforms = data;
      this.filteredPlatforms = data;
    });
  }

  fetchFilters(): void {
    this.filterService.getFilters().subscribe((data) => { this.filters = data })
  }

  fetchSubfilters(): void {
    this.subfilterService.getSubfilters().subscribe((data) => { this.subfilters = data })
  }

  filterPlatforms(): void {
    if (!this.searchQuery) {
      this.filteredPlatforms = this.platforms;
    } else {
      this.filteredPlatforms = this.platforms.filter(platform =>
        platform.name?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  openFilterModal(): void {
    this.isFilterModalOpen = true;
  }

  closeFilterModal(): void {
    this.isFilterModalOpen = false;
  }

  toggleFilterSelection(subfilter: Subfilter): void {
    if (subfilter.checked) {
      this.selectedFilters.push(subfilter.description);
    } else {
      this.selectedFilters = this.selectedFilters.filter(id => id !== subfilter.description);
    }
  }

  applyFilters(): void {
    this.filteredPlatforms = this.platforms.filter(platform =>
      platform.subfilters.some(f => this.selectedFilters.includes(f))
    );
    this.closeFilterModal();
  }

  getSubfiltersByFilter(filter: Filter): Subfilter[] {
    return this.subfilters.filter((subfilter) => subfilter.filter.id === filter.id);
  }

  navigateToPlatform(platformId: number): void {
    this.router.navigate([`/plataformas/${platformId}`]);
  }

  constructor(private platformService: PlatformService,
              private filterService: FilterService,
              private subfilterService: SubfilterService,
              private router: Router) {}

  ngOnInit(): void {
    this.fetchVideos();
    this.fetchPlatforms();
    this.fetchFilters();
    this.fetchSubfilters();
  }

  fetchVideos(): void {
    this.platformService.getAllPlatformsDTO().subscribe(data => {
      this.lastWatched = data;
    });

    this.platformService.getAllPlatformsDTO().subscribe(data => {
      this.recommended = data;
    });
  }

  scrollCarousel(container: HTMLElement, direction: 'left' | 'right') {
    const scrollAmount = 300;
    container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  }

}
