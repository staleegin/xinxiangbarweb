/* 店铺数据在 data/<城市>.json，由 tools/build_data.py 从 Excel 生成。 */
let BARS = [], CITIES = [], DRINKS = [];
const TAGS = ["全部","清吧","啤酒吧","禁烟"];
const TAGHUE = {清吧:210,啤酒吧:40,禁烟:165};
const hue = s => [...s].reduce((h,c)=>(h*31+c.codePointAt(0))%360,7);
/* 每日随机：同一天、同一城市顺序固定，第二天换一次，对每家店公平 */
function dayOrder(bars){
  const d = new Date(), key = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+"|"+S.city;
  let s = [...key].reduce((h,c)=>Math.imul(h^c.codePointAt(0),16777619)>>>0,2166136261);
  const rnd = () => { s = (s+0x6D2B79F5)>>>0; let t=s; t=Math.imul(t^t>>>15,t|1); t^=t+Math.imul(t^t>>>7,t|61); return ((t^t>>>14)>>>0)/4294967296; };
  const a = bars.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(rnd()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}
/* 只显示确定的正面信息：全店禁烟才显示禁烟；吵闹才显示红色提醒 */
const badges = b => (b.smokefree?`<span class="tag ok">禁烟</span>`:"") + (b.noise?`<span class="tag warn">${esc(b.noise)}</span>`:"");
const safeUrl = u => typeof u==="string" && /^https:\/\/[^\s"'<>]+$/.test(u) ? u : "";
const LINKS = [["xhs","在小红书查看"],["douyin","在抖音查看"],["guide","怎么找到门"]];
const hoursText = b => b.hours || "营业时间待确认";
/* 只允许本站 assets/ 下的图片和视频，防止数据文件被塞进外部地址或脚本 */
const safeAsset = (u,kind) => typeof u==="string" && (kind==="video" ? /^assets\/[\w\-\/]+\.(mp4|webm)$/ : /^assets\/[\w\-\/]+\.(webp|jpe?g|png)$/).test(u) ? u : "";
/* 今日鸡尾酒：按日期选，同一天所有人看到同一款 */
function todayDrink(){
  if(!DRINKS.length) return null;
  const d = new Date(), key = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
  const h = [...key].reduce((h,c)=>Math.imul(h^c.codePointAt(0),16777619)>>>0,2166136261);
  return DRINKS[h % DRINKS.length];
}
const TITLES = {discover:"水 Bar", map:"Bar Maps", fav:"收藏"};

/* 定位：只问一次。坐标只在手机上计算距离，不保存、不上传。
   浏览器给的是 WGS-84，高德坐标是 GCJ-02，先换算再算距离（国内两者差几百米）。 */
const GEO = {pos:null};
function wgs2gcj(lng,lat){
  const a=6378245, ee=0.006693421622965943, x=lng-105, y=lat-35;
  let dLat=-100+2*x+3*y+.2*y*y+.1*x*y+.2*Math.sqrt(Math.abs(x)), dLng=300+x+2*y+.1*x*x+.1*x*y+.1*Math.sqrt(Math.abs(x));
  const t=(v,k)=>(20*Math.sin(6*v*Math.PI)+20*Math.sin(2*v*Math.PI))*2/3+k;
  dLat=t(x,dLat+(20*Math.sin(y*Math.PI)+40*Math.sin(y/3*Math.PI))*2/3+(160*Math.sin(y/12*Math.PI)+320*Math.sin(y*Math.PI/30))*2/3);
  dLng=t(x,dLng+(20*Math.sin(x*Math.PI)+40*Math.sin(x/3*Math.PI))*2/3+(150*Math.sin(x/12*Math.PI)+300*Math.sin(x/30*Math.PI))*2/3);
  const r=lat/180*Math.PI, m=1-ee*Math.sin(r)**2, sm=Math.sqrt(m);
  return [lng+dLng*180/(a/sm*Math.cos(r)*Math.PI), lat+dLat*180/(a*(1-ee)/(m*sm)*Math.PI)];
}
function askGeo(){
  let st; try{ st = localStorage.getItem("ba-geo") }catch{}
  if(st==="denied" || !navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(p=>{
    try{ localStorage.setItem("ba-geo","granted") }catch{}
    GEO.pos = wgs2gcj(p.coords.longitude, p.coords.latitude); render();
  }, e=>{ if(e.code===1){ try{ localStorage.setItem("ba-geo","denied") }catch{} } }, {enableHighAccuracy:false, timeout:10000, maximumAge:300000});
}
function dist(b){
  if(!GEO.pos || !hasLoc(b)) return null;
  const R=6371, r=Math.PI/180, [x1,y1]=GEO.pos, [x2,y2]=b.lnglat;
  const h=Math.sin((y2-y1)*r/2)**2+Math.cos(y1*r)*Math.cos(y2*r)*Math.sin((x2-x1)*r/2)**2;
  return 2*R*Math.asin(Math.sqrt(h));
}
const kmText = d => d==null ? "" : d<10 ? d.toFixed(1) : String(Math.round(d));
const $ = s => document.querySelector(s);
const S = {full:false, q:"", tag:"全部", tab:"discover", focus:null, favs:new Set(load()), first:true, city:loadCity(), loading:true, failed:false, search:false, drink:null};

function load(){ try{ return JSON.parse(localStorage.getItem("ba-favs")||"[]").filter(x=>typeof x==="string") }catch{ return [] } }
function saveCity(){ try{ localStorage.setItem("ba-city",S.city) }catch{} }
function loadCity(){ try{ return localStorage.getItem("ba-city")||"xinxiang" }catch{ return "xinxiang" } }
async function loadData(){
  S.loading = true; S.failed = false; render();
  try{
    const get = u => fetch(u).then(r=>{ if(!r.ok) throw new Error(r.status); return r.json(); });
    if(!DRINKS.length) get("data/cocktails.json").then(d=>{ DRINKS = Array.isArray(d)?d:[]; hero(); }).catch(()=>{});
    if(!CITIES.length) CITIES = await get("data/cities.json");
    if(!CITIES.some(c=>c.slug===S.city)) S.city = CITIES[0].slug;
    BARS = dayOrder(await get("data/"+S.city+".json"));
  }catch(e){ BARS = []; S.failed = true; }
  S.loading = false; render();
}
function save(){ try{ localStorage.setItem("ba-favs", JSON.stringify([...S.favs])) }catch{} }
function toast(t){ const e=$("#toast"); e.textContent=t; e.classList.add("show"); clearTimeout(toast.t); toast.t=setTimeout(()=>e.classList.remove("show"),1600) }
const heart = '<svg viewBox="0 0 20 20"><path d="M10 16.5S3.5 12.6 3.5 7.9A3.4 3.4 0 0 1 10 6.3a3.4 3.4 0 0 1 6.5 1.6c0 4.7-6.5 8.6-6.5 8.6Z"/></svg>';
const cover = b => `<div class="cover" style="--h:${hue(b.name)}"><b aria-hidden="true">${esc(b.name[0])}</b></div>`;

const CFG = window.AMAP_CONFIG || {};
const esc = s => String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const hasLoc = b => Array.isArray(b.lnglat);
/* 高德 URI：移动端调起高德 App 并定位到该店，页面里可直接点“路线”；电脑端打开网页版 */
const navUrl = b => {
  const p = b.lnglat;
  return p ? "https://uri.amap.com/marker?position="+p[0]+","+p[1]+"&name="+encodeURIComponent(b.name)+"&src=shuibar&coordinate=gaode&callnative=1" : "";
};
const mk = (b,on) => `<div class="mk${on?" on":""}"><span>${esc(b.name)}</span><i></i></div>`;
const M = {map:null, markers:new Map(), q:Promise.resolve()};

let amapP;
function loadAMap(){
  if(amapP) return amapP;
  amapP = new Promise((ok,no)=>{
    if(!CFG.key) return no(new Error("未配置 Key"));
    window._AMapSecurityConfig = {securityJsCode:CFG.securityJsCode};
    const s = document.createElement("script");
    s.src = "https://webapi.amap.com/maps?v=2.0&key="+encodeURIComponent(CFG.key)+"";
    s.onload = () => window.AMap ? ok(window.AMap) : no(new Error("高德脚本未就绪"));
    s.onerror = () => no(new Error("脚本加载失败"));
    document.head.appendChild(s);
  });
  amapP.catch(()=>{ amapP = null; });
  return amapP;
}

/* 地图中心：有定位用自己的位置，否则用所有店的中心点 */
function mapCenter(){
  if(GEO.pos) return GEO.pos;
  const p = BARS.filter(hasLoc); if(!p.length) return [113.927,35.303];
  return [p.reduce((s,b)=>s+b.lnglat[0],0)/p.length, p.reduce((s,b)=>s+b.lnglat[1],0)/p.length];
}
/* 圆环弧线：8 个方向，弧越长越亮 = 那个方向的店越多 */
function drawDirs(){
  const c = mapCenter(), cnt = Array(8).fill(0);
  for(const b of list().filter(hasLoc)){
    const dx = (b.lnglat[0]-c[0])*Math.cos(c[1]*Math.PI/180), dy = b.lnglat[1]-c[1];
    if(Math.abs(dx)+Math.abs(dy) < 1e-6) continue;
    const deg = (Math.atan2(dx,dy)*180/Math.PI + 360) % 360;
    cnt[Math.round(deg/45)%8]++;
  }
  const max = Math.max(1,...cnt), R = 141, pt = (d,r) => [150+r*Math.sin(d*Math.PI/180), 150-r*Math.cos(d*Math.PI/180)];
  let out = `<circle cx="150" cy="150" r="${R}" class="trk"/>`;
  cnt.forEach((n,i)=>{
    if(!n) return;
    const mid = i*45, half = 5 + 15*n/max, [x1,y1] = pt(mid-half,R), [x2,y2] = pt(mid+half,R), [lx,ly] = pt(mid,113);
    out += `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)}A${R} ${R} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}" class="arc" style="opacity:${(.4+.6*n/max).toFixed(2)}"/>`
         + `<g transform="translate(${lx.toFixed(1)} ${ly.toFixed(1)})"><path d="M0 -7 6 4 -6 4Z" class="tri" transform="rotate(${mid})"/><text y="20" class="lbl-n">${n}</text></g>`;
  });
  $("#dirs").innerHTML = out;
}
async function drawMap(){
  const err = $("#maperr"); err.textContent = "";
  drawDirs();
  try{
    const AMap = await loadAMap();
    if(S.tab!=="map") return;
    if(!M.map){
      const dark = matchMedia("(prefers-color-scheme: dark)").matches;
      M.map = new AMap.Map("amap",{zoom:13,center:mapCenter(),mapStyle:dark?"amap://styles/dark":"amap://styles/normal",resizeEnable:true});
    }
    M.map.setStatus({dragEnable:S.full,zoomEnable:S.full,doubleClickZoom:S.full,touchZoom:S.full,scrollWheel:S.full});
    const show = new Set(list().filter(hasLoc).map(b=>b.id));
    for(const [id,m] of M.markers) if(!BARS.some(b=>b.id===id)){ M.map.remove(m); M.markers.delete(id); }
    for(const b of BARS.filter(hasLoc)){
      if(!M.markers.has(b.id)){
        const m = new AMap.Marker({position:b.lnglat,anchor:"bottom-center",content:mk(b,false)});
        m.on("click",()=>{ if(S.full) detail(b.id); }); M.map.add(m); M.markers.set(b.id,m);
      }
      const m = M.markers.get(b.id);
      show.has(b.id) ? m.show() : m.hide();
      m.setContent(mk(b,S.focus===b.id));
    }
    if(GEO.pos){
      if(!M.me){ M.me = new AMap.Marker({position:GEO.pos,anchor:"center",content:'<div class="me" aria-label="我的位置"></div>',zIndex:200}); M.map.add(M.me); }
      else M.me.setPosition(GEO.pos);
    }
    const f = M.markers.get(S.focus);
    if(f) M.map.setZoomAndCenter(16,f.getPosition());
    else if(S.full){
      const vis = [...M.markers].filter(([id])=>show.has(id)).map(([,m])=>m);
      if(vis.length) M.map.setFitView(vis,false,[90,60,120,60],16);
    } else M.map.setZoomAndCenter(13, mapCenter());
  }catch(e){ err.textContent = "地图暂时无法加载（"+e.message+"）。请检查 config.js 的 Key、域名白名单和网络。"; }
}
const showMap = () => (M.q = M.q.then(drawMap));

function list(){
  const q = S.q.trim().toLowerCase();
  return BARS.filter(b =>
    (S.tab!=="fav" || S.favs.has(b.id)) &&
    (S.tab==="fav" || S.tag==="全部" || (S.tag==="禁烟" ? b.smokefree : b.type===S.tag)) &&
    (!q || (b.name+b.district+b.addr).toLowerCase().includes(q))
  );  /* 保留每日随机顺序 */
}
/* 地图页：按距离从近到远；没定位时按名称 */
function byDistance(a){
  return a.slice().sort((x,y)=>{ const dx=dist(x), dy=dist(y);
    if(dx==null && dy==null) return x.name.localeCompare(y.name,"zh-CN");
    return dx==null ? 1 : dy==null ? -1 : dx-dy; });
}

/* 卡片：左侧距离（定位后才有），右侧图片位；营业时间未知就不显示 */
function row(b,i,compact){
  const on = S.favs.has(b.id), d = dist(b), img = safeAsset(b.img);
  const km = GEO.pos ? `<div class="km" aria-label="${d==null?"距离未知":"距离 "+kmText(d)+" 公里"}"><b class="num">${d==null?"–":kmText(d)}</b><small>km</small></div>` : "";
  return `<article class="card${compact?" sm":""}${km?"":" nokm"}" style="--i:${i}" data-open="${esc(b.id)}">${km}
    <div class="ph" style="--h:${hue(b.name)}">${img?`<img src="${esc(img)}" alt="" loading="lazy" decoding="async">`:`<b class="ch" aria-hidden="true">${esc(b.name[0])}</b>`}
      ${on?heart.replace("<svg",'<svg class="fv" aria-label="已收藏"'):""}
      <div class="ci"><h2><button class="open" data-open="${esc(b.id)}">${esc(b.name)}</button></h2>
      <p>${esc(b.type)}${compact?"":" · "+esc(b.district)}${badges(b)}</p>${compact?`<p>${esc(b.district)}</p>`:""}${b.hours&&!compact?`<p class="hrs num">${esc(b.hours)}</p>`:""}</div></div></article>`;
}

/* 首页顶部：图片，有视频时自动静音循环播放；省流量或减少动态效果时只显示图片 */
function hero(){
  const c = todayDrink(), el = $("#hero");
  if(!c || S.drink===c.id) return;
  S.drink = c.id;
  const img = safeAsset(c.img), vid = safeAsset(c.video,"video");
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches || (navigator.connection && navigator.connection.saveData);
  const media = vid && !calm
    ? `<video class="hm" autoplay muted loop playsinline preload="metadata"${img?` poster="${esc(img)}"`:""} aria-hidden="true"><source src="${esc(vid)}"></video>`
    : img ? `<img class="hm" src="${esc(img)}" alt="" decoding="async">` : "";
  el.innerHTML = `<div class="hglow" aria-hidden="true"></div>${media}<div class="ht"><p>今日推荐</p><h2>${esc(c.zh||c.en)}</h2>${c.zh&&c.en?`<p class="en" lang="en">${esc(c.en)}</p>`:""}</div>`;
  const v = el.querySelector("video");
  if(v) v.addEventListener("error", ()=>{ if(img) v.outerHTML = `<img class="hm" src="${esc(img)}" alt="">`; }, true);
}

const chipsHtml = () => TAGS.map(t=>`<button class="chip" data-tag="${t}" aria-pressed="${t===S.tag}">${t}</button>`).join("");
/* 收藏页顶部：收藏的店扇形展开 + 统计 */
function showcase(items){
  const fan = items.slice(0,7), mid = (fan.length-1)/2;
  const n = t => items.filter(b=>b.type===t).length;
  return `<section class="show" aria-label="收藏概览">
    <div class="fan" aria-hidden="true">${fan.map((b,i)=>`<div class="fc" style="--h:${hue(b.name)};--r:${((i-mid)*9).toFixed(1)}deg;--x:${((i-mid)*34).toFixed(0)}px;--y:${(Math.abs(i-mid)*7).toFixed(0)}px;--z:${10-Math.round(Math.abs(i-mid))}"><b>${esc(b.name[0])}</b><span>${esc(b.name)}</span></div>`).join("")}</div>
    <dl class="stats"><div><dd class="num">${items.length}</dd><dt>收藏</dt></div><div><dd class="num">${n("清吧")}</dd><dt>清吧</dt></div><div><dd class="num">${n("啤酒吧")}</dd><dt>啤酒吧</dt></div></dl>
  </section><h3 class="sec">我的收藏</h3>`;
}
function render(){
  const v = $("#view"), items = list();
  document.querySelectorAll("#tabs button").forEach(b=>{ b.dataset.tab===S.tab ? b.setAttribute("aria-current","page") : b.removeAttribute("aria-current") });
  const cityName = (CITIES.find(c=>c.slug===S.city)||{}).name || "";
  const favCount = BARS.filter(b=>S.favs.has(b.id)).length;
  const cityBtn = `<button class="city" id="citybtn" aria-haspopup="dialog" aria-label="切换城市，当前${esc(cityName)}">${esc(cityName||"选择城市")}</button>`;
  const cnt = (n,l) => `<span class="cnt"><b class="num">${S.loading?"–":n}</b><span lang="en">${l}</span></span>`;
  $("#ttl").textContent = TITLES[S.tab];
  $("#hero").hidden = S.tab!=="discover";
  $("#sub").innerHTML = S.tab==="map" ? `<button class="rnd" id="rnd">Random One</button>`
    : S.tab==="fav" ? cnt(favCount,"Saved")+cityBtn : cnt(BARS.length,"Bars In")+cityBtn;
  $("#favn").textContent = favCount || "";
  $("#chips").hidden = S.tab!=="discover";
  $("#chips").innerHTML = S.tab==="discover" ? chipsHtml() : "";
  $("#mchips").innerHTML = S.tab==="map" ? chipsHtml() : "";
  $("#msub").innerHTML = S.tab==="map" ? cnt(BARS.length,"Bars")+cityBtn : "";

  $("#dock").classList.toggle("srch",S.search);
  $("#sbtn").setAttribute("aria-label",S.search?"关闭搜索":"搜索"); $("#sbtn").setAttribute("aria-expanded",S.search);
  $("#q").tabIndex = S.search ? 0 : -1;
  $("#mapwrap").hidden = S.tab!=="map";
  $("#orb").classList.toggle("full",S.full);
  document.body.classList.toggle("lock",S.full);
  if(S.loading || S.failed){ v.className=""; v.innerHTML = S.failed ? `<div class="empty"><b>数据加载失败</b>请检查网络后刷新页面。</div>` : ""; return; }

  const q = S.q.trim();
  const none = (t,d) => `<div class="empty"><b>${t}</b>${d}</div>`;
  if(S.tab==="map"){
    v.className = "";
    v.innerHTML = items.length ? `<div class="grid">${byDistance(items).map((b,i)=>row(b,i,true)).join("")}</div>` : none(q?"没有结果":"没有找到匹配的酒吧", "换个关键词或筛选试试。");
    showMap();
    return;
  }
  v.className = S.first ? "in" : "";
  S.first = false;
  if(S.tab==="fav"){
    const all = BARS.filter(b=>S.favs.has(b.id));
    v.innerHTML = !all.length ? none("还没有收藏","打开一家店，点「收藏」，就会出现在这里。")
      : (q?"":showcase(all)) + (items.length ? `<div class="list">${items.map((b,i)=>row(b,i)).join("")}</div>` : none("没有结果","换个关键词试试。"));
    return;
  }
  v.innerHTML = items.length
    ? `<div class="list">${items.map((b,i)=>row(b,i)).join("")}</div>${q?"":`<footer class="foot"><button id="contact">合作联系</button></footer>`}`
    : none(q?"没有结果":"没有找到匹配的酒吧","换个关键词试试。");
}

function openSheet(html){ $("#sheet").innerHTML = html; $("#sheet").scrollTop = 0; $("#wrap").classList.add("open"); }
function closeSearch(){ S.search=false; S.q=""; $("#q").value=""; $("#q").blur(); render(); }
function setFull(on){ S.full=on; if(!on) S.focus=null; render(); }
function cityPicker(){
  openSheet(`<div class="in-b"><h2>选择城市</h2><ul class="cities">${CITIES.map(c=>`<li><button data-city="${esc(c.slug)}" aria-current="${c.slug===S.city}"><span>${esc(c.name)}</span><small>${c.count} 家</small></button></li>`).join("")}</ul><p class="desc">更多城市陆续收录中。</p></div>`);
}
function closeSheet(){ $("#wrap").classList.remove("open"); }

function detail(id){
  const b = BARS.find(x=>x.id===id); if(!b) return;
  const on = S.favs.has(id), nav = navUrl(b);
  const fact = (k,v)=> v ? `<div class="fact"><dt>${k}</dt><dd>${esc(v)}</dd></div>` : "";
  openSheet(`${cover(b)}<div class="in-b"><h2>${esc(b.name)}</h2>
    <div class="chiprow"><span>${esc(b.type)}</span>${badges(b)}</div>
    <dl class="facts">${fact("营业时间",hoursText(b))}${fact("地址",b.district+" · "+b.addr)}</dl>
    ${LINKS.some(([k])=>safeUrl(b[k]))?`<ul class="links">${LINKS.filter(([k])=>safeUrl(b[k])).map(([k,l])=>`<li><a href="${esc(safeUrl(b[k]))}" target="_blank" rel="noopener noreferrer">${l}<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3h7v7M13 3 4 12"/></svg></a></li>`).join("")}</ul><p class="note">链接会跳转到小红书或抖音，内容由商家发布。</p>`:""}
    <div class="acts"><button class="btn alt" data-fav="${esc(id)}">${on?"取消收藏":"收藏"}</button>${hasLoc(b)?`<button class="btn alt" data-map="${esc(id)}">在地图上看</button>`:""}${nav?`<a class="btn" href="${esc(nav)}" target="_blank" rel="noopener">导航到这里</a>`:""}</div></div>`);
}

document.addEventListener("click", e=>{
  const t = e.target.closest("[data-open],[data-fav],[data-tag],[data-tab],[data-map],[data-close],[data-city],#citybtn,#contact,#sbtn,#rnd,#orbhit,#orbx");
  if(!t) return;
  const d = t.dataset;
  if(d.open) detail(d.open);
  else if(d.fav){
    const id=d.fav; S.favs.has(id)?S.favs.delete(id):S.favs.add(id); save();
    toast(S.favs.has(id)?"已收藏":"已取消收藏"); render();
    if($("#wrap").classList.contains("open") && t.classList.contains("btn")) detail(id);
  }
  else if(d.tag){ S.tag=d.tag; render(); }
  else if(d.tab){ S.tab=d.tab; S.focus=null; S.full=false; render(); scrollTo({top:0}); }
  else if(d.map){ S.search=false; S.q=""; $("#q").value=""; S.tab="map"; S.focus=d.map; S.full=true; closeSheet(); render(); }
  else if("close" in d) closeSheet();
  else if(t.id==="citybtn") cityPicker();
  else if(d.city){ closeSheet(); if(d.city!==S.city){ S.city=d.city; saveCity(); S.tag="全部"; S.focus=null; BARS=[]; S.first=true; loadData(); scrollTo({top:0}); } }
  else if(t.id==="contact") toast("合作邮箱即将开放");
  else if(t.id==="sbtn"){ if(S.search) closeSearch(); else { S.search=true; render(); $("#q").focus(); } }
  else if(t.id==="orbhit") setFull(true);
  else if(t.id==="orbx") setFull(false);
  else if(t.id==="rnd"){ const a = list(); if(a.length) detail(a[Math.floor(Math.random()*a.length)].id); else toast("没有可选的酒吧"); }

});
$("#q").addEventListener("input", e=>{ S.q=e.target.value; render(); });
document.addEventListener("keydown", e=>{ if(e.key==="Escape"){ if(S.full && !$("#wrap").classList.contains("open")) setFull(false); else if($("#wrap").classList.contains("open")) closeSheet(); else if(S.search) closeSearch(); } });
$("#q").addEventListener("keydown", e=>{ if(e.key==="Enter") e.target.blur(); });
loadData();
askGeo();
