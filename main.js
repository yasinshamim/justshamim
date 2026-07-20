const starTexture = new THREE.TextureLoader().load(
"https://threejs.org/examples/textures/sprites/disc.png"
);

const starGeometry = new THREE.BufferGeometry();

const starCount = 6000;

const positions = [];

for(let i=0;i<starCount;i++){

positions.push(

( Math.random()-0.5 )*3000,

( Math.random()-0.5 )*3000,

( Math.random()-0.5 )*3000

);

}

starGeometry.setAttribute(

"position",

new THREE.Float32BufferAttribute(

positions,

3

)

);

const starMaterial = new THREE.PointsMaterial({

size:2,

map:starTexture,

transparent:true,

depthWrite:false,

color:0xffffff,

blending:THREE.AdditiveBlending

});

const galaxy=new THREE.Points(

starGeometry,

starMaterial

);

scene.add(galaxy);

const messageStars=[];

const glowGeometry=new THREE.SphereGeometry(

1.4,

24,

24

);

for(let i=0;i<100;i++){

const glowMaterial=new THREE.MeshBasicMaterial({

color:0xffffff,

transparent:true,

opacity:.8

});

const glow=new THREE.Mesh(

glowGeometry,

glowMaterial

);

const r=220+Math.random()*800;

const theta=Math.random()*Math.PI*2;

const phi=Math.random()*Math.PI;

glow.position.set(

r*Math.sin(phi)*Math.cos(theta),

r*Math.cos(phi),

r*Math.sin(phi)*Math.sin(theta)

);

scene.add(glow);

messageStars.push(glow);

}

stars=messageStars;

const shootingStars=[];

function createMeteor(){

const g=new THREE.SphereGeometry(.5,8,8);

const m=new THREE.MeshBasicMaterial({

color:0xffffff

});

const meteor=new THREE.Mesh(g,m);

meteor.position.set(

800,

300+Math.random()*400,

-800

);

meteor.userData.speed=

8+Math.random()*6;

scene.add(meteor);

shootingStars.push(meteor);

}

setInterval(createMeteor,4500);
const sunLight=new THREE.PointLight(

0xffdd66,

18,

5000

);

sunLight.position.set(

240,

80,

-650

);

scene.add(sunLight);

const moonLight=new THREE.PointLight(

0x88bbff,

2,

1200

);

moonLight.position.set(

-220,

60,

-420

);

scene.add(moonLight);

const particles=[];

for(let i=0;i<700;i++){

const geo=new THREE.SphereGeometry(

0.12,

4,

4

);

const mat=new THREE.MeshBasicMaterial({

color:0xffffff,

transparent:true,

opacity:Math.random()

});

const p=new THREE.Mesh(

geo,

mat

);

p.position.set(

(Math.random()-0.5)*2000,

(Math.random()-0.5)*2000,

(Math.random()-0.5)*2000

);

p.userData.speed=

0.02+

Math.random()*0.08;

scene.add(p);

particles.push(p);

}

let endingStarted=false;

function checkSunDistance(){

const d=camera.position.distanceTo(

sunLight.position

);

if(

d<45&&

!endingStarted

){

endingStarted=true;

showBirthday();

}

}

function showBirthday(){

messageBox.style.opacity=1;

messageText.innerHTML=`

🎂<br><br>

تولدت مبارک خورشید زندگیم ☀️❤️

<br><br>

امیدوارم همیشه بخندی...

همیشه سالم باشی...

همیشه خوشحال باشی...

<br><br>

دوستت دارم تا بی‌نهایت.

<br><br>

❤️ یاسین

`;

}
function animateGalaxy(){

galaxy.rotation.y+=0.00015;

galaxy.rotation.x+=0.00005;

for(const p of particles){

p.position.y-=p.userData.speed;

if(p.position.y<-1000){

p.position.y=1000;

}

}

for(const meteor of shootingStars){

meteor.position.x-=meteor.userData.speed*4;

meteor.position.y-=meteor.userData.speed*2;

meteor.position.z+=meteor.userData.speed*3;

if(

meteor.position.x<-1200||

meteor.position.y<-1200||

meteor.position.z>1200

){

scene.remove(meteor);

}

}

for(const s of stars){

const t=clock.elapsedTime;

s.scale.setScalar(

1+

Math.sin(

t*2+

s.position.x

)*0.25

);

}

checkSunDistance();

}

function updateMessages(){

let nearest=-1;

let nearestDistance=20;

for(let i=0;i<stars.length;i++){

const d=camera.position.distanceTo(

stars[i].position

);

if(d<nearestDistance){

nearestDistance=d;

nearest=i;

}

}

if(nearest!==-1){

if(currentMessage!==nearest){

currentMessage=nearest;

messageText.innerHTML=

messages[nearest];

messageBox.style.opacity=1;

}

}else{

currentMessage=-1;

messageBox.style.opacity=0;

}

}
