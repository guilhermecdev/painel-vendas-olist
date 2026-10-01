const COL=['#7c5cff','#22d3c5','#ff5c6c','#b8a9ff'];
function line(el,labels,vals){
  const W=560,H=230,L=46,R=12,T=10,B=26,mx=nice(Math.max(...vals,1));
  const x=i=>L+i*(W-L-R)/Math.max(vals.length-1,1),y=v=>T+(H-T-B)*(1-v/mx);let g='';
  for(let k=0;k<=4;k++){const v=mx*k/4;g+=`<line x1="${L}" x2="${W-R}" y1="${y(v)}" y2="${y(v)}" stroke="#1c2036"/>`+tx(L-6,y(v)+3,short(v),'end')}
  labels.forEach((l,i)=>{if(i%3==0)g+=tx(x(i),H-8,l)});
  const P=vals.map((v,i)=>[x(i),y(v)]);let d=`M${P[0][0]},${P[0][1]}`;
  for(let i=0;i<P.length-1;i++){const a=P[i-1]||P[i],b=P[i],c=P[i+1],e=P[i+2]||c;
    d+=`C${b[0]+(c[0]-a[0])/6},${b[1]+(c[1]-a[1])/6} ${c[0]-(e[0]-b[0])/6},${c[1]-(e[1]-b[1])/6} ${c[0]},${c[1]}`}
  g+=`<path d="${d}L${x(vals.length-1)},${y(0)}L${x(0)},${y(0)}Z" fill="rgba(124,92,255,.18)"/><path d="${d}" fill="none" stroke="#7c5cff" stroke-width="2.5"/>`;
  P.forEach((p,i)=>g+=`<circle cx="${p[0]}" cy="${p[1]}" r="3.5" fill="#7c5cff"><title>${labels[i]}: ${fmt(vals[i])} pedidos</title></circle>`);
  el.innerHTML=svg(W,H,g);
}
function hbar(el,labels,vals,f=short,col='#7c5cff',fx){
  const W=380,L=140,rh=28,H=Math.max(labels.length,1)*rh+8,mx=fx||Math.max(...vals,1);let g='';
  labels.forEach((l,i)=>{const w=(W-L-50)*vals[i]/mx,y=i*rh+4;
    g+=tx(L-8,y+15,l.length>22?l.slice(0,21)+'…':l,'end')+`<rect x="${L}" y="${y+2}" width="${w}" height="18" rx="3" fill="${col}"><title>${l}: ${fmt(vals[i],vals[i]<100?2:0)}</title></rect>`+tx(L+w+5,y+15,f(vals[i]),'start',10,'#e6e8f2')});
  el.innerHTML=svg(W,H,g);
}
function vbar(el,labels,vals,f=short,col='#22d3c5',fx){
  const W=380,H=240,L=8,B=24,T=20,mx=fx||Math.max(...vals,1),n=Math.max(labels.length,1),bw=(W-L*2)/n;let g='';
  labels.forEach((l,i)=>{const h=(H-B-T)*vals[i]/mx,x=L+i*bw;
    g+=`<rect x="${x+bw*.15}" y="${H-B-h}" width="${bw*.7}" height="${h}" rx="3" fill="${Array.isArray(col)?col[i]:col}"><title>${l}: ${fmt(vals[i],vals[i]<100?2:0)}</title></rect>`+tx(x+bw/2,H-8,l)+tx(x+bw/2,H-B-h-5,f(vals[i]),'middle',9,'#e6e8f2')});
  el.innerHTML=svg(W,H,g);
}
function donut(el,labels,vals){
  const r=70,C=2*Math.PI*r,tot=vals.reduce((a,b)=>a+b,0)||1;let off=0,g='';
  vals.forEach((v,i)=>{const len=C*v/tot;g+=`<circle cx="100" cy="100" r="${r}" fill="none" stroke="${COL[i%4]}" stroke-width="34" stroke-dasharray="${len} ${C-len}" stroke-dashoffset="${-off}" transform="rotate(-90 100 100)"><title>${labels[i]}: ${fmt(v/tot*100,1)}%</title></circle>`;off+=len});
  el.innerHTML=`<div style="max-width:210px;margin:auto">${svg(200,200,g)}</div><div class="lg">`+labels.map((l,i)=>`<span><i style="background:${COL[i%4]}"></i>${l} ${fmt(vals[i]/tot*100,1)}%</span>`).join('')+'</div>';
}
function line2(el,labels,nota,atr){
  const W=560,H=240,L=40,R=46,T=12,B=26;
  if(!nota.length){el.innerHTML='';return}
  const lo=Math.floor(Math.min(...nota)*2)/2,hi=5,mxa=nice(Math.max(...atr,1)),
  x=i=>L+i*(W-L-R)/Math.max(nota.length-1,1),yn=v=>T+(H-T-B)*(1-(v-lo)/(hi-lo)),ya=v=>T+(H-T-B)*(1-v/mxa);let g='';
  const n=Math.round((hi-lo)/.5);
  for(let k=0;k<=n;k++){const v=lo+.5*k;g+=`<line x1="${L}" x2="${W-R}" y1="${yn(v)}" y2="${yn(v)}" stroke="#1c2036"/>`+tx(L-6,yn(v)+3,fmt(v,1),'end',10,'#b8a9ff')}
  for(let k=0;k<=4;k++){const v=mxa*k/4;g+=tx(W-R+6,ya(v)+3,fmt(v)+'%','start',10,'#ff8a96')}
  labels.forEach((l,i)=>{if(i%3==0)g+=tx(x(i),H-8,l)});
  const path=(arr,fy,c,dash)=>'<path d="'+arr.map((v,i)=>(i?'L':'M')+x(i)+','+fy(v)).join('')+`" fill="none" stroke="${c}" stroke-width="2.5" ${dash?'stroke-dasharray="5 4"':''}/>`;
  g+=path(atr,ya,'#ff5c6c',true)+path(nota,yn,'#7c5cff');
  nota.forEach((v,i)=>g+=`<circle cx="${x(i)}" cy="${yn(v)}" r="3.5" fill="#7c5cff"><title>${labels[i]}: nota ${fmt(v,2)} · ${fmt(atr[i],1)}% atrasados</title></circle>`);
  el.innerHTML=svg(W,H,g);
}
