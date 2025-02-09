import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { SubheaderComponent } from "../subheader/subheader.component";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PlatformService } from '../../service/platform.service';
import { PlatformDTO } from '../../model/platform-dto';
import {SafeUrlPipe} from "../../utils/safe-url-pipe";
import {ActivatedRoute, RouterLink} from '@angular/router';

@Component({
  selector: 'app-view-platform',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SubheaderComponent, SafeUrlPipe, RouterLink],
  templateUrl: './view-platform.component.html',
  styleUrl: './view-platform.component.scss'
})
export class ViewPlatformComponent implements OnInit {

  public platform!: PlatformDTO;

  public safeSrc: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer, private platformService: PlatformService, private route: ActivatedRoute) {
    this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/XzXxWx_1e1E");
  }

  ngOnInit(): void {
    const platformId = Number(this.route.snapshot.paramMap.get('id'));
    this.platformService.getPlatformDTO(platformId).subscribe((data) => {
      this.platform = data;
    });

    this.platformService.emitEventPlatform.subscribe((data) => {
      this.platform = data;
    });
  }

  openPdf(): void {
    if (this.platform && this.platform.textTutorial) {
      try {
        const base64String = this.platform.textTutorial.split(',')[1] || this.platform.textTutorial;

        const byteCharacters = atob(base64String);
        const byteNumbers = new Uint8Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const file = new Blob([byteNumbers], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);

        const newTab = window.open();
        if (newTab) {
          newTab.location.href = fileURL;
        } else {
          console.error('O navegador bloqueou a abertura da nova aba.');
        }
      } catch (error) {
        console.error('Erro ao processar o PDF:', error);
      }
    } else {
      console.error('Nenhum PDF encontrado.');
    }
  }

}
