let player;
let resources = [];
let collected = 0;
let inCity = false;
let gameState = "intro"; // intro, playing, city, gameover

function setup() {
  createCanvas(600, 400);
  player = new Player();

  for (let i = 0; i < 20; i++) {
    resources.push(new Resource(random(width), random(height / 2)));
  }
}

function draw() {
  background(200);

  if (gameState === "intro") {
    showInstructions();
  } else if (gameState === "playing") {
    playGame();
  } else if (gameState === "city") {
    displayCity();
    player.display();
  } else if (gameState === "gameover") {
    showGameOver();
  }
}

function keyPressed() {
  if (gameState === "intro" && keyCode === ENTER) {
    gameState = "playing";
  } else if (gameState === "gameover" && keyCode === ENTER) {
    restartGame();
  }
}

function showInstructions() {
  background(50, 100, 200);
  fill(255);
  textAlign(CENTER);
  textSize(28);
  text("Como Jogar", width / 2, 60);

  textSize(18);
  text("Use as setas do teclado para mover o personagem.", width / 2, 120);
  text("Colete pelo menos 15 recursos coloridos no campo.", width / 2, 150);
  text("A cada coleta, você fica mais rápido!", width / 2, 180);
  text("Evite tocar nas bordas da tela ou você perde.", width / 2, 210);

  textSize(20);
  text("Pressione ENTER para começar", width / 2, 300);
}

function showGameOver() {
  background(0);
  fill(255, 0, 0);
  textAlign(CENTER);
  textSize(36);
  text("Você bateu na parede!", width / 2, height / 2 - 20);
  textSize(20);
  fill(255);
  text("Pressione ENTER para reiniciar", width / 2, height / 2 + 30);
}

function restartGame() {
  player = new Player();
  resources = [];
  collected = 0;
  inCity = false;
  gameState = "playing";

  for (let i = 0; i < 20; i++) {
    resources.push(new Resource(random(width), random(height / 2)));
  }
}

function playGame() {
  if (!inCity) {
    displayField();
  }

  player.update();
  player.display();

  if (!inCity) {
    for (let i = resources.length - 1; i >= 0; i--) {
      resources[i].display();
      if (player.collects(resources[i])) {
        resources.splice(i, 1);
        collected++;
        player.speed += 0.5;
      }
    }
  }

  if (collected >= 15 && !inCity) {
    transitionToCity();
  }

  textSize(20);
  fill(0);
  text("Recursos coletados: " + collected, 20, height - 20);
}

function displayField() {
  fill(100, 200, 100);
  rect(0, height / 2, width, height / 2);
}

function displayCity() {
  fill(150, 150, 255);
  rect(0, height / 2, width, height / 2);
  textSize(32);
  fill(255);
  text("Bem-vindo à cidade!", width / 4, height / 2 + 40);
}

function transitionToCity() {
  inCity = true;
  gameState = "city";
  collected = 0;
  resources = [];
}

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 30;
    this.size = 30;
    this.speed = 5;
  }

  update() {
    if (keyIsDown(LEFT_ARROW)) this.x -= this.speed;
    if (keyIsDown(RIGHT_ARROW)) this.x += this.speed;
    if (keyIsDown(UP_ARROW)) this.y -= this.speed;
    if (keyIsDown(DOWN_ARROW)) this.y += this.speed;

    // Morrer se sair da tela
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      gameState = "gameover";
    }
  }

  display() {
    fill(255, 0, 0);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }

  collects(resource) {
    let d = dist(this.x, this.y, resource.x, resource.y);
    return d < this.size / 2 + resource.size / 2;
  }
}

class Resource {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }

  display() {
    fill(this.r, this.g, this.b);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}
