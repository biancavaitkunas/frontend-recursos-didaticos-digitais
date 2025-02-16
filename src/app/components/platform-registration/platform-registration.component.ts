import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {SubheaderComponent} from "../subheader/subheader.component";
import {FormsModule} from '@angular/forms';
import {Platform} from '../../model/platform';
import {Filter} from '../../model/filter';
import {PlatformService} from '../../service/platform.service';
import {FilterService} from '../../service/filter.service';
import {SubfilterService} from '../../service/subfilter.service';
import {Subfilter} from '../../model/subfilter';
import {ToastrService} from '../../service/toastr.service';
import {AppUserService} from '../../service/app-user.service';
import {AppUser} from '../../model/app-user';
import {Image} from '../../model/image';
import {SafeUrlPipe} from '../../utils/safe-url-pipe';
import {Router} from '@angular/router';

@Component({
  selector: 'app-platform-registration',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SubheaderComponent, FormsModule, SafeUrlPipe],
  templateUrl: './platform-registration.component.html',
  styleUrl: './platform-registration.component.scss'
})
export class PlatformRegistrationComponent implements OnInit {

  public selectedFiles: { [key: string]: File | null } = {
    logo: null,
    presentationImage: null,
    textTutorial: null,
  };

  public platform = {} as Platform;
  public filter = {} as Filter;
  public subfilter = {} as Subfilter;
  public logo = {} as Image;
  public user = {} as AppUser;
  public filters!: Filter[];
  public subfilters!: Subfilter[];
  imagePreview: string | ArrayBuffer | null = null;
  searchModalOpen: boolean = false;
  confirmationModalOpen: boolean = false;

  steps = [1, 2, 3];
  currentStep = 0;

  constructor(private router: Router,
    public platformService: PlatformService,
    private filterService: FilterService,
    private subfilterService: SubfilterService,
    private userService: AppUserService,
    private toastrService: ToastrService) { }

  goToStep(stepIndex: number) {
    this.saveCurrentState();
    this.currentStep = stepIndex;
  }

  saveCurrentState() {
    this.platformService.updatePlatform(this.platform);
  }

  public insertPlatform() {
    const formData = new FormData();

    if (this.selectedFiles['logo']) formData.append('logo', this.selectedFiles['logo']);
    if (this.selectedFiles['presentationImage']) formData.append('presentationImage', this.selectedFiles['presentationImage']);
    if (this.selectedFiles['textTutorial']) formData.append('textTutorial', this.selectedFiles['textTutorial']);
    formData.append('platform', JSON.stringify(this.platform));

    this.platformService.create(formData, this.subfilters.filter((subfilter) => subfilter.checked)).subscribe(() => {
      this.toastrService.showSuccess('Plataforma salva!');
      this.confirmationModalOpen = true;
    });
  }

  public goToHome() {
    this.platform = { id: 0};
    this.router.navigate(['/home']);
    this.confirmationModalOpen = false;
  }

  public registerNewPlatform() {
    this.platform = { id: 0};
    this.confirmationModalOpen = false;
    this.goToStep(0);
  }

  public onLogoSelected(event: Event): void {
    this.onFileSelected(event, 'logo')
  }

  public onPresentationImageSelected(event: Event): void {
    this.onFileSelected(event, 'presentationImage')
  }

  public onTextTutorialSelected(event: Event): void {
    this.onFileSelected(event, 'textTutorial')
  }

  private onFileSelected(event: Event, fileKey: 'logo' | 'presentationImage' | 'textTutorial'): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFiles[fileKey] = target.files[0];

      if (fileKey === 'logo' || fileKey === 'presentationImage') {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        reader.readAsDataURL(target.files[0]);
      }

      this.saveCurrentState();
    }
  }

  getSubfiltersByFilter(filter: Filter): Subfilter[] {
    return this.subfilters.filter((subfilter) => subfilter.filter.id === filter.id);
  }

  //MODAL
  searchResults!: Platform[];
  searchQuery: string = '';
  selectedPlatform!: Platform;

  public openSearchModal() {
    this.searchModalOpen = true;
  }

  public closeSearchModal() {
    this.searchModalOpen = false;
    this.searchQuery = '';
    this.searchResults = [];
  }

  public searchPlatforms() {
    this.platformService.getPlatforms().subscribe((data) => this.searchResults = data);
  }

  public populatePlatform(platform: Platform) {
    this.selectedPlatform = platform;
    this.platform.namePlatform = platform.namePlatform;
    this.platform.urlPlatform = platform.urlPlatform;
    this.platform.descriptionPlatform = platform.descriptionPlatform;
    this.platform.urlVideo = platform.urlVideo;
    this.closeSearchModal();
  }

  formatYouTubeUrl(url: string): string {
    if (!url) return '';

    const youtubeEmbedBase = 'https://www.youtube.com/embed/';

    if (url.includes('youtube.com/embed/')) {
      return url.split('?')[0];
    }

    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);

    if (videoIdMatch && videoIdMatch[1]) {
      return `${youtubeEmbedBase}${videoIdMatch[1]}`;
    }

    return url;
  }

  ngOnInit(): void {
    this.filterService.getFilters().subscribe((data) => { this.filters = data })
    this.subfilterService.getSubfilters().subscribe((data) => { this.subfilters = data })
    this.filterService.emitEventFilter.subscribe((data) => { this.filter = data });
    this.subfilterService.emitEventSubfilter.subscribe((data) => { this.subfilter = data });
    this.userService.emitEvent.subscribe((data) => { this.user = data });
    this.platform = this.platformService.getCurrentPlatform();
  }

}
