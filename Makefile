# Defina o nome do seu serviço de aplicação como definido no docker-compose.yml
APP_SERVICE_NAME=app

# Comando para construir os serviços
build:
	docker compose build

# Comando para iniciar os serviços
up:
	docker compose up -d

# Comando para parar os serviços
down:
	docker compose down

# Comando para ver logs do serviço da aplicação
logs:
	docker compose logs -f $(APP_SERVICE_NAME)

# Comando para acessar o terminal do container da aplicação
exec:
	docker compose exec $(APP_SERVICE_NAME) /bin/sh

# Comando para visualizar o status dos serviços
ps:
	docker compose ps

# Comando para parar e remover volumes, útil para resetar o estado da aplicação
clean:
	docker compose down -v

# Comando para reiniciar os serviços
restart:
	docker compose restart

# Definição padrão se nenhum argumento for fornecido ao make
.DEFAULT_GOAL := up

# Evita conflitos de arquivos com nomes dos comandos
.PHONY: build up down logs exec ps clean restart
