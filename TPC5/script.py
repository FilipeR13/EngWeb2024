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

structure = {
    "compositores": compositores,
    "periodos": periodos_list
}

with open('compositores_periodos.json', 'w') as f:
    f.write(json.dumps(structure, indent=4, ensure_ascii=False).encode('utf8').decode())