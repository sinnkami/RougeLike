const pg = require('pg');

const connectionString = "tcp://localhost:5432/game_rouge";

pg.connect(connectionString, function(error, client) {
  var query = client.query('INSERT INTO score(game_name, score, lv, maxhp, attack, defense) VALUES($1,$2,$3,$4,$5,$6)',["sinnkami", 1000000, 100, 500, 50, 30], function (err, result) {
    if (err) { console.error(err); }
    console.log(result);

    client.end(function (err) {
      if (err) throw err;
      console.log("終了したお");
    });
  });
});
