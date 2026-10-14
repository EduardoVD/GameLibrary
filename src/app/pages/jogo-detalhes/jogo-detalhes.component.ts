import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { JogoService } from '../../services/jogo.service';
import { Jogo } from '../../models/jogo.model';

@Component({
  selector: 'app-jogo-detalhes',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './jogo-detalhes.component.html',
  styleUrl: './jogo-detalhes.component.css'
})
export class JogoDetalhesComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private jogoService = inject(JogoService);

  jogo: Jogo | undefined;
  idParametro: string | null = null;

  ngOnInit(): void {
    // Recuperar o parâmetro :id da rota com ActivatedRoute
    this.route.paramMap.subscribe(params => {
      this.idParametro = params.get('id');
      if (this.idParametro) {
        const idNumerico = Number(this.idParametro);
        if (!isNaN(idNumerico)) {
          this.jogo = this.jogoService.buscarPorId(idNumerico);
        } else {
          this.jogo = undefined;
        }
      }
    });
  }

  obterEstrelas(avaliacao: number): string {
    const cheias = Math.floor(avaliacao);
    const meia = avaliacao % 1 >= 0.5 ? '½' : '';
    return '★'.repeat(cheias) + meia;
  }

  aoFalharImagem(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (!img.src.endsWith('/images/jogos/minecraft.png')) {
      img.src = '/images/jogos/minecraft.png';
    }
  }
}

