var express = require('express');
var router = express.Router();
var Pessoas = require ('../controllers/pessoas');
var Modalidades = require ('../controllers/modalidades');

router.get('/pessoas', function(req, res) {
  Pessoas.list()
    .then( resposta => {
      res.status(200).jsonp(resposta)
    })
});

router.get('/pessoas/:id', function(req, res) {
  Pessoas.lookUp(req.params.id)
    .then( resposta => {
      res.status(200).jsonp(resposta)
    })
});

router.get('/pessoas/delete/:id', function(req, res) {
  Pessoas.delete(req.params.id)
    .then( resposta => {
      res.status(200).jsonp(resposta)
    })
});

router.get('/modalidades', function(req, res) {
  Modalidades.list()
    .then( resposta => {
      res.status(200).jsonp(resposta)
    })
});

router.get('/modalidades/:modalidade', function(req, res) {
  Modalidades.lookUp(req.params.modalidade)
    .then(resposta => {
      res.status(200).jsonp(resposta);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});


router.post('/pessoas/registo', function(req, res) {
  Pessoas.insert(req.body)
    .then( resposta => {
      res.status(200).jsonp(resposta)
    })
});

router.post('/pessoas/edit/:id', function(req, res) {
  Pessoas.update(req.params.id, req.body)
    .then( resposta => {
      res.status(200).jsonp(resposta)
    })
});

router.post('/modalidades/new', function(req, res) {
  Modalidades.insert(req.body)
    .then( resposta => {
      res.status(200).jsonp(resposta)
    })
});

router.post('/modalidades/add/:nome', function(req, res) {
  Modalidades.addPerson(req.params.nome, req.body)
    .then( resposta => {
      res.status(200).jsonp(resposta)
    })
});

module.exports = router;
