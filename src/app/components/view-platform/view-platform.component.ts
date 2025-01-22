import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { SubheaderComponent } from "../subheader/subheader.component";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PlatformService } from '../../service/platform.service';
import { PlatformDTO } from '../../model/platform-dto';

@Component({
  selector: 'app-view-platform',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SubheaderComponent],
  templateUrl: './view-platform.component.html',
  styleUrl: './view-platform.component.scss'
})
export class ViewPlatformComponent implements OnInit {

  public platform!: PlatformDTO;

  public safeSrc: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer, private platformService: PlatformService) {
    this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/XzXxWx_1e1E");
  }

  ngOnInit(): void {
    // Exemplo de pegar a plataforma com ID 13
    const platformId = 13;  // O ID pode vir de uma rota, por exemplo
    this.platformService.getPlatformDTO(platformId).subscribe((data) => {
      console.log('Descrição: ' + data.description);
      console.log('Logo: ' + data.logo);
      this.platform = data;  // Aqui estamos atribuindo a resposta do servidor
    });

    // Se você precisar propagar a plataforma de outros componentes, você pode escutar o emitEvent
    this.platformService.emitEventPlatform.subscribe((data) => {
      this.platform = data;
    });
  }


 // ngOnInit(): void {
 //  this.platformService.getPlatformDTO(13).subscribe((data) => {
 //    console.log('id' + data.description)
 //    console.log('id' + data.logo)
 //    this.platform = data;
 //
 //  })
 //  this.platformService.emitEvent.subscribe((data) => { this.platform = data });
 // }
}



  // public imagemUrl!: string;

  // constructor(private imageService: ImageService) {}

  // ngOnInit(): void {
  //   this.imageService.getLogo(1).subscribe((data: Blob) => {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.imagemUrl = reader.result as string;
  //     }
  //     reader.readAsDataURL(data);
  //   })
  //   this.imageService.emitEvent.subscribe((data) => { this.imagemUrl = data });
  // }
