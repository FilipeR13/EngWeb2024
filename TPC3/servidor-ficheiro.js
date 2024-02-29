var http = require('http')
var fs = require('fs')
var url = require('url')
var axios = require('axios')

function genfilmes(dados) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>filmes</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
            <div class="w-full" style="display: block;padding: 20px;box-sizing: border-box;background-color: #1d4ed8;color: white;">
                <h1 class="text-4xl font-bold text-center">filmes</h1>
            </div>
            
            <table class="table-auto mx-4">
                <thead>
                    <tr>
                        <th class="px-4 py-2">ID</th>
                        <th class="px-4 py-2">Título</th>
                        <th class="px-4 py-2">Ano</th>
                    </tr>
                </thead>
                <tbody>
`

    dados.forEach(filme => {
        pagHTML += `
            <tr>
                <td class="border px-4 py-2"><a href="/filmes/${filme.id}">${filme.id}</a></td>
                <td class="border px-4 py-2">${filme.title}</td>
                <td class="border px-4 py-2">${filme.year}</td>
        `
    })

    pagHTML += `
                </tbody>
            </table>

            <footer>
                <div class="w-full" style="display: block;padding: 20px;box-sizing: border-box;background-color: #1d4ed8;color: white;">
                    <p class="text-center">Desenvolvido por: EngWeb2024 | <a href="/">Voltar à pagina principal</a><p>
                </div>
            </footer>
        </body>    
    </html>
    `

    return pagHTML
}

function genfilme(filme) {
    pageHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>Filme ${filme.title}</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
            <div class="w-full" style="display: block;padding: 20px;box-sizing: border-box;background-color: #1d4ed8;color: white;">
                <h1 class="text-4xl font-bold text-center">${filme.title}</h1>
            </div>
            
            <div class="container mx-auto">
                <span class"text-2xl font-bold">Ano de Lançamento: </span><span>${filme.year}</span><br>
                <span class"text-2xl font-bold">Elenco </span>
                    <ul class="border-2 border-black mb-4">
    `
    if (filme.cast.length == 0) {
        pageHTML += `
            <li class="border px-4 py-2">Elenco não disponível</li>
        `
    } else {
    filme.cast.forEach(actor => {
        pageHTML += `
            <li class="border px-4 py-2"><a href="/atores/${actor}">${actor}</a></li>
        `
    })}
    pageHTML += `
                    </ul>
                <span class"text-2xl font-bold">Géneros </span>
                    <ul class="border-2 border-black mb-4">
    `
    if (filme.genres.length == 0) {
        pageHTML += `
            <li class="border px-4 py-2">Géneros não disponíveis</li>
        `
    } else {
        filme.genres.forEach(genre => {
            pageHTML += `
                <li class="border px-4 py-2"><a href="/generos/${genre}">${genre}</a></li>
            `
        })
    }
    pageHTML += `
                    </ul>
            </div>

            <footer>
                <div class="w-full" style="display: block;padding: 20px;box-sizing: border-box;background-color: #1d4ed8;color: white;">
                    <p class="text-center">Desenvolvido por: EngWeb2024 | <a href="/filmes">Voltar à lista</a><p>
                </div>
            </footer>
        </body>    
    </html>
    `
    return pageHTML
}


function gengeneros(dados) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>Géneros</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
            <div class="w-full" style="display: block;padding: 20px;box-sizing: border-box;background-color: #1d4ed8;color: white;">
                <h1 class="text-4xl font-bold text-center">Géneros</h1>
            </div>
            <div class="container mx-auto">
                <ul class="border-2 border-black mb-4">
`
    dados.forEach(genero => {
        pagHTML += `
            <li class="border px-4 py-2"><a href="/generos/${genero.id}">${genero.id}</a></li>
        `
    })

    pagHTML += `
                </ul>
            </div>

            <footer>
                <div class="w-full" style="display: block;padding: 20px;box-sizing: border-box;background-color: #1d4ed8;color: white;">
                    <p class="text-center">Desenvolvido por: EngWeb2024 | <a href="/">Voltar à pagina principal</a><p>
                </div>
            </footer>
        </body>    
    </html>
    `

    return pagHTML
}

async function gengenero(genero) {
    let pageHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>${genero.id}</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
            <div class="w-full" style="display: block;padding: 20px;box-sizing: border-box;background-color: #1d4ed8;color: white;">
                <h1 class="text-4xl font-bold text-center">Género ${genero.id}</h1>
            </div>
            
            <div class="container mx-auto">
                <h1 class="text-2xl font-bold">Lista de Filmes: </h1>
                    <ul class="border-2 border-black mb-4">
    `
    
    try {
        const resp = await axios.get('http://localhost:3000/filmes')
        const filmes = resp.data
        
        filmes.forEach(filme => {
            if (filme.genres.includes(genero.id)) {
                pageHTML += `
                    <li class="border px-4 py-2"><a href="/filmes/${filme.id}">${filme.title}</a></li>
                `
            }
        })
        
        pageHTML += `
                    </ul>
            </div>

            <footer>
                <div class="w-full" style="display: block;padding: 20px;box-sizing: border-box;background-color: #1d4ed8;color: white;">
                    <p class="text-center">Desenvolvido por: EngWeb2024 | <a href="/generos">Voltar à lista</a><p>
                </div>
            </footer>
        </body>    
    </html>
    `
        
    } catch (error) {
        console.error('Error fetching data:', error)
    }

    return pageHTML
}

function genatores(data) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>Atores</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
            <div class="w-full" style="display: block;padding: 20px;box-sizing: border-box;background-color: #1d4ed8;color: white;">
                <h1 class="text-4xl font-bold text-center">Atores</h1>
            </div>
            <div class="container mx-auto">
                <ul class="border-2 border-black mb-4">
    `
    data.forEach(actor => {
        pagHTML += `
            <li class="border px-4 py-2"><a href="/atores/${actor.id}">${actor.id}</a></li>
        `
    })

    pagHTML += `
                </ul>
            </div>

            <footer>
                <div class="w-full" style="display: block;padding: 20px;box-sizing: border-box;background-color: #1d4ed8;color: white;">
                    <p class="text-center">Desenvolvido por: EngWeb2024 | <a href="/">Voltar à pagina principal</a><p>
                </div>
            </footer>
        </body>    
    </html>
    `

    return pagHTML
}

async function genator(ator) {
    let pageHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>${ator.id}</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
            <div class="w-full" style="display: block;padding: 20px;box-sizing: border-box;background-color: #1d4ed8;color: white;">
                <h1 class="text-4xl font-bold text-center">Género ${ator.id}</h1>
            </div>
            
            <div class="container mx-auto">
                <h1 class="text-2xl font-bold">Lista de Filmes: </h1>
                    <ul class="border-2 border-black mb-4">
    `
    
    try {
        const resp = await axios.get('http://localhost:3000/filmes')
        const filmes = resp.data
        
        filmes.forEach(filme => {
            if (filme.cast.includes(ator.id)) {
                pageHTML += `
                    <li class="border px-4 py-2"><a href="/filmes/${filme.id}">${filme.title}</a></li>
                `
            }
        })
        
        pageHTML += `
                    </ul>
            </div>

            <footer>
                <div class="w-full" style="display: block;padding: 20px;box-sizing: border-box;background-color: #1d4ed8;color: white;">
                    <p class="text-center">Desenvolvido por: EngWeb2024 | <a href="/atores">Voltar à lista</a><p>
                </div>
            </footer>
        </body>    
    </html>
    `
        
    } catch (error) {
        console.error('Error fetching data:', error)
    }

    return pageHTML
}




http.createServer(function (req, res) {
    var regex_filmes = /^\/filmes\/[a-z0-9]{24}$/
    var regex_generos = /^\/generos\/([\w|%20])+$/
    var regex_atores = /^\/atores\/([\w|%20|-])+$/
    var q = url.parse(req.url, true)
    console.log('Recebi o pedido: ' + q.pathname)

    if (q.pathname == '/') {
        fs.readFile('home.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            res.write(data)
            res.end()
        })
    }
    else if (q.pathname == '/filmes') {
        axios.get('http://localhost:3000/filmes').then(function (resp) {
            dados = resp.data
            pageHTML = genfilmes(dados)
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            res.write(pageHTML)
            res.end()
        })
            .catch(function (erro) {
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write('<p><b>Erro:</b> ' + erro + '</p>')
                res.end()
            })
    }
    else if (q.pathname == '/generos') {
        axios.get('http://localhost:3000/generos').then(function (resp) {
            dados = resp.data
            pageHTML = gengeneros(dados)
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            res.write(pageHTML)
            res.end()
        })
            .catch(function (erro) {
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write('<p><b>Erro:</b> ' + erro + '</p>')
                res.end()
            })
    }
    else if (q.pathname == '/atores') {
        axios.get('http://localhost:3000/atores').then(function (resp) {
            dados = resp.data
            pageHTML = genatores(dados)
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            res.write(pageHTML)
            res.end()
        })
            .catch(function (erro) {
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write('<p><b>Erro:</b> ' + erro + '</p>')
                res.end()
            })
    }
    else if (q.pathname.match(regex_filmes)) {
        axios.get('http://localhost:3000' + q.pathname).then(function (resp) {
            filme = resp.data
            pageHTML = genfilme(filme)
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            res.write(pageHTML)
            res.end()
        })
            .catch(function (erro) {
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write('<p><b>Erro:</b> ' + erro + '</p>')
                res.end()
            })
    }
    else if (q.pathname.match(regex_generos)) {
        axios.get('http://localhost:3000' + q.pathname).then(function (resp) {
            genero = resp.data
            gengenero(genero).then(function (pageHTML) {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write(pageHTML)
                res.end()
            })
        })
            .catch(function (erro) {
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write('<p><b>Erro:</b> ' + erro + '</p>')
                res.end()
            })
    }
    else if (q.pathname.match(regex_atores)) {
        axios.get('http://localhost:3000' + q.pathname).then(function (resp) {
            ator = resp.data
            genator(ator).then(function (pageHTML) {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write(pageHTML)
                res.end()
            })
        })
            .catch(function (erro) {
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write('<p><b>Erro:</b> ' + erro + '</p>')
                res.end()
            })
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
        res.write('Página não encontrada.')
        res.end()
    }
}).listen(8080)

console.log('Servidor iniciado na porta 8080. Pressione CTRL+C para terminar.')