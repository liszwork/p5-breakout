// FPS
const FPS = 1 / 60;


function setup() {
  createCanvas(400, 400);
}

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
}

class Ball {
  constructor(_p, _v, _r) {
    this.p = _p;  // ボールの速度ベクトル成分
    this.v = _v;  // ボールの速度ベクトル成分
    this.r = _r;  // ボールの半径
  }
}

class Block {
  constructor(_p, _r) {
    this.p = _p;  // ブロックの中心位置ベクトル
    this.r = _r;  // ブロックの半径
  }
}

// ボール
const ball = new Ball(new Vec2(100, 150), new Vec2(120, 60), 20);
const block = new Block(new Vec2(200, 150), 80);
// 点数
let score = 0;

function draw() {

  // ボールを移動させる
  ball.p = ball.p.add(ball.v.mul(FPS))

  // ボールが左右の端に来たら反射
  if ((ball.p.x < 15) || (ball.p.x > 385)) {
    ball.v.x = -ball.v.x;
    score++;
  }
  // ボールが上限の端に来たら反射
  // TODO: 下は本来反射しなくてOK
  if ((ball.p.y < 15) || (ball.p.y > 385)) {
    ball.v.y = -ball.v.y;
    score++;
  }
  // ボールとブロックの衝突判定
  let d = block.p.sub(ball.p).mag();    // 距離
  if (d < (ball.r + block.r)) {
    // ぶつかっていたらボールの速度を反射
    let v = ball.v;
    let w = ball.p.sub(block.p);
    let cosTheta = v.mul(-1).dot(w) / (v.mul(-1).mag() * w.mag());
    let n = w.norm().mul(v.mag()*cosTheta);
    let r = v.add(n.mul(2));
    ball.v = r;
  }


  background(220);
  fill('#777');
  circle(ball.p.x, ball.p.y, 2 * ball.r); // ボールを描画
  circle(block.p.x, block.p.y, 2 * block.r); // ブロックを描画

  text(score, 0, 0, 100, 100);
}
