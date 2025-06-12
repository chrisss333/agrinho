let player;
let resources = [];
let obstacles = [];
let collected = 0;
let inCity = false;
let gameState = "intro";

function setup() {
  createCanvas(600, 400);
  player = new Player();

  // Criar recursos
  for (let i = 0; i < 15; i++) {
    resources.push(new Resource(random(width), random(height / 2)));
  }

  // Criar obstáculos
  for (let i = 0; i < 5; i++) {
    obstacles.push(new Obstacle(random(width), random(height - 100, height - 30)));
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
  }
}

function keyPressed() {
  if (gameState === "intro" && keyCode === ENTER) {
    gameState = "playing";
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
  text("Colete 15 recursos coloridos no campo.", width / 2, 150);
  text("A cada coleta, você fica mais rápido!", width / 2, 180);
  text("Desvie dos obstáculos vermelhos!", width / 2, 210);
  text("Se bater, volta ao início e perde velocidade.", width / 2, 240);

  textSize(20);
  text("Pressione ENTER para começar", width / 2, 300);
}

function playGame() {
  if (!inCity) displayField();

  player.update();
  player.display();

  // Exibir obstáculos
  for (let obs of obstacles) {
    obs.display();
    if (player.hitsObstacle(obs)) {
      player.reset();
    }
  }

  // Exibir e coletar recursos
  for (let i = resources.length - 1; i >= 0; i--) {
    resources[i].display();
    if (player.collects(resources[i])) {
      resources.splice(i, 1);
      collected++;
      player.speed += 0.3;
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
    this.startX = width / 2;
    this.startY = height - 30;
    this.x = this.startX;
    this.y = this.startY;
    this.size = 30;
    this.speed = 5;
  }

  update() {
    if (keyIsDown(LEFT_ARROW)) this.x -= this.speed;
    if (keyIsDown(RIGHT_ARROW)) this.x += this.speed;
    if (keyIsDown(UP_ARROW)) this.y -= this.speed;
    if (keyIsDown(DOWN_ARROW)) this.y += this.speed;
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
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

  hitsObstacle(obs) {
    let d = dist(this.x, this.y, obs.x, obs.y);
    return d < this.size / 2 + obs.size / 2;
  }

  reset() {
    this.x = this.startX;
    this.y = this.startY;
    this.speed = max(5, this.speed - 1); // Não deixa ficar menor que 5
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

class Obstacle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 40;
  }

  display() {
    fill(180, 0, 0);
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, this.size, this.size);
  }
}


   
  

   

