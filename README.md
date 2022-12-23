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

### Frontend

Podemos ver abaixo a arquitetura de pastas do frontend:

```bash
.
├── config # Enviroment files and config related
├── src
│   └── assets # Project's assets
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
