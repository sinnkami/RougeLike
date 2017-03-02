var GameManager;

$(function () {
  var _canmain = document.getElementById('main');
  var _conmain = _canmain.getContext("2d");
  var _cananimation = document.getElementById('animation');
  var _conanimation = _cananimation.getContext("2d");
  var _canui = document.getElementById('ui');
  var _conui = _canui.getContext("2d");
  var _Game;
  var _Scene;
  var _Sprite;
  var _Window;

  _Game = new GameBase(new GameImage(), new GamePlayer(), new GameEnemy(), new GameKey(), new GameItem(), new GameMap(), new GameSound(), new GameMiniMap(), new GameLogs());
  _Scene = new SceneBase(new SceneDamage(), new SceneItem(), new SceneMenu(), new SceneMove(), new SceneStairs());
  _Sprite = new SpriteBase(new SpriteEnemy(), new SpriteItems(), new SpritePlayer());
  _Window = new WindowBase(new WindowItem(), new WindowMap(), new WindowLogs(), new WindowStatusBar(), new WindowMenu(), new WindowQuit(), new WindowStatus(), new WindowStairs(), new WindowMiniMap());

  GameManager = new Manager(_canmain, _conmain, _conanimation, _conui, _Game, _Scene, _Sprite, _Window, $(window));

  GameManager.GameStart();
})
