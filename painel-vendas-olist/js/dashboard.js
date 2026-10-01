/**
 * Inicializa o dashboard depois que os dados são carregados.
 */
function initDashboard() {

const $ = id => document.getElementById(id);
const fmt=(v,d=0)=>v.toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d});
const fill=(id,arr)=>{$(id).innerHTML='<option value="-1">Todos</option>'+arr.map((a,i)=>`<option value="${i}">${a}</option>`).join('')};
fill('fs',D.s);fill('fc',D.c);fill('fp',D.p);
const nice=m=>{const e=Math.pow(10,Math.floor(Math.log10(m||1))),f=m/e;return(f<=1?1:f<=2?2:f<=5?5:10)*e};
const short=v=>v>=1e6?fmt(v/1e6,1)+' mi':v>=1e3?fmt(v/1e3,0)+' mil':fmt(v);
const tx=(x,y,t,a='middle',s=10,c='#8b90a8')=>`<text x="${x}" y="${y}" fill="${c}" font-size="${s}" text-anchor="${a}">${t}</text>`;
const svg=(W,H,b)=>`<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block">${b}</svg>`;

const topN=(m,n)=>[...m.entries()].sort((a,b)=>b[1]-a[1]).slice(0,n);
function render(){
  const s=+$('fs').value,c=+$('fc').value,p=+$('fp').value;
  const R=D.r.filter(r=>(s<0||r[1]==s)&&(c<0||r[2]==c)&&(p<0||r[3]==p));
  const O=new Map(),cat=new Map(),st=new Map();let rev=0,fr=0;
  R.forEach(r=>{rev+=r[6];fr+=r[7];if(!O.has(r[4]))O.set(r[4],r);
    cat.set(D.c[r[2]],(cat.get(D.c[r[2]])||0)+r[6]);st.set(D.s[r[1]],(st.get(D.s[r[1]])||0)+r[6]);});
  const n=O.size,mo=D.m.map(()=>0),pay=new Map();let sc=0;
  O.forEach(r=>{mo[r[0]]++;sc+=r[5];pay.set(D.p[r[3]],(pay.get(D.p[r[3]])||0)+1)});
  $('k1').textContent=fmt(n);$('k2').textContent='R$ '+fmt(rev);
  $('k3').textContent=n?'R$ '+fmt(rev/n,2):'—';$('k4').textContent=n?fmt(sc/n,2)+' / 5':'—';
  $('cnt').textContent=fmt(R.reduce((a,r)=>a+r[9],0))+' itens de pedido';
  line($('c1'),D.m,mo);
  const a=topN(cat,8);hbar($('c2'),a.map(x=>x[0]),a.map(x=>x[1]));
  const b=topN(st,6);vbar($('c3'),b.map(x=>x[0]),b.map(x=>x[1]));
  const d=topN(pay,4);donut($('c4'),d.map(x=>x[0]),d.map(x=>x[1]));
  // --- análise da queda de avaliação ---
  const filtered=s>=0||c>=0||p>=0,mt=filtered?5:30,BL=['No prazo','1–3 dias','4–7 dias','8–14 dias','> 14 dias'];
  const M=D.m.map(()=>({n:0,s:0,l:0})),B=BL.map(()=>({n:0,s:0}));
  O.forEach(r=>{const m=M[r[0]];m.n++;m.s+=r[5];if(r[8]>0)m.l++;B[r[8]].n++;B[r[8]].s+=r[5]});
  const V=D.m.map((l,i)=>({l,n:M[i].n,nota:M[i].s/M[i].n,atr:M[i].l/M[i].n*100})).filter(v=>v.n>=mt);
  line2($('c5'),V.map(v=>v.l),V.map(v=>v.nota),V.map(v=>v.atr));
  const bn=B.map(b=>b.n?b.s/b.n:0);
  vbar($('c6'),BL,bn,v=>fmt(v,2),['#22d3c5','#b8a9ff','#ff9a5c','#ff5c6c','#ff3b4f'],5);
  const CT=new Map();R.forEach(r=>{const k=D.c[r[2]],o=CT.get(k)||{n:0,s:0};o.n++;o.s+=r[5];CT.set(k,o)});
  const ct=[...CT.entries()].filter(e=>e[1].n>=(filtered?20:100)).map(e=>[e[0],e[1].s/e[1].n]).sort((a,b)=>a[1]-b[1]).slice(0,8);
  hbar($('c7'),ct.map(x=>x[0]),ct.map(x=>x[1]),v=>fmt(v,2),'#ff5c6c',5);
  const late=B.slice(1).reduce((a,b)=>({n:a.n+b.n,s:a.s+b.s}),{n:0,s:0}),LI=[];
  if(n&&B[0].n&&late.n){const na=late.s/late.n,no=B[0].s/B[0].n;
    LI.push(`<b>${fmt(late.n/n*100,1)}%</b> dos pedidos chegaram atrasados e têm nota média <b>${fmt(na,2)}</b>, contra <b>${fmt(no,2)}</b> dos entregues no prazo (diferença de ${fmt(no-na,2)} pontos).`);
    LI.push(`Estimativa: se os pedidos atrasados tivessem a nota dos entregues no prazo, a nota média iria de <b>${fmt(sc/n,2)}</b> para cerca de <b>${fmt((sc+late.n*(no-na))/n,2)}</b>.`)}
  if(V.length>2){const w=[...V].sort((a,b)=>a.nota-b.nota)[0];LI.push(`Pior mês: <b>${w.l}</b>, nota <b>${fmt(w.nota,2)}</b> com <b>${fmt(w.atr,1)}%</b> de pedidos atrasados.`)}
  if(B[4].n>=20)LI.push(`Pedidos com mais de 14 dias de atraso têm nota média de <b>${fmt(bn[4],2)}</b>, o grupo mais crítico.`);
  if(ct.length)LI.push(`Categoria com pior nota: <b>${ct[0][0]}</b> (${fmt(ct[0][1],2)}).`);
  $('ins').innerHTML=LI.length?LI.map(t=>'<li>'+t+'</li>').join(''):'<li>Sem dados suficientes para esta combinação de filtros.</li>';
}
setupFilters(render);
  render();

}

loadData()
  .then(initDashboard)
  .catch(error => {
    console.error(error);
    document.querySelector('.wrap').insertAdjacentHTML(
      'beforeend',
      '<p class="load-error">Não foi possível carregar os dados. Execute o projeto por um servidor local, como o Live Server.</p>'
    );
  });
