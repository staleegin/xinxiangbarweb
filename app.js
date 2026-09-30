/* 示例数据：酒吧名称、价格、位置均为虚构，请替换为真实信息 */
const BARS = [
  {id:1,demo:true,name:"半盏",area:"平原路",h:28,km:0.8,hours:"19:00–02:00",tags:["鸡尾酒","约会","安静"],
   desc:"吧台只有八个座位，调酒师会先问你今天想喝什么心情。",
   menu:[["新乡日落","龙舌兰 / 柚子 / 盐","48"],["烟熏老广场","波本 / 烟熏糖浆","58"],["白桃乌龙","金酒 / 乌龙茶","52"],["山野（无酒精）","青提 / 迷迭香","32"]]},
  {id:2,demo:true,name:"麦芽与灯",area:"金穗大道",h:38,km:1.6,hours:"20:00–03:00",tags:["威士忌","安静"],
   desc:"墙上一整面威士忌，单杯起价清楚标在酒单上，不用开口问。",
   menu:[["麦卡伦 12年","单一麦芽 / 30ml","68"],["拉加维林 16年","艾雷岛 / 30ml","98"],["山崎 Distiller's","日威 / 30ml","88"],["经典 Old Fashioned","波本 / 苦精","58"]]},
  {id:3,demo:true,name:"河岸 Live",area:"卫河边",h:12,km:2.3,hours:"20:30–02:30",tags:["Live Music","鸡尾酒"],
   desc:"周四到周日有驻唱，靠窗的位置能看到河，适合朋友聚。",
   menu:[["长岛冰茶","五种基酒","46"],["莫吉托","朗姆 / 薄荷","42"],["精酿 IPA","330ml","38"],["小食拼盘","薯条 / 鸡翅","48"]]},
  {id:4,demo:true,name:"二楼",area:"新乡站附近",h:210,km:3.1,hours:"19:30–01:30",tags:["约会","鸡尾酒"],
   desc:"藏在老楼二层，灯光很暗，桌与桌之间隔得很开。",
   menu:[["玫瑰 Spritz","气泡酒 / 玫瑰","56"],["黑醋栗 Negroni","金酒 / 味美思","62"],["柠檬塔","伏特加 / 柠檬","54"],["起司盘","三种起司","68"]]},
  {id:5,demo:true,name:"静水",area:"人民路",h:165,km:1.2,hours:"18:00–00:30",tags:["安静","威士忌"],
   desc:"不放音乐，只有雨天才开一盏灯。适合一个人坐着。",
   menu:[["格兰菲迪 12年","单一麦芽 / 30ml","48"],["热威士忌托迪","蜂蜜 / 柠檬","42"],["手冲冷萃","埃塞俄比亚","28"]]},
  {id:6,demo:true,name:"回声地下",area:"平原路",h:300,km:0.9,hours:"21:00–03:30",tags:["Live Music"],
   desc:"小型乐队现场，周末场地较满，建议早点到。",
   menu:[["精酿啤酒","330ml","32"],["杰克丹尼可乐","威士忌 / 可乐","42"],["Shot 三连","龙舌兰","45"]]},
  {id:7,demo:true,name:"琥珀间",area:"胜利街",h:45,km:1.9,hours:"20:00–02:30",tags:["威士忌","约会"],
   desc:"暖黄色灯光，吧台后面的雪莉桶威士忌是店里的招牌。",
   menu:[["雅柏 10年","艾雷岛 / 30ml","58"],["格兰杰 雪莉桶","单一麦芽 / 30ml","72"],["威士忌酸","波本 / 柠檬 / 蛋白","56"],["黑巧克力配酒","三块","36"]]},
  {id:8,demo:true,name:"夜航",area:"荣校路",h:230,km:2.7,hours:"20:00–03:00",tags:["鸡尾酒","Live Music"],
   desc:"以航海为主题，周五周六有爵士三重奏，酒单按“航线”分类。",
   menu:[["北航线","金酒 / 接骨木花","52"],["南十字星","朗姆 / 菠萝 / 肉桂","54"],["深水炸弹","龙舌兰 / 啤酒","48"],["海盐柠檬苏打（无酒精）","柠檬 / 海盐","30"]]},
  {id:9,demo:true,name:"隔壁老王",area:"卫滨区",h:95,km:1.5,hours:"17:30–00:00",tags:["安静"],
   desc:"社区里的小酒馆，老板记得常客爱喝什么，价格很友好。",
   menu:[["原浆啤酒","500ml","22"],["青梅酒","冰镇","26"],["毛豆花生","一份","12"],["卤味拼盘","四样","38"]]},
  {id:10,demo:true,name:"雾灯",area:"红旗区",h:180,km:2.1,hours:"19:00–01:30",tags:["约会","安静","鸡尾酒"],
   desc:"卡座带布帘，聊天声音不会传到隔壁，适合第二次约会。",
   menu:[["雾中花园","金酒 / 黄瓜 / 罗勒","56"],["无花果 Old Fashioned","波本 / 无花果","62"],["茉莉气泡","伏特加 / 茉莉","52"],["双人小食盘","水果 / 芝士","78"]]},
  {id:11,demo:true,name:"黑胶与冰",area:"牧野区",h:330,km:3.6,hours:"20:30–03:00",tags:["Live Music","威士忌"],
   desc:"黑胶唱片墙加小舞台，周末有独立乐队，威士忌按整瓶或单杯卖。",
   menu:[["尊尼获加 黑牌","调和 / 30ml","38"],["水牛足迹","波本 / 30ml","42"],["威士忌可乐桶","4 杯装","128"],["精酿黑啤","330ml","36"]]},
  {id:12,demo:true,name:"南窗",area:"平原路",h:140,km:1.1,hours:"14:00–00:30",tags:["约会","安静"],
   desc:"下午就开门，白天喝咖啡，天黑后换成酒，窗边位置最抢手。",
   menu:[["桂花拿铁","热 / 冰","28"],["气泡青提","青提 / 气泡水","34"],["雪莉 Spritz","菲诺雪莉 / 气泡","48"],["提拉米苏","一份","32"]]},
  {id:13,demo:true,name:"醉月台",area:"凤泉区",h:15,km:4.2,hours:"19:30–02:00",tags:["鸡尾酒","威士忌"],
   desc:"有一个小露台，天气好的晚上可以坐在外面，酒单跟着季节换。",
   menu:[["秋日桂花","威士忌 / 桂花 / 蜂蜜","62"],["山楂 Negroni","金酒 / 山楂","58"],["响 Harmony","日威 / 30ml","98"],["热红酒","肉桂 / 橙皮","46"]]},
  {id:14,demo:true,name:"十七号",area:"人民路",h:270,km:1.8,hours:"21:00–03:00",tags:["Live Music","鸡尾酒"],
   desc:"开放麦之夜每周三，任何人都可以上台，酒单短但每款都便宜。",
   menu:[["开放麦特调","伏特加 / 蔓越莓","36"],["杜松子汤力","金酒 / 汤力水","38"],["龙舌兰日出","龙舌兰 / 橙汁","40"],["啤酒塔","2 升","88"]]},
  {id:15,name:"有水金屋",area:"红旗区",addr:"新乡市红旗区友谊路399号",lnglat:[113.895978,35.293199],poi:"有水金屋",h:48,hours:"19:00–01:30",tags:["鸡尾酒"],desc:"",menu:[]}
];
const TAGS = ["全部","鸡尾酒","威士忌","约会","安静","Live Music"];
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
    (S.tag==="全部" || b.tags.includes(S.tag)) &&
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
    <div class="stats num">${stat("距离",b.km!=null?b.km+" km":"—")}${stat("酒单",b.menu.length?b.menu.length+" 款":"待补充")}</div>
    ${b.desc?`<p class="desc">${b.desc}</p>`:""}
    <div class="menu"><h3>酒单与单杯价格</h3>${b.menu.length?`<ul>${b.menu.map(m=>`<li><span class="n">${m[0]}<small>${m[1]}</small></span><span class="p num">¥${m[2]}</span></li>`).join("")}</ul>`:`<p class="desc">酒单待补充。</p>`}</div>
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
