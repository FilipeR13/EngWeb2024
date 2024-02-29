import json

with open('filmes.json', 'r') as f:
    data = f.read()

data = data.split('\n')
data = [json.loads(d) for d in data if d]

lista = []
atores = set()
generos = set()


for d in data:
    entrada = {}
    entrada["id"] = d["_id"]["$oid"]
    entrada["title"] = d["title"]
    entrada["year"] = d["year"]
    entrada["cast"] = d["cast"]
    entrada["genres"] = d["genres"] if "genres" in d else []
    lista.append(entrada)

    atores.update(entrada["cast"])
    generos.update(entrada["genres"])

atores = [{"id": a} for a in atores]
generos = [{"id": g} for g in generos]

structure = {
    "filmes": lista,
    "atores": atores,
    "generos": generos
}


with open('filmes_normalizados.json', 'w') as f:
    f.write(json.dumps(structure, indent=4, ensure_ascii=False).encode('utf8').decode())
