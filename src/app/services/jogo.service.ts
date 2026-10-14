import { Injectable } from '@angular/core';
import { Jogo } from '../models/jogo.model';

@Injectable({
  providedIn: 'root'
})
export class JogoService {
  private proximoId = 11;

  private jogos: Jogo[] = [
    {
      id: 1,
      nome: 'MINECRAFT',
      descricao: 'Construa, explore mundos infinitos gerados proceduralmente e sobreviva aos perigos noturnos em blocos tridimensionais.',
      categoria: 'Aventura',
      preco: 99.00,
      avaliacao: 4.9,
      imagem: '/images/jogos/minecraft.png',
      disponivel: true
    },
    {
      id: 2,
      nome: 'TERRARIA',
      descricao: 'Explore, cave, construa e lute contra chefes épicos em um vasto universo sandbox 2D repleto de ação e mistérios.',
      categoria: 'Aventura',
      preco: 32.99,
      avaliacao: 4.9,
      imagem: '/images/jogos/terraria.png',
      disponivel: true
    },
    {
      id: 3,
      nome: 'HOLLOW KNIGHT',
      descricao: 'Explore um reino em ruínas de insetos e heróis, dominando combates ágeis e descobrindo segredos antigos em estilo metroidvania.',
      categoria: 'Ação',
      preco: 46.99,
      avaliacao: 4.9,
      imagem: '/images/jogos/hollow-knight.png',
      disponivel: true
    },
    {
      id: 4,
      nome: "DARK SOULS III",
      descricao: 'Enfrente batalhas brutais e chefes imponentes enquanto viaja por um reino decadente prestes a sucumbir à escuridão.',
      categoria: 'RPG',
      preco: 229.90,
      avaliacao: 4.8,
      imagem: '/images/jogos/dark-souls-3.png',
      disponivel: true
    },
    {
      id: 5,
      nome: 'ELDEN RING',
      descricao: 'Desbrave as Terras Intermédias em um vasto RPG de ação em mundo aberto repleto de calabouços profundos e combates desafiadores.',
      categoria: 'RPG',
      preco: 229.90,
      avaliacao: 4.9,
      imagem: '/images/jogos/elden-ring.png',
      disponivel: true
    },
    {
      id: 6,
      nome: 'HADES',
      descricao: 'Desafie o deus dos mortos em combates rápidos estilo roguelike, combinando poderes do Olimpo para escapar do submundo.',
      categoria: 'Ação',
      preco: 73.99,
      avaliacao: 4.9,
      imagem: '/images/jogos/hades.png',
      disponivel: true
    },
    {
      id: 7,
      nome: 'PROJECT ZOMBOID',
      descricao: 'O simulador definitivo de sobrevivência zumbi com foco em realismo, infecção, construção e sobrevivência implacável.',
      categoria: 'RPG',
      preco: 37.99,
      avaliacao: 4.8,
      imagem: '/images/jogos/project-zomboid.png',
      disponivel: true
    },
    {
      id: 8,
      nome: 'STARDEW VALLEY',
      descricao: 'Cultive sua fazenda, crie animais, faça amizades com os aldeões e desvende os mistérios do Vale do Orvalho.',
      categoria: 'Simulação',
      preco: 24.99,
      avaliacao: 4.9,
      imagem: '/images/jogos/stardew-valley.png',
      disponivel: true
    },
    {
      id: 9,
      nome: 'SEKIRO: SHADOWS DIE TWICE',
      descricao: 'Enfrente inimigos implacáveis no Japão do período Sengoku usando furtividade, aparos precisos e próteses ninjas letais.',
      categoria: 'Ação',
      preco: 274.00,
      avaliacao: 4.8,
      imagem: '/images/jogos/sekiro.png',
      disponivel: true
    },
    {
      id: 10,
      nome: 'RIMWORLD',
      descricao: 'Gerencie sobreviventes em um simulador de colônia guiado por uma inteligência artificial contadora de histórias imprevisíveis.',
      categoria: 'Estratégia',
      preco: 107.99,
      avaliacao: 4.9,
      imagem: '/images/jogos/rimworld.png',
      disponivel: true
    }
  ];

  listar(): Jogo[] {
    return [...this.jogos];
  }

  buscarPorId(id: number): Jogo | undefined {
    return this.jogos.find(jogo => jogo.id === id);
  }

  adicionar(jogo: Omit<Jogo, 'id'> | Jogo): void {
    const id = 'id' in jogo && jogo.id ? jogo.id : this.proximoId++;
    const novoJogo: Jogo = {
      ...jogo,
      id
    };
    this.jogos.push(novoJogo);
  }

  filtrarPorCategoria(categoria: string): Jogo[] {
    if (!categoria || categoria === 'Todas') {
      return this.listar();
    }
    return this.jogos.filter(jogo => jogo.categoria.toLowerCase() === categoria.toLowerCase());
  }

  buscarPorNome(nome: string): Jogo[] {
    if (!nome || !nome.trim()) {
      return this.listar();
    }
    const termo = nome.trim().toLowerCase();
    return this.jogos.filter(jogo => jogo.nome.toLowerCase().includes(termo));
  }

  totalJogos(): number {
    return this.jogos.length;
  }

  totalJogosGratuitos(): number {
    return this.jogos.filter(jogo => jogo.preco === 0).length;
  }

  obterCategorias(): string[] {
    const categorias = new Set(this.jogos.map(jogo => jogo.categoria));
    return ['Todas', ...Array.from(categorias)];
  }

  jogosEmDestaque(quantidade: number = 3): Jogo[] {
    return [...this.jogos]
      .sort((a, b) => b.avaliacao - a.avaliacao)
      .slice(0, quantidade);
  }
}
