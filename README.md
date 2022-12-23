# Refera - Fullstack Code Challenge

<p align="center">
  <img width="832px" height="453px" src="https://user-images.githubusercontent.com/10841710/141149769-d2bef978-7073-4ac7-b0af-6c0c8c7b6fe8.png">
</p>

<div align="center">

Python Version: `3.9.15`

Node Version: `16.4.0`

NPM Version: `17.18.1`

</div>

## Table of Contents

- [Sobre o Projeto](#sobre-o-projeto)
- [A Stack](#a-stack)
- [Sobre a Arquitetura e Padrões de Projeto Adotados](#sobre-a-arquitetura-e-padrões-de-projeto-adotados)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Rodando o Projeto no Ambiente de Desenvolvimento](#rodando-o-projeto-no-ambiente-de-desenvolvimento)
  - [Backend](#backend-1)

## Sobre o projeto

O objetivo do projeto é criar uma aplicação fullstack, com uma página no frontend e uma API no backend, que servirá dados e armazenará dados recebidos em um banco de dados. O frontend deve ter uma única página com uma tabela que lista ordens de serviço cadastradas, onde cada linha da tabela exibe informações da service order cadastrada, além de mostrar um modal expandindo essas informações quando o usuário clickar em uma linha. Além disso, deve possuir um botão de criar um novo registro de service order, abrindo um modal com um formulário para fornecer as informações necessárias e um botão de salvar para enviar as informações para o backend e salvar no banco. Tudo seguindo o protótipo de baixa fidelidade fornecido na seção resources da especificação: [GitHubPages](https://refera-tech.github.io/) / [GitHub Repo](https://github.com/Refera-Tech/refera-fullstack-challenge/blob/main/README.md)

## A Stack

Na descrição de referência, cita a liberdade em relação à stack a ser utilizada. Minha stack de maior experiência é React+Typescript para o frontend e NodeJs+Typescript para o backend, porém optei pelo Django+DjangoRestFramework para o backend, já que venho estudando há algumas semanas. O banco de dados escolhido foi o PostgreSQL, por ter mais experiência com, como contêiner docker.

## Sobre a Arquitetura e Padrões de Projeto Adotados

Nesta seção irei explicar de maneira simplificada minhas decisões ao arquitetar o sistema (front/back).

### Backend

Podemos ver abaixo a arquitetura de pastas do backend:

```bash
.
├── apps
│   └── example_app # A django rest app
│       ├── migrations
│       │   └── __init__.py
│       ├── __init__.py
│       ├── admin.py
│       ├── apps.py
│       ├── serializers.py
│       ├── models.py
│       ├── tests.py
│       ├── urls.py
│       └── views.py
├── common # An optional folder containing common "stuff" for the entire project
│   ├── models
│   │   ├── __init__.py
│   │   └── BaseModel.py
│   └── __init__.py
├── config  # Project config folder
│   ├── settings.py
│   ├── asgi.py
│   ├── __init__.py
│   ├── urls.py
│   └── wsgi.py
├── requirements  # Requirements for setup on each environment
│   ├── common.txt
│   ├── development.txt
│   ├── local.txt
│   └── production.txt
├── manage.py
└── .gitignore

```

Segui parcialmente, adaptando para a situação, a estrutura encontrada nesse [repositório](https://github.com/saqibur/django-project-structure). É bem organizado, segmentado e fácil de escalar mesmo com novos APPS sendo criados. No `settings.py` deixei pronto um trecho de código que adiciona qualquer app ao INSTALLED_APPS, desde que esteja dentro da pasta apps, tirando a necessidade de adicionar manualmente a cada vez que um app for criado. No `urls.py` de cada app, é definido um `router` do `django_rest_framework` para o app, concatenando todos os `routers` no `"router do projeto"`, dentro de `config/urls.py`. Cada app representa uma entidade no banco. Antes de começar o desenvolvimento, fiz uma modelagem de como deveriam ser as tabelas dentro do banco. Segue um diagrama ER da modelagem:

<div align="center">

![Diagrama ER](./Refera%20Challenge%20Diagrama%20ER.jpeg?raw=true)

</div>

### Frontend

Podemos ver abaixo a arquitetura de pastas do frontend:

```bash
.
├── config # Enviroment files and config related
├── src
│   ├── assets # Project's assets
│   ├── components # React components
│   │   └── ComponentName
│   │       ├── index.tsx
│   │       └── styles.ts│styles.css
│   ├── hooks # React hooks and Context API providers
│   │  ├── HOOK_PROVIDER_NAME.tsx
│   │  └── index.tsx
│   ├── pages # Project's pages
│   │   └── PageName
│   │       ├── index.tsx
│   │       └── styles.ts│styles.css
│   ├── routes # Project's routes (react-router-dom router)
│   │   └── index.tsx
│   ├── services # Definition of classes/DTOs related to services and service operations outside the app's scope (eg.: backend API)
│   │   ├── dtos
│   │   │   └── index.ts
│   │   ├── api.ts # Axios config
│   │   └── ApiService.ts # Define ApiService that shape and limit the operations that can be done (api related)
│   ├── styles
│   │   └── index.ts # User defined global styles (not using currently because of MaterialUI globals)
│   ├── utils
│   │   └── ComponentName│Entity│ProjectComponent # Utilitary code for the app (e.: model interfaces, util functions, ...)
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── .editorconfig
├── .eslintignore
├── .eslintrc
├── .gitignore
├── .prettierignore
├── .prettierrc
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
├── vite.config.ts
└── yarn.lock # No need if you're not using yarn

```

Venho usando essa estrutura há algum tempo e creio que seja bem segmentada e organizada. Dando um rápido overview do funcionamento do app:

- O App em si é formado por um router do react-router-dom, que define que página deve ser renderizada em que rota.
- Esse router do App está envolto em alguns providers que provém funcionalidade para todo os escopo da aplicação caso um componente precise.
- Existe uma barra de navegação que persiste em todas as telas, pensando que futuramente outras telas e autenticação poderíam existir.
- O conteúdo da página é exibido abaixo da barra de navegação.
- Existe uma classe chamada ApiService, que define todos os métodos que podem ser acessados de qualquer lugar da aplicação. Esses métodos fazem requisições específicas aos endpoints da API, previnindo o erros de digitação, asserção de tipos e acesso à rotas não mapeadas ao usar essa classe.
- São exibidos toasts no canto superior direito da tela, como feedback, para o usuário, de operações realizadas no sistema como gerar um novo order ou carregar informações na aplicação.
- Os providers de categoria e ordem de serviço são responsáveis por buscar a lista de registros de cada um. Eles quem servem outros componentes da aplicação as informações sobre orders e categories.
- Fluxo do APP: Quando a aplicação inicia, cai na tela de Home, que busca as informações de categoria e orders com métodos respectivos de cada provider. Cada método realiza a requisição necessária e avisa ao contexto AppLoading que seus dados foram carregados. Então, a página Home recebe um sinal de mudança do AppLoading e avisa à tabela que as informações foram carregadas e agora ela pode montar suas linhas e colunas. Funciona dessa maneira porque, pensando numa evolução do projeto, caso o usuário não esteja autenticado, os dados não devem ser carregados ainda, pois seriam requisições e renderizações desnecessárias.

## Rodando o Projeto no Ambiente de Desenvolvimento

Esta seção tem o intuito de instruir como rodar o projeto em ambiente de desenvolvimento.

### Backend

Assumindo que esse repositório já tenha sido clonado, seguir os passos abaixo:

Recomendo o uso do `docker` para o banco de dados. Com o docker instalado, rodar o comando no terminal:

`docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres`

Criando assim um contêiner com a versão de imagem mais atualizada do postgres, com nome do container sendo postgres, usuário e senha postgres e banco com nome postgres. Recomendo também usar algum tipo de ambiente virtual, como `venv` ou `conda`. No meu caso, usei o conda. Para criar um conda environment com python 3.9 e ativá-lo, após instalar o anaconda, rode os seguintes comandos no terminal:

```bash
conda create --name <nome_do_ambiente> python=3.9
conda activate <nome_do_ambiente>
```

Com o contêiner e ambiente ativos, entrar na pasta `backend/requirements/` e rodar o seguinte comando no terminal:

`pip install -r ./local.txt` ou `pip install -r ./development.txt`

Confira as informações de banco no arquivo `settings.py`, dentro de `backend/config/`. Caso tenha seguido as intruções até agora, mude o atributo `NAME` na variável `DATABASES` para `'postgres'` ou crie um banco `refera_challenge` da forma que achar melhor (ex.: dbeaver, docker exec -it, etc). Por fim, na raiz do diretório `backend`, rodar:

```bash
python manage.py makemigrations
python manage.py migrate
```

Para gerar as migrações de banco e aplicar, e depois:

`python manage.py runserver`
