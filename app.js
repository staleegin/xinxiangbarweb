/* 酒吧数据来自商家清单“红旗区酒吧清单_11家.xlsx”。lnglat 为高德坐标；没有 lnglat 时按 poi / addr 定位。*/
const BARS = [
  {"id":1,"name":"有水金屋","area":"红旗区","addr":"友谊路豫飞盛世城邦东南角商铺","lnglat":[113.895978,35.293199],"h":48,"hours":"19:00–01:30","tags":["金酒吧","禁烟","包豪斯风"],"desc":"新乡少有的禁烟金酒吧，特调出品稳定，靠窗有沙发卡座，适合社恐或喜欢安静微醺的人。","menu":[["冰镇西瓜金汤力"],["无花果风味尼格罗尼"],["糯香甜瓜金汤力"],["荔枝马天尼"]]},
  {"id":2,"name":"酉时茶酒商店","area":"红旗区","addr":"平原路路北小北街朝北二十米路西白色门头","lnglat":[113.878045,35.305715],"h":28,"hours":"18:30–01:00","tags":["中式复古","茶酒空间","巷子里"],"desc":"满屋老物件随手拍出片，晚上灯光微醺，适合一个人放空或朋友轻声聊天。","menu":[["王致和特调"],["女巫的毒药"],["胡椒是唯一调料"],["南瓜酸"]]},
  {"id":3,"name":"肆野酒馆","area":"红旗区","addr":"牧野桥北西侧小路西行150米","lnglat":[113.910275,35.309275],"h":165,"hours":"17:00–02:00","tags":["精酿","氛围感","牧野湖旁"],"desc":"环境舒适，暖光加温柔音乐，果香花香特调顺滑不呛口，微醺刚刚好。","menu":[["芭比（芭乐特调）"],["花生酱啤酒"],["酸爵士"],["杨梅桑葚小啤啤"]]},
  {"id":4,"name":"CureLab隐浔","area":"红旗区","addr":"人民东路忆通壹世界","lnglat":[113.90964,35.301035],"h":210,"hours":"19:00–02:00","tags":["静吧","治愈系","性价比高"],"desc":"环境安静有格调，酒单盲选不踩雷，适合小酌放松。","menu":[["拉莫斯"],["教父"],["橙红冰饮"],["菠萝片特调"]]},
  {"id":5,"name":"老友记bar","area":"红旗区","addr":"宏力大道(东)与牧野大道(北)交叉口东260米","lnglat":[113.918025,35.317275],"h":12,"hours":"19:00–02:00","tags":["朋友聚会","可自带零食","小包间"],"desc":"有类似卡座的小包间，老板随性亲切，氛围友好。","menu":[["威士忌酸"],["嗨棒"],["橙花"],["咸狗"]]},
  {"id":6,"name":"醺觅Bar","area":"红旗区","addr":"新中大道路北互联网大厦22层2205","lnglat":[113.929692,35.296774],"h":270,"hours":"18:00–02:00","tags":["高空静吧","美式复古","出片"],"desc":"对面就是宝龙环湖，灯光色调偏暗偏暖，调酒师有自己见解，适合聊天听音乐。","menu":[["芥末苹果"],["冬季限定热黄油啤酒"],["手画特调"]]},
  {"id":7,"name":"麝香鹿","area":"红旗区","addr":"新闻大厦 21层","lnglat":[113.928578,35.296871],"h":300,"hours":"19:00–02:00","tags":["高空静吧","西部酒吧风","创意特调"],"desc":"自带沉稳高级气质，创意预调酒风味脑洞大开，口感惊喜。","menu":[["康普茶特调"],["创意预调酒"]]},
  {"id":8,"name":"MARCH YU三玉酒吧","area":"红旗区","addr":"央棠9号楼101室","lnglat":[113.880738,35.294677],"h":140,"hours":"18:00 左右","tags":["猫咪酒馆","暖色调","治愈"],"desc":"店主养了好几只猫咪，点一杯金菲士，氛围很治愈。","menu":[["金菲士"],["基础鸡尾酒"]]},
  {"id":9,"name":"Cozy·糖醋屋","area":"红旗区","addr":"牧野大道166号天安名邸南北区营业裙房7-5号房","lnglat":[113.912325,35.297975],"h":330,"hours":"17:00–02:00","tags":["治愈系","果味特调","禁烟"],"desc":"暖光木质桌椅，主打自制材料果味特调，颜值高，店内禁止抽烟。","menu":[["自制材料果味特调"]]},
  {"id":10,"name":"一宿精酿","area":"红旗区","addr":"胜利中街76号一楼西数第四户","lnglat":[113.873878,35.306794],"h":95,"hours":"营业时间暂未明确","tags":["精酿","工业风","酒头丰富"],"desc":"简约工业风，酒头种类多，老板专业会讲解风味，适合精酿爱好者。","menu":[["花生酱啤酒"],["酸爵士"],["各种果泥酸啤和浑浊 IPA"]]},
  {"id":11,"name":"白夜Space-bar","area":"红旗区","addr":"平原路与新生巷交叉口北160米","lnglat":[113.874821,35.306804],"h":230,"hours":"营业时间暂未明确","tags":["高性价比","小巷子","氛围好"],"desc":"靠近胖东来，价格亲民，老板会随季节调整酒单，氛围轻松。","menu":[["小甜菜"],["威士忌酸"],["尼格罗尼"],["秋季限定特调"]]}
];
const TAGS = ["全部","静吧","精酿","禁烟","治愈系","性价比","高空"];
const $ = s => document.querySelector(s);
const S = {q:"", tag:"全部", tab:"discover", focus:null, favs:new Set(load()), first:true};

function load(){ try{ return JSON.parse(localStorage.getItem("ba-favs")||"[]") }catch{ return [] } }
function save(){ try{ localStorage.setItem("ba-favs", JSON.stringify([...S.favs])) }catch{} }
function toast(t){ const e=$("#toast"); e.textContent=t; e.classList.add("show"); clearTimeout(toast.t); toast.t=setTimeout(()=>e.classList.remove("show"),1600) }
const heart = '<svg viewBox="0 0 20 20"><path d="M10 16.5S3.5 12.6 3.5 7.9A3.4 3.4 0 0 1 10 6.3a3.4 3.4 0 0 1 6.5 1.6c0 4.7-6.5 8.6-6.5 8.6Z"/></svg>';
const cover = b => `<div class="cover" style="--h:${b.h}"><b aria-hidden="true">${b.name[0]}</b>${b.demo?'<i class="demo">示例</i>':""}<small class="num">${b.km!=null?b.km+" km":b.area}</small></div>`;

const CFG = window.AMAP_CONFIG || {};
const esc = s => String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const hasLoc = b => !b.demo && !!(b.lnglat || b.poi || b.addr);
/* 高德 URI：移动端调起高德 App 并定位到该店，页面里可直接点“路线”；电脑端打开网页版 */
const navUrl = b => {
  const p = b.lnglat || (b.pos && [b.pos.lng, b.pos.lat]);
  return p ? "https://uri.amap.com/marker?position="+p[0]+","+p[1]+"&name="+encodeURIComponent(b.name)+"&src=bar-atlas&coordinate=gaode&callnative=1" : "";
};
const mk = (b,on) => `<div class="mk${on?" on":""}"><span>${esc(b.name)}</span><i></i></div>`;
const M = {map:null, geo:null, markers:new Map(), q:Promise.resolve()};

let amapP;
function loadAMap(){
  if(amapP) return amapP;
  amapP = new Promise((ok,no)=>{
    if(!CFG.key) return no(new Error("未配置 Key"));
    window._AMapSecurityConfig = {securityJsCode:CFG.securityJsCode};
    const s = document.createElement("script");
    s.src = "https://webapi.amap.com/maps?v=2.0&key="+encodeURIComponent(CFG.key)+"&plugin=AMap.Geocoder,AMap.PlaceSearch";
    s.onload = () => window.AMap ? ok(window.AMap) : no(new Error("高德脚本未就绪"));
    s.onerror = () => no(new Error("脚本加载失败"));
    document.head.appendChild(s);
  });
  amapP.catch(()=>{ amapP = null; });
  return amapP;
}

const inXinxiang = l => l.lng>113.2 && l.lng<115 && l.lat>34.8 && l.lat<35.9;

function byName(AMap,b){
  return new Promise((ok,no)=>{
    const ps = new AMap.PlaceSearch({city:CFG.city||"新乡",citylimit:true,pageSize:5});
    ps.search(b.poi,(st,r)=>{
      const pois = st==="complete" && r.poiList ? r.poiList.pois : [];
      const hit = pois.find(p=>p.location && p.name.includes(b.poi) && inXinxiang(p.location));
      hit ? ok(hit.location) : no(new Error("没有搜到“"+b.poi+"”"));
    });
  });
}

function byAddr(b){
  return new Promise((ok,no)=>M.geo.getLocation(b.addr,(st,r)=>{
    if(st==="complete" && r.geocodes && r.geocodes.length) ok(r.geocodes[0].location);
    else no(new Error(typeof r==="string" ? r : "地址解析失败"));
  }));
}

/* 定位优先级：手写坐标 > 按店名搜索 > 地址解析 */
async function locate(AMap,b){
  if(b.pos) return b.pos;
  if(b.lnglat) return b.pos = new AMap.LngLat(b.lnglat[0],b.lnglat[1]);
  if(b.poi){
    try{ return b.pos = await byName(AMap,b); }
    catch(e){ if(!b.addr) throw e; }
  }
  return b.pos = await byAddr(b);
}

async function drawMap(){
  const err = $("#maperr"); err.textContent = "";
  try{
    const AMap = await loadAMap();
    if(S.tab!=="map") return;
    if(!M.map){
      const dark = matchMedia("(prefers-color-scheme: dark)").matches;
      M.map = new AMap.Map("amap",{zoom:13,center:[113.927,35.303],mapStyle:dark?"amap://styles/dark":"amap://styles/normal"});
      M.geo = new AMap.Geocoder({city:CFG.city||"新乡"});
    } else if(M.map.resize) M.map.resize();
    const show = new Set(list().filter(hasLoc).map(b=>b.id));
    for(const b of BARS.filter(hasLoc)){
      if(!M.markers.has(b.id)){
        try{
          const m = new AMap.Marker({position:await locate(AMap,b),anchor:"bottom-center",content:mk(b,false)});
          m.on("click",()=>detail(b.id)); M.map.add(m); M.markers.set(b.id,m);
        }catch(e){ err.textContent = "“"+b.name+"”定位失败："+e.message; continue; }
      }
      const m = M.markers.get(b.id);
      show.has(b.id) ? m.show() : m.hide();
      m.setContent(mk(b,S.focus===b.id));
    }
    const f = M.markers.get(S.focus);
    if(f) M.map.setZoomAndCenter(16,f.getPosition());
    else{
      const vis = [...M.markers].filter(([id])=>show.has(id)).map(([,m])=>m);
      if(vis.length) M.map.setFitView(vis,false,[70,70,70,70],15);
    }
  }catch(e){ err.textContent = "地图暂时无法加载（"+e.message+"）。请检查 config.js 的 Key、域名白名单和网络。"; }
}
const showMap = () => (M.q = M.q.then(drawMap));

function list(){
  const q = S.q.trim().toLowerCase();
  return BARS.filter(b =>
    (S.tab!=="fav" || S.favs.has(b.id)) &&
    (S.tag==="全部" || b.tags.some(t=>t.includes(S.tag))) &&
    (!q || (b.name+b.area+(b.addr||"")+b.tags.join()+b.menu.map(m=>m[0]).join()).toLowerCase().includes(q))
  ).sort((a,b)=>(!!a.demo-!!b.demo)||((a.km||0)-(b.km||0)));
}

function card(b,i){
  const on = S.favs.has(b.id);
  return `<article class="card" style="--i:${i}">${cover(b)}
    <div class="body"><h2><button class="open" data-open="${b.id}">${b.name}</button></h2>
      <div class="meta"><span>${b.area}</span></div>
      <div class="tags">${b.tags.map(t=>`<span>${t}</span>`).join("")}</div></div>
    <button class="fav" data-fav="${b.id}" aria-pressed="${on}" aria-label="${on?"取消收藏":"收藏"}${b.name}">${heart}</button></article>`;
}

function render(){
  const v = $("#view"), items = list();
  document.querySelectorAll("#tabs button").forEach(b=>b.removeAttribute("aria-current"));
  document.querySelectorAll("#tabs button").forEach(b=>{ if(b.dataset.tab===S.tab) b.setAttribute("aria-current","page") });
  $("#favn").textContent = S.favs.size || "";
  $("#chips").innerHTML = TAGS.map(t=>`<button class="chip" data-tag="${t}" aria-pressed="${t===S.tag}">${t}</button>`).join("");

  $("#mapwrap").hidden = S.tab!=="map";
  if(S.tab==="map"){
    const real = items.filter(hasLoc);
    v.className = "";
    v.innerHTML = real.length ? `<div class="grid">${real.map(card).join("")}</div>` : `<div class="empty"><b>没有可在地图上显示的酒吧</b>换个关键词，或清除筛选再试。</div>`;
    showMap();
    return;
  }
  v.className = S.first ? "in" : "";
  S.first = false;
  v.innerHTML = items.length
    ? `<p class="count num">${S.tab==="fav"?"已收藏 ":"共 "}${items.length} 家酒吧${items.some(b=>b.demo)?"，标“示例”的为虚构数据":""}</p><div class="grid">${items.map(card).join("")}</div>`
    : `<div class="empty"><b>${S.tab==="fav"?"还没有收藏":"没有找到匹配的酒吧"}</b>${S.tab==="fav"?"在酒吧卡片右上角点心形按钮，就会出现在这里。":"换个关键词，或清除筛选再试。"}</div>`;
}

function openSheet(html){ $("#sheet").innerHTML = html; $("#sheet").scrollTop = 0; $("#wrap").classList.add("open"); }
function closeSheet(){ $("#wrap").classList.remove("open"); }

function detail(id){
  const b = BARS.find(x=>x.id===id), on = S.favs.has(id);
  const stat = (k,v)=>`<div><small>${k}</small><b>${v}</b></div>`;
  openSheet(`${cover(b)}<div class="in-b"><h2>${b.name}</h2><p class="meta">${b.area}　${b.hours}</p>${b.addr?`<p class="desc">${b.addr}</p>`:""}
    ${b.km!=null?`<div class="stats num">${stat("距离",b.km+" km")}</div>`:""}
    ${b.desc?`<p class="desc">${b.desc}</p>`:""}
    <div class="menu"><h3>酒单</h3>${b.menu.length?`<ul>${b.menu.map(m=>`<li><span class="n">${esc(m[0])}${m[1]?`<small>${esc(m[1])}</small>`:""}</span>${m[2]?`<span class="p num">¥${esc(m[2])}</span>`:""}</li>`).join("")}</ul>${b.menu.some(m=>!m[2])?`<p class="desc">单杯价格待补充。</p>`:""}`:`<p class="desc">酒单待补充。</p>`}</div>
    <div class="acts"><button class="btn alt" data-fav="${id}">${on?"取消收藏":"收藏"}</button>${hasLoc(b)?`<button class="btn alt" data-map="${id}">在地图上看</button>`:""}${navUrl(b)?`<a class="btn" href="${esc(navUrl(b))}" target="_blank" rel="noopener">导航到这里</a>`:""}</div></div>`);
}

function joinForm(){
  openSheet(`<div class="form"><h2>商家入驻</h2><p class="desc">留下联系方式，我们会在收到后与你确认酒单与营业信息。</p>
    <input id="j1" placeholder="酒吧名称" autocomplete="organization"><input id="j2" placeholder="联系人和电话 / 微信" autocomplete="tel">
    <textarea id="j3" placeholder="地址、营业时间、酒单亮点（选填）"></textarea>
    <div class="acts"><button class="btn alt" data-close>取消</button><button class="btn" id="jsend">生成申请邮件</button></div></div>`);
}

document.addEventListener("click", e=>{
  const t = e.target.closest("[data-open],[data-fav],[data-tag],[data-tab],[data-map],[data-close],#join,#jsend");
  if(!t) return;
  const d = t.dataset;
  if(d.open) detail(+d.open);
  else if(d.fav){
    const id=+d.fav; S.favs.has(id)?S.favs.delete(id):S.favs.add(id); save();
    toast(S.favs.has(id)?"已收藏":"已取消收藏"); render();
    if($("#wrap").classList.contains("open") && t.classList.contains("btn")) detail(id);
  }
  else if(d.tag){ S.tag=d.tag; render(); }
  else if(d.tab){ S.tab=d.tab; S.focus=null; render(); scrollTo({top:0}); }
  else if(d.map){ S.tab="map"; S.focus=+d.map; closeSheet(); render(); scrollTo({top:0}); }
  else if("close" in d) closeSheet();
  else if(t.id==="join") joinForm();
  else if(t.id==="jsend"){
    const body = `酒吧名称：${$("#j1").value}\n联系方式：${$("#j2").value}\n补充：${$("#j3").value}`;
    location.href = "mailto:hello@example.com?subject=" + encodeURIComponent("商家入驻申请") + "&body=" + encodeURIComponent(body);
    closeSheet();
  }
});
$("#q").addEventListener("input", e=>{ S.q=e.target.value; render(); });
document.addEventListener("keydown", e=>{ if(e.key==="Escape") closeSheet(); });
render();
