/* ==========================================================
   Shenouda Romany - Portfolio scripts
   Hero log, reveal on scroll, See all / horizontal scroll,
   certificates lightbox, navbar scroll-spy, mobile menu, form
   ========================================================== */

/* SVG (SMIL) dots are not stopped by CSS, so honour reduced-motion here */
if(matchMedia('(prefers-reduced-motion:reduce)').matches){const sv=document.querySelector('.canvas svg');sv&&sv.pauseAnimations&&sv.pauseAnimations()}

const lines=[
 '<b>✓</b> webhook received <em>POST /order</em>',
 '<b>✓</b> payload validated by AI agent',
 '<b>✓</b> row appended to <em>Orders</em> sheet',
 '<b>✓</b> slack alert sent to <em>#order-alerts</em>',
 '<b>✓</b> confirmation email delivered',
 '<b>●</b> execution finished in <em>1.4s</em>'
];
const log=document.getElementById('log');let i=0;
function tick(){const d=document.createElement('div');d.innerHTML=lines[i%lines.length];log.appendChild(d);
 while(log.children.length>5)log.removeChild(log.firstChild);i++}
tick();setInterval(tick,1300);

/* reveal on scroll */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
document.querySelectorAll('.card').forEach(c=>c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--x',e.clientX-r.left+'px');c.style.setProperty('--y',e.clientY-r.top+'px')}));

/* See all / Show less for any [data-collapse] block */
const mq=matchMedia('(max-width:700px)');
document.querySelectorAll('[data-collapse]').forEach(box=>{
 const items=[...box.children],label=box.dataset.label||'items';
 const wrap=document.createElement('div');wrap.className='more-wrap';
 const btn=document.createElement('button');btn.type='button';btn.className='btn more';
 wrap.appendChild(btn);box.before(wrap);
 const hs=box.hasAttribute('data-hscroll'),arrows=[];
 if(hs)['left','right'].forEach((d,k)=>{const a=document.createElement('button');a.type='button';a.className='arr';
  a.setAttribute('aria-label','Scroll '+d);a.innerHTML='<i class="fas fa-chevron-'+d+'"></i>';
  a.onclick=()=>box.scrollBy({left:(k?1:-1)*box.clientWidth*.8,behavior:'smooth'});wrap.insertBefore(a,btn);arrows.push(a)});
 let open=false;
 const limit=()=>+(mq.matches?box.dataset.m:box.dataset.d)||items.length;
 function apply(){
  const lim=limit();
  items.forEach((el,k)=>el.classList.toggle('hid',!open&&k>=lim));
  if(hs){box.classList.toggle('hs',!open);arrows.forEach(a=>a.hidden=open)}
  wrap.hidden=items.length<=lim;
  btn.innerHTML=open?'Show less <i class="fas fa-chevron-up"></i>':'See all '+label+' ('+items.length+') <i class="fas fa-chevron-down"></i>';
  btn.setAttribute('aria-expanded',open);
 }
 btn.addEventListener('click',()=>{
  const lim=limit();open=!open;apply();
  if(open){requestAnimationFrame(()=>items[lim]&&items[lim].scrollIntoView({behavior:'smooth',block:'start'}))}
  else{box.scrollLeft=0;box.closest('section').scrollIntoView({behavior:'smooth',block:'start'})}
 });
 mq.addEventListener('change',apply);apply();
});

/* certificates: per-image ratio + lightbox */
const certBox=document.querySelector('.certs'),certItems=[...certBox.children];
certItems.forEach((it,k)=>{
 const img=it.querySelector('img'),set=()=>it.style.setProperty('--r',(img.naturalWidth/img.naturalHeight).toFixed(3));
 img.complete&&img.naturalWidth?set():img.addEventListener('load',set);
 it.addEventListener('click',e=>{const h=it.getAttribute('href');if(!h||h==='#'){e.preventDefault();openLb(k)}});
});
const lb=document.getElementById('lb'),lbImg=lb.querySelector('img'),lbCnt=lb.querySelector('.cnt span'),lbLink=lb.querySelector('.cnt a');let cur=0;
function showLb(k){cur=(k+certItems.length)%certItems.length;const it=certItems[cur],im=it.querySelector('img');
 lbImg.src=im.src;lbImg.alt=im.alt;lbCnt.textContent=(cur+1)+' / '+certItems.length;
 const h=it.getAttribute('href');const ok=h&&h!=='#';lbLink.hidden=!ok;if(ok)lbLink.href=h}
function openLb(k){showLb(k);lb.classList.add('on');document.body.style.overflow='hidden'}
function closeLb(){lb.classList.remove('on');document.body.style.overflow=''}
lb.querySelector('.x').onclick=closeLb;lb.querySelector('.p').onclick=()=>showLb(cur-1);lb.querySelector('.nx').onclick=()=>showLb(cur+1);
lb.addEventListener('click',e=>{if(e.target===lb)closeLb()});
addEventListener('keydown',e=>{if(!lb.classList.contains('on'))return;if(e.key==='Escape')closeLb();if(e.key==='ArrowLeft')showLb(cur-1);if(e.key==='ArrowRight')showLb(cur+1)});
let tx=0;lb.addEventListener('touchstart',e=>tx=e.touches[0].clientX,{passive:true});
lb.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>50)showLb(cur+(d<0?1:-1))});

/* active link in navbar follows the section on screen */
const navLinks=[...document.querySelectorAll('#menu a')],navSecs=navLinks.map(a=>document.querySelector(a.getAttribute('href')));
function spy(){const y=innerHeight*.35;let cur=-1;
 navSecs.forEach((sec,k)=>{const r=sec.getBoundingClientRect();if(r.top<=y&&r.bottom>y)cur=k});
 if(innerHeight+scrollY>=document.documentElement.scrollHeight-4)cur=navSecs.length-1;
 document.getElementById('secName').textContent=cur>=0?navLinks[cur].textContent:'home';
 navLinks.forEach((a,k)=>{a.classList.toggle('active',k===cur);k===cur?a.setAttribute('aria-current','true'):a.removeAttribute('aria-current')})}
addEventListener('scroll',spy,{passive:true});addEventListener('resize',spy);spy();

/* mobile menu */
const nav=document.getElementById('nav'),burger=document.getElementById('burger');
burger.addEventListener('click',()=>{const o=nav.classList.toggle('open');burger.setAttribute('aria-expanded',o);burger.firstChild.className=o?'fas fa-xmark':'fas fa-bars'});
document.querySelectorAll('#menu a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');burger.firstChild.className='fas fa-bars'}));

document.getElementById('f').addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.target);
 location.href='mailto:xxelkingxx158@gmail.com?subject='+encodeURIComponent(d.get('s')||'Automation project')+'&body='+encodeURIComponent(d.get('m')+'\n\n'+d.get('n')+' ('+d.get('e')+')')});
