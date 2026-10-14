# GameHub – Plataforma de Catálogo de Jogos

Aplicação web desenvolvida com o framework **Angular**, simulando uma plataforma de catálogo de jogos eletrônicos. O sistema permite visualizar títulos, consultar fichas técnicas detalhadas por parâmetro de rota, cadastrar novos jogos com validação e filtrar registros por nome e categoria em tempo real.

O projeto opera de forma autônoma sem dependência de banco de dados externo ou backend, utilizando um **Service Angular** com injeção de dependência para centralizar e compartilhar todos os dados em memória.

---

## Identificação do Projeto & Autoria

- **Aluno:** *Eduardo Vedana Danielli*
- **Disciplina:** Desenvolvimento Web / Frameworks Frontend (Angular)
- **Curso:** Ciência da Computação / Análise e Desenvolvimento de Sistemas / Engenharia de Software
- **Ano Letivo:** 2026

---

## Funcionalidades Principais

1. **Página Inicial (`/`):**
   - Apresentação da plataforma e objetivos do catálogo.
   - Indicadores dinâmicos calculados em tempo real pelo Service: total de jogos cadastrados e total de jogos gratuitos (*Free-to-Play*).
   - Seção de jogos em destaque e atalhos rápidos.

2. **Catálogo de Jogos (`/jogos`):**
   - Listagem completa dos títulos inicialmente cadastrados com foto, categoria, preço, avaliação e disponibilidade.
   - Barra de busca dinâmica por nome com Two-way Data Binding.
   - Filtro por categoria (dropdown select e botões rápidos estilo pílula).
   - Tratamento de busca vazia com mensagem condicional quando nenhum resultado for encontrado.
   - Botão para acesso à página de detalhes de cada jogo.

3. **Detalhes do Jogo (`/jogos/:id`):**
   - Recuperação do identificador numérico via `ActivatedRoute`.
   - Consulta ao `JogoService` e renderização da ficha técnica completa (imagem em alta resolução, preço formatado, avaliação, gênero e situação em estoque).
   - Tratamento para IDs inexistentes ou inválidos com mensagem informativa e botão de retorno.

4. **Cadastro de Novos Jogos (`/cadastrar`):**
   - Formulário completo para inclusão de título: Nome, Categoria, Preço, Avaliação (0.0 a 5.0), Descrição, URL da imagem e Disponibilidade em estoque.
   - Validações: nome obrigatório, preço não negativo ($\ge 0$) e nota entre 0 e 5.
   - Inclusão direta no `JogoService` sem recarregar a página, atualizando imediatamente o catálogo e os contadores da Home.

5. **Tratamento de Rotas Inexistentes (`**`):**
   - Rota curinga que renderiza uma tela 404 personalizada com links de navegação para retornar ao sistema.

---

## Arquitetura & Pilares do Angular

### 1. Componentes (Standalone Components)
A interface é dividida em componentes modulares que encapsulam lógica TypeScript, marcação HTML e estilização CSS:
- **`MenuComponent`:** Cabeçalho global fixo com links de navegação e contador dinâmico de jogos.
- **`JogoCardComponent`:** Card modular e reutilizável para apresentação padronizada de jogos.
- **Componentes de Página:** `HomeComponent`, `JogosComponent`, `JogoDetalhesComponent`, `CadastrarJogoComponent` e `NotFoundComponent`.

### 2. Rotas (Angular Router)
Navegação em Single Page Application (SPA) configurada em `app.routes.ts`:
- Navegação declarativa com diretivas `routerLink` e destaque da aba atual com `routerLinkActive`.
- Renderização centralizada através do elemento `<router-outlet>`.
- Roteamento dinâmico com parâmetros de caminho (`/jogos/:id`).

### 3. Serviços & Injeção de Dependência (`JogoService`)
O `JogoService` atua como a **única fonte de verdade (Single Source of Truth)** para os dados:
- Registrado na raiz via `@Injectable({ providedIn: 'root' })`.
- Fornece métodos padronizados: `listar()`, `buscarPorId(id)`, `adicionar(jogo)`, `filtrarPorCategoria(categoria)`, `buscarPorNome(nome)`, `totalJogos()` e `totalJogosGratuitos()`.
- Compartilhado entre múltiplos componentes sem duplicação de listas independentes.

---

## Recursos e Diretivas do Angular Utilizados

| Recurso | Aplicação no Projeto |
| :--- | :--- |
| **Interpolação `{{ }}`** | Exibição de nomes de jogos, descrições, preços formatados e contadores numéricos nos templates. |
| **Property Binding `[ ]`** | Vinculação dinâmica de `[src]` e `[alt]` das fotos, estados `[disabled]` de botões e classes CSS condicionais. |
| **Event Binding `( )`** | Captura de eventos do usuário: cliques de botões `(click)` e submissão de formulário `(ngSubmit)`. |
| **Two-way Binding `[(ngModel)]`** | Sincronização bidirecional no formulário de cadastro de jogos e nos campos de pesquisa e filtro de categoria. |
| **Controle de Fluxo `@if` / `@else`** | Exibição condicional de jogos não encontrados, mensagens de erro de validação e badges de disponibilidade em estoque. |
| **Controle de Fluxo `@for`** | Renderização iterativa das listas de jogos no catálogo e dos cards em destaque na página inicial. |
| **Controle de Fluxo `@switch`** | Classificação visual e badges personalizadas de acordo com o gênero/categoria do jogo (Ação, RPG, Aventura, etc.). |
| **Interfaces TypeScript** | Padronização rigorosa do modelo `Jogo` com atributos tipados (`id`, `nome`, `descricao`, `categoria`, `preco`, `avaliacao`, `imagem`, `disponivel`). |

---

## Estrutura de Diretórios

```
src/app/
├── models/
│   └── jogo.model.ts               # Interface TypeScript do modelo Jogo
├── services/
│   └── jogo.service.ts              # Service com dados em memória e métodos de busca/filtro
├── components/
│   ├── menu/                        # Barra de navegação global
│   └── jogo-card/                   # Card modular para listagem de jogos
├── pages/
│   ├── home/                        # Rota / : Apresentação, métricas e destaques
│   ├── jogos/                       # Rota /jogos : Catálogo, filtros e busca
│   ├── jogo-detalhes/               # Rota /jogos/:id : Consulta por parâmetro de rota
│   ├── cadastrar-jogo/              # Rota /cadastrar : Formulário de cadastro com [(ngModel)]
│   └── not-found/                   # Rota ** : Página 404 personalizada
├── app.routes.ts                    # Definição e mapeamento de rotas
├── app.ts & app.html                # Componente raiz da aplicação
└── styles.css                       # Estilização global padronizada em Cambria
```

---

## Como Executar o Projeto Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 20 ou superior recomendada)
- [npm](https://www.npmjs.com/) ou [Angular CLI](https://angular.dev/)

### Instalação das dependências
Na raiz do projeto, execute:
```bash
npm install
```

### Inicialização do servidor de desenvolvimento
```bash
npm start
```
ou diretamente via Angular CLI:
```bash
ng serve
```

Abra o navegador em: **`http://localhost:4200/`**

### Execução de testes unitários
```bash
npm test -- --watch=false
```
ou:
```bash
npx ng test --no-watch
```

### Compilação para produção
```bash
npm run build
```
Os arquivos otimizados serão gerados no diretório `dist/GameLibrary`.
