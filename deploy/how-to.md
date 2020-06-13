# Deploy na AWS ECS (Elastic Container Service)

O sistema foi implantado usando o AWS Elastic Container Service, usando o modo Fargate, no qual o hardware é gerenciado automáticamente, não sendo necessário provisionar instâncias do EC2.

## Pré-requisitos

- Ter conta na [AWS](https://aws.amazon.com/pt/)
- Instalar o [aws-cli](https://aws.amazon.com/pt/cli/)
- Instalar o [ecs-cli](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_CLI_installation.html)

## Aprendendo a usar o ECS-CLI

### Criando um cluster

Para entender como configurar o `ecs-cli`, siga o tutorial abaixo:

https://docs.aws.amazon.com/pt_br/AmazonECS/latest/userguide/ecs-cli-tutorial-fargate.html

### Usando service discovery

Para aprender a configurar service discovery com o ECS,veja o tutorial:

https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-cli-tutorial-servicediscovery.html 

## Deploy da stack usando o ECS-CLI

As imagens serão publicadas e baixadas do Docker Hub. Se houver alterações no código, é necessário recompilar as imagens e publicá-las novamente (é necessário ter acesso ao repositório e estar logado no Docker Hub para isso).

```
cd sgq/deploy
> docker login 
> docker-compose build
> docker-compose push
```

O deploy da aplicação será semelhante ao exemplo do tutorial, apenas mudando os nomes onde for apropriado e selecionando o docker-compose apropriado. No exemplo abaixo chamei o projeto de `sgq` e a configuração do cluster de `sgq-config` e o perfil de `sgq-profile`.

Você previsar também criar um arquivo ecs-params.yml na pasta `sgq/deploy`, da mesma forma que no tutorial. Esse arquivo não está versionado pois contém informações sensíveis da conta da AWS. 

Nesse caso o é usado um arquivo YAML diferente do de desenvolvimento local, pois para funcionamento com o ECS, são necessárias algumas tags adicionais, como por exemplo o serviço de log próprio da AWS. Além disso, algumas tags não são compatíveis, como `restart`, `depends_on` e `container_name`.

```
> cd sgq/deploy
> ecs-cli compose --project-name sgq service up --create-log-groups --cluster-config sgq-config --ecs-profile sgq-profile
```

> **Dica**: Se você não estiver vendo sua aplicação no console da AWS, confira se a região certa está selecionada. Nesse exemplo usei a região us-west-2 (Oregon).