/* Luna 3D — Three.js + GSAP (gratuitos). Camada extra: não altera script.js */
(function(){
var d=document,B=d.body,RM=matchMedia("(prefers-reduced-motion:reduce)").matches,talk=false;
function gl(){try{var c=d.createElement("canvas");return!!(window.WebGLRenderingContext&&(c.getContext("webgl")||c.getContext("experimental-webgl")))}catch(e){return false}}
var weak=(navigator.hardwareConcurrency||4)<=2||(navigator.deviceMemory||4)<=1;
var use3d=!RM&&!weak&&gl()&&window.THREE;
/* Som: DESLIGADO por padrão. Só toca depois que o visitante ativa. Gerado no navegador (gratuito). */
var AC=null,master=null,on=false,vol=.4,started=false;
function ctx(){if(!AC)AC=new(window.AudioContext||window.webkitAudioContext)();if(AC.state==="suspended")AC.resume();return AC}
function startAudio(){try{ctx();if(started)return;started=true;master=AC.createGain();master.gain.value=on?vol*.5:0;master.connect(AC.destination);
var f=AC.createBiquadFilter();f.type="lowpass";f.frequency.value=700;f.connect(master);
[[55,"sine"],[82.4,"sine"],[110.4,"triangle"],[164.8,"sine"]].forEach(function(o,k){var os=AC.createOscillator(),g=AC.createGain(),l=AC.createOscillator(),lg=AC.createGain();
os.type=o[1];os.frequency.value=o[0];g.gain.value=.22/(k+1);os.connect(g);g.connect(f);os.start();
l.frequency.value=.05+k*.03;lg.gain.value=g.gain.value*.6;l.connect(lg);lg.connect(g.gain);l.start()})}catch(e){}}
function tone(a,b,dur,g,ty){if(!on||!AC||!master)return;try{var o=AC.createOscillator(),e=AC.createGain(),t=AC.currentTime;o.type=ty||"sine";o.frequency.setValueAtTime(a,t);o.frequency.exponentialRampToValueAtTime(b,t+dur*.6);
e.gain.setValueAtTime(.0001,t);e.gain.exponentialRampToValueAtTime(g,t+.01);e.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(e);e.connect(master);o.start(t);o.stop(t+dur+.03)}catch(x){}}
window.LXA={ping:function(){tone(1400,2100,.14,.4,"triangle");setTimeout(function(){tone(2100,2900,.1,.25)},90)},
sweep:function(){tone(180,1100,.7,.25,"sawtooth")},zap:function(){tone(900,300,.12,.2,"square")}};
var sw=d.createElement("div");sw.id="lx-snd";
sw.innerHTML='<button id="lx-sb" type="button"></button><input id="lx-vol" type="range" min="0" max="100" value="40" aria-label="Volume">';B.appendChild(sw);
var sb=d.getElementById("lx-sb"),vr=d.getElementById("lx-vol");
function sbDraw(){sb.textContent=on?"🔊":"🔇";sb.setAttribute("aria-label",on?"Silenciar som":"Ativar som")}sbDraw();
function setOn(v){on=v;if(v)startAudio();if(master)master.gain.linearRampToValueAtTime(on?vol*.5:0,AC.currentTime+.4);sbDraw()}
sb.onclick=function(){setOn(!on);if(on)tone(760,1280,.16,.5)};
vr.oninput=function(){vol=this.value/100;if(master&&on)master.gain.value=vol*.5};
d.addEventListener("click",function(e){if(on&&e.target.closest&&e.target.closest("button,a,summary")&&!e.target.closest("#lx-snd"))tone(760,1280,.16,.5)},true);
/* Cena 3D */
function scene(){
var cv=d.createElement("canvas");cv.id="lx-cv";cv.setAttribute("aria-hidden","true");d.getElementById("bg").after(cv);
var mob=innerWidth<720,R=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:!mob,powerPreference:"low-power"});
R.setPixelRatio(Math.min(devicePixelRatio,mob?1.5:2));
var S=new THREE.Scene(),C=new THREE.PerspectiveCamera(55,1,.1,100),G=new THREE.Group();C.position.z=7;S.add(G);
function M(c,o,w){return new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:o,wireframe:!!w})}
var core=new THREE.Mesh(new THREE.IcosahedronGeometry(1.6,mob?2:3),M(0x22d3ee,.35,1)),
inn=new THREE.Mesh(new THREE.SphereGeometry(1.2,24,24),M(0x2563eb,.18)),
r1=new THREE.Mesh(new THREE.TorusGeometry(2.3,.012,8,120),M(0xff7a00,.7)),
r2=new THREE.Mesh(new THREE.TorusGeometry(2.7,.01,8,120),M(0x22d3ee,.5));
r1.rotation.x=1.2;r2.rotation.set(.4,.8,0);G.add(core,inn,r1,r2);
var WG=new THREE.Group();S.add(WG);
var N=mob?180:450,p=new Float32Array(N*3),i;for(i=0;i<N;i++){p[i*3]=(Math.random()-.5)*26;p[i*3+1]=(Math.random()-.5)*16;p[i*3+2]=Math.random()*-18}
var g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(p,3));
var pts=new THREE.Points(g,new THREE.PointsMaterial({color:0x9ff3ff,size:mob?.04:.035,transparent:true,opacity:.6,depthWrite:false}));WG.add(pts);
var W=mob?55:110,np=[],vl=[],ML=W*7,lp=new Float32Array(ML*6),nP=new Float32Array(W*3);
for(i=0;i<W;i++){np.push(new THREE.Vector3((Math.random()-.5)*20,(Math.random()-.5)*11,-Math.random()*12-1));vl.push(new THREE.Vector3((Math.random()-.5)*.012,(Math.random()-.5)*.012,(Math.random()-.5)*.008))}
var lg=new THREE.BufferGeometry(),ng=new THREE.BufferGeometry();
lg.setAttribute("position",new THREE.BufferAttribute(lp,3).setUsage(THREE.DynamicDrawUsage));ng.setAttribute("position",new THREE.BufferAttribute(nP,3).setUsage(THREE.DynamicDrawUsage));
var lines=new THREE.LineSegments(lg,new THREE.LineBasicMaterial({color:0x22d3ee,transparent:true,opacity:.3,depthWrite:false})),
nodes=new THREE.Points(ng,new THREE.PointsMaterial({color:0xbff4ff,size:mob?.09:.08,transparent:true,opacity:.95,depthWrite:false}));
lines.frustumCulled=nodes.frustumCulled=false;WG.add(lines,nodes);
function web(){var c=0,j,a,b,x,y,z,D=mob?3.2:3.6;D*=D;for(i=0;i<W;i++){a=np[i];a.add(vl[i]);if(Math.abs(a.x)>10)vl[i].x*=-1;if(Math.abs(a.y)>5.5)vl[i].y*=-1;if(a.z>-1||a.z<-13)vl[i].z*=-1;nP[i*3]=a.x;nP[i*3+1]=a.y;nP[i*3+2]=a.z;
for(j=i+1;j<W&&c<ML;j++){b=np[j];x=a.x-b.x;y=a.y-b.y;z=a.z-b.z;if(x*x+y*y+z*z<D){lp[c*6]=a.x;lp[c*6+1]=a.y;lp[c*6+2]=a.z;lp[c*6+3]=b.x;lp[c*6+4]=b.y;lp[c*6+5]=b.z;c++}}}
lg.setDrawRange(0,c*2);lg.attributes.position.needsUpdate=ng.attributes.position.needsUpdate=true}
window.LX={C:C,G:G,wg:WG,parts:[core,inn,r1,r2],tick:[],m:[0,0]};
function fit(){var w=innerWidth,hh=innerHeight;R.setSize(w,hh,false);C.aspect=w/hh;C.updateProjectionMatrix();if(w<720){G.position.set(0,1.9,0);G.scale.setScalar(.7)}else{G.position.set(3.4,.3,0);G.scale.setScalar(1)}}
fit();addEventListener("resize",fit);
var tx=0,ty=0,kick=0,run=true,t0=performance.now();
addEventListener("pointermove",function(e){tx=e.clientX/innerWidth-.5;ty=e.clientY/innerHeight-.5},{passive:true});
addEventListener("pointerdown",function(){kick=1},{passive:true});
function loop(now){if(!run)return;var t=(now-t0)/1000;kick*=.95;
core.rotation.y=t*.25+tx*.8+kick*2;core.rotation.x=t*.12+ty*.6;inn.rotation.y=-t*.2;
r1.rotation.z=t*.4;r2.rotation.y=t*.3+tx;
var k=1+(talk?.07*Math.sin(t*14):.02*Math.sin(t*2))+kick*.12;core.scale.setScalar(k);inn.scale.setScalar(k);
WG.rotation.y=t*.03+tx*.2;WG.rotation.x=ty*.12;web();
cv.style.opacity=Math.max(.25,1-scrollY/innerHeight*.7);
LX.m[0]=tx;LX.m[1]=ty;for(var q=0;q<LX.tick.length;q++)LX.tick[q](t);R.render(S,C);requestAnimationFrame(loop)}
d.addEventListener("visibilitychange",function(){run=!d.hidden;if(run)requestAnimationFrame(loop)});
requestAnimationFrame(loop)}
if(use3d){B.classList.add("lx-3d");scene()}else{var o=d.createElement("div");o.id="lx-orb";o.setAttribute("aria-hidden","true");d.getElementById("bg").after(o);web2d()}
function web2d(){var cv=d.createElement("canvas");cv.id="lx-cv";cv.setAttribute("aria-hidden","true");d.getElementById("bg").after(cv);var x=cv.getContext("2d"),n=[],W,H,i,j,N=innerWidth<720?26:46;
function fit(){W=cv.width=innerWidth;H=cv.height=innerHeight}fit();addEventListener("resize",fit);
for(i=0;i<N;i++)n.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35});
function f(){x.clearRect(0,0,W,H);for(i=0;i<N;i++){var a=n[i];if(!RM){a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>W)a.vx*=-1;if(a.y<0||a.y>H)a.vy*=-1}
for(j=i+1;j<N;j++){var b=n[j],dx=a.x-b.x,dy=a.y-b.y,q=dx*dx+dy*dy;if(q<19600){x.strokeStyle="rgba(34,211,238,"+(.35*(1-q/19600))+")";x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke()}}
x.fillStyle="#bff4ff";x.fillRect(a.x-1,a.y-1,2.5,2.5)}if(!RM)requestAnimationFrame(f)}f()}
/* Animação de entrada do conteúdo (sem apresentação, sem voz) */
if(window.gsap&&!RM)gsap.from(".hero h1,.hero p,.hero .row,.stats,.lk",{y:34,opacity:0,duration:.9,stagger:.12,ease:"power3.out",clearProps:"all"});
})();
