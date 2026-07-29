const player=document.getElementById("player");

const leftBtn=document.getElementById("left");
const rightBtn=document.getElementById("right");
const jumpBtn=document.getElementById("jump");

const heartsContainer=document.getElementById("hearts");

const counter=document.getElementById("count");

const stage=document.getElementById("stage");

let playerX=80;
let playerY=0;

let velocityY=0;

let jumping=false;

let direction=1;

let collected=0;

let currentStage=1;

const hearts=[];

function createHeart(x,y,text){

const heart=document.createElement("img");

heart.src="assets/heart.png";

heart.className="heart";

heart.style.left=x+"px";

heart.style.top=y+"px";

heart.dataset.message=text;

heartsContainer.appendChild(heart);

hearts.push(heart);

}

createHeart(300,300,"تو قشنگ‌ترین اتفاق زندگیمی ❤️");
createHeart(520,250,"هر روز بیشتر دوستت دارم 🌸");
createHeart(760,330,"لبخندت آرامش منه ✨");
createHeart(980,240,"همیشه مراقب خودت باش ☀️");
createHeart(1200,310,"کنارت خوشبختم 💕");
createHeart(1450,280,"دلم فقط پیش توئه 🥹");
createHeart(1700,250,"آرزوم دیدن خنده‌هاته 🌷");
createHeart(1950,320,"بهت افتخار میکنم 🤍");
createHeart(2200,270,"تا آخر دنیا دوستت دارم 🌍");
createHeart(2450,300,"تولدت مبارک خورشید زندگیم ☀️❤️");
function updatePlayer(){

player.style.left=playerX+"px";

player.style.bottom=(90+playerY)+"px";

if(direction===-1){

player.style.transform="scaleX(-1)";

}else{

player.style.transform="scaleX(1)";

}

}

function jump(){

if(jumping)return;

jumping=true;

velocityY=18;

}

function physics(){

if(jumping){

playerY+=velocityY;

velocityY-=1;

if(playerY<=0){

playerY=0;

velocityY=0;

jumping=false;

}

}

}

function moveLeft(){

playerX-=8;

direction=-1;

if(playerX<0){

playerX=0;

}

}

function moveRight(){

playerX+=8;

direction=1;

if(playerX>2500){

playerX=2500;

}

}

leftBtn.addEventListener("touchstart",()=>{

moveLeft();

});

rightBtn.addEventListener("touchstart",()=>{

moveRight();

});

jumpBtn.addEventListener("click",jump);

leftBtn.addEventListener("click",moveLeft);

rightBtn.addEventListener("click",moveRight);
function checkHearts(){

hearts.forEach((heart)=>{

if(heart.dataset.collected)return;

const hx=heart.offsetLeft;

const hy=heart.offsetTop;

const px=playerX+45;

const py=(window.innerHeight-90-playerY);

const dx=Math.abs(px-hx);

const dy=Math.abs(py-hy);

if(dx<55&&dy<80){

heart.dataset.collected="1";

heart.style.display="none";

collected++;

counter.textContent=collected;

showMessage(heart.dataset.message);

if(collected===10){

finishGame();

}

}

});

}

function showMessage(text){

const box=document.getElementById("messageBox");

const msg=document.getElementById("messageText");

msg.innerHTML=text;

box.classList.add("show");

clearTimeout(box.timer);

box.timer=setTimeout(()=>{

box.classList.remove("show");

},2500);

}
function finishGame(){

const finish=document.getElementById("finishScreen");

finish.style.display="flex";

document.getElementById("game").style.pointerEvents="none";

}

function loop(){

physics();

updatePlayer();

checkHearts();

requestAnimationFrame(loop);

}

updatePlayer();

loop();

document.addEventListener("keydown",(e)=>{

if(e.key==="ArrowLeft"){

moveLeft();

}

if(e.key==="ArrowRight"){

moveRight();

}

if(e.key===" "||

e.key==="ArrowUp"){

jump();

}

});

document.getElementById("restartBtn")?.addEventListener("click",()=>{

location.reload();

});
