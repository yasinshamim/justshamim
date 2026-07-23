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

"هر قسمت این سایت رو با عشق درست کردم...",

"حالا بیا باهم بین ستاره‌ها سفر کنیم... ✨"

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
