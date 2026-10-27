(function(){
var h=document.querySelector('header'),b=h.querySelector('.menu');
function set(o){h.classList.toggle('open',o);b.setAttribute('aria-expanded',o)}
b.addEventListener('click',function(){set(!h.classList.contains('open'))});
h.querySelectorAll('nav a').forEach(function(a){a.addEventListener('click',function(){set(false)})});
var lb=document.getElementById('lb'),im=lb.querySelector('img'),cp=lb.querySelector('figcaption'),list=[],idx=0,last=null;
function items(set){return Array.prototype.filter.call(set.querySelectorAll('[data-lb]'),function(e){return !e.hidden})}
function show(i){idx=(i+list.length)%list.length;var f=list[idx];im.src=f.dataset.full;im.alt=f.querySelector('img').alt;cp.textContent=f.querySelector('img').alt+'  ('+(idx+1)+' / '+list.length+')';
var n=list[(idx+1)%list.length];if(n){new Image().src=n.dataset.full}}
function open(f){list=items(f.closest('.lbset'));last=f;lb.hidden=false;document.body.classList.add('noscroll');show(list.indexOf(f));lb.querySelector('.lbx').focus()}
function close(){lb.hidden=true;document.body.classList.remove('noscroll');im.src='';if(last)last.focus()}
document.querySelectorAll('[data-lb]').forEach(function(f){f.tabIndex=0;f.setAttribute('role','button');
f.addEventListener('click',function(){open(f)});f.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open(f)}})});
lb.querySelector('.lbx').onclick=close;lb.querySelector('.lbp').onclick=function(){show(idx-1)};lb.querySelector('.lbn').onclick=function(){show(idx+1)};
lb.addEventListener('click',function(e){if(e.target===lb||e.target.tagName==='FIGURE')close()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){set(false);if(!lb.hidden)close()}if(lb.hidden)return;if(e.key==='ArrowRight')show(idx+1);if(e.key==='ArrowLeft')show(idx-1)});
var sx=0;lb.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});
lb.addEventListener('touchend',function(e){var d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>50)show(idx+(d<0?1:-1))});
var fb=document.querySelectorAll('.filters button');
fb.forEach(function(btn){btn.addEventListener('click',function(){fb.forEach(function(x){x.classList.remove('on');x.setAttribute('aria-pressed','false')});btn.classList.add('on');btn.setAttribute('aria-pressed','true');
var f=btn.dataset.f;document.querySelectorAll('#grid .ph').forEach(function(p){p.hidden=!(f==='all'||p.dataset.cat===f)})})});
})();
