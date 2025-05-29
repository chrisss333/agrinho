function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}let player;
let resources = [];
let collected = 0;
let inCity = false;

function setup() {
  createCanvas(600, 400);
  player = new Player();
  // Criando alguns recursos no campo
  for (let i = 0; i < 5; i++) {
    resources.push(new Resource(random(width), random(height / 2)));
  }
}

function draw() {
  background(200);

  if (!inCity) {
    // Tela do campo
    displayField();
  } else {
    // Tela da cidade
    displayCity();
  }

  player.update();
  player.display();

  // Mostrar recursos restantes no campo
  if (!inCity) {
    for (let i = resources.length - 1; i >= 0; i--) {
      resources[i].display();
      if (player.collects(resources[i])) {
        resources.splice(i, 1);
        collected++;
      }
    }
  }

  // Verificar se o jogador coletou todos os recursos
  if (collected >= 5 && !inCity) {
    transitionToCity();
  }

  // Mostrar número de recursos coletados
  textSize(20);
  fill(0);
  text("Recursos coletados: " + collected, 20, height - 20);
}

function displayField() {
  fill(100, 200, 100);
  rect(0, height / 2, width, height / 2); // Representando o campo com uma cor verde
}

function displayCity() {
  fill(150, 150, 255);
  rect(0, height / 2, width, height / 2); // Representando a cidade com uma cor azul
  textSize(32);
  fill(255);
  text("Bem-vindo à cidade!", width / 4, height / 2 + 40);
}

function transitionToCity() {
  inCity = true;
  collected = 0; // Resetando a coleta para um novo começo
  resources = []; // Limpa os recursos
}

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 30;
    this.size = 30;
    this.speed = 5;
  }

  update() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.speed;
    }
  }

  display() {
    fill(255, 0, 0);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }

  collects(resource) {
    let d = dist(this.x, this.y, resource.x, resource.y);
    if (d < this.size / 2 + resource.size / 2) {
      return true;
    }
    return false;
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

