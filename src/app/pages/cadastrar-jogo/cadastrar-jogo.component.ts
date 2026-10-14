import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JogoService } from '../../services/jogo.service';
import { Jogo } from '../../models/jogo.model';

@Component({
  selector: 'app-cadastrar-jogo',
  imports: [FormsModule],
  templateUrl: './cadastrar-jogo.component.html',
  styleUrl: './cadastrar-jogo.component.css'
})
export class CadastrarJogoComponent {
  private jogoService = inject(JogoService);
  private router = inject(Router);

  // Model vinculado por Two-way Binding [(ngModel)]
  novoJogo: Omit<Jogo, 'id'> = {
    nome: '',
    descricao: '',
    categoria: 'Ação',
    preco: 0,
    avaliacao: 5,
    imagem: '/images/jogos/minecraft.png',
    disponivel: true
  };

  categoriasDisponiveis: string[] = ['Ação', 'RPG', 'Aventura', 'Estratégia', 'Corrida', 'Simulação', 'Esportes'];

  // Estados de erro para feedback visual
  mensagemSucesso: string = '';
  formularioSubmetido: boolean = false;

  get nomeValido(): boolean {
    return this.novoJogo.nome.trim().length > 0;
  }

  get precoValido(): boolean {
    return this.novoJogo.preco !== null && this.novoJogo.preco !== undefined && this.novoJogo.preco >= 0;
  }

  get avaliacaoValida(): boolean {
    return this.novoJogo.avaliacao !== null && this.novoJogo.avaliacao >= 0 && this.novoJogo.avaliacao <= 5;
  }

  get formularioValido(): boolean {
    return this.nomeValido && this.precoValido && this.avaliacaoValida;
  }

  // Event Binding acionado pelo (ngSubmit)
  salvarJogo(): void {
    this.formularioSubmetido = true;

    if (!this.formularioValido) {
      return;
    }

    // Inclusão via Service centralizado
    this.jogoService.adicionar({
      ...this.novoJogo,
      nome: this.novoJogo.nome.trim(),
      descricao: this.novoJogo.descricao.trim() || 'Sem descrição detalhada.',
      preco: Number(this.novoJogo.preco),
      avaliacao: Number(this.novoJogo.avaliacao)
    });

    this.mensagemSucesso = `Jogo "${this.novoJogo.nome}" cadastrado com sucesso! Redirecionando...`;

    // Navega para o catálogo sem recarregar a página
    setTimeout(() => {
      this.router.navigate(['/jogos']);
    }, 1200);
  }

  aoFalharImagem(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (!img.src.endsWith('/images/jogos/minecraft.png')) {
      img.src = '/images/jogos/minecraft.png';
    }
  }
}

