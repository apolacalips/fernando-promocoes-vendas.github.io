/* Luna 3D — Three.js + GSAP (gratuitos). Camada extra: não altera script.js */
(function(){
var d=document,B=d.body,RM=matchMedia("(prefers-reduced-motion:reduce)").matches,talk=false;
function gl(){try{var c=d.createElement("canvas");return!!(window.WebGLRenderingContext&&(c.getContext("webgl")||c.getContext("experimental-webgl")))}catch(e){return false}}
var weak=(navigator.hardwareConcurrency||4)<=2||(navigator.deviceMemory||4)<=1;
var use3d=!RM&&!weak&&gl()&&window.THREE;
function av(id){return'<svg class="lx-av" viewBox="0 0 80 80" aria-hidden="true"><defs><radialGradient id="'+id+'" cx="50%" cy="40%"><stop offset="0" stop-color="#d9fbff"/><stop offset="1" stop-color="#22d3ee"/></radialGradient></defs><circle cx="40" cy="40" r="38" fill="#0a1530" stroke="#22d3ee" stroke-width="2"/><path d="M16 58c0-28 8-40 24-40s24 12 24 40c-6-8-10-22-24-22S22 50 16 58z" fill="#7c3aed"/><ellipse cx="40" cy="42" rx="14" ry="17" fill="url(#'+id+')"/><circle cx="34" cy="40" r="2" fill="#050914"/><circle cx="46" cy="40" r="2" fill="#050914"/><path class="mo" d="M35 49q5 4 10 0" stroke="#050914" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M26 66q14 10 28 0v14H26z" fill="#143b80"/></svg>'}
var AI='<span class="lx-ai"><i></i>IA ativa</span>';
/* Voz feminina pt-BR (quando o aparelho tiver) */
function voice(){var v=(window.speechSynthesis?speechSynthesis.getVoices():[]).filter(function(x){return/^pt/i.test(x.lang)});return v.filter(function(x){return/fran|luciana|maria|vit|femin|female|google/i.test(x.name)})[0]||v[0]||null}
function speak(t){if(!window.speechSynthesis||RM&&0)return;try{speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(t),v=voice();u.lang="pt-BR";if(v)u.voice=v;u.pitch=1.1;u.onstart=function(){talk=true;B.classList.add("lx-talk")};u.onend=u.onerror=function(){talk=false;B.classList.remove("lx-talk")};speechSynthesis.speak(u)}catch(e){}}
/* Luna no chat existente */
var h=d.getElementById("luna-head"),l=d.getElementById("luna-launch");
if(h){h.insertAdjacentHTML("afterbegin",av("lg1"));var s=h.querySelector("strong");if(s)s.insertAdjacentHTML("afterend",AI)}
if(l)l.insertAdjacentHTML("afterbegin",av("lg2"));
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
var N=mob?450:1300,p=new Float32Array(N*3),i;for(i=0;i<N;i++){p[i*3]=(Math.random()-.5)*26;p[i*3+1]=(Math.random()-.5)*16;p[i*3+2]=Math.random()*-18}
var g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(p,3));
var pts=new THREE.Points(g,new THREE.PointsMaterial({color:0x9ff3ff,size:mob?.05:.045,transparent:true,opacity:.8,depthWrite:false}));S.add(pts);
function fit(){var w=innerWidth,hh=innerHeight;R.setSize(w,hh,false);C.aspect=w/hh;C.updateProjectionMatrix();if(w<720){G.position.set(0,1.9,0);G.scale.setScalar(.7)}else{G.position.set(3.4,.3,0);G.scale.setScalar(1)}}
fit();addEventListener("resize",fit);
var tx=0,ty=0,kick=0,run=true,t0=performance.now();
addEventListener("pointermove",function(e){tx=e.clientX/innerWidth-.5;ty=e.clientY/innerHeight-.5},{passive:true});
addEventListener("pointerdown",function(){kick=1},{passive:true});
function loop(now){if(!run)return;var t=(now-t0)/1000;kick*=.95;
core.rotation.y=t*.25+tx*.8+kick*2;core.rotation.x=t*.12+ty*.6;inn.rotation.y=-t*.2;
r1.rotation.z=t*.4;r2.rotation.y=t*.3+tx;
var k=1+(talk?.07*Math.sin(t*14):.02*Math.sin(t*2))+kick*.12;core.scale.setScalar(k);inn.scale.setScalar(k);
pts.rotation.y=t*.02+tx*.15;pts.rotation.x=ty*.1;
cv.style.opacity=Math.max(.25,1-scrollY/innerHeight*.7);
R.render(S,C);requestAnimationFrame(loop)}
d.addEventListener("visibilitychange",function(){run=!d.hidden;if(run)requestAnimationFrame(loop)});
requestAnimationFrame(loop)}
if(use3d){B.classList.add("lx-3d");scene()}else{var o=d.createElement("div");o.id="lx-orb";o.setAttribute("aria-hidden","true");d.getElementById("bg").after(o)}
/* Entrada cinematográfica (só em JS: se falhar, o site abre normal) */
function hero(){if(window.gsap&&!RM)gsap.from(".hero h1,.hero p,.hero .row,.stats,.lk",{y:34,opacity:0,duration:.9,stagger:.12,ease:"power3.out",clearProps:"all"})}
var seen=0;try{seen=sessionStorage.getItem("lx_in")}catch(e){}
if(seen){hero();return}
var it=d.createElement("div");it.id="lx-intro";it.setAttribute("role","dialog");it.setAttribute("aria-label","Boas-vindas da Luna");
it.innerHTML=av("lg0")+'<h2>LUNA</h2>'+AI+'<p>Assistente virtual com inteligência artificial da Fernando Promoções e Vendas.</p><div id="lx-bar"></div><button id="lx-go" type="button">Entrar</button>';
B.appendChild(it);B.classList.add("lx-lock");
var done=0;function exit(v){if(done)return;done=1;try{sessionStorage.setItem("lx_in","1")}catch(e){}
if(v)speak("Olá! Eu sou a Luna, assistente virtual da Fernando Promoções e Vendas. Posso ajudar com internet fibra óptica e TV online.");
it.classList.add("out");B.classList.remove("lx-lock");setTimeout(function(){it.remove()},800);hero()}
d.getElementById("lx-go").onclick=function(){exit(true)};
addEventListener("keydown",function(e){if(e.key==="Escape")exit(false)});
setTimeout(function(){exit(false)},20000);
d.getElementById("lx-go").focus({preventScroll:true});
})();
