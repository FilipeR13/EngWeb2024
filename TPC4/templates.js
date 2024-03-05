exports.compositorListPage = function(slist, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Composositores</title>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-teal">
                    <h1>Compositores</h1>
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th><th>Nome</th><th>Periodo</th>
                        </tr>
                `
    for(let i=0; i < slist.length ; i++){
        pagHTML += `
                <tr>
                    <td>${slist[i].id}</td>
                    <td>
                        <a href="/compositores/${slist[i].id}">
                            ${slist[i].nome}
                        </a>
                    </td>
                    <td>${slist[i].periodo}</td>
                </tr>
        `
    }

    pagHTML += `
            </table>
            </div>
                <footer class="w3-container w3-blue">
                    <h5>Generated by <A100692> in ${d}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

// ---------------Compositor's Page--------------------------------
// Change and adapt to current dataset...
exports.compositorPage = function(compositor, d ){
    var pagHTML = `
    <html>
    <head>
        <title>compositor: ${compositor.Id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>compositor ${compositor.id}</h1>
            </header>

            <div class="w3-container">
                <ul class="w3-ul w3-card-4" style="width:50%">
                    <li><b>Nome: </b> ${compositor.nome}</li>
                    <li><b>Data de Nascimento: </b> ${compositor.dataNasc}</li>
                    <li><b>Data de Óbito: </b>${compositor.dataObito}</a></li>
                    <li><b>Período: </b><a href="periodos/">${compositor.periodo}</a></li>
                </ul>
            </div>
            <footer class="w3-container w3-teal">
                <address>Gerado por galuno::RPCW2022 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
    return pagHTML
}

exports.periodosListPage = function(periodos, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Periodos</title>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-teal">
                    <h1>Periodos</h1>
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Nome</th>
                        </tr>
                `
    for(let i=0; i < periodos.length ; i++){
        pagHTML += `
                <tr>
                    <td><a href="periodos/${periodos[i]}">${periodos[i]}</td>
                </tr>
        `
    }

    pagHTML += `
            </table>
            </div>
                <footer class="w3-container w3-blue">
                    <h5>Generated by <A100692> in ${d}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

exports.periodoPage = function(periodo,list_compositores, d ){
    var pagHTML = `
    <html>
    <head>
        <title>Periodo: ${periodo}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>periodo ${periodo}</h1>
            </header>

            <div class="w3-container">
            <table class="w3-table-all">
                <tr>
                    <th>Id</th><th>Nome</th><th>Periodo</th>
                </tr>
        `
    for(let i=0; i < list_compositores.length ; i++){
    pagHTML += `
            <tr>
                <td>${list_compositores[i].id}</td>
                <td>
                    <a href="/compositores/${list_compositores[i].id}">
                        ${list_compositores[i].nome}
                    </a>
                </td>
                <td>${list_compositores[i].periodo}</td>
            </tr>
    `
    }

    pagHTML += `
        </table>
            </div>
            <footer class="w3-container w3-teal">
                <address>Gerado por galuno::RPCW2022 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
    return pagHTML
}


// -------------- Error Treatment ------------------------------
exports.errorPage = function(errorMessage, d){
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Error Page</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h2>Error Page</h2>
                </header>
            
                <div class="w3-container">
                    <p>${d}: Error: ${errorMessage}</p>
                </div>
                <footer class="w3-container w3-teal">
                    <h5>Generated by José Rodrigues EngWeb2024 in ${d} - [<a href="/">Return</a>]</h5>
                </footer>
            
            </div>
    `
}