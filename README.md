# Gerenciador DNS - PatternFly 6 Test

Este projeto é um laboratório prático criado para explorar o desenvolvimento web com foco na biblioteca de componentes [PatternFly 6](https://www.patternfly.org/), utilizando [React](https://reactjs.org/) e [Vite](https://vitejs.dev/).

O objetivo principal é construir a interface de um **Gerenciador de Registros DNS**, praticando a implementação de layouts complexos, tabelas interativas e modais.

## Tecnologias Utilizadas

* **React 19:** Biblioteca JavaScript para construção da interface de usuário.
* **Vite:** Ferramenta de build super rápida e ambiente de desenvolvimento.
* **PatternFly 6 (`@patternfly/react-core` e `@patternfly/react-table`):** Sistema de design open-source da Red Hat, utilizado para garantir uma interface consistente, acessível e profissional.

## Funcionalidades Implementadas (UI)

* **Layout Responsivo:** Utilização dos componentes `Page`, `Masthead` e `Sidebar` do PatternFly para uma navegação estruturada.
* **Tabela de Registros:** Uma tabela interativa exibindo registros DNS com suporte a ordenação (crescente e decrescente) por colunas.
* **Busca e Filtro:** Barra de busca (Toolbar) para filtrar registros por nome, tipo ou valor.
* **Ações de Tabela (Kebab Menu):** Menus de contexto (Editar, Clonar, Deletar) em cada linha da tabela.
* **Criação de Registros:** Modal interativo com formulário (`Modal`, `Form`, `Grid`) para adicionar novos registros DNS.

##  Como Executar o Projeto

Para rodar este projeto localmente, você precisará ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/victoriasfia/patternFly-test
    cd frontend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou usando yarn: yarn install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    # ou usando yarn: yarn dev
    ```

4.  Acesse o projeto em seu navegador, geralmente em `http://localhost:5173`.

## 📚 Aprendizados

Este repositório serve como base de estudos para entender:
* Como integrar o PatternFly em um projeto React/Vite.
* Gerenciamento de estado (useState) para controlar modais, menus suspensos e ordenação de tabelas.
* Estruturação de formulários e layouts com grids.

---
*Projeto desenvolvido como parte da jornada de aprendizado em desenvolvimento web.*