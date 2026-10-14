import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JogoService } from '../../services/jogo.service';
import { JogoCardComponent } from '../../components/jogo-card/jogo-card.component';
import { Jogo } from '../../models/jogo.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink, JogoCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private jogoService = inject(JogoService);

  get totalJogos(): number {
    return this.jogoService.totalJogos();
  }

  get totalGratuitos(): number {
    return this.jogoService.totalJogosGratuitos();
  }

  get totalCategorias(): number {
    return this.jogoService.obterCategorias().length - 1; // Descontando 'Todas'
  }

  get jogosDestaque(): Jogo[] {
    return this.jogoService.jogosEmDestaque(3);
  }
}

