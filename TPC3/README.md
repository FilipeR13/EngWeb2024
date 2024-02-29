# TPC1: Lista de Filmes
## 2024/02/29

## Autor:
- A100692
- José Filipe Ribeiro Rodrigues

## Resumo

Neste trabalho, utilizou-se um dataset sobre filmes para criar um servidor web que permite navegar pelos filmes e respetivos géneros e elenco.

Primeiramente, devido ao dataset que foi entregue conter vários erros, foi desenvolvido um scipt em python que normaliza estes dados e escreve para o ficheiro `filmes_normalizados.json`. Este ficheiro json vai conter três entradas principais: filmes, atores e generos. O primeiro contem uma lista de dicionarios com as chaves:
    1. id
    2. title
    3. year
    4. cast
    5. genres
Sendo os últimos dois uma lista.
Ambas entradas atores e generos são apenas uma lista de dicionarios que possuem apenas uma chave, id, que é o próprio nome do ator/género, visto que estes são únicos.

Tendo os dados normalizados passei ao desenvolvimento do servidor web. Primeiro é necessário colocar o json-server a observer o json normalizado. Desta forma, o servidor em javascript pode executar pedidos ao json-server obtendo os dados necessários para gerar as páginas html. O servidor filtra os pedidos através de algumas expressões regulares. Consoante o match encontrado é mandado para a web a página web correspondente.

Descrevendo a estrutura das páginas web: Temos uma página principal que dá acesso às páginas dos filmes, atores e géneros. Cada uma destas páginas lista todos os items correspondentes. Possuem também ainda, no fim da página, um redirecionamento para a página principal.

As páginas dedicadas a cada filme possuem a lista do elenco e a lista de géneros associados. Cada item destas listas levam para as páginas próprias correspondentes.
As páginas dos géneros possuem a lista de filmes que estão associados a esse mesmo género.
Por fim, as páginas dos atores possuem a lista de filmes em que esse ator participa.

## Instruções de Utilização

Os seguintes comandos estão preparados na premissa que o utilizador está situado na pasta TPC3

* Normalizar os dados:

`python3 normalizacao.py`

* Iniciar Servidor
    1. json-server filmes_normalizados.json
    2. node servidor-ficheiro.js 