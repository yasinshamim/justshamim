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

// Auto Play Music
const playAudio = () => {
  if (bgMusic) bgMusic.play().catch(() => {});
  document.removeEventListener("touchstart", playAudio);
  document.removeEventListener("click", playAudio);
};
document.addEventListener("touchstart", playAudio);
document.addEventListener("click", playAudio);

const worldWidth = 3000;
let cameraX = 0;

let playerX = 100;
let playerY = 0;
let velocityY = 0;
let isGrounded = true;
let direction = 1;
let collected = 0;
let currentStage = 1;

const groundHeight = 70;
const playerWidth = 55;
const playerHeight = 65;

let moveLeftHeld = false;
let moveRightHeld = false;

// Messages
const allStageMessages = [
  // Stage 1
  [
    "تو قشنگ‌ ترین اتفاق زندگیمی😭💗",
    "هر روز بیشتر از قبل دوست دارم 😭💗",
    "لبخندت قشنگ ترین چیزیه که دیدم ✨",
    "همیشه مراقبتم خورشید خانوم🤭🌞",
    "وقتی کنارتم خیلیییی خوشبختم 💕",
    "دلم فقط پیش تو ارومه😭💕",
    "آرزوم دیدنت از نزدیکه 😭💗",
    "بهت خیلی افتخار میکنم🛐🛐 ",
    "تا آخر دنیا دوستت دارم 💘😭",
    "بوس بوسی به همه جات 😭💘"
  ],
  // Stage 2
  [
    "با تو هیچ مشکلی تو زندگیم نیست 🎀",
    "چشمات کل دنیامه 💖",
    "کلی مرسی که توی زندگیمی 💗",
    "لیس لیسی بهت فلفل کوچولو😭🌶",
    "چشات خیلیییی قشنگههه 😭💗",
    "قلبم فقط واسه تو جا داره 💗",
    "ته همه آرزوهام تویی ✨",
    "بوس به لبت عاشقتم 😭💗",
    "همیشه پیشت میمونم قول میدم 😭🎀",
    "مرحله دو هم با عشق رفتی🤭💘"
  ],
  // Stage 3
  [
    "قشنگ ترین خاطره هام با تو بوده😭💘",
    "هیچ‌ وقت ازت خسته نمیشم 💖",
    "تو ارامش بهم میدی که هیچی نمیده بهم💘😭",
    "همیشه باهام بمون جوجه کوچولو😭💘",
    "حتی نمیتونم تصور کنم تو زندگیم نباشی 😭💗",
    "هر ثانیه به فکرتممم🛐",
    "خیلی دوست دارم😭✨",
    "خیلی خوش شانسم که دارمت😭🛐",
    "دلم میخواد همش بخورمت😭🎀",
    "خیلییی عاشقتم شمیم بوسس بهت 😭💗"
  ],
  // Stage 4
  [
    "بوس تا ابد بهت🛐🛐",
    "کاش بودم کلی بغلت میکزدم😭💗",
    "عشق واقعی یعنی تو 💖",
    "فقط کافیه 5 دقیقه باهات حرف بزنم تا حالم خوب بشه😭💗",
    "چجوری اینهمه خوشگلی فداتشم😭💘",
    "تو معجزه منی 😭💘 ",
    "همیشه توی قلبمیی 💘",
    "اگه الان پیشت بودم دستاتو محکم میگرفتم😭🦋",
    "مثل خورشید میدرخشی🌞 ",
    "مرحله 4 رو هم رفتی بوس بهت😭💘"
  ],
  // Stage 5
  [
    "خیلییی زیاد عاشقتمممم😭💘",
    "میدونم الان تو دلت گفتی من بیشتر ولی واقعا من بیشتر از تو💘😭",
    "احتمالا الان خیلی ذوق ذوقی شدی 😭💘",
    "تو همه زندگی‌منی دختر😭💘",
    "هیچکس نمیتونه جاتو بگیره 😭💘",
    "تو همهههه چیز منی ✨",
    "قلب کوچولوت برام بهترین خونس😭❤️",
    "بوی عطرت یارا بهترین بویی بود که کردح😭💘 ",
    "از خوانوادت واسه اینکه به دنیا اوردنت کلی از طرف من تشکر کن😭💘",
    "نصف بازی تموم شد عشقم😭💘"
  ],
  // Stage 6
  [
    "کاش تا تهش باهم باشیم😭💘",
    "بزرگترین رویای من دیدن توعه😭💘",
    "تو دلیل خوشحالی منی گوگولی😭💘",
    "عکسات خیلی قشنگههه😭💘",
    "تا تهش باهاتم 🌶😭",
    "ارزش تو بیشتر از هرچیزیه برام 😭🍄",
    "میو میو عاشقتم✨",
    "خیلییی خوبیللبل نمیدونم چجوری بگممن😭💖",
    "تنها چیزی که مهمه برام تویی 😭💘",
    "مرحله ۶ هم تموم شد! ⚡"
  ],
  // Stage 7
  [
    "بوس به گردنتتت😭❤️",
    "فرشته کوچولوی من😭👼🏻",
    "تو خاص‌ ترینی واسم 💎",
    "زندگیم بعد تو>> 🛐🛐",
    "هر ثانیه‌ بوس بهت 🎀",
    "دوست داشتنت بهترین شغل منه🛐 ",
    "بوس به اونجایی که خودت میدونی🤭",
    "همیشه عاشقتممم 😭❤️",
    "هیچوقت تنهات نمیزارم 😭🫂",
    "فقط ۳ مرحله دیگه مونده! 🎉"
  ],
  // Stage 8
  [
    "اگه هزار بارم برگردم عقب تورو انتخاب میکنم 🛐",
    "تو الماس منی 💎",
    "بوس بهت قلب من 😭💗",
    "خیلی عاشقتمم 💗",
    "مطمعنم توهم منو دوست داری😭💘",
    "هیچ‌ چیزی جز تو مهم نیست برام 🛐",
    "دنیا رو اتیش میزنم اگه نباشی 😭💘",
    "همیشه پیشم بمون ✨",
    "خیلی زیاد دوست دارم ❤️",
    "فقط ۲ مرحله مونده فداتشم😭💘"
  ],
  // Stage 9
  [
    "بوس اتیشی به لپات😭💘",
    "مرسی که اینقدر خوبی ❤️",
    "تو بهترین دختر دنیایی 🛐",
    "با تو بودن واسم افتخاره بوس بهت😭💘 ",
    "بدنت برام مقدسه 🛐",
    "بوس به قلب مهربونت 😭💘",
    "دلم میخواد کل بقیه عمرم تو بغلت باشم🫂💘",
    "هیچوقت تنهام نزار شمیم 😭💘",
    "66>>>",
    "آماده‌ای واسه مرحله آخر؟ 🔥"
  ],
  // Stage 10
  [
    "مرحله نهایی عشقمون😭💘",
    "این قلبا همش فدای تو 😭❤️",
    "تو برنده قلب منی 😭💘",
    "تولدت کلیییی مبارک جوجه من😭💘 ",
    "کاشکی امسال بهترین تولد زندگیت بشه😭💗",
    "مرسی که تا اینجا بازی کردی 🛐",
    "کاشکی همه آرزوهات برآورده بشه ✨",
    "دوست دارم تا بی‌نهایت 😭💗",
    "خیلیی عاشقتممللبم وایییباتلب😭💗",
    "بوس بوسی به همه جات😭💗 "
  ]
];

let platforms = [];
let hearts = [];

function loadStage(stageNum) {
  platformsContainer.innerHTML = "";
  heartsContainer.innerHTML = "";
  platforms = [];
  hearts = [];
  collected = 0;
  counter.textContent = "0";
  stage.textContent = `مرحله ${stageNum}`;

  // انتخاب پس‌زمینه (bg1.png تا bg10.png)
  world.style.backgroundImage = `url('assets/bg${stageNum}.png')`;

  // Base Ground
  platforms.push({ x: 0, y: 0, width: worldWidth, height: groundHeight });

  const currentMessages = allStageMessages[stageNum - 1] || allStageMessages[0];

  for (let i = 0; i < 9; i++) {
    const platX = 260 + i * 290;
    const platY = groundHeight + 60 + ((i + stageNum) % 3) * 50;
    const platWidth = 130;
    const platHeight = 18;

    platforms.push({ x: platX, y: platY, width: platWidth, height: platHeight });

    const platDiv = document.createElement("div");
    platDiv.className = "platform";
    platDiv.style.left = platX + "px";
    platDiv.style.bottom = platY + "px";
    platDiv.style.width = platWidth + "px";
    platDiv.style.height = platHeight + "px";
    platformsContainer.appendChild(platDiv);

    const heartX = platX + platWidth / 2 - 22;
    const heartY = platY + 25;
    createHeartDOM(heartX, heartY, currentMessages[i]);
  }

  createHeartDOM(2820, groundHeight + 80, currentMessages[9]);

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

const bindControl = (btn, onPress, onRelease) => {
  if (!btn) return;
  btn.addEventListener("touchstart", (e) => { e.preventDefault(); onPress(); });
  btn.addEventListener("touchend", (e) => { e.preventDefault(); onRelease(); });
  btn.addEventListener("mousedown", onPress);
  btn.addEventListener("mouseup", onRelease);
};

bindControl(leftBtn, () => moveLeftHeld = true, () => moveLeftHeld = false);
bindControl(rightBtn, () => moveRightHeld = true, () => moveRightHeld = false);

if (jumpBtn) {
  jumpBtn.addEventListener("touchstart", (e) => { e.preventDefault(); jump(); });
  jumpBtn.addEventListener("click", jump);
}

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
    velocityY = 14;
    isGrounded = false;
  }
}

function updatePhysics() {
  if (moveLeftHeld) {
    playerX -= 7;
    direction = -1;
  }
  if (moveRightHeld) {
    playerX += 7;
    direction = 1;
  }

  if (playerX < 0) playerX = 0;
  if (playerX > worldWidth - playerWidth) playerX = worldWidth - playerWidth;

  playerY += velocityY;
  velocityY -= 0.75;

  isGrounded = false;
  platforms.forEach(plat => {
    if (
      playerX + playerWidth > plat.x &&
      playerX < plat.x + plat.width &&
      playerY >= plat.y + plat.height - groundHeight - 12 &&
      playerY <= plat.y + plat.height - groundHeight + 5 &&
      velocityY <= 0
    ) {
      playerY = plat.y + plat.height - groundHeight;
      velocityY = 0;
      isGrounded = true;
    }
  });

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

    const dx = Math.abs((playerX + playerWidth / 2) - (heart.x + 22));
    const dy = Math.abs((groundHeight + playerY + playerHeight / 2) - (heart.y + 22));

    if (dx < 40 && dy < 45) {
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

function loop() {
  updatePhysics();
  updateDOM();
  checkHearts();
  requestAnimationFrame(loop);
}

loadStage(1);
loop();
