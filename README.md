# Sistema de Gerenciamento de Qualidade

## Ambiente

Para rodar é necessário:

* [Docker](https://docs.docker.com/get-docker/)
* Docker Compose (no Docker for Windows já vem incluso)

Sistemas operacionais validados:

* Windows 10
* Ubuntu

## Subindo o ambiente

```
docker-compose build
docker-compose up
```

Isso irá subir todos os serviços, inclusive o web.

- Web: http://localhost:80
- API: http://localhost:3000
- Autenticação: http://localhost:4000

## Testando os microsserviços

Para testar os microserviços, faça requests GET para cada um deles.
Por enquanto eles estão disponíveis diretamente ou através do API Gateway, por exemplo:

* http://localhost:3001

* http://localhost:3000/bi

* http://localhost:3002

* http://localhost:3000/compliance

É possível testar cada serviço isolamente sem o docker-compose:

```
cd services/incidents-module/
node src/app.js
```

## Testando a pagina web

Para testar a aplicação react sem subir o docker-compose:

1. Abra o terminal
2. Vá na pasta do projeto ./web/sgq-app
```
npm install
npm start
```

## Deploy na nuvem

O sistema está provisionado no link http://54.188.193.120/

O processo de deploy na numem está detalhado [aqui](deploy/how-to).

## Créditos

Foram utilizados trechos dos repositórios listados abaixo.

Repositório: https://github.com/mjhea0/microservice-movies \
Copyright: 2018, Michael Herman \
Licença: MIT

Repositório: https://github.com/cornflourblue/node-mongo-registration-login-api \
Copyright: 2018, Jason Watmore \
Licença: MIT

Repositório: https://github.com/cornflourblue/react-redux-registration-login-example \
Copyright: 2017, Jason Watmore \
Licença: MIT

Repositório: https://github.com/creativetimofficial/material-dashboard-react \
Copyright: 2020, Creative Tim \
Licença: MIT


## Licença

[LICENSE](LICENSE.md)
