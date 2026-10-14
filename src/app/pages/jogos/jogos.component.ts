import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JogoService } from '../../services/jogo.service';
import { Jogo } from '../../models/jogo.model';
import { JogoCardComponent } from '../../components/jogo-card/jogo-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-jogos',
  imports: [FormsModule, JogoCardComponent, RouterLink],
  templateUrl: './jogos.component.html',
  styleUrl: './jogos.component.css'
})
export class JogosComponent implements OnInit {
  private jogoService = inject(JogoService);

  // Two-way Binding [(ngModel)] para busca e filtro
  termoBusca: string = '';
  categoriaSelecionada: string = 'Todas';

  categorias: string[] = [];

  ngOnInit(): void {
    this.carregarCategorias();
  }

  carregarCategorias(): void {
    this.categorias = this.jogoService.obterCategorias();
  }

  // Lista de jogos filtrada dinamicamente
  get jogosFiltrados(): Jogo[] {
    let resultado = this.jogoService.listar();

    // Filtro por Categoria
    if (this.categoriaSelecionada && this.categoriaSelecionada !== 'Todas') {
      resultado = resultado.filter(
        jogo => jogo.categoria.toLowerCase() === this.categoriaSelecionada.toLowerCase()
      );
    }

    // Filtro por Busca de Nome
    if (this.termoBusca && this.termoBusca.trim()) {
      const termo = this.termoBusca.trim().toLowerCase();
      resultado = resultado.filter(jogo => jogo.nome.toLowerCase().includes(termo));
    }

    return resultado;
  }

  // Event Binding para limpar filtros
  limparFiltros(): void {
    this.termoBusca = '';
    this.categoriaSelecionada = 'Todas';
  }

  selecionarCategoria(cat: string): void {
    this.categoriaSelecionada = cat;
  }
}

