// alunos_server.js
// EW2024 : 04/03/2024
// by jcr

var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates')
var static = require('./static.js');
const { symlinkSync } = require('fs');

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
                    axios.get("http://localhost:3000/periodos")
                    .then(periodos => {
                            res.writeHead(200, {'Content-Type': 'html'})
                            res.end(templates.periodosListPage(periodos.data, d))
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro, d))
                        })
                }
            // GET /periodos/:id --------------------------------------------------------------------
                else if (req.url == "/compositores/registo"){
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.end(templates.compositorFormPage(d))
                }
                else if (req.url == "/periodos/registo"){
                    console.log("entrou")
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.write(templates.periodoFormPage(d))
                    res.end()
                }
                else if (/\/periodos\/edit\/[A-Za-z]+/.test(req.url)){
                    var periodo = req.url.split("/")[3]
                    axios.get("http://localhost:3000/periodos/" + periodo)
                        .then(response => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.periodoFormEditPage(response.data, d))
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro, d))
                        })
                }
                else if (/\/periodos\/delete\/[A-Za-z]+/.test(req.url)){
                    var periodo = req.url.split("/")[3]
                    axios.delete("http://localhost:3000/periodos/" + periodo)
                        .then(response => {
                            res.writeHead(200, {'Location': "/periodos"})
                            res.write(templates.periodosListPage(response.data, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro, d))
                        })
                }
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
                else if (/\/compositores\/edit\/C[0-9]+/.test(req.url)){
                    var id = req.url.split("/")[3]
                    axios.get("http://localhost:3000/compositores/" + id)
                        .then(response => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.compositorFormEditPage(response.data, d))
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro, d))
                        })
                }
                else if (/\/compositores\/delete\/C[0-9]+/.test(req.url)){
                    var id = req.url.split("/")[3]
                    axios.delete("http://localhost:3000/compositores/" + id)
                        .then(response => {
                            res.writeHead(200, {'Location': "/compositores"})
                            res.write(templates.compositorListPage(response.data, d))
                            res.end()
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
                // POST /compositores --------------------------------------------------------------------
                if (req.url == "/compositores/registo"){
                    collectRequestBodyData(req, result => {
                        axios.post("http://localhost:3000/compositores", result)
                            .then(response => {
                                res.writeHead(200, {'Location': '/compositores'})
                                res.write(templates.compositorListPage(response.data, d))
                                res.end()
                            })
                            .catch(function(erro){
                                res.writeHead(200, {'Content-Type': 'text/html'})
                                res.end(templates.errorPage(erro, d))
                            })
                    })
                }
                else if (/\/compositores\/edit\/C[0-9]+/.test(req.url)){
                    var id = req.url.split("/")[3]
                    collectRequestBodyData(req, function(data){
                        axios.put("http://localhost:3000/compositores/" + id, data)
                            .then(response => {
                                res.writeHead(200, {'Location' : '/compositores/' + id})
                                res.end(templates.compositorPage(response.data, d))
                            })
                            .catch(function(erro){
                                res.writeHead(200, {'Content-Type': 'text/html'})
                                res.end(templates.errorPage(erro, d))
                            })
                    })
                }
                else if (req.url == "/periodos/registo"){
                    collectRequestBodyData(req, result => {
                        axios.post("http://localhost:3000/periodos", result)
                            .then(response => {
                                res.writeHead(200, {'Location': '/periodos'})
                                res.write(templates.periodosListPage(response.data, d))
                                res.end()
                            })
                            .catch(function(erro){
                                res.writeHead(200, {'Content-Type': 'text/html'})
                                res.end(templates.errorPage(erro, d))
                            })
                    })
                }
                else if (/\/periodos\/edit\/[A-Za-z]+/.test(req.url)){
                    var id = req.url.split("/")[3]
                    collectRequestBodyData(req, function(data){
                        axios.put("http://localhost:3000/periodos/" + id, data)
                            .then(response => {
                                id = response.data.id
                                getCompositoresByPeriodo(id)
                                    .then(compositores => {
                                        res.writeHead(200, {'Content-Type': 'text/html', 'Location' : '/periodos/' + id})
                                        res.end(templates.periodoPage(id, compositores, d))
                                    })
                                    .catch(function(erro){
                                        res.writeHead(200, {'Content-Type': 'text/html'})
                                        res.end(templates.errorPage(erro, d))
                                    })
                            })
                    })
                }
                else {  
                    res.writeHead(404, {'Content-Type': 'text/html'})
                    res.end(templates.errorPage("Erro: " + req.url + " nao suportado...", d))
                }

            default: 
                // Outros metodos nao sao suportados
        }
    }
})

alunosServer.listen(7777, ()=>{
    console.log("Servidor Ã  escuta na porta 7777...")
})


