import json

with open('compositores.json') as f:
    data = json.load(f)

compositores = data['compositores']
periodos = set()

for compositor in compositores:
    periodos.add(compositor['periodo'])

periodos_list = []

for periodo in periodos:
    periodos_list.append({
        "id": periodo,
    })

with open('peridos.json', 'w') as f:
    f.write(json.dumps(periodos_list, indent=4, ensure_ascii=False).encode('utf8').decode())

with open('compositores_array.json', 'w') as f:
    f.write(json.dumps(compositores, indent=4, ensure_ascii=False).encode('utf8').decode())