import json

with open('dataset.json') as f:
    data = json.load(f)

modalidades = set()

for item in data:
    for modalidade in item['desportos']:
        modalidades.add(modalidade)
    if 'BI' in item:
        item["id"] = item.pop("BI")
    else:
        item["id"] = item.pop("CC")
        

modalidades_dict = []

for modalidade in modalidades:
    new_item = {
        "nome": modalidade,
        "pessoas": []
    }
    for item in data:
        if modalidade in item['desportos']:
            new_item["pessoas"].append(item["id"])
    modalidades_dict.append(new_item)

with open('modalidades.json', 'w') as f:
    json.dump(modalidades_dict, f, indent=4, ensure_ascii=False)

with open("dataset_improved.json", "w") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)
