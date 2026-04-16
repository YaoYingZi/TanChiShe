const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const unit = 20;
const row = canvas.height / unit;
const column = canvas.width / unit;
let snake = [];
let first = true;
let score = 0;
let highScore;
loadHighScore();
document.getElementById("myScore").innerHTML = "游戏得分: " + score;
document.getElementById("myScore2").innerHTML = "最高得分: " + highScore;
snake[0] = {
  x: 80,
  y: 0,
};
snake[1] = {
  x: 60,
  y: 0,
};
snake[2] = {
  x: 40,
  y: 0,
};
snake[3] = {
  x: 20,
  y: 0,
};

class Fruit {
  constructor() {
    this.x = Math.floor(Math.random() * column) * unit;
    this.y = Math.floor(Math.random() * row) * unit;
  }

  drawFruit() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, unit, unit);
  }

  pickALocation() {
    let overLapping = false;
    let new_x, new_y;

    function checkOverLap(new_x, new_y) {
      for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === new_x && snake[i].y === new_y) {
          overLapping = true;
          return;
        } else {
          overLapping = false;
        }
      }
    }

    do {
      new_x = Math.floor(Math.random() * column) * unit;
      new_y = Math.floor(Math.random() * row) * unit;
      checkOverLap(new_x, new_y);
    } while (overLapping);

    this.x = new_x;
    this.y = new_y;
  }
}

window.addEventListener("keydown", changeDirection);
let d = "right";
let myFruit = new Fruit();
function changeDirection(e) {
  if (e.key == "ArrowRight" && d != "left") {
    d = "right";
  } else if (e.key == "ArrowLeft" && d != "right") {
    d = "left";
  } else if (e.key == "ArrowUp" && d != "down") {
    d = "up";
  } else if (e.key == "ArrowDown" && d != "up") {
    d = "down";
  }

  window.removeEventListener("keydown", changeDirection);
}

function draw() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      clearInterval(game);
      alert("游戏结束");
      return;
    }
  }
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (first) {
    myFruit.pickALocation();
    alert("欢迎来到贪吃蛇游戏！使用方向键控制蛇的移动。");
  }
  myFruit.drawFruit();
  for (let i = 0; i < snake.length; i++) {
    if (i === 0) {
      ctx.fillStyle = "pink";
    } else {
      ctx.fillStyle = "orange";
    }
    ctx.strokeStyle = "red";

    if (snake[i].x >= canvas.width) {
      snake[i].x = 0;
    } else if (snake[i].x < 0) {
      snake[i].x = canvas.width;
    }

    if (snake[i].y >= canvas.height) {
      snake[i].y = 0;
    } else if (snake[i].y < 0) {
      snake[i].y = canvas.height;
    }

    first = false;
    ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
    ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);
  }

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (d == "right") {
    snakeX += unit;
  } else if (d == "left") {
    snakeX -= unit;
  } else if (d == "up") {
    snakeY -= unit;
  } else if (d == "down") {
    snakeY += unit;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };
  if (snake[0].x === myFruit.x && snake[0].y === myFruit.y) {
    myFruit.pickALocation();
    score++;
    document.getElementById("myScore").innerHTML = "游戏得分: " + score;
    setHighScore();
    document.getElementById("myScore2").innerHTML = "最高得分: " + highScore;
  } else {
    snake.pop();
  }
  snake.unshift(newHead);

  window.addEventListener("keydown", changeDirection);
}

let game = setInterval(draw, 100);

function loadHighScore() {
  if (localStorage.getItem("highScore") === null) {
    highScore = 0;
  } else {
    highScore = Number(localStorage.getItem("highScore"));
  }
}

function setHighScore() {
  if (score > highScore) {
    localStorage.setItem("highScore", score);
    highScore = score;
  }
}
