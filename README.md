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
  - [Frontend](#frontend-1)
- [Rodando o Projeto no Ambiente de Produção](#rodando-o-projeto-no-ambiente-de-produção)
  - [Backend](#backend-2)
  - [Frontend](#frontend-2)
- [Considerações em Relação ao Projeto](#considerações-em-relação-ao-projeto)
- [Como eu faria para adicionar autenticação ao projeto?](#como-eu-faria-para-adicionar-autenticação-ao-projeto)
- [Lidando com Armazenamento de Outras Informações no Backend](#lidando-com-armazenamento-de-outras-informações-no-backend)

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

```bash
docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

Criando assim um contêiner com a versão de imagem mais atualizada do postgres, com nome do container sendo postgres, usuário e senha postgres e banco com nome postgres. Recomendo também usar algum tipo de ambiente virtual, como `venv` ou `conda`. No meu caso, usei o conda. Para criar um conda environment com python 3.9 e ativá-lo, após instalar o anaconda, rode os seguintes comandos no terminal:

```bash
conda create --name <nome_do_ambiente> python=3.9
conda activate <nome_do_ambiente>
```

Com o contêiner e ambiente ativos, entrar na pasta `backend/requirements/` e rodar o seguinte comando no terminal:

```bash
pip install -r ./local.txt
```

ou

```bash
pip install -r ./development.txt
```

Confira as informações de banco no arquivo `settings.py`, dentro de `backend/config/`. Caso tenha seguido as intruções até agora, mude o atributo `NAME` na variável `DATABASES` para `'postgres'` ou crie um banco `refera_challenge` da forma que achar melhor (ex.: dbeaver, docker exec -it, etc). Por fim, na raiz do diretório `backend`, rodar:

```bash
python manage.py makemigrations
python manage.py migrate
```

Para gerar as migrações de banco e aplicar, e depois:

```bash
python manage.py runserver
```

### Frontend

Com o backend ativo, agora podemos partir para o frontend. Dentro da pasta `frontend` rodar:

```bash
npm install
```

ou

```bash
yarn
```

e depois:

```bash
npm run dev
```

ou

```bash
yarn dev
```

## Rodando o Projeto no Ambiente de Produção

Embora essa aplicação como um todo, especialmente o backend, não esteja preparado para qualquer tipo de ambiente de produção profissional, é possível realizar seu deploy.

### Backend

Primeiramente, em `backend/settings`, settar `DEBUG` para `false`, além de mudar a forma de obtenção da `SECRET_KEY` para variável de ambiente. Não possuo experiência com deploy em django, mas esse [link](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Deployment#overview) parece explicar bem como fazer. Quando lidava com APIs Node, o repositório era clonado na máquina virtual da AWS ou Google Cloud e atualizado manualmente a cada deploy, realizando um processo semelhante ao de desenvolvimento, mas com algumas configurações específicas de produção como rotas para outros serviços, carregar os arquivos de assinatura https, entre outras coisas. Imagino que isso possa ser automatizado de alguma forma com CI/CD, mas não possuo propriedade para afirmar

### Frontend

Esse projeto foi criado com a ferramenta Vite. Caso queira saber porque eu e alguns outros devs escolhem o Vite ao invés do create-react-app ou webpack+babel configurados manualmente, apesar de já ter usado todas essas, recomendo essa [leitura](https://semaphoreci.com/blog/vite#:~:text=Unlike%20CRA%2C%20Vite%20does%20not,improve%20development%20and%20build%20time.). Utilizei o template desse [link](https://github.com/igdev116/vite-react-ts-eslint-prettier.git), que cria um projeto pré configurado com Vite + React + TypeScript + Eslint + Prettier. Primeiramente precisamos buildar a aplicação react, que vai transpilar o typescript em javascript e depois tudo em um javascript mais antigo, compatível com versões anteriores, empacotando numa pasta build. Essa pasta build deve ser levada (deploy) para o ambiente de produção, seja qual for, e executada por alguma ferramenta, como um nginx. Vale ressaltar que o Vite carrega variáveis de ambiente de arquivos com nomes relacionados a ambientes de desenvolvimento e produção automaticamente, dependendo da forma que a aplicação é executada. No momento, estou puxando o endereço base da API do arquivo `.env.development` na pasta `frontend/config`. Um arquivo de produção `.env.production` pode ser criado, com a variável `VITE_BACKEND_BASE_URL` apontando para o endereço host do backend em produção. Todas as variáveis de ambiente devem começar com `VITE_`.

## Considerações em Relação ao Projeto

- Como uma primeira experiência construindo um projeto usando MaterialUI, React-Hook-Form e Django, foi uma experiência bastante proveitosa com bastante aprendizado de novas ferramentas.
- Infelizmente, dado o tempo, não pude correr atrás de entender como realizar um table join, sem trocar ModelViewSet por outro tipo de View e ter que definir cada método, no momento de listar os orders, o que faria com que a categoria chegasse ao frontend já descodificada, não só com id, mas também com o name. Como é necessário ter todas as categorias para listar no modal de gerar um novo order, tenho acesso à que id de categoria equivale a tal nome, então é substituído no lado do cliente mesmo, ao invés do servidor, o que não é ideal, mas garante a funcionalidade mesmo assim.
- No backend a paginação está ativada no backend e o frontend consegue lidar com isso, porém não tive tempo, por alguns motivos, durante a semana do desafio, de fazer com que um fetch novo com a próxima página da paginação fosse feito assim que o limite de 10 registros fosse atingido no frontend. Seria uma pequena adição, mas atrasaria a escrita desse documento e optei por não fazer.
- Tenho completa consciencia de que arquivos com secrets e coisas relacionadas não devem ser incluídos em repositórios de controle de versão por questões de segurança, mas ignorei mesmo assim pelo contexto e tempo do desafio, além de por ter o .env no frontend, agiliza o processo de instalar e executar a aplicação caso queira ser testada pela parte avaliadora.
- Gostaria de ter implementado mask no input de telefone, mas não tive tempo.

## Como eu faria para adicionar autenticação ao projeto?

O frontend já está praticamente prepardo para autenticação, só precisando criar páginas de login e signup, mas está desabilitada dado que o backend não está pronto para comportar autenticação. Primeiro faria com que o backend conseguisse gerar tokens JWT e enviar para o frontend, disponibilizando uma rota com nome `/sessions/` ou algo próximo disso. Depois, fazer com que as rotas quem precisam de autenticação consigam obter o token que será enviado no header de cada requisição e checar se ele é um token válido, permitindo ou não o acesso a rota. O frontend se preocupa em autenticar na página de login e guardar esse token ou não no localStorage, para ser recuperada em acessos futuros à página até que o token expire, sem ter que logar. Indepente de salvar ou não no localStorage, as informações do usuário podem ser salvas no contexto de autenticação do frontend e assim realizar redirecionamentos caso o usuário entre em uma página de permissão elevada sem estar loggado. Também iria atrás de outra solução, já que foi descoberto a um tempo que o localStorage não é tão seguro quanto se achava para manter informações de valor/permissão importantes.

## Lidando com Armazenamento de Outras Informações no Backend

Essa seção serve para responder as questões levantadas sobre lidar com armazenamento de informações de agência, companhia e contato e que mudanças precisam ser feitas na API para se adaptar a mudança. Fico meio confuso em relação ao relacionamento de algumas dessas entidades, então proponho um modelo simples onde cada um desses componentes se torna uma entidade e se relaciona com order. O diagrama abaixo ilustra minha proposta:

<div align="center">

![Diagrama ER](./Refera%20Challenge%20Diagrama%20ER-arbitrary%20question.jpeg?raw=true)

</div>

Pela parte do backend, criaria um app django para cada entidade, atualizaria o relacionamento na tabela de orders e criaria um CRUD com rotas para cada entidade, já que essas poderiam ser registradas possivelmente até pelo frontend. Obs.: ContactEntity é um nome genérico pois não sei se faria parte da entidade usuário do sistema, ou se seria apenas contato a parte, provavelmente associado a company ou realStateAgency, então, na dúvida, deixei como entidade separada.
