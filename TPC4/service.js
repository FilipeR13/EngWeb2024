// alunos_server.js
// EW2024 : 04/03/2024
// by jcr

var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates')
var static = require('./static.js')

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation
async function getPeriodos(){
    const set_periodos = new Set()
    await axios.get("http://localhost:3000/compositores")
    .then(response => {
        response.data.forEach(compositor => {
            set_periodos.add(compositor.periodo)
        })
    })
    .catch(function(erro){
        console.log("Erro: " + erro)
    })
    return set_periodos
}

async function getCompositoresByPeriodo(periodo){
    const compositores = []
    await axios.get("http://localhost:3000/compositores")
    .then(response => {
        response.data.forEach(compositor => {
            if(compositor.periodo == periodo){
                compositores.push(compositor)
            }
        })
    })
    .catch(function(erro){
        console.log("Erro: " + erro)
    })
    return compositores
}

var alunosServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
            // GET /compositores --------------------------------------------------------------------
                if (req.url == "/compositores"){
                    axios.get("http://localhost:3000/compositores")
                        .then(response => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.compositorListPage(response.data, d))
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro, d))
                        })
                }
                
                // GET /compositor/:id --------------------------------------------------------------------
                
                else if (/\/compositores\/C[0-9]+/.test(req.url)){
                    var id = req.url.split("/")[2]
                    axios.get("http://localhost:3000/compositores/" + id)
                        .then(response => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.compositorPage(response.data, d))
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro, d))
                        })
                }
            // GET /periodos --------------------------------------------------------------------
                else if (req.url == "/periodos"){
                    getPeriodos()
                        .then(periodos => {
                            res.writeHead(200, {'Content-Type': 'html'})
                            res.end(templates.periodosListPage(Array.from(periodos), d))
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro, d))
                        })
                }
            // GET /periodos/:id --------------------------------------------------------------------
                else if (/\/periodos\/[A-Za-z]+/.test(req.url)){
                    periodo = req.url.split("/")[2]
                    getCompositoresByPeriodo(periodo)
                        .then(compositores => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.periodoPage(periodo, compositores, d))
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro, d))
                        })
                }
                else {
                    res.writeHead(404, {'Content-Type': 'text/html'})
                    res.end(templates.errorPage("Erro: " + req.url + " nao suportado...", d))
                }

                break
            case "POST":
                res.writeHead(404, {'Content-Type': 'text/html'})
                res.end(templates.errorPage("Erro: " + req.url + " nao suportado...", d))
            default: 
                // Outros metodos nao sao suportados
        }
    }
})

alunosServer.listen(7777, ()=>{
    console.log("Servidor Ã  escuta na porta 7777...")
})


