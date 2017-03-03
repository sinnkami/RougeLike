var GameManager;

$(function () {
  const _canmain = document.getElementById('main');
  const _conmain = _canmain.getContext("2d");
  const _cananimation = document.getElementById('animation');
  const _conanimation = _cananimation.getContext("2d");
  const _canui = document.getElementById('ui');
  const _conui = _canui.getContext("2d");
  var _Game;
  var _Scene;
  var _Sprite;
  var _Window;

  _Game = new GameBase(new GameImage(), new GamePlayer(), new GameEnemy(), new GameKey(), new GameItem(), new GameMap(), new GameSound(), new GameMiniMap(), new GameLogs());
  _Scene = new SceneBase(new SceneDamage(), new SceneItem(), new SceneMenu(), new SceneMove(), new SceneStairs());
  _Sprite = new SpriteBase(new SpriteEnemy(), new SpriteItems(), new SpritePlayer());
  _Window = new WindowBase(new WindowItem(), new WindowMap(), new WindowLogs(), new WindowStatusBar(), new WindowMenu(), new WindowQuit(), new WindowStatus(), new WindowStairs(), new WindowMiniMap(), new WindowStreet());

  GameManager = new Manager(_canmain, _conmain, _conanimation, _conui, _Game, _Scene, _Sprite, _Window, $(window));

  GameManager.GameStart();
})
