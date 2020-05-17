# Sistema de Gerenciamento de Qualidade

## Ambiente

Para rodar é necessário:

* [Docker](https://docs.docker.com/get-docker/)
* Docker Compose (no Docker for Windows já vem incluso)

Sistemas operacionais validados:

* Windows 10

## Subindo o ambiente

```
docker-compose build
docker-compose up
```

## Testando os microsserviços

Para testar os microserviços, faça requests GET para cada um deles.
Por enquanto eles estão disponíveis diretamente ou através do API Gateway, por exemplo:

* http://localhost:3001

* http://localhost:3000/bi

* http://localhost:3002

* http://localhost:3000/compliance