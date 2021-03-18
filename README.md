# Move.it
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/CARLOS-dev208/NLW-Moveit-Nextjs/blob/main/LICENSE) 

# Sobre o projeto

Semana retrasada participei de um evento online da Rocketseat, o #NLW4 ⁣
⁣
Acompanhei a trilha de ReactJS, onde também foram abordados tecnologias como TypeScript e NextJS. ⁣
⁣
O objetivo era construir uma aplicação do zero, utilizando a técnica de pomodoro com pontuação a cada ciclo de 25 minutos finalizado. ⏰⁣
⁣
Ficou como desafio fazer a parte de autenticação com a API do gitHub, além da parte dos Top 10 do ranking.
- Observações: O ciclo está em 00:06 para testes da aplicação.
- Atenção : Para acessar a aplicação tem que ter uma conta no gitHub.

Link da aplicação: https://moveit-pomodoro-psi.vercel.app

## Layout web
![Auth](https://github.com/CARLOS-dev208/NLW-Moveit-Nextjs/blob/main/public/telaAuth.png)

![Home](https://github.com/CARLOS-dev208/NLW-Moveit-Nextjs/blob/main/public/telaHome1.png)

![Ranking](https://github.com/CARLOS-dev208/NLW-Moveit-Nextjs/blob/main/public/telaDeRanking.png)


## Desenvolvimento 
Principais libs e frameworks utilizados:

- next@10.0.7
- react@17.0.1
- mongodb@3.6.4
- axios@^0.21.1
- js-cookie@^2.2.1

### Ambiente de desenvolvimento

Crie um arquivo .env na raiz do projeto baseado no template: 

```javascript
  MONGODB_STRING_CONNECTION= your_mongodb_connection_string
  NEXT_PUBLIC_OAUTH_REDIRECT_URI= http://localhost:3000/api/auth-callback
  NEXT_PUBLIC_OAUTH_CLIENT_ID= app_auth_client_id
  OAUTH_CLIENT_SECRET= app_auth_client_secret
  NEXT_PUBLIC_OAUTH_SCOPE= xpto
```
Para obter o client_id e secret_id, é necessário habilitar seu aplicativo no
github em: Settings > Developer settings > OAuth Apps.


Pré-requisitos: npm ou yarn

```bash
# clonar repositório
https://github.com/CARLOS-dev208/NLW-Moveit-Nextjs.git

# entrar na pasta do projeto front end web
cd moveit-next

# instalar dependências
npm install ou yarn

# executar o projeto
npm run dev
# or
yarn dev
```










