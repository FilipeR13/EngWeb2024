import json
import requests

def add_entries(files):
    data = []

    with open('modalidades.json') as f:
        modalidades = json.load(f)

    list_modalidades = [modalidade['nome'] for modalidade in modalidades]
    for file in files:
        with open(file) as f:
            data = data + json.load(f)
        
    for item in data:
        if 'BI' in item:
            item["id"] = item.pop("BI")
        else:
            item["id"] = item.pop("CC")
        for modalidade in item['desportos']:
            if modalidade not in list_modalidades:
                list_modalidades.append(modalidade)
                new_item = {
                    "nome": modalidade,
                    "pessoas": []
                }
                modalidades.append(new_item)

                v = requests.post("http://localhost:3000/modalidades/new", json=new_item)
                print("Sent new modalidade: " + modalidade + "\t" + str(v.status_code))
            v = requests.post("http://localhost:3000/pessoas/registo", json=item)
            print("Sent new pessoa: " + item["id"] + "\t" + str(v.status_code))
            v = requests.post("http://localhost:3000/modalidades/add/" + modalidade, json=item)
            print("Sent new pessoa to modalidade: " + item["id"] + " to " + modalidade + "\t" + str(v.status_code))
    modalidades_dict = []

    for modalidade in modalidades:
        new_item = {
            "nome": modalidade,
            "pessoas": []
        }
        for item in data:
            if modalidade in item['desportos']:
                new_item["pessoas"].append(item["_id"])
        modalidades_dict.append(new_item)

if __name__ == "__main__":
    add_entries(['dataset-extra1.json', 'dataset-extra2.json', 'dataset-extra3.json'])
