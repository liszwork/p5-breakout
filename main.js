class Level {
  constructor() {
    this.tile = [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ];
    this.lenX = 20;
    this.lenY = 10;
  }
}

class Actor {
  constructor(_x, _y, _image) {
    this.x = _x;
    this.y = _y;
    this.image = _image;
  }
}

class Game {
  constructor() {
    this.tile_ofs = 50;
    this.tile_w = 15;
    this.level = new Level();
    this.player = null;
    this.actors = [];
  }
}

let game;

function setup() {
  game = new Game();
  let player = new Actor(2, 3, '😈');
  game.player = player;
  game.actors.push(player);
  
  createCanvas(400, 400);
}

function draw() {
  // 画面塗りつぶし(消去)
  background(150);

  // ボールを描画
  fill('#777');
  stroke('#555');
  // circle(100, 100, 50);
  
  draw_tile();
  draw_actors();
}
function draw_tile() {
  for (let i =0, y = 0; y < game.level.lenY; y++) {
    for (let x = 0; x < game.level.lenX; x++, i++) {
      tip = game.level.tile[i];
      if (tip == 1) {
        const tx = game.tile_w * x + game.tile_ofs;
        const ty = game.tile_w * y + game.tile_ofs
        text('🔳', tx, ty);
      }
    }
  }
}
function draw_actors() {
  for (let a of game.actors) {
    text(a.image, game.tile_w * a.x + game.tile_ofs, game.tile_w * a.y + game.tile_ofs);
  }
}
// test ---------
