var express = require('express');
var router = express.Router();

const pg = require('pg');
if (process.env.DATABASE_URL){
  pg.defaults.ssl = true;
}

const connectionString = process.env.DATABASE_URL || "tcp://localhost:5432/game_rouge";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/game', function (req, res) {
  res.render('game');
})

router.post(`/score`, function (req, res) {
  pg.connect(connectionString, (error, client) => {
    if (error) { console.error(error); }
    var query = client.query('INSERT INTO score(game_name, score, lv, maxhp, attack, defense) VALUES($1,$2,$3,$4,$5,$6)',
    [req.body.name, req.body.score, req.body.level, req.body.hp, req.body.attack, req.body.defense],
    (err, result) => {
      if (err) { console.error(err); }

      client.end((err) => {
        if (err) throw err;
        res.sendStatus(200);
      });
    });
  });
})

router.get('/ranking', function (req, res) {
  res.render('ranking');
})

router.post('/ranking', function (req, res) {
  pg.connect(connectionString, (error, client) => {
    if (error) { throw error; }
    var query = client.query('SELECT * FROM score ORDER BY score DESC LIMIT 100',
    [],
    (err, result) => {
      if (err) { throw err; }
      res.json(result);
      client.end((err) => {
        if (err) { throw err; }

      });
    });
  });
})

module.exports = router;
