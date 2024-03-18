var express = require('express');
var router = express.Router();
var axios = require('axios')

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

/* GET home page. */
router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0,16)
  res.render('index', { title: 'Express', data: d});
});

router.get('/compositores', function(req, res) {
  var d = new Date().toISOString().substring(0,16)
  axios.get('http://localhost:3000/compositores')
    .then( resposta => {
      res.render('compositores', {compositores: resposta.data, data: d, title: 'Lista de compositores'})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: 'Erro na listagem de compositores'})
    })
});

router.get('/compositores/registo', function(req, res) {
  var d = new Date().toISOString().substring(0,16)
  res.render('newCompositor', {title: 'Registo de Compositor', data: d})
});

router.get('/compositores/:id', function(req, res) {
  var d = new Date().toISOString().substring(0,16)
  axios.get('http://localhost:3000/compositores/' + req.params.id)
    .then( resposta => {
      res.render('compositor', {compositor: resposta.data, data: d, title: resposta.data.nome})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: 'Erro a mostrar compositor'})
    })
});

router.get('/compositores/edit/:id', function(req, res) {
  var d = new Date().toISOString().substring(0,16)
  axios.get('http://localhost:3000/compositores/' + req.params.id)
    .then( resposta => {
      res.render('editCompositor', {compositor: resposta.data, data: d, title: 'Editar Compositor'})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: 'Erro a editar compositor'})
    })
});

router.get('/periodos', function(req, res) {
  var d = new Date().toISOString().substring(0,16)
  axios.get('http://localhost:3000/periodos')
    .then(resposta => {
      res.render('periodos', {periodos: resposta.data, data: d, title: 'Lista de periodos'})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: 'Erro na listagem de periodo'})
    })
});

router.get('/periodos/registo', function(req, res) {
  var d = new Date().toISOString().substring(0,16)
  res.render('newPeriodo', {title: 'Registo de Periodo', data: d})
});

router.get('/periodos/:id', function(req, res) {
  var d = new Date().toISOString().substring(0,16)
  axios.get('http://localhost:3000/periodos/' + req.params.id)
    .then( resposta => {
      getCompositoresByPeriodo(req.params.id)
        .then(compositores_list => {
          res.render('periodo', {periodo: resposta.data, compositores: compositores_list, data: d, title: req.params.id})
        })
        .catch(erro => {
          res.render('error', {error: erro, message: 'Erro a mostrar Periodo'})
        })
    })
});


router.get('/periodos/edit/:id', function(req, res) {
  var d = new Date().toISOString().substring(0,16)
  axios.get('http://localhost:3000/periodos/' + req.params.id)
  .then( resposta => {
    res.render('editPeriodo', {periodo: resposta.data, data: d, title: 'Editar Periodo'})
  })
  .catch(erro => {
    res.render('error', {error: erro, message: 'Erro a editar Periodo'})
  })
});

router.get('/compositores/delete/:id', function(req, res) {
  var d = new Date().toISOString().substring(0,16)
  axios.delete('http://localhost:3000/compositores/' + req.params.id)
    .then( resposta => {
      res.render('index', {title: 'Compositor eliminado', data: d})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: 'Erro ao eliminar compositor'})
    })
});

router.get('/periodos/delete/:id', function(req, res) {
  var d = new Date().toISOString().substring(0,16)
  axios.delete('http://localhost:3000/periodos/' + req.params.id)
    .then( resposta => {
      res.render('index', {title: 'Periodo eliminado', data: d})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: 'Erro ao eliminar periodo'})
    })
});

router.post('/compositores/registo', function(req, res) {
  var d = new Date().toISOString().substring(0,16)
  axios.post('http://localhost:3000/compositores', req.body)
    .then( resposta => {
      axios.get('http://localhost:3000/compositores')
        .then(resposta => {
          res.render('compositores', {compositores: resposta.data, title: 'Compositores', data: d})
        })
        .catch(erro => {
          res.render('error', {error: erro, message: 'Erro ao gravar compositor'})
        })
  })
});

router.post('/periodos/registo', function(req, res) {
  var d = new Date().toISOString().substring(0,16)
  axios.post('http://localhost:3000/periodos', req.body)
    .then( resposta => {
      axios.get('http://localhost:3000/periodos')
        .then(resposta => {
          res.render('periodos', {periodos: resposta.data, title: 'Periodos', data: d})
        })
        .catch(erro => {
          res.render('error', {error: erro, message: 'Erro ao gravar compositor'})
        })	
    })
});

router.post('/compositores/edit/:id', function(req, res) {
  var d = new Date().toISOString().substring(0,16)
  axios.put('http://localhost:3000/compositores/' + req.params.id, req.body)
    .then( resposta => {
      res.render('compositor', {compositor: req.body, title: req.body.nome, data: d})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: 'Erro ao confirmar edicao de compositor'})
    })
});

router.post('/periodos/edit/:id', function(req, res) {
  var d = new Date().toISOString().substring(0,16)
  axios.put('http://localhost:3000/periodos/' + req.params.id, req.body)
    .then( resposta => {
      getCompositoresByPeriodo(req.params.id)
        .then(compositores_list => {
          res.render('periodo', {periodo: req.body, compositores: compositores_list, data: d, title: req.params.id})
        })
        .catch(erro => {
          res.render('error', {error: erro, message: 'Erro a mostrar Periodo'})
        })
    })
});


module.exports = router;
