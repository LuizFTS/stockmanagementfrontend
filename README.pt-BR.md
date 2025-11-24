# Stock Management Frontend

Uma aplicação moderna e abrangente de gestão de estoque construída com **Angular 20** e **Angular Material**. Esta aplicação fornece uma interface robusta para gerenciar inventário, vendas, compras e entidades comerciais.

## Funcionalidades

### Autenticação e Gestão de Usuários

- **Login e Cadastro**: Acesso seguro para usuários.
- **Gestão de Perfil**: Atualização de informações gerais e alteração de senha.

### Dashboard

- **Página Inicial**: Visão geral do status do sistema e ações rápidas.

### Gestão de Estoque (Inventário)

- **Gestão de Produtos**: Criar, ler, atualizar e excluir (CRUD) produtos.
- **Movimentação de Estoque**: Acompanhe os níveis de estoque e o histórico de movimentações.

### Gestão de Vendas

- **Nova Venda**: Processe novas transações de vendas de forma eficiente.
- **Histórico de Vendas**: Visualize e filtre registros de vendas passadas.
- **Detalhes da Venda**: Aprofunde-se nas informações de transações específicas.

### Gestão de Compras

- **Nova Compra**: Registre novas aquisições de estoque.
- **Histórico de Compras**: Acompanhe todas as atividades de aquisição.
- **Detalhes da Compra**: Visualize informações detalhadas sobre compras específicas.

### Gestão de Entidades

- **Clientes**: Gerencie perfis e dados de clientes.
- **Fornecedores**: Mantenha um banco de dados de fornecedores e seus detalhes.

## Stack Tecnológico

- **Framework**: [Angular v20](https://angular.io/)
- **Biblioteca de UI**: [Angular Material](https://material.angular.io/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: SCSS
- **Estado/Async**: RxJS

## Começando

### Pré-requisitos

Certifique-se de ter o **Node.js** instalado em sua máquina.

### Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/LuizFTS/stockmanagementfrontend.git
    ```
2.  Navegue até o diretório do projeto:
    ```bash
    cd stockmanagementfrontend
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```

### Executando a Aplicação

Execute o servidor de desenvolvimento:

```bash
ng serve
```

Navegue para `http://localhost:4200/`. A aplicação será recarregada automaticamente se você alterar qualquer um dos arquivos de origem.

### Build (Compilação)

Compile o projeto para produção:

```bash
ng build
```

Os artefatos de build serão armazenados no diretório `dist/`.

## Estrutura do Projeto

- `src/app/pages`: Contém todas as visualizações principais (Auth, Estoque, Vendas, Compras, etc.).
- `src/app/layouts`: Define os layouts principais da aplicação (ex: HomeLayout).
- `src/app/core`: Serviços principais e objetos singleton.
- `src/app/shared`: Componentes reutilizáveis e utilitários.
