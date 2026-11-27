/* Terra realista (texturas NASA/three.js, gratuitas) com zoom no Brasil. Balões = DEMONSTRAÇÃO, sem dados reais. */
(function(){
var D=window.BRDATA;if(!D)return;
var d=document,B=d.body,RM=matchMedia("(prefers-reduced-motion:reduce)").matches,mob=innerWidth<720,S=D.s,
hub=S.map(function(e){return e.k}).indexOf("DF"),live=[],proj=null,hit=null,
TXT=[["Procura internet fibra óptica","#3b82f6"],["Interesse em TV online","#8b5cf6"]];
var bw=d.createElement("div");bw.id="br-b";bw.setAttribute("aria-hidden","true");B.appendChild(bw);
function place(o,p){var w=o.e.offsetWidth||170;o.e.style.left=Math.min(Math.max(p[0]-w/2,6),innerWidth-w-6)+"px";o.e.style.top=Math.min(Math.max(p[1]-64,6),innerHeight-70)+"px"}
function update(){var n=performance.now();live=live.filter(function(o){if(n>o.end){o.e.remove();return false}var p=proj&&proj(o.i);if(p)place(o,p);return true})}
function spawn(){if(d.hidden||!proj||live.length>=(mob?1:3))return;var i=Math.floor(Math.random()*S.length),t=Math.random()<.5?0:1,p=proj(i);if(!p)return;
var e=d.createElement("div");e.className="br-b";e.innerHTML='<i style="background:'+TXT[t][1]+';color:'+TXT[t][1]+'"></i><b>'+TXT[t][0]+'</b><small>Demonstração · '+S[i].k+'</small>';
bw.appendChild(e);var o={e:e,i:i,end:performance.now()+5600};live.push(o);place(o,p);if(hit)hit(i);if(window.LXA)LXA.ping()}
setInterval(spawn,RM?6500:mob?4800:2700);setTimeout(spawn,1200);

function globe3d(L){
var T=THREE,R=1.7,SC=mob?.9:1.1,Z=new T.Group(),E=new T.Group(),k,j,i;L.G.add(Z);Z.add(E);function ctr(){L.G.position.set(0,0,0);L.G.scale.setScalar(1)}ctr();addEventListener("resize",ctr);L.parts.forEach(function(m){m.visible=false});if(L.wg)L.wg.visible=true;
function ll(lon,lat,r){var p=(lon+180)*Math.PI/180,t=(90-lat)*Math.PI/180;return new T.Vector3(-r*Math.sin(t)*Math.cos(p),r*Math.cos(t),r*Math.sin(t)*Math.sin(p))}
function geo(x,y,r){return ll(x/.125-54,y/.125-14.5,r)}
var TX=window.LX_TEX||{day:"earth_day.jpg",spec:"earth_spec.jpg",clouds:"earth_clouds.png"},ld=new T.TextureLoader();
var em=new T.MeshPhongMaterial({color:0x0b2d6b,shininess:22,specular:0x445566}),earth=new T.Mesh(new T.SphereGeometry(R,mob?48:80,mob?32:56),em);E.add(earth);
ld.load(TX.day,function(t){em.map=t;em.color.set(0xffffff);em.needsUpdate=true});ld.load(TX.spec,function(t){em.specularMap=t;em.needsUpdate=true});
var cm=new T.MeshPhongMaterial({transparent:true,opacity:.7,depthWrite:false,color:0xffffff}),cl=new T.Mesh(new T.SphereGeometry(R*1.012,mob?40:64,mob?28:48),cm);cl.renderOrder=1;E.add(cl);
ld.load(TX.clouds,function(t){cm.map=t;cm.needsUpdate=true});
var at=new T.Mesh(new T.SphereGeometry(R*1.15,48,32),new T.ShaderMaterial({transparent:true,side:T.BackSide,blending:T.AdditiveBlending,depthWrite:false,
vertexShader:"varying vec3 n;void main(){n=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
fragmentShader:"varying vec3 n;void main(){float i=pow(max(.72-dot(n,vec3(0.,0.,1.)),0.),3.);gl_FragColor=vec4(.25,.55,1.,1.)*i*1.5;}"}));Z.add(at);
var sun=new T.DirectionalLight(0xffffff,1.25);sun.position.set(-3,2,6);L.G.add(sun,new T.AmbientLight(0x6f86b8,.55));
var sn=mob?350:800,sp0=new Float32Array(sn*3);for(k=0;k<sn;k++){var v=new T.Vector3(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize().multiplyScalar(30+Math.random()*10);sp0.set([v.x,v.y,v.z],k*3)}
var stg=new T.BufferGeometry();stg.setAttribute("position",new T.BufferAttribute(sp0,3));var stars=new T.Points(stg,new T.PointsMaterial({color:0xcfe4ff,size:.09,transparent:true,opacity:.85,depthWrite:false}));L.G.add(stars);
var bp=[];S.forEach(function(st){st.r.forEach(function(r){var n=r.length/2,a,b;for(j=0;j<n;j++){a=geo(r[j*2],r[j*2+1],R*1.004);b=geo(r[((j+1)%n)*2],r[((j+1)%n)*2+1],R*1.004);bp.push(a.x,a.y,a.z,b.x,b.y,b.z)}})});
var bg=new T.BufferGeometry();bg.setAttribute("position",new T.Float32BufferAttribute(bp,3));var bl=new T.LineSegments(bg,new T.LineBasicMaterial({color:0x8fe9ff,transparent:true,opacity:.8,depthWrite:false}));bl.renderOrder=2;E.add(bl);
var CP=S.map(function(st){return geo(st.c[0],st.c[1],R*1.008)}),cp=new Float32Array(S.length*3),cc=new Float32Array(S.length*3),col=[new T.Color(0x4aa3ff),new T.Color(0xa78bfa)];
CP.forEach(function(p,i){cp.set([p.x,p.y,p.z],i*3);var c=col[i%2];cc.set([c.r,c.g,c.b],i*3)});
var cg=new T.BufferGeometry();cg.setAttribute("position",new T.BufferAttribute(cp,3));cg.setAttribute("color",new T.BufferAttribute(cc,3));
[[.18,.28],[.07,1]].forEach(function(a){var p=new T.Points(cg,new T.PointsMaterial({size:a[0]*(mob?1.15:1),vertexColors:true,transparent:true,opacity:a[1],depthWrite:false}));p.renderOrder=3;E.add(p)});
var hp=CP[hub],hd=new T.Points(new T.BufferGeometry().setFromPoints([hp]),new T.PointsMaterial({color:0xffffff,size:.11,depthWrite:false}));hd.renderOrder=4;E.add(hd);
var arcs=[],ap=[];CP.forEach(function(p,q){if(q===hub)return;var A=hp.clone().normalize(),Bv=p.clone().normalize(),ang=A.angleTo(Bv),pts=[];
for(i=0;i<=28;i++){var u=i/28;pts.push(A.clone().lerp(Bv,u).normalize().multiplyScalar(R*1.006+Math.sin(Math.PI*u)*ang*.3))}arcs.push(pts);for(i=0;i<28;i++)ap.push(pts[i].x,pts[i].y,pts[i].z,pts[i+1].x,pts[i+1].y,pts[i+1].z)});
var ag=new T.BufferGeometry();ag.setAttribute("position",new T.Float32BufferAttribute(ap,3));var al=new T.LineSegments(ag,new T.LineBasicMaterial({color:0xa78bfa,transparent:true,opacity:.6,depthWrite:false}));al.renderOrder=3;E.add(al);
var M=mob?6:14,spk=new Float32Array(M*3),sa=[],su=[],sv=[];for(k=0;k<M;k++){sa.push(Math.floor(Math.random()*arcs.length));su.push(Math.random());sv.push(.2+Math.random()*.3)}
var sg=new T.BufferGeometry();sg.setAttribute("position",new T.BufferAttribute(spk,3));var sk=new T.Points(sg,new T.PointsMaterial({color:0xffa447,size:.07,transparent:true,depthWrite:false}));sk.renderOrder=5;E.add(sk);
var pool=[],zq=new T.Vector3(0,0,1);for(k=0;k<6;k++){var m=new T.Mesh(new T.RingGeometry(.02,.027,40),new T.MeshBasicMaterial({color:0xbff4ff,transparent:true,opacity:0,side:T.DoubleSide,depthWrite:false}));m.visible=false;m.renderOrder=4;m.userData.t=0;E.add(m);pool.push(m)}
hit=function(q){var m=pool.filter(function(x){return!x.visible})[0];if(!m)return;var n=CP[q].clone().normalize();m.position.copy(n).multiplyScalar(R*1.01);m.quaternion.setFromUnitVectors(zq,n);m.userData.t=1;m.visible=true};
var ex=extras(L),c0=ll(-52,-13,1),Y0=Math.atan2(-c0.x,c0.z),B0=-13*Math.PI/180,V=new T.Vector3(),CW=new T.Vector3(),last=0,pz=0;
function sm(a,b,x){x=Math.min(Math.max((x-a)/(b-a),0),1);return x*x*(3-2*x)}
proj=function(q){V.copy(CP[q]);E.localToWorld(V);Z.getWorldPosition(CW);var n=V.clone().sub(CW),cd=L.C.position.clone().sub(V);if(n.dot(cd)<.15)return null;V.project(L.C);return[(V.x*.5+.5)*innerWidth,(-V.y*.5+.5)*innerHeight]};
L.tick.push(function(t){var dt=Math.min(t-last,.1),u=(t%32)/32,z=RM?1:sm(0,.28,u)-sm(.62,.9,u),W=RM?0:Math.sin(t*.1)*1.3,g,q;last=t;
Z.scale.setScalar(SC*(1+1.0*z));E.rotation.set(B0+L.m[1]*.15,Y0+(1-z)*W+L.m[0]*.25,0);cl.rotation.y=RM?0:t*.006;stars.rotation.y=RM?0:t*.004;
if(z>.05&&pz<=.05&&window.LXA&&!RM)LXA.sweep();pz=z;
pool.forEach(function(m){if(!m.visible)return;m.userData.t-=dt*.7;if(m.userData.t<=0){m.visible=false;return}m.scale.setScalar(1+(1-m.userData.t)*6);m.material.opacity=m.userData.t*.9});
for(g=0;g<M;g++){su[g]+=sv[g]*dt;if(su[g]>1){su[g]=0;sa[g]=Math.floor(Math.random()*arcs.length)}var pts=arcs[sa[g]],ix=su[g]*28,i0=Math.floor(ix),f=ix-i0,A=pts[i0],C=pts[Math.min(i0+1,28)];
spk[g*3]=A.x+(C.x-A.x)*f;spk[g*3+1]=A.y+(C.y-A.y)*f;spk[g*3+2]=A.z+(C.z-A.z)*f}
sg.attributes.position.needsUpdate=true;ex(t,z,dt);update()})}

function extras(L){
var T=THREE,k,j,O=[],ic=[],F=new T.Group(),G=L.G,tex=[];
function rr(x,a,b,w,h,q){x.beginPath();x.moveTo(a+q,b);x.arcTo(a+w,b,a+w,b+h,q);x.arcTo(a+w,b+h,a,b+h,q);x.arcTo(a,b+h,a,b,q);x.arcTo(a,b,a+w,b,q);x.closePath()}
var I=[
function(x){[34,22,10].forEach(function(r){x.beginPath();x.arc(64,88,r,-2.36,-.78);x.stroke()});x.beginPath();x.arc(64,88,4,0,6.3);x.fill()},
function(x){x.strokeRect(30,38,68,46);x.beginPath();x.moveTo(50,98);x.lineTo(78,98);x.stroke();x.beginPath();x.moveTo(58,50);x.lineTo(58,72);x.lineTo(78,61);x.closePath();x.fill()},
function(x){x.beginPath();x.arc(46,74,12,Math.PI*.5,Math.PI*1.5);x.arc(62,60,16,Math.PI*1.1,Math.PI*1.9);x.arc(84,74,12,Math.PI*1.5,Math.PI*.5);x.closePath();x.stroke()},
function(x){x.beginPath();x.moveTo(64,28);x.lineTo(92,40);x.lineTo(92,66);x.quadraticCurveTo(92,90,64,100);x.quadraticCurveTo(36,90,36,66);x.lineTo(36,40);x.closePath();x.stroke();x.fillRect(55,62,18,15);x.beginPath();x.arc(64,62,6,Math.PI,0);x.stroke()},
function(x){x.beginPath();x.moveTo(30,36);x.lineTo(42,36);x.lineTo(50,76);x.lineTo(90,76);x.lineTo(96,50);x.lineTo(46,50);x.stroke();x.beginPath();x.arc(56,90,5,0,6.3);x.arc(84,90,5,0,6.3);x.fill()},
function(x){x.fillRect(34,76,14,22);x.fillRect(56,60,14,38);x.fillRect(78,42,14,56)},
function(x){[[64,48,11],[38,58,8],[90,58,8]].forEach(function(c){x.beginPath();x.arc(c[0],c[1],c[2],0,6.3);x.stroke()});x.beginPath();x.arc(64,100,26,Math.PI,0);x.stroke()},
function(x){x.strokeRect(28,40,72,50);x.beginPath();x.moveTo(28,40);x.lineTo(64,70);x.lineTo(100,40);x.stroke()},
function(x){x.strokeRect(46,28,36,72);x.beginPath();x.moveTo(58,90);x.lineTo(70,90);x.stroke()},
function(x){x.beginPath();x.arc(64,64,12,0,6.3);x.stroke();x.beginPath();x.arc(64,64,26,0,6.3);x.stroke();for(var a=0;a<8;a++){x.beginPath();x.moveTo(64+Math.cos(a*.785)*26,64+Math.sin(a*.785)*26);x.lineTo(64+Math.cos(a*.785)*36,64+Math.sin(a*.785)*36);x.stroke()}},
function(x){[34,56,78].forEach(function(y){x.strokeRect(34,y,60,16);x.beginPath();x.arc(82,y+8,2.5,0,6.3);x.fill()})},
function(x){x.beginPath();x.arc(64,64,32,0,6.3);x.stroke();x.beginPath();x.ellipse(64,64,14,32,0,0,6.3);x.stroke();x.beginPath();x.moveTo(32,64);x.lineTo(96,64);x.stroke()},
function(x){x.beginPath();x.moveTo(30,42);x.lineTo(30,92);x.lineTo(98,92);x.lineTo(98,52);x.lineTo(68,52);x.lineTo(60,42);x.closePath();x.stroke()}];
I.forEach(function(fn){var c=document.createElement("canvas");c.width=c.height=128;var x=c.getContext("2d");x.fillStyle="rgba(60,140,255,.25)";rr(x,8,8,112,112,22);x.fill();x.strokeStyle="rgba(160,225,255,.95)";x.lineWidth=3;x.stroke();
x.strokeStyle=x.fillStyle="#fff";x.lineWidth=6;x.lineCap=x.lineJoin="round";fn(x);tex.push(new T.CanvasTexture(c))});
var cfg=[{r:3.1,rot:[1.15,0,.35],sp:.18},{r:3.7,rot:[.45,.95,0],sp:-.14},{r:4.3,rot:[1.6,-.6,.2],sp:.11}],per=mob?[3,3,2]:[5,4,4],idx=0;
cfg.forEach(function(c,ci){var g=new T.Group(),pv=new T.Group(),pts=[];g.rotation.set(c.rot[0],c.rot[1],c.rot[2]);
for(j=0;j<=128;j++){var a=j/128*Math.PI*2;pts.push(new T.Vector3(Math.cos(a)*c.r,Math.sin(a)*c.r,0))}
var ln=new T.Line(new T.BufferGeometry().setFromPoints(pts),new T.LineBasicMaterial({color:ci===1?0xff9a3c:0x4fd8ff,transparent:true,opacity:.55,depthWrite:false}));g.add(ln,pv);
for(j=0;j<per[ci];j++){var a2=j/per[ci]*Math.PI*2+ci,sp=new T.Sprite(new T.SpriteMaterial({map:tex[idx++%tex.length],transparent:true,depthWrite:false,opacity:.95}));sp.scale.setScalar(mob?.5:.62);sp.position.set(Math.cos(a2)*c.r,Math.sin(a2)*c.r,0);sp.renderOrder=6;pv.add(sp);ic.push(sp)}
G.add(g);O.push({g:g,pv:pv,sp:c.sp,ln:ln})});
[[3.3,0xff9a3c,.7],[2.9,0x22d3ee,.55],[2.5,0xff9a3c,.4],[3.8,0x22d3ee,.3]].forEach(function(a){var m=new T.Mesh(new T.RingGeometry(a[0],a[0]*1.014,128),new T.MeshBasicMaterial({color:a[1],transparent:true,opacity:a[2],side:T.DoubleSide,depthWrite:false}));m.rotation.x=-Math.PI/2;F.add(m)});F.position.y=-3;G.add(F);
var N=mob?40:90,p=new Float32Array(N*3),v=[];for(k=0;k<N;k++){p.set([(Math.random()-.5)*20,(Math.random()-.5)*10,-2-Math.random()*6],k*3);v.push((.15+Math.random()*.5)*(Math.random()<.5?-1:1))}
var gg=new T.BufferGeometry();gg.setAttribute("position",new T.BufferAttribute(p,3));G.add(new T.Points(gg,new T.PointsMaterial({color:0xffa447,size:.1,transparent:true,opacity:.9,depthWrite:false,blending:T.AdditiveBlending})));
return function(t,z,dt){var f=1-.85*z,q;
O.forEach(function(o){o.pv.rotation.z=RM?0:t*o.sp;o.g.scale.setScalar(.85+.2*z);o.ln.material.opacity=.55*f});
ic.forEach(function(s){s.material.opacity=.95*f});
F.children.forEach(function(m,i){m.scale.setScalar(1+(RM?0:.03*Math.sin(t*1.5+i)))});
if(!RM){for(q=0;q<N;q++){p[q*3]+=v[q]*dt;if(p[q*3]>10)p[q*3]=-10;if(p[q*3]<-10)p[q*3]=10}gg.attributes.position.needsUpdate=true}}}

function map2d(){
var cv=d.createElement("canvas");cv.id="br-2d";cv.setAttribute("aria-hidden","true");d.getElementById("bg").after(cv);
var x=cv.getContext("2d"),W,Hh,sc,cx,cy;
function fit(){W=cv.width=innerWidth;Hh=cv.height=innerHeight;var m=W<720;sc=Math.min(m?W*.85:W*.4,Hh*.6)/5;cx=m?W/2:W*.7;cy=m?Hh*.3:Hh*.45;draw()}
function draw(){x.clearRect(0,0,W,Hh);S.forEach(function(st,si){st.r.forEach(function(r){x.beginPath();for(var j=0;j<r.length;j+=2){var X=cx+r[j]*sc,Y=cy-r[j+1]*sc;j?x.lineTo(X,Y):x.moveTo(X,Y)}x.closePath();x.fillStyle=si%2?"rgba(37,99,235,.22)":"rgba(67,56,202,.22)";x.fill();x.strokeStyle="rgba(79,216,255,.7)";x.lineWidth=.8;x.stroke()})});
S.forEach(function(st,i){x.fillStyle=i%2?"#8b5cf6":"#3b82f6";x.beginPath();x.arc(cx+st.c[0]*sc,cy-st.c[1]*sc,2.6,0,6.3);x.fill()})}
fit();addEventListener("resize",fit);
proj=function(i){return[cx+S[i].c[0]*sc,cy-S[i].c[1]*sc]};setInterval(update,100)}

if(window.LX)globe3d(window.LX);else map2d();
})();
