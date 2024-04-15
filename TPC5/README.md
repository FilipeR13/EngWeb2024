# TPC5: Compositores e os diversos Periodos - Servidor Web Para Gerenciamento Utilizando Express
## 2024/03/20

## Autor

**Nome:** José Rodrigues

**Número:** A100692


## Introdução

Neste projeto, o principal objectivo foi desenvolver um sistema para gerir informações sobre compositores e os diferentes períodos musicais em que estes se destacaram. 
Utilizou-se um servidor JSON para armazenar e disponibilizar esses dados. As rotas principais, `/compositores` e `/periodos`, permitem aceder a listas de todos os compositores e períodos musicais, respetivamente. 
Além disso, as rotas `/compositores/{id}` e `/periodos/{id}` permitem ver detalhes específicos sobre um compositor ou a lista de compositores relacionados com o período selecionado. Assim, foi criada uma interface web que permitisse aos utilizadores visualizar, adicionar, editar e apagar informações sobre compositores e períodos musicais, facilitando a navegação entre diferentes páginas para aceder a esses recursos e realizar várias operações.
Como pedido nesta senama, foi utilizado o `Express` para definir as rotas.

## Instruções de Uso

Antes de iniciar o servidor, é necessário preparar o arquivo `compositores_periodos.json`, que será utilizado como dataset para o servidor JSON. Para isso, execute o seguinte comando:

```
$ python3 script.py
```
Este script tem como objetivo preparar o dataset de maneira a facilitar os `gets` da web, adicionando ao dicionário uma entrada `periodos`, que lista todos os periodos presentes nos compositores.

Antes de iniciar o servidor web, é necessário executar o seguinte comando para iniciar o `json-server`

```
$ json-server --watch compositores_periodos.json
```

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