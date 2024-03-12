var express = require('express');
var router = express.Router();
var axios = require('axios')

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
      res.render('compositor', {compositor: resposta.data, data: d, title: 'Compositor'})
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

router.post('/compositores/registo', function(req, res) {
  var d = new Date().toISOString().substring(0,16)
  axios.post('http://localhost:3000/compositores', req.body)
    .then( resposta => {
      res.render('confirmAluno', {info: req.body, title: 'Confirmação de Registo', data: d})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: 'Erro ao gravar aluno'})
    })	
});

router.post('/compositores/edit/:id', function(req, res) {
  var d = new Date().toISOString().substring(0,16)
  axios.put('http://localhost:3000/compositores/' + req.params.id, req.body)
    .then( resposta => {
      res.render('compositor', {info: req.body, title: 'Confirmação de Edição', data: d})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: 'Erro ao editar aluno'})
    })
});

module.exports = router;
