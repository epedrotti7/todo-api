# Todo API

Este projeto é uma API de gerenciamento de tarefas. Ela permite criar, listar, atualizar e deletar tarefas, além de fornecer endpoints para manipulação em lote e contagem de tarefas.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no lado do servidor.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
- **Fastify**: Framework web minimalista e eficiente para Node.js.
- **Mongoose**: Biblioteca do MongoDB para modelagem de objetos em ambiente Node.js.
- **Docker**: Plataforma para desenvolver, enviar e rodar aplicações em containers.
- **Docker Compose**: Ferramenta para definir e executar aplicativos Docker multi-container.
- **Jest**: Framework de testes em JavaScript com foco na simplicidade.

## Requisitos

Para executar este projeto, você precisará ter instalado:
- Docker e Docker Compose
- Node.js (recomendado usar através do Docker)

## Instalação e Execução

1. **Clonar o repositório**

2. **Construir e executar com Docker Compose utilizando Makefile**

O projeto inclui um `Makefile` para simplificar o processo de construção e execução dos containers Docker.

- Para construir as imagens do serviço, execute:

```
make build
```

- Em seguida, para iniciar os serviços em background, execute:

```
make up
```

Estes comandos vão iniciar os serviços necessários, incluindo o MongoDB e o serviço da API. Após executar `make up`, a API estará acessível em `http://localhost:8080`.

3. **Acessar a documentação da API**

Com os serviços rodando, você pode acessar a documentação da API e interagir com os endpoints disponíveis visitando `http://localhost:8080/documentation` no seu navegador.

Se preferir, o repositorio contém uma collection do Postman, basta apenas importá-la e executar os endpoints.

## Executando Testes

Para executar os testes da aplicação, use o seguinte comando:

```
npm run test
```

Nota: Se estiver executando a aplicação inteiramente dentro de containers, considere executar a api fora do container docker, instalando as dependencias com:

  ```
  npm install 
  ```

e rodando o comando

```
npm run test
```
## Utilizando o web socket

Basta abrir o index.html existente na pasta `websockets`, esse html é bem simples, e serve apenas para criar tarefa e listá-las em tempo real, caso queira, é possivel abrir mais de um index.html e observar os valores sendo criados e listados em tempo real.
