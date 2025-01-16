import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SubheaderComponent } from "../subheader/subheader.component";
import { FormsModule } from '@angular/forms';
import { Platform } from '../../model/platform';
import { Filter } from '../../model/filter';
import { PlatformService } from '../../service/platform.service';
import { FilterServiceService } from '../../service/filter-service.service';
import { SubfilterService } from '../../service/subfilter.service';
import { Subfilter } from '../../model/subfilter';
import { ToastrService } from '../../service/toastr.service';
import { AppUserService } from '../../service/app-user.service';
import { AppUser } from '../../model/app-user';
import { ImageService } from '../../service/image.service';
import { Image } from '../../model/image';

@Component({
  selector: 'app-platform-registration',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SubheaderComponent, FormsModule],
  templateUrl: './platform-registration.component.html',
  styleUrl: './platform-registration.component.scss'
})
export class PlatformRegistrationComponent implements OnInit {

  public platform = {} as Platform;
  public filter = {} as Filter;
  public subfilter = {} as Subfilter;
  public logo = {} as Image;
  public user = {} as AppUser;
  public filters!: Filter[];
  public subfilters!: Subfilter[];
  public subfilterChecked: boolean = true;
  //public platformSubfilter = {} as PlatformSubfilter;
  public selectedFile!: File;
  imagePreview: string | ArrayBuffer | null = null;
  searchModalOpen: boolean = false;

  modalAberta = false;
  formulario = {
    
  };

  abrirModal() {
    this.modalAberta = true;
  }

  atualizarFormulario(dados: any) {
    this.formulario = { ...this.formulario, ...dados };
  }

  steps = [1, 2, 3];
  currentStep = 0;

  constructor(private cdr: ChangeDetectorRef, 
    public platformService: PlatformService, 
    private filterService: FilterServiceService, 
    private subfilterService: SubfilterService, 
    private userService: AppUserService, 
    private imageService: ImageService,
    private toastrService: ToastrService) { }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  goToStep(stepIndex: number) {
    this.currentStep = stepIndex;
  }

  public insertPlatform() {
    this.platformService.create(this.platform, this.selectedFile,  this.subfilters.filter((subfilter) => subfilter.checked)).subscribe();
   // this.saveSelectedSubfilters();
    this.toastrService.showSuccess('Plataforma salva!');
  }

  /*private saveSelectedSubfilters(): void {
    const selectedPlatformSubfilters = this.subfilters.filter((subfilter) => subfilter.checked);

    selectedPlatformSubfilters.forEach(element => {
      const platformSubfilter = {} as PlatformSubfilter;
      platformSubfilter.platform = this.platform;
      platformSubfilter.subfilter = element;
      this.platformSubfilterService.insert(platformSubfilter).subscribe();
    });
  }*/

  public onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.selectedFile = target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result;
      };

      reader.readAsDataURL(this.selectedFile);
    }
  }

  public uploadFile(): void {
    if (this.selectedFile) {
      this.imageService.postImage(this.selectedFile).subscribe({
        next: (response) => alert(response)
      })
    }
  }

  loadFilters(): void {
    this.filterService.getFilters().subscribe((data) => {
      this.filters = data;
    });
  }

  loadSubfilters(): void {
    this.subfilterService.getSubfilters().subscribe((data) => {
      this.subfilters = data;
    });
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

  ngOnInit(): void {
    this.filterService.getFilters().subscribe((data) => { this.filters = data })
    this.subfilterService.getSubfilters().subscribe((data) => { this.subfilters = data })
    this.filterService.emitEventFilter.subscribe((data) => { this.filter = data });
    this.subfilterService.emitEventSubfilter.subscribe((data) => { this.subfilter = data });
    this.userService.emitEvent.subscribe((data) => { this.user = data });
  }

}
