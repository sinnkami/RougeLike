DROP DATABASE IF EXISTS game_rouge;
CREATE DATABASE game_rouge;
CREATE TABLE Score (
  id serial not null,
  game_name varchar(10) not null,
  score varchar(100) not null,
  lv integer not null,
  maxhp integer not null,
  attack integer not null,
  defense integer not null,
  PRIMARY KEY(id)
);
