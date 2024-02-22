import json

def generateIndex(cidades):
    dic = {}
    html = """
    <!doctype html>
    <html>
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
        <title>Mapa Virtual</title>
        </head>

        <body>
            <h1 class="text-3xl">Mapa Virtual</h1>
            <ul>
    """

    for cidade in cidades:
        html += f"""
            <li><a href="http://localhost:7777/{cidade['id']}">{cidade['nome']}</a></li>
        """
        dic[cidade["id"]] = cidade["nome"]

    html += """
            </ul>
            <footer>
                <p>Done by José Rodrigues EngWeb24</p>
            </footer>
        </body>
    </html>
    """

    with open("index.html", "w") as file:
        file.write(html)

    return dic


def generatePages(cidades, ligacoes, dic):
    for cidade in cidades:
        html = f"""
        <!doctype html>
        <html>
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script src="https://cdn.tailwindcss.com"></script>
            <title>{cidade["nome"]}</title>
            </head>

            <body>
                <h1 class="text-3xl">{cidade["nome"]}</h1>
                <p class="font-bold">População: {cidade["população"]}</p>
                <p>Descrição: {cidade["descrição"]}</p>
                <p>Distrito: {cidade["distrito"]}</p>

                <h2 class="text-2xl">Ligações</h2>
        """

        ligacoes_with_cidade = list(filter(lambda ligacao: ligacao["origem"] == cidade["id"] or ligacao["destino"] == cidade["id"], ligacoes))
        for ligacao in ligacoes_with_cidade:
            html += f"""
                <p> <a href="http://localhost:7777/{ligacao["origem"]}"> {dic[ligacao['origem']]}</a> -> <a href="http://localhost:7777/{ligacao["destino"]}"> {dic[ligacao['destino']]}</a>. Distância:{ligacao["distância"]}</p>
            """

        html += """
            </body>

            <footer>
                <a href="/"> Voltar ao índice</a>
                <p>Done by José Rodrigues EngWeb24</p>
            </footer>
        </html>
        """

        with open(f"pages/{cidade['id']}.html", "w") as file:
            file.write(html)

if __name__ == "__main__":    
    with open("mapavirtual.json", "r") as file:
        data = json.load(file)

    cidades = data["cidades"]
    ligacoes = data["ligacoes"]

    cidades = sorted(cidades, key=lambda cidade: cidade["nome"])

    dic = generateIndex(cidades)
    generatePages(cidades, ligacoes, dic)
