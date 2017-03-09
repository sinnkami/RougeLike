var express = require('express');
var router = express.Router();

const pg = require('pg');

const connectionString = "tcp://localhost:5432/rougelike::DATABASE";

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

module.exports = router;
