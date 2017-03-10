GameManager.game.player.status.name = generateRandomAlphaNum(Math.floor(Math.random()*10));
GameManager.game.player.status.maxhp = Math.floor(Math.random()*999);
GameManager.game.player.status.attack = Math.floor(Math.random()*999);
GameManager.game.player.status.defense = Math.floor(Math.random()*999);
GameManager.game.player.status.level = Math.floor(Math.random() * 10);
GameManager.game.player.point = Math.floor(Math.random()*1000000000);

GameManager.game.player.status.hp = 0;



function generateRandomAlphaNum(len) {
  var rdmString = "";
  for( ; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
  return  rdmString.substr(0, len);
}
