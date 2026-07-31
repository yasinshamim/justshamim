const player = document.getElementById("player");
const world = document.getElementById("world");
const platformsContainer = document.getElementById("platforms");
const heartsContainer = document.getElementById("hearts");
const counter = document.getElementById("count");
const stage = document.getElementById("stage");
const bgMusic = document.getElementById("bgMusic");

const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");
const jumpBtn = document.getElementById("jump");

// Auto Play Music on first user interaction
const playAudio = () => {
  if (bgMusic) bgMusic.play().catch(() => {});
  document.removeEventListener("touchstart", playAudio);
  document.removeEventListener("click", playAudio);
};
document.addEventListener("touchstart", playAudio);
document.addEventListener("click", playAudio);

// World & Camera Parameters
const worldWidth = 3000;
let cameraX = 0;

// Player State
let playerX = 100;
let playerY = 0; // Relative to ground (bottom = 90px)
let velocityY = 0;
let isGrounded = true;
let direction = 1;
let collected = 0;
let currentStage = 1;

const groundHeight = 90;
const playerWidth = 60;
const playerHeight = 70;

// Control States
let moveLeftHeld = false;
let moveRightHeld = false;

// Stage Messages (10 Messages per stage)
const stageMessages = [
  "تو قشنگ‌ترین اتفاق زندگیمی ❤️",
  "هر روز بیشتر دوستت دارم 🌸",
  "لبخندت آرامش منه ✨",
  "همیشه مراقب خودت باش ☀️",
  "کنارت خوشبختم 💕",
  "دلم فقط پیش توئه 🥹",
  "آرزوم دیدن خنده‌هاته 🌷",
  "بهت افتخار میکنم 🤍",
  "تا آخر دنیا دوستت دارم 🌍",
  "تولدت مبارک خورشید زندگیم ☀️❤️"
];

let platforms = [];
let hearts = [];

// Generate Platforms & Hearts for current Stage
function loadStage(stageNum) {
  platformsContainer.innerHTML = "";
  heartsContainer.innerHTML = "";
  platforms = [];
  hearts = [];
  collected = 0;
  counter.textContent = "0";
  stage.textContent = `مرحله ${stageNum}`;

  // Base Ground Platform
  platforms.push({ x: 0, y: 0, width: worldWidth, height: groundHeight });

  // Generate 8-10 Procedural Floating Platforms based on Stage
  for (let i = 0; i < 9; i++) {
    const platX = 250 + i * 290;
    const platY = groundHeight + 80 + ((i + stageNum) % 3) * 60;
    const platWidth = 140;
    const platHeight = 20;

    platforms.push({ x: platX, y: platY, width: platWidth, height: platHeight });

    // Render Platform DOM
    const platDiv = document.createElement("div");
    platDiv.className = "platform";
    platDiv.style.left = platX + "px";
    platDiv.style.bottom = platY + "px";
    platDiv.style.width = platWidth + "px";
    platDiv.style.height = platHeight + "px";
    platformsContainer.appendChild(platDiv);

    // Add Heart on Platform
    const heartX = platX + platWidth / 2 - 25;
    const heartY = platY + 30;
    createHeartDOM(heartX, heartY, stageMessages[i] || "دوستت دارم ❤️");
  }

  // 10th Heart near the end of the map
  createHeartDOM(2800, groundHeight + 100, stageMessages[9]);

  // Reset Player Position
  playerX = 80;
  playerY = 0;
  velocityY = 0;
}

function createHeartDOM(x, y, message) {
  const heartImg = document.createElement("img");
  heartImg.src = "assets/heart.png";
  heartImg.className = "heart";
  heartImg.style.left = x + "px";
  heartImg.style.bottom = y + "px";

  const heartObj = { element: heartImg, x, y, collected: false, message };
  hearts.push(heartObj);
  heartsContainer.appendChild(heartImg);
}

// Touch Controls (Fixed & Smooth Hold)
const bindControl = (btn, onPress, onRelease) => {
  btn.addEventListener("touchstart", (e) => { e.preventDefault(); onPress(); });
  btn.addEventListener("touchend", (e) => { e.preventDefault(); onRelease(); });
  btn.addEventListener("mousedown", onPress);
  btn.addEventListener("mouseup", onRelease);
};

bindControl(leftBtn, () => moveLeftHeld = true, () => moveLeftHeld = false);
bindControl(rightBtn, () => moveRightHeld = true, () => moveRightHeld = false);

jumpBtn.addEventListener("touchstart", (e) => { e.preventDefault(); jump(); });
jumpBtn.addEventListener("click", jump);

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" || e.key === "a") moveLeftHeld = true;
  if (e.key === "ArrowRight" || e.key === "d") moveRightHeld = true;
  if (e.key === " " || e.key === "ArrowUp" || e.key === "w") jump();
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft" || e.key === "a") moveLeftHeld = false;
  if (e.key === "ArrowRight" || e.key === "d") moveRightHeld = false;
});

function jump() {
  if (isGrounded) {
    velocityY = 15;
    isGrounded = false;
  }
}

function updatePhysics() {
  // Horizontal Movement
  if (moveLeftHeld) {
    playerX -= 7;
    direction = -1;
  }
  if (moveRightHeld) {
    playerX += 7;
    direction = 1;
  }

  // World Boundaries
  if (playerX < 0) playerX = 0;
  if (playerX > worldWidth - playerWidth) playerX = worldWidth - playerWidth;

  // Gravity
  playerY += velocityY;
  velocityY -= 0.8;

  // Platform & Ground Collision
  isGrounded = false;
  platforms.forEach(plat => {
    // Check top edge collision of platform
    if (
      playerX + playerWidth > plat.x &&
      playerX < plat.x + plat.width &&
      playerY >= plat.y + plat.height - groundHeight - 15 &&
      playerY <= plat.y + plat.height - groundHeight + 5 &&
      velocityY <= 0
    ) {
      playerY = plat.y + plat.height - groundHeight;
      velocityY = 0;
      isGrounded = true;
    }
  });

  // Camera Follow logic (Center camera on player)
  const screenWidth = window.innerWidth;
  cameraX = playerX - screenWidth / 2 + playerWidth / 2;
  if (cameraX < 0) cameraX = 0;
  if (cameraX > worldWidth - screenWidth) cameraX = worldWidth - screenWidth;

  world.style.transform = `translateX(${-cameraX}px)`;
}

function updateDOM() {
  player.style.left = playerX + "px";
  player.style.bottom = (groundHeight + playerY) + "px";
  player.style.transform = direction === -1 ? "scaleX(-1)" : "scaleX(1)";
}

function checkHearts() {
  hearts.forEach(heart => {
    if (heart.collected) return;

    const dx = Math.abs((playerX + playerWidth / 2) - (heart.x + 25));
    const dy = Math.abs((groundHeight + playerY + playerHeight / 2) - (heart.y + 25));

    if (dx < 45 && dy < 50) {
      heart.collected = true;
      heart.element.style.display = "none";
      collected++;
      counter.textContent = collected;
      showMessage(heart.message);

      if (collected >= 10) {
        setTimeout(nextStage, 1000);
      }
    }
  });
}

function showMessage(text) {
  const box = document.getElementById("messageBox");
  const msg = document.getElementById("messageText");
  msg.innerHTML = text;
  box.classList.add("show");
  clearTimeout(box.timer);
  box.timer = setTimeout(() => box.classList.remove("show"), 2500);
}

function nextStage() {
  currentStage++;
  if (currentStage > 10) {
    finishGame();
  } else {
    loadStage(currentStage);
  }
}

function finishGame() {
  document.getElementById("finishScreen").style.display = "flex";
  document.getElementById("game").style.pointerEvents = "none";
}

document.getElementById("restartBtn")?.addEventListener("click", () => {
  location.reload();
});

// Game Loop
function loop() {
  updatePhysics();
  updateDOM();
  checkHearts();
  requestAnimationFrame(loop);
}

// Start Game
loadStage(1);
loop();
