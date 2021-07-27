## **Banco de dados**

<hr/>

Para fazer inclusões ou alterações na estrutura do banco de dados, é necessário seguir alguns passos:

1- Defina o objetivo da alteração/inclusão.
<br/>
(Ex: CreateProducts, CreateUsers, etc)

2- Digite o comando:
<br/>
`yarn typeorm migration:create -n <nome-do-objetivo>`;

3- Vá até o diretório de migrations (_src/shared/typeorm/migrations/_) e faça as operações de `up` e `down`, para fazer e desfazer as ações da migration.

4- Execute no terminal: <br/>
`yarn typeorm migration:run`

5- Se necessário, crie entidades, repositórios customizados, etc.
