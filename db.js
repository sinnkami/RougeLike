const pg = require('pg');

const connectionString = "tcp://localhost:5432/game_rouge";

const faker = require('faker');

pg.connect(connectionString, function(error, client) {
  for (var i = 0;  i < 100; i++){
    var query = client.query('INSERT INTO score(game_name, score, lv, maxhp, attack, defense) VALUES($1,$2,$3,$4,$5,$6)',[faker.name.firstName(), Math.floor(Math.random()*10000000), Math.floor(Math.random()*100), Math.floor(Math.random()*999), Math.floor(Math.random()*999), Math.floor(Math.random()*999)], function (err, result) {
      if (err) { console.error(err); }
    });
  }
});
