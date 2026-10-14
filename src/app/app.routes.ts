import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { JogosComponent } from './pages/jogos/jogos.component';
import { JogoDetalhesComponent } from './pages/jogo-detalhes/jogo-detalhes.component';
import { CadastrarJogoComponent } from './pages/cadastrar-jogo/cadastrar-jogo.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'GameHub - Início' },
  { path: 'jogos', component: JogosComponent, title: 'GameHub - Catálogo de Jogos' },
  { path: 'jogos/:id', component: JogoDetalhesComponent, title: 'GameHub - Detalhes do Jogo' },
  { path: 'cadastrar', component: CadastrarJogoComponent, title: 'GameHub - Cadastrar Jogo' },
  { path: '**', component: NotFoundComponent, title: 'GameHub - Página Não Encontrada' }
];
