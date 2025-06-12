let player;
let resources = [];
let collected = 0;
let inCity = false;
let gameState = "intro"; // intro, playing, city

function setup() {
  createCanvas(600, 400);
  player = new Player();
  // Criando alguns recursos no campo
  for (let i = 0; i < 10; i++) {
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
  text("Colete pelo menos 5 recursos verdes no campo.", width / 2, 150);
  text("Depois disso, você será levado à cidade.", width / 2, 180);
  text("Na cidade, você verá uma mensagem de boas-vindas.", width / 2, 210);

  textSize(20);
  text("Pressione ENTER para começar", width / 2, 300);
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
      }
    }
  }

  if (collected >= 5 && !inCity) {
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

// Classes mantidas

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
  }

  display() {
    fill(0, 255, 0);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}

       

