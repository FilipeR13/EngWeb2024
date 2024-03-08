# TPC4: Compositores e os diversos Periodos - Servidor Web Para Gerenciamento
## 2024/03/08

## Autor

**Nome:** José Rodrigues

**Número:** A100692

## Resumo

Neste trabalho o objetivo principal era o desenvolvimento de um sistema de gerenciamento de compositores e períodos musicais, desenvolvido para facilitar o armazenamento e a visualização de informações relacionadas a esses artistas e seus respectivos períodos históricos.

O sistema utiliza um servidor JSON para armazenar e fornecer os dados sobre os compositores e períodos musicais. As principais rotas para aceder esses dados são `/compositores` e `/periodos`, que retornam uma lista de todos os compositores e períodos musicais, respectivamente. Além disso, as rotas `/compositores/{id}` e `/periodos/{id}` permitem aceder informações detalhadas sobre um compositor ou período musical específico(neste último caso, ao ser selecionado um período, serão exibidos todos os compositores do mesmo).

O objetivo deste trabalho é fornecer uma interface web onde os utilizadores possam visualizar, adicionar, editar e excluir informações sobre compositores e períodos musicais. O sistema deve permitir que os utilizadores naveguem pelas diferentes páginas para aceder os diversos recursos e realizar as várias operações.

## Instruções de Uso

Antes de iniciar o servidor, é necessário preparar o arquivo `compositores_periodos.json`, que será utilizado como dataset para o servidor JSON. Para isso, execute o seguinte comando:

* `python3 script.py` 

Este comando irá executar um script python que melhora a estrutura do dataset original, `compositores.json`, e guarda o resultado com o nome `compositores_periodos.json`. Certifique-se de que o ficheiro compositores.json esteja presente na mesma diretoria do script Python antes de executá-lo.

Antes de iniciar o servidor web, certifique-se de executar o seguinte comando para iniciar o servidor JSON que fornece os dados para a aplicação:


* `json-server compositores_periodos.json`


Este comando irá iniciar o servidor JSON e monitorar as alterações no ficheiro `compositores_periodos.json`, que contém os dados sobre os compositores e períodos musicais.

Por fim, após preparar o dataset e iniciar o JSON-Server, pode iniciar o servidor Node.js para aceder e manipular os dados sobre compositores e períodos musicais. Para iniciar o servidor, execute o seguinte comando:


* `node service.js`


## Dependências

Para correr o trabalho é nessário ter o axios instalado:

* `npm install axios`