import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Jogo } from '../../models/jogo.model';

@Component({
  selector: 'app-jogo-card',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './jogo-card.component.html',
  styleUrl: './jogo-card.component.css'
})
export class JogoCardComponent {
  @Input({ required: true }) jogo!: Jogo;

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
