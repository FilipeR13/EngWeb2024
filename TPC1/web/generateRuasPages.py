import os
from xml.etree import ElementTree as ET

def generate_html_street_page(xml_file):
    tree = ET.parse("../MapaRuas-materialBase/texto/"+xml_file)
    root = tree.getroot()

    street_name = os.path.splitext(os.path.basename(xml_file))[0]
    street_nome = root.find(".//meta/nome").text
    street_number = root.find(".//meta/número").text


    street_html = f"""
<!doctype html>
<html>
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="./../custom.css" rel="stylesheet">
    <title>{street_nome}</title>
    </head>

<body>
    <div class="w-full">
        <header>
            <h1>{street_nome}</h1>
        </header>
        <div class="container mx-auto border-2 border-#6b7280 rounded my-8 shadow-lg"> 
            <div class="px-4 py-2">
                <h2 class="text-2xl underline">Informação da rua</h2>
            </div>
            <div class="px-8">
                <div class="flex flex-row items-center gap-2">
                        <p class="text-base font-bold">Número da Rua:</p>
                        <p>{street_number}</p>
                    </div>
                <div class="flex flex-row items-center gap-2">
                        <p class="text-base font-bold">Nome:</p> 
                        <p>{street_nome}</p>
                    </div>
                <h2 class="text-base underline">Descrição da Rua:</h2>
                <div class="px-4 mb-4">
                """
    
    for para in root.findall(".//corpo/para"):
        street_html += f"<p>{ET.tostring(para).decode()}</p>\n"

    street_html += """
                </div>
            </div>
        </div>
    """

    street_html += """
        <h2 class="text-2xl text-red-600 font-bold pb-4 px-4">Informações das casas</h2>
            <div class="grid grid-cols-3 gap-4 mx-16 justify-items-strech">
        """

    for casa in root.findall(".//corpo/lista-casas/casa"):
        house_info= """
            <div class="container mx-auto border-2 border-#6b7280 rounded shadow-lg">
        """
        for child in casa:
            if child.tag == 'desc':
                para_element = child.find('para')
                if para_element is not None:
                    house_info += f"""
                    <div class="flex flex-row items-start gap-2 mx-4">
                        <span class="text-base font-bold self-start">Descrição:</span>
                        <span>{ET.tostring(para_element).decode()}</span>
                    </div>
                    """
            elif child.tag == 'número':
                house_info += f"<span class=\"text-xl text-red-500 flex justify-center\">Casa {child.text}</span>\n"
            elif child.tag == 'foro':
                house_info += f"""
                <div class="flex flex-row items-start gap-2 mx-4">
                    <span class="text-base font-bold self-start">Foro:</span>
                    <span>{child.text}</span>
                </div>
                """
            elif child.tag == 'enfiteuta':
                house_info += f"""
                <div class="flex flex-row items-start gap-2 mx-4">
                    <span class="text-base font-bold self-start">Enfiteuta:</span>
                    <span>{child.text}</span>
                </div>
                """    
            elif child.tag == 'vista':
                house_info += f"""
                <div class="flex flex-row items-start gap-2 mx-4">
                    <span class="text-base font-bold self-start">Vista:</span>
                    <span>{child.text}</span>
                </div>
                """
            else:
                house_info += f"""
                <div class="flex flex-row items-start gap-2 mx-4">
                    <span class="text-base font-bold self-start">{child.tag}:</span>
                    <span>{child.text}</span>
                </div>
                """  
        house_info += "</div>"
        street_html += house_info


    street_html += """
                </div>
                <h1 class="text-2xl text-red-600 font-bold py-4 px-4">Imagens</h1>
            """
    for imagem in root.findall(".//corpo/figura"):
        path = imagem.find('imagem').attrib['path']
        caption = imagem.find('legenda').text

        street_html += f"""
            <div class="px-4 pr-4">
                <img src="../../MapaRuas-materialBase/{path[3:]}" alt="{caption}" style="border: 2px solid black;">
            </div>
            """
        street_html += f"""
            <div class="flex flex-row items-start gap-2 mx-4 justify-center pb-4">
                    <span class="text-base font-bold self-start">Descrição da Imagem: </span>
                    <span>{caption}</span>
            </div>
"""

    street_html += """
            <footer>
                <h5>Generated by RuasApp::EngWeb2024::D1002</h5>
                <a href="../index.html">Retornar à página principal</a>
            </footer>
        
        </div>
    </body>
    </html>
    """

    with open(f"RuasPages/{street_name[7:]}.html", "w") as f:
        f.write(street_html)

def main():
    xml_files = sorted([filename for filename in os.listdir('../MapaRuas-materialBase/texto') if filename.endswith('.xml')])

    for xml_file in xml_files:
        generate_html_street_page(xml_file)

if __name__ == "__main__":
    main()