# GPTW Microservices

## Requisitos

- MySQL
- Yarn
- NodeJS@16.13.2 ou superior

## Instalação

### MySQL

Certifique-se que você tem uma instância do MySQL rodando localmente na porta 3306

### Yarn

Após clonado o repositório, os passos a seguir devem ser feitos nas pastas `mock-microservice` e `auth-microservice`:

Copie o arquivo `.env.example` e renomeie a cópia para `.env`.

Obs: Substituir o `user` e o `password` da variável `DATABASE_URL` para os de sua conexão MySQL. No arquivo `.env.example` localizado na pasta `auth-microservice` gere uma string para ser o secret da variável `JWT_SECRET`.

Abra uma instância de terminal e rode o seguinte comando:

```
yarn
```

Após, rode os comandos:

```
yarn prisma db push
yarn prisma generate
```

Por fim, rode o comando:

```
yarn dev
```

## Utilização

### Criar Usuário

Para criar um usuário, com sua ferramenta de teste de API (Insomnia, Postman etc.) faça uma chamada para a seguinte rota, alterando os dados de exemplo:

```curl
curl -X POST http://localhost:3001/user
   -H 'Content-Type: application/json'
   -d '{"firstname":"string", "lastname":"string", "email":"string", "password":"string"}'
```

### Autenticação

Para utilizar qualquer outra rota do microsserviço Mock, é necessário autenticar.

Utilize o email e senha cadastrado na rota de criação de usuário, na seguinte rota para autenticar:

```curl
curl -X POST http://localhost:3002/auth
   -H 'Content-Type: application/json'
   -d '{"email":"string", "password":"string"}'
```

Exemplo de retorno:

```json
{
	"result": {
		"id": "00000000-0000-0000-0000-000000000000",
		"email": "foobar@mail.com",
		"firstname": "foo",
		"lastname": "bar"
	},
	"token": "eyJhbGciOiJIUzI1NiIsInI6IkpXVCJ9..."
}
```

Guarde o token retornado, ele será necessário para outras rotas.

### Buscar dados de Usuário

Para buscar os dados pelo Id do usuário, utilize o token gerado anteriormente na seguinte rota:

```curl
curl http://localhost:3001/user/:id
   -H 'Authorization: Bearer YOUR_TOKEN' 
```

Exemplo de retorno:

```json
{
	"result": {
		"id": "00000000-0000-0000-0000-000000000000",
		"email": "foobar@mail.com",
		"firstname": "foo",
		"lastname": "bar"
	}
}
```

### Alterar dados de Usuário

Para alterar os dados de um usário, utilize o token gerado anteriormente na seguinte rota:

```curl
curl -X PUT http://localhost:3001/user/:id
   -H 'Content-Type: application/json'
   -H 'Authorization: Bearer YOUR_TOKEN'
   -d '{"firstname":"string", "lastname":"string", "email":"string", "password":"string"}'
```

### Deletar um Usuário

Para deletar o registro de um usário, utilize o token gerado anteriormente na seguinte rota:

```curl
curl -X DELETE http://localhost:3001/user/:id
   -H 'Authorization: Bearer YOUR_TOKEN'
