// FPS
const FPS = 1 / 60;

class Vec2 {
  /**
   * ベクトル
   * @param {number} _x x成分
   * @param {number} _y y成分
   */
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
  }
  /**
   * このベクトルと引数のベクトルbの和を計算
   * @param {Vec2} b 加算するベクトル
   * @returns 加算結果
   */
  add(b) {
    let a = this;
    return new Vec2(a.x + b.x, a.y + b.y);
  }
  /**
   * このベクトルを実数s倍したベクトルを計算
   * @param {number} s 実数s倍
   * @returns 実数s倍した結果
   */
  mul(s) {
    let a = this;
    return new Vec2(s * a.x, s * a.y);
  }
  /**
   * このベクトルの大きさを求める
   * @returns ベクトルの大きさ
   */
  mag() {
    let a = this;
    return sqrt(a.x ** 2 + a.y ** 2);
  }
  /**
   * このベクトルと引数のベクトルbの差を求める
   * @param {Vec2} b 減算するベクトル
   * @returns 減算結果
   */
  sub(b) {
    let a = this;
    return new Vec2(a.x - b.x, a.y - b.y);
  }
  /**
   * このベクトルを正規化したベクトルを求める
   * @returns 正規化したベクトル
   */
  norm() {
    let a = this;
    return a.mul(1 / a.mag());
  }
  /**
   * このベクトルを引数のベクトルbのドット積(内積)を求める
   * @param {Vec2} b このベクトルとドット積(内積)を求めるベクトル
   * @returns このベクトルとbのドット積(内積)結果
   */
  dot(b) {
    let a = this;
    return a.x * b.x + a.y * b.y;
  }
  /**
   * 反射ベクトルを求める
   * @param {number} w 法線ベクトル (大きさは問わない)
   * @returns 反射ベクトル
   */
  reflect(w) {
    let v = this;
    let cosTheta = v.mul(-1).dot(w) / (v.mul(-1).mag() * w.mag());
    let n = w.norm().mul(v.mag() * cosTheta);
    let r = v.add(n.mul(2));
    return r;
  }
}

class Ball {
  /**
   * @param {Vec2} _p ボールの速度ベクトル成分
   * @param {Vec2} _v ボールの速度ベクトル成分
   * @param {number} _r ボールの半径
   */
  constructor(_p, _v, _r) {
    this.p = _p;  // ボールの速度ベクトル成分
    this.v = _v;  // ボールの速度ベクトル成分
    this.r = _r;  // ボールの半径
  }
}

class Block {
  /**
   * @param {Vec2} _p ブロックの中心位置ベクトル
   * @param {number} _r ブロックの半径
   */
  constructor(_p, _r) {
    this.p = _p;  // ブロックの中心位置ベクトル
    this.r = _r;  // ブロックの半径
  }
}

class Paddle {
  /**
   * @param {Vec2} _p パドルの中心位置ベクトル
   * @param {number} _r 半径
   */
  constructor(_p, _r) {
    this.p = _p;    // パドルの中心位置ベクトル
    this.r = _r;    // 半径
  }
}

// ボール
const ball = new Ball(new Vec2(100, 200), new Vec2(120, 60), 10);

// ブロック
const blocks = [];
const BLOCK_SPACE = 50;

// パドル
let paddle = new Paddle(new Vec2(200, 320), 30);

// 点数
let score = 0;

function setup() {
  createCanvas(400, 400);
  // ブロックを生成
  for (let i = 0; i < 12; i++) {
    let x = 90 * (i % 4) + BLOCK_SPACE;
    let y = 50 * floor(i / 4) + BLOCK_SPACE;
    let p = new Vec2(x, y);
    blocks.push(new Block(p, 20));
  }
}

function draw() {

  // ボールを移動させる
  ball.p = ball.p.add(ball.v.mul(FPS))

  // ボールが左右の端に来たら反射
  if ((ball.p.x < 15) || (ball.p.x > 385)) {
    ball.v.x = -ball.v.x;
  }
  // ボールが上限の端に来たら反射
  // TODO: 下は本来反射しなくてOK
  if ((ball.p.y < 15) || (ball.p.y > 385)) {
    ball.v.y = -ball.v.y;
  }
  // ボールとブロックの衝突判定
  for (const block of blocks) {
    let d = block.p.sub(ball.p).mag();    // 距離
    if (d < (ball.r + block.r)) {
      // ぶつかっていたらボールの速度を反射
      let w = ball.p.sub(block.p);
      let r = ball.v.reflect(w);
      ball.v = r;
      // ブロックを消す
      blocks.splice(blocks.indexOf(block), 1);
      score++;
    }
  }

  // パドルの操作
  paddle.p.x = mouseX;
  // ボールとパドルの衝突判定
  let d = paddle.p.sub(ball.p).mag();    // 距離
  if (d < (ball.r + paddle.r)) {
    // ぶつかっていたらボールの速度を反射
    let w = ball.p.sub(paddle.p);
    let r = ball.v.reflect(w);
    ball.v = r;
    // めりこみ防止
    ball.p = paddle.p.add(w.norm().mul(ball.r + paddle.r));
  }

  // 画面塗りつぶし(消去)
  background(220);

  // ボールを描画
  fill('#777');
  stroke('#555');
  circle(ball.p.x, ball.p.y, 2 * ball.r);

  // ブロックを描画
  fill('#00a')
  stroke('#bbb')
  for (const block of blocks) {
    circle(block.p.x, block.p.y, 2 * block.r);
  }

  // パドルを描画
  fill('#0a0');
  stroke('#555');
  circle(paddle.p.x, paddle.p.y, 2 * paddle.r);

  text(score, 0, 0, 100, 100);
}
