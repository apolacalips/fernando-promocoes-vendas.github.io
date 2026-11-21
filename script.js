var WA="5561981261223",$=function(s){return document.querySelector(s)};
/* TUTORIAIS EM VÍDEO: troque o link (u) de cada aplicativo. O botão "Ver tutorial" só aparece se houver link; o "Teste grátis" aparece sempre. */
var TUT=[
{n:"RX Purple",u:"https://www.youtube.com/watch?v=tfy7EU5MeS8"},
{n:"Zuxo Player",u:"https://www.youtube.com/watch?v=cEZ9YvORRvo"},
{n:"IBO Smarters",u:"https://vt.tiktok.com/ZSpGSjce5/"},
{n:"XC IPTV",u:"https://youtube.com/shorts/qsPYLZe1lpg"}
];
function tutHtml(){return'<div class="tut"><b>Teste grátis e tutorial de cada aplicativo</b><p>Escolha o aplicativo, assista ao tutorial de instalação e peça seu teste grátis pelo WhatsApp.</p><div class="tcs">'+TUT.map(function(t){var ok=/^https?:\/\//.test(t.u),msg="Olá! Quero fazer o teste grátis da TV online com o aplicativo "+t.n+". Pode me enviar meu acesso de teste?";return'<div class="tc"><b>'+esc(t.n)+'</b>'+(ok?'<a class="tv" target="_blank" rel="noopener" href="'+esc(t.u)+'">▶ Ver tutorial</a>':'')+'<a class="tg" target="_blank" rel="noopener" href="https://wa.me/'+WA+'?text='+encodeURIComponent(msg)+'">🎁 Teste grátis '+esc(t.n)+'</a></div>'}).join("")+'</div></div>'}
function ld(k,f){try{return JSON.parse(localStorage.getItem(k))||f}catch(e){return f}}
function sv(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function $$(v){return"R$ "+Number(v).toFixed(2).replace(".",",")}
var base=[
{id:"i1",n:"Internet Fibra Óptica",p:0,c:"Internet",d:"Confirme a viabilidade no seu endereço e a aprovação do cadastro para conferir as ofertas disponíveis."},



{id:"t1",n:"TV Online Mensal",p:29.99,c:"TV",d:"Canais, filmes e séries por 1 mês."},
{id:"t2",n:"TV Online Trimestral",p:74.99,c:"TV",d:"Canais, filmes e séries por 3 meses."},
{id:"t3",n:"TV Online Semestral",p:179.99,c:"TV",d:"Canais, filmes e séries por 6 meses."},
{id:"t4",n:"TV Online Anual",p:299.99,c:"TV",d:"Canais, filmes e séries por 12 meses."},





];
var titles={Internet:"Internet Fibra Óptica",TV:"TV Online",Combos:"Combos Internet + TV",Loja:"Loja"};
var subs={Internet:"Fibra óptica com Wi-Fi incluso.",TV:"Canais, filmes, séries e streams.",Combos:"Contrate junto e peça condições especiais.",Loja:"Equipamentos e acessórios."};
var custom=[],cart=ld("fpv_k",{}),cup=0,ref="",d={},st=0;
try{localStorage.removeItem("fpv_pin");localStorage.removeItem("fpv_c")}catch(e){}
function all(){return base.concat(custom)}
function find(id){return all().filter(function(x){return x.id===id})[0]}
function render(){var cs=[];all().forEach(function(x){if(cs.indexOf(x.c)<0)cs.push(x.c)});
$("#secs").innerHTML=cs.map(function(c,i){var id=c.toLowerCase().replace(/\W/g,"")||"x"+i;
return'<section id="'+esc(id)+'"'+(i%2?' class="alt-bg"':"")+'><div><h2>'+esc(titles[c]||c)+'</h2><p class="sub">'+esc(subs[c]||"Veja as opções disponíveis.")+'</p>'+(c==="TV"?'<div class="free"><b>TV online: venha fazer teste grátis!</b><span>Confira canais, filmes e séries antes de assinar.</span><a class="btn" target="_blank" rel="noopener" href="https://wa.me/'+WA+'?text='+encodeURIComponent("Olá! Quero fazer o teste grátis da TV online.")+'">Quero meu teste grátis</a></div><div class="apps"><b>Como fazer o teste grátis</b><p>Baixe e instale um destes aplicativos (toque para abrir o site de download) e peça seu acesso de teste pelo WhatsApp.</p><div class="chips"><a target="_blank" rel="noopener" href="https://rxpurple.com/app/">Baixar RX Purple</a><a target="_blank" rel="noopener" href="https://zuxoplayer.com/?lang=pt#devices">Baixar Zuxo Player</a><a target="_blank" rel="noopener" href="https://ibosmarters.com/#downloads">Baixar IBO Smarters</a><a target=\"_blank\" rel=\"noopener\" href=\"https://play.google.com/store/apps/details?id=com.nathnetwork.xciptv&hl=pt_BR&pli=1\">Baixar XC IPTV</a></div><p><small>Compatível com Smart TV Samsung (Tizen), Roku TV, Android TV, TV Box, celular e tablet Android, Windows, PC e notebook.</small></p>'+tutHtml()+'<div class="form"><select id="ta"><option>RX Purple</option><option>Zuxo Player</option><option>IBO Smarters</option><option>XC IPTV</option></select><select id="td"><option value="">Seu aparelho</option><option>Smart TV Samsung (Tizen)</option><option>Roku TV</option><option>Smart TV Android</option><option>TV Box</option><option>Celular Android</option><option>Tablet</option><option>Windows / PC / Notebook</option></select><button id="tb">Instalar APK e pedir teste grátis</button></div></div>':"")+'<div class="grid">'+all().filter(function(x){return x.c===c}).map(function(x){
return'<div class="card"><h3>'+esc(x.n)+'</h3><p>'+esc(x.d||"")+'</p>'+(c==="TV"?'<b>'+$$(x.p)+'</b>':"")+(c==="Internet"?'<a class="btn" href="#viabilidade">Consultar viabilidade e ofertas</a>':'<button data-add="'+esc(x.id)+'">'+(c==="TV"?"Quero assinar":c==="Loja"?"Adicionar ao pedido":"Quero contratar")+'</button>')+'<a class="ql" target="_blank" rel="noopener" href="https://wa.me/'+WA+'?text='+encodeURIComponent((c==="TV"?"Olá! Quero fazer o teste grátis da TV online: ":"Olá! Quero contratar: ")+x.n)+'">'+(c==="TV"?"Teste grátis no WhatsApp":"Pedir direto no WhatsApp")+'</a></div>'}).join("")+'</div></div></section>'}).join("")}
function sub(){return Object.keys(cart).reduce(function(s,k){var x=find(k);return s+(x?x.p*cart[k]:0)},0)}
function tot(){return sub()*(1-cup)}
function drawCart(){var ks=Object.keys(cart).filter(function(k){return find(k)});
$("#cn").textContent=ks.reduce(function(s,k){return s+cart[k]},0);sv("fpv_k",cart);
$("#cart").innerHTML='<div class="tot"><span>Seu carrinho</span><button class="alt" data-x="c">Fechar</button></div>'+(ks.length?ks.map(function(k){var x=find(k);
return'<div class="it"><span>'+esc(x.n)+'</span><button data-q="'+k+'|-1">−</button><b>'+cart[k]+'</b><button data-q="'+k+'|1">+</button><button class="alt" data-q="'+k+'|0" aria-label="Remover">✕</button></div>'}).join("")+
'<p class="sub">Pagamento por Pix. Seu acesso é liberado após a confirmação do comprovante.</p><button data-go="1">Enviar pedido</button>':'<p>Seu carrinho está vazio. Escolha um plano ou produto.</p>')}
function add(id){cart[id]=(cart[id]||0)+1;drawCart();$("#dc").classList.add("on")}
function field(i,p,t){return'<input maxlength="120" id="'+i+'" placeholder="'+p+'" value="'+esc(d[i]||"")+'"'+(t?' inputmode="'+t+'"':"")+'>'}
/* DADOS DO PIX: a chave é o telefone. Troque a cidade (PIXCITY) pela cidade da sua conta Mercado Pago, sem acento e com até 15 letras. */
var PIX="61981261223",PIXV="61 98126-1223",PIXNAME="FERNANDO",PIXCITY="BRASILIA",ord="",lastMsg="";
function crc16(t){var c=0xFFFF,i,j;for(i=0;i<t.length;i++){c^=t.charCodeAt(i)<<8;for(j=0;j<8;j++)c=(c&0x8000)?((c<<1)^0x1021)&0xFFFF:(c<<1)&0xFFFF}return c.toString(16).toUpperCase().padStart(4,"0")}
function tl(id,v){return id+String(v.length).padStart(2,"0")+v}
function pixPayload(v){var p=tl("00","01")+tl("01","11")+tl("26",tl("00","br.gov.bcb.pix")+tl("01","+55"+PIX))+tl("52","0000")+tl("53","986")+(v>0?tl("54",(Math.round(v*100)/100).toFixed(2)):"")+tl("58","BR")+tl("59",PIXNAME)+tl("60",PIXCITY)+tl("62",tl("05","***"))+"6304";return p+crc16(p)}
function qrSvg(txt){var q=qrcode(0,"M");q.addData(txt);q.make();var n=q.getModuleCount(),m=4,z=n+m*2,pth="",r,c;for(r=0;r<n;r++)for(c=0;c<n;c++)if(q.isDark(r,c))pth+="M"+(c+m)+" "+(r+m)+"h1v1h-1z";return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+z+' '+z+'" role="img" aria-label="QR Code Pix" shape-rendering="crispEdges"><rect width="'+z+'" height="'+z+'" fill="#fff"/><path d="'+pth+'" fill="#000"/></svg>'}
function rd(){["nome","tel","email"].forEach(function(k){var e=$("#"+k);if(e)d[k]=e.value.trim()})}
function items(){return Object.keys(cart).filter(function(k){return find(k)})}
function orderMsg(proof){var ks=items();return(proof?"*Comprovante de pagamento Pix - Pedido "+ord+"*":"*Pedido "+ord+" (TV online)*")+"\n"+ks.map(function(k){return"- "+cart[k]+"x "+find(k).n}).join("\n")+"\nValor: "+$$(sub())+"\nPagamento: Pix (Mercado Pago - Fernando)"+(proof?"\nSegue o comprovante em anexo para confirmação.":"\nVou enviar o comprovante em seguida.")+"\nCliente: "+d.nome+" | "+d.tel+(d.email?"\nE-mail: "+d.email:"")+(ref?"\nIndicado por: "+ref:"")}
function step(){var h="",nav="";
if(st===0){h='<h2>1. Seus dados</h2>'+field("nome","Nome completo")+field("tel","WhatsApp com DDD","tel")+field("email","E-mail (opcional)","email")+'<p class="sub">Usamos estes dados só para liberar seu acesso de TV online depois da confirmação do pagamento.</p>';nav='<button class="alt" data-x="m">Cancelar</button><button data-nx="1">Continuar</button>'}
if(st===1){if(!ord)ord="FPV"+String(Date.now()).slice(-6);
var pp="",qs="";try{pp=pixPayload(sub());qs=qrSvg(pp)}catch(er){pp="";qs=""}
h='<h2>2. Pagamento via Pix</h2><p>Pedido <b>'+ord+'</b> · Total <b>'+$$(sub())+'</b></p><div class="pixbox">'+(qs?'<div class="qr"><div class="qrimg">'+qs+'</div><small>Abra o app do seu banco, escolha Pix e leia o QR Code. O valor já vem preenchido.</small></div>':'')+(pp?'<div><small>Ou use o Pix Copia e Cola</small><button data-cl="'+esc(pp)+'">Copiar código Pix</button></div>':'')+'<div><small>Chave Pix (telefone)</small><b>'+PIXV+'</b><button data-cl="'+PIX+'">Copiar chave</button></div><div><small>Recebedor</small><b>Fernando</b><span>Mercado Pago</span></div></div><ol><li>Pague pelo QR Code, pelo Copia e Cola ou pela chave. Confira se o nome é <b>Fernando</b>.</li><li>Se pagar pela chave, digite o valor do pedido: <b>'+$$(sub())+'</b>.</li><li>Anexe abaixo a foto ou o PDF do comprovante e envie.</li></ol><label for="cmp"><b>Comprovante de pagamento</b> (foto ou PDF)</label><input type="file" id="cmp" accept="image/*,application/pdf"><p class="sub">Ao tocar em enviar, escolha o <b>WhatsApp</b> e o contato <b>(61) 98126-1223</b>. Seu acesso é liberado depois que conferirmos o pagamento.</p><div class="pf"><button data-pf="1">Enviar comprovante pelo WhatsApp</button><button class="alt" data-ps="1">Enviar pedido agora, comprovante depois</button></div>';
nav='<button class="alt" data-nx="-1">Voltar</button>'}
$("#md").innerHTML=h+'<div class="row" style="display:flex;gap:8px;margin-top:12px">'+nav+'</div>'}
function finish(mode){var n=ord,msg={shared:"Comprovante enviado! Assim que confirmarmos o pagamento, liberamos seu acesso de TV online pelo WhatsApp.",wa:"Abrimos o WhatsApp com o seu pedido. Toque no clipe 📎, anexe a foto ou o PDF do comprovante e envie a mensagem.",order:"Abrimos o WhatsApp com o seu pedido. Quando pagar, envie o comprovante na mesma conversa."}[mode];
$("#md").innerHTML='<h2>Pedido '+n+' registrado!</h2><p>'+msg+'</p><p><a class="btn" target="_blank" rel="noopener" href="https://wa.me/'+WA+'?text='+encodeURIComponent(lastMsg)+'">Abrir WhatsApp novamente</a></p><button class="alt" data-x="m">Fechar</button>';cart={};cup=0;ord="";drawCart()}
function sendProof(){var inp=$("#cmp"),f=inp&&inp.files&&inp.files[0];
if(!f){alert("Selecione a foto ou o PDF do comprovante.");return}
if(!/^(image\/|application\/pdf)/.test(f.type)){alert("Envie uma imagem ou um PDF.");return}
if(f.size>10*1024*1024){alert("Arquivo muito grande (máximo 10 MB).");return}
lastMsg=orderMsg(true);
var wa=function(){window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(lastMsg),"_blank");finish("wa")};
if(navigator.canShare&&navigator.share&&navigator.canShare({files:[f]})){navigator.share({files:[f],text:lastMsg}).then(function(){finish("shared")}).catch(function(er){if(er&&er.name!=="AbortError")wa()})}else wa()}
function sendOrder(){lastMsg=orderMsg(false);window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(lastMsg),"_blank");finish("order")}
document.addEventListener("click",function(e){var t=e.target.closest("button,a");if(!t)return;var a;
if(t.id==="bc"){drawCart();$("#dc").classList.add("on")}
else if(t.id==="rg"){var n=$("#rn").value.trim(),f=$("#rt").value.replace(/\D/g,"");if(n.length<2||f.length<8){$("#rr").innerHTML='<div class="res">Informe seu nome e WhatsApp com DDD.</div>';return}
var c=(n.replace(/\W/g,"").slice(0,4)+f.slice(-4)).toUpperCase(),l=location.href.split("#")[0]+"#ind-"+c;
$("#rr").innerHTML='<div class="res">Seu código: <b>'+c+'</b><br>Seu link: '+esc(l)+'<br><br><button data-cl="'+esc(l)+'">Copiar link</button> <a class="btn alt" target="_blank" rel="noopener" href="https://wa.me/?text='+encodeURIComponent("Contrate internet fibra óptica + TV online na fernando.promocoes.vendas com meu link e ganhe condições especiais! "+l)+'">Compartilhar no WhatsApp</a></div>';
window.open("https://wa.me/"+WA+"?text="+encodeURIComponent("Olá! Sou "+n+" ("+f+") e gerei meu código de indicação "+c),"_blank")}
else if((a=t.dataset.add))add(a);
else if((a=t.dataset.q)){a=a.split("|");var q=+a[1];if(q===0||(cart[a[0]]||0)+q<=0)delete cart[a[0]];else cart[a[0]]+=q;drawCart()}
else if(t.dataset.go){$("#dc").classList.remove("on");st=0;ord="";step();$("#dm").classList.add("on")}
else if((a=t.dataset.nx)){rd();if(+a>0&&st===0){if(!d.nome||d.nome.length<2||(d.tel||"").replace(/\D/g,"").length<10){alert("Preencha seu nome e WhatsApp com DDD.");return}}st=Math.max(0,Math.min(1,st+(+a)));step()}
else if(t.dataset.pf){rd();sendProof()}
else if(t.dataset.ps){rd();sendOrder()}
else if((a=t.dataset.x)){$(a==="c"?"#dc":"#dm").classList.remove("on")}
else if((a=t.dataset.cl)){try{navigator.clipboard.writeText(a);t.textContent="Copiado ✓"}catch(er){t.textContent="Copie manualmente"}}});
["dc","dm"].forEach(function(i){$("#"+i).addEventListener("click",function(e){if(e.target.id===i)e.target.classList.remove("on")})});
var m=location.hash.match(/^#ind-(\w+)/);if(m){ref=m[1];try{sessionStorage.setItem("fpv_r",ref)}catch(e){}$("#rc").textContent="Você chegou pela indicação "+ref+". Ela será registrada no seu pedido."}else{try{ref=sessionStorage.getItem("fpv_r")||""}catch(e){}}
render();drawCart();
["#vn","#vt","#vc","#vp","#rn","#rt"].forEach(function(q){var e=$(q);if(e)e.maxLength=100});
document.addEventListener("click",function(e){if(!e.target.closest("#tb"))return;var a=$("#ta").value,v=$("#td").value;if(!v){alert("Escolha o seu aparelho.");return}window.open("https://wa.me/"+WA+"?text="+encodeURIComponent("Olá! Quero instalar o aplicativo "+a+" no meu aparelho ("+v+") e fazer o teste grátis da TV online. Pode me enviar o APK ou o link de instalação?"),"_blank")});
$("#vb").onclick=function(){var n=$("#vn").value.trim(),t=$("#vt").value.replace(/\D/g,""),e=$("#ve").value,c=$("#vc").value.trim();if(n.length<2||t.length<8||!e||!c){$("#vr").innerHTML='<div class="res">Preencha nome, WhatsApp, estado e cidade.</div>';return}var m="Olá! Quero confirmar a viabilidade e a aprovação.\nNome: "+n+"\nWhatsApp: "+t+"\nEstado: "+e+"\nCidade/bairro: "+c+"\nCEP: "+($("#vp").value||"-");$("#vr").innerHTML='<div class="res">Tudo certo! Toque abaixo para enviar sua consulta. Respondemos pelo WhatsApp.<br><br><a class="btn" target="_blank" rel="noopener" href="https://wa.me/'+WA+'?text='+encodeURIComponent(m)+'">Enviar consulta no WhatsApp</a></div>'};
var U=location.href.split("#")[0];$("#lu").textContent=U.replace(/^https?:\/\//,"");$("#lw").href="https://wa.me/?text="+encodeURIComponent("fernando.promocoes.vendas - internet fibra óptica e TV online: "+U);

/* ===== SOM NOS CLIQUES + EFEITO RIPPLE (botão 🔊 no canto inferior esquerdo liga/desliga o som) ===== */
(function(){
var ctx=null,on=true;
try{on=localStorage.getItem("fpv_som")!=="0"}catch(e){}
function beep(){
if(!on)return;
try{
var AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
ctx=ctx||new AC();if(ctx.state==="suspended")ctx.resume();
var t=ctx.currentTime,o=ctx.createOscillator(),g=ctx.createGain();
o.type="sine";o.frequency.setValueAtTime(760,t);o.frequency.exponentialRampToValueAtTime(1240,t+.07);
g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.12,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+.14);
o.connect(g);g.connect(ctx.destination);o.start(t);o.stop(t+.15)
}catch(e){}
}
function ripple(el,e){
if(window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches)return;
var r=el.getBoundingClientRect(),s=Math.max(r.width,r.height),sp=document.createElement("span");
sp.className="rp";sp.style.width=sp.style.height=s+"px";
sp.style.left=((e.clientX||r.left+r.width/2)-r.left-s/2)+"px";
sp.style.top=((e.clientY||r.top+r.height/2)-r.top-s/2)+"px";
el.appendChild(sp);setTimeout(function(){sp.remove()},650)
}
var sb=document.createElement("button");
sb.id="sm";sb.className="snd";sb.type="button";
function paint(){sb.textContent=on?"🔊":"🔇";sb.setAttribute("aria-label",on?"Desligar som dos cliques":"Ligar som dos cliques");sb.title=sb.getAttribute("aria-label")}
paint();document.body.appendChild(sb);
document.addEventListener("click",function(e){
var t=e.target.closest&&e.target.closest("button,.btn,.chips a,.tc a,.ql,summary,header nav a");
if(!t)return;
if(t.id==="sm"){on=!on;try{localStorage.setItem("fpv_som",on?"1":"0")}catch(er){}paint()}
beep();
if(t.tagName!=="SUMMARY"&&!t.matches("header nav a"))ripple(t,e)
},true);
})();
