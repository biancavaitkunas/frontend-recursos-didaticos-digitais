import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseService } from '../../service/base.service';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-modal.component.html',
  styleUrl: './search-modal.component.scss'
})
export class SearchModalComponent<T> implements OnInit {
  @Input() service!: BaseService<T>;
  @Input() camposParaPopulacao: string[] = []; // Campos para preencher no formulário ao selecionar
  @Output() fecharModal = new EventEmitter<any>(); // Evento para retornar dados ao formulário
  @Output() modalAberta = new EventEmitter<boolean>(); // Controle da abertura

  searchQuery: string = '';
  searchResults: any[] = [];

  public search() {
    this.carregarDados();
  }

  // Selecionar item e fechar a modal
  selecionar(item: any) {
    const dadosParaPopulacao: { [key: string]: any } = {};
    this.camposParaPopulacao.forEach(campo => {
      dadosParaPopulacao[campo] = item[campo];
    });
    this.fecharModal.emit(dadosParaPopulacao); // Emitindo os dados
    this.modalAberta.emit(false);
  }

  carregarDados(): void {
    this.service.getAll().subscribe((dados) => {
      this.searchResults = dados;
    });
  }

  closeSearchModal() {
    //this.modalAberta(false);
    this.searchQuery = '';
    this.searchResults = [];
  }

  ngOnInit(): void {
    //this.carregarDados();
  }

}
