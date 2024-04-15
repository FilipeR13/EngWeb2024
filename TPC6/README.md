# TPC6: Compositores e os diversos Periodos - Servidor Web Para Gerenciamento Utilizando Express com MongoDB
## 2024/03/20

## Autor

**Nome:** José Rodrigues

**Número:** A100692


## Introdução

Neste projeto, o principal objectivo foi desenvolver um sistema para gerir informações sobre compositores e os diferentes períodos musicais em que estes se destacaram.
Ao contrário do último TPC, em lugar de usar um json-server, foi utilizado um container no `docker` contendo `mongodb` para armazenar os dados dos compositores e dos periodos. Desta forma, foi criada uma base de dados com o nome "TPC6" que possui as duas coleções necessárias, "Compositores" e "Periodos". As rotas principais, `/compositores` e `/periodos`, permitem aceder a listas de todos os compositores e períodos musicais, respetivamente.   
Além disso, as rotas `/compositores/{id}` e `/periodos/{id}` permitem ver detalhes específicos sobre um compositor ou a lista de compositores relacionados com o período selecionado. Assim, foi criada uma interface web que permitisse aos utilizadores visualizar, adicionar, editar e apagar informações sobre compositores e períodos musicais, facilitando a navegação entre diferentes páginas para aceder a esses recursos e realizar várias operações.
Como pedido nesta senama, foi utilizado o `Express` para definir as rotas.

## Acesso aos dados

Visto que neste TPC a maneira de aceder aos dados foi bastante diferente dos últimos irei explicar como funciona.

Primeiramente, para poder aceder e se conectar à base de dados no container, foi importado o `mongoose` para facilitar esse acesso. Desta maneira, a aplicação conecta-se a `mongodb://127.0.0.1/TPC6` que é onde a base de dados está a ser executada. Se a conexão tiver sucesso, é avisado na consola esse mesmo facto. Caso contrário, o utilizador é avisado da mesma forma.

Para cada coleção foi criado dois ficheiros nas pastas `models/` e `controllers/`. Na primeira são definidas a forma de como os dados são organizados em cada coleção. Na segunda pasta são definidas todas as funções de acesso aos dados, por exemplo: list, update, insert e delete. 

## Instruções de Uso

Antes de iniciar o servidor, é necessário copiar os dados para as coleções da base de dados. Para isso é necessário criar dois ficheiros para carregar para a bd. Desta forma, depois de executar o seguinte comando:

```
$ python3 script.py
```

São gerados dois ficheiros .json, `compositores-array.json` e `periodos.json`, que possuem as informações em forma de lista dos dois conteúdos correspondentes. 

Para copiar os dados para o mongodb os seguintes comandos devem ser executados:

```
$ docker cp compositores.json mongo:/tmp
$ docker cp peridos.json mongo:/tmp
$ docker exec -it mongo bash
```
`(Dentro da bash do container)`

```
$ mongoimport -d TPC6 -c compositors /tmp/compositores_array.json --jsonArray
$ mongoimport -d TPC6 -c periodos /tmp/periodos.json --jsonArray
$ exit
```

Desta forma, todos os dados já estão copiados na base de dados `TPC6` 

Por fim, para iniciar o projeto, certifique-se de instalar todas as dependências necessárias. Na diretoria do projeto, execute o seguinte comando:

```
$ npm i
```

Este comando irá instalar todas as dependências necessárias para o projeto.

Após instalar as dependências, pode iniciar o servidor Node.js executando o seguinte comando:

```
$ npm start
```

Assim, o servidor Node.js irá ser iniciado na porta `3000`. Para aceder às páginas basta copiar o seguinte link:

```
$ http://localhost:3000
```