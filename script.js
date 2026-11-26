var WA="5561981261223",$=function(s){return document.querySelector(s)};
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
var custom=ld("fpv_c",[]),cart=ld("fpv_k",{}),cup=0,ref="",d={},st=0;
function all(){return base.concat(custom)}
function find(id){return all().filter(function(x){return x.id===id})[0]}
function render(){var cs=[];all().forEach(function(x){if(cs.indexOf(x.c)<0)cs.push(x.c)});
$("#secs").innerHTML=cs.map(function(c,i){var id=c.toLowerCase().replace(/\W/g,"")||"x"+i;
return'<section id="'+esc(id)+'"'+(i%2?' class="alt-bg"':"")+'><div><h2>'+esc(titles[c]||c)+'</h2><p class="sub">'+esc(subs[c]||"Veja as opções disponíveis.")+'</p>'+(c==="TV"?'<div class="free"><b>TV online: venha fazer teste grátis!</b><span>Confira canais, filmes e séries antes de assinar.</span><a class="btn" target="_blank" rel="noopener" href="https://wa.me/'+WA+'?text='+encodeURIComponent("Olá! Quero fazer o teste grátis da TV online.")+'">Quero meu teste grátis</a></div><div class="apps"><b>Como fazer o teste grátis</b><p>Baixe e instale um destes aplicativos (toque para abrir o site de download) e peça seu acesso de teste pelo WhatsApp.</p><div class="chips"><a target="_blank" rel="noopener" href="https://rxpurple.com/app/">Baixar RX Purple</a><a target="_blank" rel="noopener" href="https://zuxoplayer.com/?lang=pt#devices">Baixar Zuxo Player</a><a target="_blank" rel="noopener" href="https://ibosmarters.com/#downloads">Baixar IBO Smarters</a><a target="_blank" rel="noopener" href="https://play.google.com/store/apps/details?id=com.nathnetwork.xciptv&hl=pt_BR&pli=1">Baixar XC IPTV</a></div><p><small>Compatível com Smart TV Samsung (Tizen), Roku TV, Android TV, TV Box, celular e tablet Android, Windows, PC e notebook.</small></p><div class="tut" id="tutoriais"><h3>📲 Tutoriais de instalação</h3><p>Escolha o aplicativo e assista ao passo a passo. Depois é só pedir seu teste grátis pelo WhatsApp.</p><div class="tvl" id="tvtabs"></div><div id="tvbox"></div></div><div class="form"><select id="ta"><option>RX Purple</option><option>Zuxo Player</option><option>IBO Smarters</option><option>XC IPTV</option></select><select id="td"><option value="">Seu aparelho</option><option>Smart TV Samsung (Tizen)</option><option>Roku TV</option><option>Smart TV Android</option><option>TV Box</option><option>Celular Android</option><option>Tablet</option><option>Windows / PC / Notebook</option></select><button id="tb">Instalar APK e pedir teste grátis</button></div></div>':"")+'<div class="grid">'+all().filter(function(x){return x.c===c}).map(function(x){
return'<div class="card"><h3>'+esc(x.n)+'</h3><p>'+esc(x.d||"")+'</p>'+(c==="TV"?'<b>'+$$(x.p)+'</b>':"")+(c==="Internet"?'<a class="btn" href="#viabilidade">Consultar viabilidade e ofertas</a>':'<button data-add="'+esc(x.id)+'">'+(c==="TV"?"Quero assinar":c==="Loja"?"Adicionar ao pedido":"Quero contratar")+'</button>')+'<a class="ql" target="_blank" rel="noopener" href="https://wa.me/'+WA+'?text='+encodeURIComponent((c==="TV"?"Olá! Quero fazer o teste grátis da TV online: ":"Olá! Quero contratar: ")+x.n)+'">'+(c==="TV"?"Teste grátis no WhatsApp":"Pedir direto no WhatsApp")+'</a></div>'}).join("")+'</div></div></section>'}).join("")}
function sub(){return Object.keys(cart).reduce(function(s,k){var x=find(k);return s+(x?x.p*cart[k]:0)},0)}
function tot(){return sub()*(1-cup)}
function drawCart(){var ks=Object.keys(cart).filter(function(k){return find(k)});
$("#cn").textContent=ks.reduce(function(s,k){return s+cart[k]},0);sv("fpv_k",cart);
$("#cart").innerHTML='<div class="tot"><span>Seu carrinho</span><button class="alt" data-x="c">Fechar</button></div>'+(ks.length?ks.map(function(k){var x=find(k);
return'<div class="it"><span>'+esc(x.n)+'</span><button data-q="'+k+'|-1">−</button><b>'+cart[k]+'</b><button data-q="'+k+'|1">+</button><button class="alt" data-q="'+k+'|0" aria-label="Remover">✕</button></div>'}).join("")+
'<p class="sub">Sujeito à confirmação de viabilidade e aprovação.</p><button data-go="1">Enviar pedido</button>':'<p>Seu carrinho está vazio. Escolha um plano ou produto.</p>')}
function add(id){cart[id]=(cart[id]||0)+1;drawCart();$("#dc").classList.add("on")}
function field(i,p,t){return'<input id="'+i+'" placeholder="'+p+'" value="'+esc(d[i]||"")+'"'+(t?' inputmode="'+t+'"':"")+'>'}
function rd(){["nome","cpf","tel","email","cep","rua","num","comp","cidade"].forEach(function(k){var e=$("#"+k);if(e)d[k]=e.value});var r=document.querySelector("input[name=pg]:checked");if(r)d.pg=r.value}
function step(){var h="";
if(st===0)h='<h2>1. Seus dados</h2>'+field("nome","Nome completo")+field("cpf","CPF","numeric")+field("tel","WhatsApp com DDD","tel")+field("email","E-mail","email");
if(st===1)h='<h2>2. Endereço</h2>'+field("cep","CEP","numeric")+field("rua","Rua e bairro")+field("num","Número","numeric")+field("comp","Complemento")+field("cidade","Cidade");
if(st===2)h='<h2>3. Pagamento</h2><div class="pay">'+["Pix","Cartão de crédito","Boleto"].map(function(x){return'<label><input type="radio" name="pg" value="'+x+'"'+((d.pg||"Pix")===x?" checked":"")+'>'+x+'</label>'}).join("")+'</div><p class="sub">Ao enviar, seu pedido vai para o nosso WhatsApp. Confirmamos a viabilidade técnica no seu endereço e a aprovação do cadastro antes da instalação.</p>';
$("#md").innerHTML=h+'<div class="row" style="display:flex;gap:8px;margin-top:12px">'+(st?'<button class="alt" data-nx="-1">Voltar</button>':'<button class="alt" data-x="m">Cancelar</button>')+'<button data-nx="1">'+(st===2?"Enviar pedido":"Continuar")+'</button></div>'}
function done(){var n="FPV"+String(Date.now()).slice(-6),ks=Object.keys(cart).filter(function(k){return find(k)});
var m="*Pedido "+n+"*\n"+ks.map(function(k){return"- "+cart[k]+"x "+find(k).n}).join("\n")+"\nSolicito confirmar viabilidade e aprovação."+"\nCliente: "+d.nome+" | "+d.tel+"\nCPF: "+(d.cpf||"-")+"\nEndereço: "+(d.rua||"-")+", "+(d.num||"s/n")+" "+(d.comp||"")+" - "+(d.cidade||"")+" CEP "+(d.cep||"-")+"\nPagamento: "+(d.pg||"Pix")+(ref?"\nIndicado por: "+ref:"");
$("#md").innerHTML='<h2>Pedido recebido!</h2><p>Número do pedido: <b>'+n+'</b></p><p>Toque no botão para enviar o resumo ao nosso WhatsApp e confirmar a viabilidade, a aprovação e a instalação.</p><a class="btn" target="_blank" rel="noopener" href="https://wa.me/'+WA+'?text='+encodeURIComponent(m)+'">Enviar pedido no WhatsApp</a> <button class="alt" data-x="m">Fechar</button>';cart={};cup=0;drawCart()}
function admin(){var p=null;try{p=localStorage.getItem("fpv_pin")}catch(e){}
if(!p){p=prompt("Crie um PIN de administrador:");if(!p)return;try{localStorage.setItem("fpv_pin",p)}catch(e){}}else if(prompt("PIN de administrador:")!==p)return;
$("#md").innerHTML='<h2>Painel do administrador</h2><p class="sub">Adicione produtos. Ficam salvos neste navegador.</p><div class="form"><input id="an" placeholder="Nome do produto"><input id="ac" placeholder="Categoria (ex.: Loja, Roteadores)"><input id="ad2" placeholder="Descrição"><button data-ap="1">Adicionar produto</button></div>'+custom.map(function(x,i){return'<div class="it"><span>'+esc(x.n)+'</span><button class="alt" data-del="'+i+'">Excluir</button></div>'}).join("")+'<br><button class="alt" data-x="m">Fechar</button>';$("#dm").classList.add("on")}
document.addEventListener("click",function(e){var t=e.target.closest("button,a");if(!t)return;var a;
if(t.id==="bc"){drawCart();$("#dc").classList.add("on")}
else if(t.id==="ad"){e.preventDefault();admin()}
else if(t.id==="rg"){var n=$("#rn").value.trim(),f=$("#rt").value.replace(/\D/g,"");if(n.length<2||f.length<8){$("#rr").innerHTML='<div class="res">Informe seu nome e WhatsApp com DDD.</div>';return}
var c=(n.replace(/\W/g,"").slice(0,4)+f.slice(-4)).toUpperCase(),l=location.href.split("#")[0]+"#ind-"+c;
$("#rr").innerHTML='<div class="res">Seu código: <b>'+c+'</b><br>Seu link: '+esc(l)+'<br><br><button data-cl="'+esc(l)+'">Copiar link</button> <a class="btn alt" target="_blank" rel="noopener" href="https://wa.me/?text='+encodeURIComponent("Contrate internet fibra óptica + TV online na fernando.promocoes.vendas com meu link e ganhe condições especiais! "+l)+'">Compartilhar no WhatsApp</a></div>';
window.open("https://wa.me/"+WA+"?text="+encodeURIComponent("Olá! Sou "+n+" ("+f+") e gerei meu código de indicação "+c),"_blank")}
else if((a=t.dataset.add))add(a);
else if((a=t.dataset.q)){a=a.split("|");var q=+a[1];if(q===0||(cart[a[0]]||0)+q<=0)delete cart[a[0]];else cart[a[0]]+=q;drawCart()}
else if(t.dataset.cp){var v=($("#cp").value||"").trim().toUpperCase();cup=v==="PROMO10"?.1:v==="FIBRA5"?.05:0;drawCart();if(!cup)alert("Cupom inválido.")}
else if(t.dataset.go){$("#dc").classList.remove("on");st=0;step();$("#dm").classList.add("on")}
else if((a=t.dataset.nx)){rd();if(+a>0&&st===0&&(!d.nome||!d.tel)){alert("Preencha nome e WhatsApp.");return}if(+a>0&&st===2)done();else{st+=+a;step()}}
else if((a=t.dataset.x)){$(a==="c"?"#dc":"#dm").classList.remove("on")}
else if((a=t.dataset.cl)){try{navigator.clipboard.writeText(a);t.textContent="Link copiado"}catch(er){t.textContent="Copie o link acima"}}
else if(t.dataset.ap){var nn=$("#an").value.trim(),pp=0;if(!nn){alert("Informe o nome do produto.");return}
custom.push({id:"x"+Date.now(),n:nn,p:pp,c:$("#ac").value.trim()||"Loja",d:$("#ad2").value.trim()});sv("fpv_c",custom);render();admin()}
else if(t.dataset.del){custom.splice(+t.dataset.del,1);sv("fpv_c",custom);render();admin()}});
["dc","dm"].forEach(function(i){$("#"+i).addEventListener("click",function(e){if(e.target.id===i)e.target.classList.remove("on")})});
var m=location.hash.match(/^#ind-(\w+)/);if(m){ref=m[1];try{sessionStorage.setItem("fpv_r",ref)}catch(e){}$("#rc").textContent="Você chegou pela indicação "+ref+". Ela será registrada no seu pedido."}else{try{ref=sessionStorage.getItem("fpv_r")||""}catch(e){}}
render();drawCart();
document.addEventListener("click",function(e){if(!e.target.closest("#tb"))return;var a=$("#ta").value,v=$("#td").value;if(!v){alert("Escolha o seu aparelho.");return}window.open("https://wa.me/"+WA+"?text="+encodeURIComponent("Olá! Quero instalar o aplicativo "+a+" no meu aparelho ("+v+") e fazer o teste grátis da TV online. Pode me enviar o APK ou o link de instalação?"),"_blank")});
$("#vb").onclick=function(){var n=$("#vn").value.trim(),t=$("#vt").value.replace(/\D/g,""),e=$("#ve").value,c=$("#vc").value.trim();if(n.length<2||t.length<8||!e||!c){$("#vr").innerHTML='<div class="res">Preencha nome, WhatsApp, estado e cidade.</div>';return}var m="Olá! Quero confirmar a viabilidade e a aprovação.\nNome: "+n+"\nWhatsApp: "+t+"\nEstado: "+e+"\nCidade/bairro: "+c+"\nCEP: "+($("#vp").value||"-");$("#vr").innerHTML='<div class="res">Tudo certo! Toque abaixo para enviar sua consulta. Respondemos pelo WhatsApp.<br><br><a class="btn" target="_blank" rel="noopener" href="https://wa.me/'+WA+'?text='+encodeURIComponent(m)+'">Enviar consulta no WhatsApp</a></div>'};
var BG_IMAGES=[];
(function(){var bg=$("#bg");if(BG_IMAGES.length){[].slice.call(bg.querySelectorAll(".bgs")).forEach(function(x){x.remove()});BG_IMAGES.forEach(function(u){var e=document.createElement("div");e.className="bgs bimg";e.style.backgroundImage='url("'+u+'")';bg.insertBefore(e,bg.firstChild)})}var s=bg.querySelectorAll(".bgs"),i=0;if(s.length<2)return;s[0].classList.add("on");setInterval(function(){s[i].classList.remove("on");i=(i+1)%s.length;s[i].classList.add("on")},6000)})();
var U=location.href.split("#")[0];$("#lu").textContent=U.replace(/^https?:\/\//,"");$("#lw").href="https://wa.me/?text="+encodeURIComponent("fernando.promocoes.vendas - internet fibra óptica e TV online: "+U);

/* ===== NOVIDADES: faixa em movimento, carrossel e rastreamento ===== */
(function(){var mt=$("#mt");if(mt){var it=["⚽ Esportes","🎬 Filmes","📺 Séries","🧸 Infantil","📰 Notícias","🌎 Documentários","🎵 Música","📡 Canais abertos","🎭 Variedades","🔥 Estreias"];var h=it.map(function(x){return"<span>"+x+"</span>"}).join("");mt.innerHTML=h+h}
var tk=$("#trk");if(!tk)return;var sl=[].slice.call(tk.querySelectorAll(".sl")),dt=$("#dots"),cur=0,pause=false;
sl.forEach(function(_,i){var b=document.createElement("button");b.setAttribute("aria-label","Slide "+(i+1));b.onclick=function(){go(i)};dt.appendChild(b)});
function mark(){[].slice.call(dt.children).forEach(function(b,i){b.classList.toggle("on",i===cur)})}
function go(i){cur=(i+sl.length)%sl.length;tk.scrollTo({left:sl[cur].offsetLeft-tk.offsetLeft-(tk.clientWidth-sl[cur].clientWidth)/2,behavior:"smooth"});mark()}
tk.addEventListener("scroll",function(){var c=tk.scrollLeft+tk.clientWidth/2,b=0,m=1e9;sl.forEach(function(x,i){var d=Math.abs(x.offsetLeft-tk.offsetLeft+x.clientWidth/2-c);if(d<m){m=d;b=i}});if(b!==cur){cur=b;mark()}},{passive:true});
$("#cp0").onclick=function(){go(cur-1)};$("#cn0").onclick=function(){go(cur+1)};
["mouseenter","touchstart","focusin"].forEach(function(e){tk.parentNode.addEventListener(e,function(){pause=true},{passive:true})});
["mouseleave","touchend","focusout"].forEach(function(e){tk.parentNode.addEventListener(e,function(){pause=false},{passive:true})});
if(!(window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches))setInterval(function(){if(!pause)go(cur+1)},4500);mark()})();
/* Pixel do Meta e Google Analytics: preencha os IDs abaixo para ativar (funciona no seu site publicado, ex.: GitHub Pages) */
var META_PIXEL_ID="",GA_ID="";
(function(){if(GA_ID){var g=document.createElement("script");g.async=1;g.src="https://www.googletagmanager.com/gtag/js?id="+GA_ID;document.head.appendChild(g);window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag("js",new Date());gtag("config",GA_ID)}
if(META_PIXEL_ID){!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");fbq("init",META_PIXEL_ID);fbq("track","PageView")}
document.addEventListener("click",function(e){var a=e.target.closest('a[href*="wa.me"]');if(!a)return;if(window.fbq)fbq("track","Contact");if(window.gtag)gtag("event","whatsapp_click")})})();

/* ===== Tutoriais por aplicativo (abas) ===== */
var TV=[{n:"RX Purple",id:"tfy7EU5MeS8"},{n:"Zuxo Player",d:"Smart TV Samsung",id:"ycBtT8Tn2P0"},{n:"IBO Smarters",id:"W5c51N6ArHs"},{n:"XC IPTV",id:"qsPYLZe1lpg",v:1,u:"https://youtube.com/shorts/qsPYLZe1lpg"},{n:"Playlist de vários aplicativos (APK)",pl:"https://youtube.com/playlist?list=PLBEQV9QZ1pqY"}];
function showTv(i){var b=$("#tvbox");if(!b)return;var x=TV[i],t=document.querySelectorAll("#tvtabs .tvr");[].forEach.call(t,function(e,k){e.classList.toggle("on",k===i)});
var w="https://wa.me/"+WA+"?text="+encodeURIComponent("Olá! Quero fazer o teste grátis da TV online com o aplicativo "+x.n+(x.d?" na "+x.d:"")+".");
if(x.pl){b.innerHTML='<div class="soon"><b>Playlist com tutoriais de vários aplicativos (APK).</b><p>Veja a coleção completa de vídeos no YouTube e escolha o aplicativo que você quer instalar.</p><a class="btn" target="_blank" rel="noopener" href="'+x.pl+'">Abrir playlist no YouTube</a> <a class="btn alt" target="_blank" rel="noopener" href="'+w+'">Pedir teste grátis</a></div>';return}
if(!x.id){b.innerHTML='<div class="soon"><b>Tutorial do '+x.n+' em breve.</b><p>Enquanto isso, chame a gente no WhatsApp que ajudamos na instalação.</p><a class="btn" target="_blank" rel="noopener" href="'+w+'">Pedir ajuda com o '+x.n+'</a></div>';return}
b.innerHTML='<div class="vid'+(x.v?" v":"")+'"><iframe src="https://www.youtube-nocookie.com/embed/'+x.id+'" title="Tutorial '+x.n+(x.d?" - "+x.d:"")+'" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div><p><a class="btn" target="_blank" rel="noopener" href="'+w+'">Pedir teste grátis do '+x.n+'</a> <a class="btn alt" target="_blank" rel="noopener" href="'+(x.u||"https://youtu.be/"+x.id)+'">Abrir no YouTube</a></p>'}
function tvInit(){var l=$("#tvtabs");if(!l)return;l.innerHTML=TV.map(function(x,i){var u=x.pl||x.u||(x.id?"https://youtu.be/"+x.id:"");return'<div class="tvr"><b class="n">'+(i+1)+'</b><div class="nm"><strong>'+x.n+'</strong>'+(x.d?' <small>· '+x.d+'</small>':'')+'<br>'+(u?'<a class="lkx" target="_blank" rel="noopener" href="'+u+'">'+u.replace(/^https?:\/\//,"")+'</a>':'<span class="lkx">link em breve</span>')+'</div><button class="alt" data-tv="'+i+'">'+(x.pl?"▶ Abrir":x.id?"▶ Assistir":"Ver")+'</button></div>'}).join("");showTv(0)}
var _r=render;render=function(){_r();tvInit()};tvInit();
document.addEventListener("click",function(e){var t=e.target.closest("[data-tv]");if(t)showTv(+t.dataset.tv)});

/* ===== Integração do chat Luna com Cloudflare Worker ===== */
(function(){
  var endpoint = "https://luna-agente-site.fernandodjmp3.workers.dev";
  var panel = document.getElementById("luna-panel");
  var launch = document.getElementById("luna-launch");
  var close = document.getElementById("luna-close");
  var form = document.getElementById("luna-form");
  var input = document.getElementById("luna-input");
  var messagesBox = document.getElementById("luna-messages");
  var status = document.getElementById("luna-status");
  var send = document.getElementById("luna-send");
  var history = [];

  function addMessage(role, text){
    var el = document.createElement("div");
    el.className = "luna-msg " + (role === "user" ? "user" : "bot");
    el.textContent = text;
    messagesBox.appendChild(el);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function toggle(open){
    panel.classList.toggle("open", open);
    launch.setAttribute("aria-expanded", open ? "true" : "false");
    if(open) input.focus();
  }

  launch.addEventListener("click", function(){ toggle(!panel.classList.contains("open")); });
  close.addEventListener("click", function(){ toggle(false); });

  form.addEventListener("submit", async function(event){
    event.preventDefault();
    var text = input.value.trim();
    if(!text || send.disabled) return;

    input.value = "";
    addMessage("user", text);
    history.push({role:"user", text:text});
    history = history.slice(-10);
    send.disabled = true;
    status.textContent = "Luna está respondendo...";
    try{
      var response = await fetch(endpoint, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({messages:history})
      });
      var data = await response.json().catch(function(){ return {}; });
      if(!response.ok){
        throw new Error(data.error || ("Falha na comunicação (" + response.status + ")."));
      }
      var reply = typeof data.reply === "string" && data.reply.trim()
        ? data.reply.trim()
        : "Não consegui responder agora. Tente novamente.";
      addMessage("model", reply);
      history.push({role:"model", text:reply});
      history = history.slice(-10);
      status.textContent = "";
    }catch(error){
      status.textContent = "Não foi possível conectar à Luna. Tente novamente ou fale pelo WhatsApp.";
      addMessage("model", "No momento não consegui acessar o atendimento automático. Você pode falar com a equipe pelo WhatsApp: https://wa.me/5561981261223");
    }finally{
      send.disabled = false;
      input.focus();
    }
  });
})();
