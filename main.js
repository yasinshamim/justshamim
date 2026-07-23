import * as THREE from "three";
import messages from "./messages.js";

const canvas=document.getElementById("space");

const intro=document.getElementById("intro");
const typingText=document.getElementById("typingText");

const passwordPage=document.getElementById("passwordPage");
const password=document.getElementById("password");
const enterBtn=document.getElementById("enterBtn");
const error=document.getElementById("error");

const loadingPage=document.getElementById("loadingPage");
const gameUI=document.getElementById("gameUI");

const messageBox=document.getElementById("messageBox");
const messageText=document.getElementById("messageText");

const overlay=document.getElementById("overlay");

const bgMusic=document.getElementById("bgMusic");
const musicBtn=document.getElementById("musicBtn");

const scene=new THREE.Scene();

const camera=new THREE.PerspectiveCamera(

75,

window.innerWidth/window.innerHeight,

0.1,

5000

);

camera.position.set(0,0,0);

const renderer=new THREE.WebGLRenderer({

canvas,

antialias:true

});

renderer.setSize(

window.innerWidth,

window.innerHeight

);

renderer.setPixelRatio(

window.devicePixelRatio

);

const light=new THREE.AmbientLight(

0xffffff,

2

);

scene.add(light);

const clock=new THREE.Clock();

let stars=[];

let currentStar=-1;

let moveX=0;

let moveY=0;

let yaw=0;

let pitch=0;

let canMove=false;

const introTexts=[

"سلام جوجه کوچولوی من 🐥💕",

"این سایتو فقط برای تو ساختم...",

"شاید خیلی حرفه ای نباشه ولی هر قسمت این سایت رو با فکر تو درست کردم...",

"امیدوارم خوشت بیاد... ✨"
  
];

function wait(ms){

return new Promise(r=>setTimeout(r,ms));

}

async function showIntro(){

for(const txt of introTexts){

typingText.innerHTML="";

typingText.style.opacity=1;

for(let i=0;i<txt.length;i++){

typingText.innerHTML+=txt[i];

await wait(45);

}

await wait(1700);

typingText.style.opacity=0;

await wait(700);

}

intro.style.display="none";

passwordPage.style.display="flex";

}

showIntro();

const texture=new THREE.TextureLoader().load(
"https://threejs.org/examples/textures/sprites/disc.png"
);

const galaxyGeometry=new THREE.BufferGeometry();

const galaxyVertices=[];

for(let i=0;i<5000;i++){

galaxyVertices.push(

(Math.random()-0.5)*3000,

(Math.random()-0.5)*3000,

(Math.random()-0.5)*3000

);

}

galaxyGeometry.setAttribute(

"position",

new THREE.Float32BufferAttribute(

galaxyVertices,

3

)

);

const galaxyMaterial=new THREE.PointsMaterial({

size:2,

map:texture,

transparent:true,

depthWrite:false,

color:0xffffff,

blending:THREE.AdditiveBlending

});

const galaxy=new THREE.Points(

galaxyGeometry,

galaxyMaterial

);

scene.add(galaxy);

const starGeometry=new THREE.SphereGeometry(

1.5,

18,

18

);

for(let i=0;i<100;i++){

const starMaterial=new THREE.MeshBasicMaterial({

color:0xffffff

});

const star=new THREE.Mesh(

starGeometry,

starMaterial

);

const r=250+Math.random()*700;

const theta=Math.random()*Math.PI*2;

const phi=Math.random()*Math.PI;

star.position.set(

r*Math.sin(phi)*Math.cos(theta),

r*Math.cos(phi),

r*Math.sin(phi)*Math.sin(theta)

);

scene.add(star);

stars.push(star);

}

const moon=new THREE.Mesh(

new THREE.SphereGeometry(12,32,32),

new THREE.MeshBasicMaterial({

color:0x9dbdff

})

);

moon.position.set(

-220,

80,

-420

);

scene.add(moon);

const sun=new THREE.Mesh(

new THREE.SphereGeometry(22,40,40),

new THREE.MeshBasicMaterial({

color:0xffd44d
  

enterBtn.onclick=()=>{

const pass=password.value.trim();

if(pass==="1130"||pass==="66"){

passwordPage.style.display="none";

loadingPage.style.display="flex";

setTimeout(()=>{

loadingPage.style.display="none";

gameUI.style.display="block";

overlay.style.opacity=0;

canMove=true;

bgMusic.play().catch(()=>{});

},2200);

}else{

error.innerHTML="رمز اشتباهه 😝";

}

};

musicBtn.onclick=()=>{

if(bgMusic.paused){

bgMusic.play();

musicBtn.innerHTML="🔊";

}else{

bgMusic.pause();

musicBtn.innerHTML="🎵";

}

};

const joystick=nipplejs.create({

zone:document.getElementById("joystick"),

mode:"static",

position:{

left:"70px",

bottom:"70px"

},

color:"white"

});

joystick.on("move",(evt,data)=>{

moveX=data.vector.x;

moveY=data.vector.y;

});

joystick.on("end",()=>{

moveX=0;

moveY=0;

});

let drag=false;

let lastX=0;

let lastY=0;

window.addEventListener("pointerdown

function updateCamera(dt){

if(!canMove)return;

camera.rotation.order="YXZ";

camera.rotation.y=yaw;

camera.rotation.x=pitch;

const speed=55*dt;

camera.translateZ(-moveY*speed);

camera.translateX(moveX*speed);

}

function updateMessages(){

let nearest=-1;

let minDistance=20;

for(let i=0;i<stars.length;i++){

const d=camera.position.distanceTo(

stars[i].position

);

if(d<minDistance){

minDistance=d;

nearest=i;

}

}

if(nearest!==-1){

if(currentStar!==nearest){

currentStar=nearest;

messageText.innerHTML=

messages[nearest];

messageBox.style.opacity=1;

}

}else{

currentStar=-1;

messageBox.style.opacity=0;

}

const sunDistance=

camera.position.distanceTo(

sun.position

);

if(sunDistance<45){

messageBox.style.opacity=1;

messageText.innerHTML=`

☀️❤️<br><br>

تولدت مبارک خورشید زندگیم...

<br><br>

امیدوارم همیشه بخندی...

همیشه سالم باشی...

همیشه خوشحال باشی...

<br><br>

دوستت دارم تا ابد...

<br><br>

🌙 یاسین

`;

}

}

function animate(){

requestAnimationFrame(animate);

const dt=clock.getDelta();

updateCamera(dt);

galaxy.rotation.y+=0.00015;

galaxy.rotation.x+=0.00005;

for(let i=0;i<stars.length;i++){

stars[i].rotation.y+=0.01;

stars[i].rotation.x+=0.005;

const s=

1+

Math.sin(

clock.elapsedTime*2+

i

)*0.12;

stars[i].scale.set(

s,

s,

s

);

}

moon.rotation.y+=0.002;

sun.rotation.y+=0.0015;

updateMessages();

renderer.render(

scene,

camera

);

}

animate();

window.addEventListener(

"resize",

()=>{

camera.aspect=

window.innerWidth/

window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(

window.innerWidth,

window.innerHeight

);

}

);
