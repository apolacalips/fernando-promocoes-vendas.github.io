(function(){
  'use strict';
  const $ = id => document.getElementById(id);
  const KEY = 'fpv_luna_radar_leads_v1';
  let leads = [];
  try { leads = JSON.parse(localStorage.getItem(KEY) || '[]'); if (!Array.isArray(leads)) leads=[]; } catch (_) { leads=[]; }
  const saveStore = () => { try { localStorage.setItem(KEY, JSON.stringify(leads)); return true; } catch (_) { return false; } };
  const status = msg => { $('radar-status').textContent = msg; };
  function render(){
    const root=$('radar-list'); root.replaceChildren();
    if(!leads.length){root.textContent='Nenhuma oportunidade salva neste aparelho.';return;}
    const list=document.createElement('div'); list.className='steps';
    leads.forEach((lead,index)=>{
      const card=document.createElement('div');
      const title=document.createElement('b'); title.textContent=(lead.name||'Contato sem nome')+' — '+lead.type;
      const details=document.createElement('p'); details.textContent=[lead.contact,lead.city,lead.note].filter(Boolean).join(' | ');
      const date=document.createElement('small'); date.textContent='Salvo em '+lead.date;
      const remove=document.createElement('button'); remove.type='button'; remove.textContent='Remover'; remove.addEventListener('click',()=>{leads.splice(index,1);saveStore();render();status('Oportunidade removida.');});
      card.append(title,details,date,document.createElement('br'),remove); list.append(card);
    }); root.append(list);
  }
  $('radar-search').addEventListener('click',()=>{
    const area=$('radar-area').value.trim()||'Brasília DF';
    const niche=$('radar-nicho').value;
    const queries=[`"procuro" ${niche} "${area}"`,`"indicação" ${niche} "${area}"`,`"alguém recomenda" ${niche} "${area}"`];
    queries.forEach(q=>window.open('https://www.google.com/search?q='+encodeURIComponent(q),'_blank','noopener'));
    status('Pesquisas públicas abertas. Verifique cada resultado e só registre contatos com base legítima para abordagem.');
  });
  $('radar-save').addEventListener('click',()=>{
    const contact=$('radar-contact').value.trim(), note=$('radar-note').value.trim();
    if(!contact){status('Informe um contato público com autorização ou outro meio de retorno consentido.');return;}
    if(!note){status('Registre a origem pública do contato e a autorização/base para abordagem.');return;}
    leads.unshift({name:$('radar-name').value.trim(),contact,city:$('radar-city').value.trim(),type:$('radar-type').value,note,date:new Date().toLocaleString('pt-BR')});
    if(!saveStore()){leads.shift();status('Não foi possível salvar. Verifique o armazenamento do navegador.');return;}
    ['radar-name','radar-contact','radar-city','radar-note'].forEach(id=>$(id).value=''); render(); status('Oportunidade salva apenas neste aparelho/navegador.');
  });
  $('radar-export').addEventListener('click',()=>{
    if(!leads.length){status('Não há oportunidades para exportar.');return;}
    const rows=[['Nome','Contato','Cidade/bairro','Interesse','Origem/observação','Data'],...leads.map(x=>[x.name,x.contact,x.city,x.type,x.note,x.date])];
    const csv='\uFEFF'+rows.map(r=>r.map(v=>'"'+String(v||'').replace(/"/g,'""')+'"').join(';')).join('\r\n');
    const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'})); const a=document.createElement('a');a.href=url;a.download='luna-radar-oportunidades.csv';a.click();URL.revokeObjectURL(url);status('Arquivo CSV preparado.');
  });
  $('radar-clear').addEventListener('click',()=>{if(!confirm('Apagar todas as oportunidades salvas neste aparelho?'))return;leads=[];saveStore();render();status('Lista apagada deste aparelho.');});
  render();
})();
