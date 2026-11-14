"use strict";
const $ = id => document.getElementById(id);
const clamp = (v,a,b) => Math.max(a, Math.min(b, v));
const rnd = (a,b) => a + Math.random()*(b-a);
const money = n => "$" + Math.round(n).toLocaleString("en-US");
const tFmt = n => "+$" + (n/1e12).toFixed(2) + "T";
const DEBT0 = 38412905221114;

const DIFFS = {
  intern: {drift:0.8, noise:0.55, warn:0.80, warn2:0.90},
  chair:  {drift:1.0, noise:1.0,  warn:0.74, warn2:0.86},
  legend: {drift:1.22, noise:1.4, warn:0.70, warn2:0.82}
};

const ITEMS = [
  {name:"BLAME SUPPLY CHAINS", side:"hot"},
  {name:'"TRANSITORY" SPEECH', side:"hot"},
  {name:"BLAME CORPORATE GREED", side:"hot"},
  {name:"BLAME GOVERNMENT SPENDING", side:"hot"},
  {name:"EMERGENCY QE", side:"cold"},
  {name:"RATE SHOCK THERAPY", side:"cold"},
  {name:"EMERGENCY PRESS CONFERENCE", side:"any"}
];

const FAKE_HALL = [
  {name:"Printy McPrintface", status:"SURVIVED", months:48, debt:6.1},
  {name:"Steady Eddie", status:"SURVIVED", months:48, debt:7.4},
  {name:"Hawkish Hank", status:"SURVIVED", months:47, debt:8.9},
  {name:"Dovish Dan", status:"RESIGNED", months:44, debt:9.8},
  {name:"Goldie", status:"OUSTED - INFLATION", months:41, debt:11.2},
  {name:"Ratey Katie", status:"IMPEACHED", months:39, debt:8.1},
  {name:"Chairman Moe", status:"OUSTED - RECESSION", months:36, debt:7.7},
  {name:"Old Man Winters", status:"RESIGNED", months:33, debt:6.9}
];

let S = null;
function freshState(){
  return {
    screen:"title", playing:false, paused:false, ended:false,
    month:1, week:1, inf:2.4, rate:5.0, u:4.2, debt:DEBT0,
    priceLevel:1, needle:0.5, item:ITEMS[0], itemIn:0,
    history:[], wire:[], unread:0, ladder:0, dangerRun:0, lives:5, meetings:0, scarHot:0, scarCold:0, streetDrift:1, sbr:false, sbrDone:false, btcPrice:97400, btcHeld:0,
    war:false, warLeft:0, gasMult:1, gasFrozen:false, freezeLeft:0,
    jekyllDone:false, scandalDone:false, bailoutDone:false, corpDone:false,
    controlsLeft:0, lieLeft:0, shockInf:0, shockGdpHit:false, lastEvent:-9, warDone:false,
    neutral:4.6, infVel:0, uVel:0,
    gdp:2.1, gdpVel:0, distort:0, bustCd:0, peakDistort:0,
    frozenGas:null,
    warnedR:0, warnedL:0, peakInf:2.4, devSum:0, closest:0.5,
    diff:"chair", settings:{sfx:true, music:true, ticker:true, haptics:false, track:0},
    scene:"normal", endType:null
  };
}

/* ---------- news wire ---------- */
function clock(){ return "M" + S.month + " W" + S.week; }
let lastDum = 0;
function pushWire(src, head, opts){
  opts = opts || {};
  S.wire.unshift({src:src, head:head, time:clock(), brk:!!opts.brk, warn:!!opts.warn, oped:!!opts.oped, read:false});
  if(S.wire.length > 30) S.wire.pop();
  if(!$("screenWire") || $("screenWire").classList.contains("hidden")){ S.unread++; }
  renderWire();
  if(S.playing){ const t = performance.now(); if(t - lastDum > 900){ lastDum = t; sfx("dum"); } }
}
function streetHeat(){ return clamp(1 + (S.inf - 2) * 1.0, 0.5, 30); }
function gasNow(){ return 3.49 * S.priceLevel * S.gasMult * streetHeat(); }
function eggsNow(){ return 2.99 * S.priceLevel * streetHeat(); }
let wobT = 0;
function gasLive(){
  const w = 1 + 0.011 * Math.sin(wobT / 700) + 0.006 * Math.sin(wobT / 263 + 1.7);
  return gasNow() * (S.streetDrift || 1) * w;
}
function eggsLive(){
  const w = 1 + 0.008 * Math.sin(wobT / 810 + 0.6) + 0.005 * Math.sin(wobT / 311 + 3.1);
  return eggsNow() * (S.streetDrift || 1) * w;
}

function ambientHeadline(){
  const g = gasNow(), e = eggsNow();
  const pool = [];
  if(S.inf >= 6) pool.push(["Main Street Post", "Eggs hit $" + e.toFixed(2) + " a dozen. Nobody is laughing."]);
  if(S.inf >= 4) pool.push(["Savers\u2019 Gazette", "Pensions lost ground again this month. Retirees are noticing."]);
  if(S.inf >= 3) pool.push(["Union Daily", "Workers demand raises that match the prices. All of them."]);
  if(S.u >= 7) pool.push(["Main Street Post", "The line at the job centre now starts before sunrise."]);
  if(S.u >= 5.5) pool.push(["Union Daily", "Another plant cuts shifts. The canteen is quiet."]);
  if(S.rate >= 7) pool.push(["Bond Watch", "Borrowers are screaming. Bondholders are not."]);
  if(S.rate <= 3) pool.push(["Bond Watch", "Cheap money is back. So are the wild ideas."]);
  if(S.distort >= 35) pool.push(["Main Street Post", "Cranes everywhere. Half the new projects have no buyers yet."]);
  if(S.distort >= 55) pool.push(["Bond Watch", "Condos, apps, a monorail to nowhere: all pencilled at cheap rates."]);
  if(S.distort >= 70) pool.push(["Savers\u2019 Gazette", "These projects only work if money stays free forever. It will not."]);
  if(g >= 6) pool.push(["Main Street Post", "Gas at $" + g.toFixed(2) + ". Drivers are doing the maths out loud."]);
  if(S.inf >= 2.5) pool.push(["Main Street Post", "Rents renewed this month. Nobody renewed cheap."]);
  if(S.priceLevel > 1.05) pool.push(["Main Street Post", "Coffee is up again. The cafe blames everything."]);
  if(S.inf >= 3.5) pool.push(["Main Street Post", "Used cars cost more than new ones did. Somehow."]);
  if(S.priceLevel > 1.12) pool.push(["Main Street Post", "Bread costs what cake used to. The street noticed."]);
  pool.push(["Hill Insider", "On the record: this bank was drafted at a duck hunt in Georgia in 1910. A duck hunt."]);
  pool.push(["Hill Insider", "Seven men, first names only, one private train from Hoboken. That is the founding paperwork."]);
  pool.push(["Main Street Post", "The Jekyll Island clubhouse still keeps the room. It is called the Federal Reserve Room."]);
  pool.push(["Savers\u2019 Gazette", "A founder confessed in 1935: 'I was as secretive as any conspirator. We left our last names behind.'"]);
  pool.push(["Savers\u2019 Gazette", "Opinion: the Creature sends its regards.", {oped:true}]);
  pool.push(["Hill Insider", "A later audit counted $16 trillion in secret emergency loans. The street got a comment period."]);
  pool.push(["Bond Watch", "The bank buys corporate bonds now. Even the junk ones. Especially the junk ones."]);
  pool.push(["Savers\u2019 Gazette", "The dollar has lost over 96% of its value since 1913. The bank calls this 'about 2% a year'."]);
  pool.push(["Main Street Post", "Member banks own the regional banks and draw a fixed 6% dividend. Ownership has privileges."]);
  pool.push(["Union Daily", "Zombie firms walk again: kept alive by cheap credit, eating the living."]);
  pool.push(["Hill Insider", "Reserve requirements have been zero since March 2020. The vault is a vibe now."]);
  pool.push(["Main Street Post", "A chair once took rates to 20% on purpose. Old-timers still whisper about it."]);
  pool.push(["Savers\u2019 Gazette", "Opinion: price-fixing is illegal, unless the price is money.", {oped:true}]);
  pool.push(["Hill Insider", "Senators ask, again, who exactly is in charge of prices."]);
  pool.push(["Hill Insider", "The Hill blames the chair. The chair blames the data."]);
  pool.push(["Main Street Post", "The street is calm. The street is watching."]);
  pool.push(["Main Street Post", "The bakery raised prices a little and apologised a lot."]);
  pool.push(["Bond Watch", "Bond traders nap. Yields drift. Nobody panics, yet."]);
  pool.push(["Savers\u2019 Gazette", "Opinion: the printer is not a policy.", {oped:true}]);
  const recent = S.wire.slice(0, 8).map(w => w.head);
  const fresh = pool.filter(p => recent.indexOf(p[1]) === -1);
  const pickFrom = fresh.length ? fresh : pool;
  const pick = pickFrom[Math.floor(Math.random()*pickFrom.length)];
  pushWire(pick[0], pick[1], pick[2] || {});
}

function renderWire(){
  const html = S.wire.map(w =>
    '<div class="witem"><div class="dot' + (w.read ? " read" : "") + '"></div><div>' +
    '<div class="wmeta">' + w.src + " &middot; " + w.time + "</div>" +
    '<div class="whead">' + (w.brk ? '<span class="brk">BREAKING:</span> ' : "") +
    (w.oped ? "<em>" + w.head + "</em>" : w.head) +
    (w.warn ? '<span class="wstamp">MARKET WARNING</span>' : "") + "</div></div></div>"
  ).join("");
  $("wireList").innerHTML = html || '<div class="witem"><div class="whead">Nothing yet. The street is quiet.</div></div>';
  $("railWire").innerHTML = html;
  $("unreadTxt").textContent = S.unread + " UNREAD";
  const b = $("wireBadge");
  b.textContent = S.unread; b.classList.toggle("hidden", S.unread === 0);
  const tb = $("tabBadge");
  if(tb){ tb.textContent = S.unread; tb.classList.toggle("hidden", S.unread === 0); }
  const d = "TERM MONTH " + S.month + " &middot; WEEK " + S.week + " &middot; WASHINGTON";
  $("ledgerDate").innerHTML = d; $("railDate").innerHTML = d;
}

/* ---------- scene ---------- */
let sceneFlip = false;
function setScene(name){
  const stEl = $("stage"); if(stEl) stEl.dataset.scene = name;
  if(!S || S.scene === name) return;
  S.scene = name;
  const showEl = sceneFlip ? $("sceneA") : $("sceneB");
  const hideEl = sceneFlip ? $("sceneB") : $("sceneA");
  const art = wideMode() ? "assets/title-wide.webp" : "assets/scene-" + name + ".webp";
  showEl.style.backgroundImage = "url(" + art + ")";
  $("sceneBg").style.backgroundImage = "url(" + art + ")";
  showEl.style.opacity = 1; hideEl.style.opacity = 0;
  sceneFlip = !sceneFlip;
  layoutPrices();
}
function sceneFor(){
  if(S.war) return "war";
  if(S.inf >= 14 || S.needle >= 0.95) return "disaster";
  if(S.inf >= 5.5 || S.needle >= 0.72) return "inflation";
  if(S.u >= 7 || S.needle <= 0.28) return "recession";
  return "normal";
}

/* ---------- live prices on the street signs ---------- */
/* rects are 0-1000 normalised boxes around the prices baked into each plate;
   layout maps them through the same maths the CSS background uses:
   cover anchored 30% from the top on phones, contain centred on wider screens */
const SCENE_PRICES = {
  normal:    {iw:1120, ih:2240, gas:{r:[80,583,265,647], bg:"#EF551E", fg:"#FFE93C"}, eggs:{r:[516,777,644,823], tag:[637,782,707,812]}},
  inflation: {iw:1120, ih:2240, gas:{r:[143,639,352,698], bg:"#E8491D", fg:"#FF3B30"}, eggs:{r:[668,751,751,789], tag:null}},
  recession: {iw:1184, ih:2096, gas:{r:[0,509,188,583], bg:"#6B1F16", fg:"#D8C58F"}, eggs:null},
  disaster:  {iw:1184, ih:2096, gas:{r:[36,520,196,584], bg:"#E8491D", fg:"#FF3B30"}, eggs:{r:[746,734,812,772], tag:null}},
  war:       {iw:1120, ih:2240, gas:{r:[18,590,215,633], bg:"#EF551E", fg:"#FFE93C"}, eggs:{r:[775,782,921,832], tag:[909,785,981,819]}}
};
/* v23 wide desktop: the 4:3 screen uses the wide plate for every state (state tints in CSS) */
const WIDE_PRICES = {iw:1824, ih:1368, gas:{r:[314,566,410,595], bg:"#F5A623", fg:"#221D10"}, eggs:{r:[524,663,612,682], tag:null}};
function wideMode(){ return window.matchMedia("(min-width: 1101px)").matches; }
function priceStr(v){
  if(v >= 100) return String(Math.round(v));
  if(v >= 10) return v.toFixed(1);
  return v.toFixed(2);
}
function placePrice(el, cfg, rect, scale, offX, offY){
  const w = (rect[2]-rect[0]) / 1000 * cfg.iw * scale;
  const h = (rect[3]-rect[1]) / 1000 * cfg.ih * scale;
  el.style.left = (offX + rect[0] / 1000 * cfg.iw * scale) + "px";
  el.style.top = (offY + rect[1] / 1000 * cfg.ih * scale) + "px";
  el.style.width = w + "px"; el.style.height = h + "px";
  return h;
}
function layoutPrices(){
  if(!S) return;
  const stage = $("stage"); if(!stage) return;
  const dockEl = $("dock");
  const dockH = (dockEl && !dockEl.classList.contains("hidden")) ? dockEl.offsetHeight + (wideMode() ? 0 : 24) : 0;
  document.documentElement.style.setProperty("--dockh", dockH + "px");
  const scEl = $("sceneA");
  const W = scEl ? scEl.clientWidth : stage.clientWidth;
  const H = scEl ? scEl.clientHeight : stage.clientHeight - dockH;
  const baseX = scEl ? scEl.offsetLeft : 0;
  const wide = wideMode();
  const cfg = wide ? WIDE_PRICES : (SCENE_PRICES[S.scene] || SCENE_PRICES.normal);
  const coverMode = wide || window.matchMedia("(max-width: 760px)").matches;
  const scale = coverMode ? Math.max(W / cfg.iw, H / cfg.ih) : Math.min(W / cfg.iw, H / cfg.ih);
  const offX = baseX + (W - cfg.iw * scale) * 0.5, offY = (H - cfg.ih * scale) * (wide ? 0.5 : (coverMode ? 0.30 : 0.5));
  const gasEl = $("sceneGas"), gasTxt = $("sceneGasTxt");
  const gh = placePrice(gasEl, cfg, cfg.gas.r, scale, offX, offY);
  gasEl.style.background = cfg.gas.bg; gasEl.style.color = cfg.gas.fg;
  const gtxt = gasTxt.textContent;
  const gw = (cfg.gas.r[2]-cfg.gas.r[0]) / 1000 * cfg.iw * scale;
  const est = [...gtxt].reduce((a,c) => a + (c === "." ? 0.32 : 0.56), 0);
  gasTxt.style.width = gw + "px";
  gasTxt.style.fontSize = Math.min(gh * 0.74, gw / Math.max(est,1) * 0.96) + "px";
  gasEl.classList.toggle("frozen", !!S.gasFrozen);
  const eggsEl = $("sceneEggs"), tagEl = $("sceneEggsTag");
  if(cfg.eggs){
    eggsEl.style.display = "flex";
    const eh = placePrice(eggsEl, cfg, cfg.eggs.r, scale, offX, offY);
    eggsEl.querySelector(".se-k").style.fontSize = (eh * 0.30) + "px";
    eggsEl.querySelector(".se-v").style.fontSize = (eh * 0.44) + "px";
    if(cfg.eggs.tag){
      tagEl.style.display = "flex";
      const th = placePrice(tagEl, cfg, cfg.eggs.tag, scale, offX, offY);
      tagEl.style.fontSize = (th * 0.55) + "px";
    } else tagEl.style.display = "none";
  } else { eggsEl.style.display = "none"; tagEl.style.display = "none"; }
}
/* street prices step on a 3 second tick, like a real sign being re-priced */
const DISP = {gas: 3.49, eggs: 2.99, at: 0};
function stepPrices(now, force){
  if(!force && now - DISP.at < 3000) return false;
  DISP.at = now;
  DISP.gas = S.gasFrozen && S.frozenGas ? S.frozenGas : gasLive();
  DISP.eggs = eggsLive();
  return true;
}
let lastGasTxt = "", lastEggsTxt = "";
function renderScenePrices(){
  if(!S) return;
  if(stepPrices(performance.now(), false)){
    const gTxt = priceStr(DISP.gas);
    if(gTxt !== lastGasTxt){ lastGasTxt = gTxt; }
    $("sceneGasTxt").textContent = gTxt;
    const e = priceStr(DISP.eggs);
    if(e !== lastEggsTxt){ lastEggsTxt = e; }
    $("sceneEggsVal").textContent = e;
    $("sceneEggsTag").textContent = e;
  }
  layoutPrices();
}

/* ---------- HUD ---------- */
function dispInf(){ return S.lieLeft > 0 ? S.inf * 0.6 : S.inf; }
function render(){
  $("debtVal").textContent = money(S.debt);
  $("monthVal").textContent = "MONTH " + Math.min(S.month,48) + "/48";
  const frac = S.playing && !S.paused && !S.ended ? clamp(acc / MONTH_MS, 0, 1) : 0;
  const liveInf = S.inf + (infTarget() - S.inf) * 0.55 * frac;
  const liveU = S.u + (uTarget() - S.u) * 0.55 * frac;
  const liveGdp = S.gdp + (gdpTarget() - S.gdp) * 0.55 * frac;
  const liveDisp = S.lieLeft > 0 ? liveInf * 0.6 : liveInf;
  S._live = {inf: liveInf, u: liveU, gdp: liveGdp, disp: liveDisp};
  $("infVal").textContent = liveDisp.toFixed(1) + "%";
  const gapNow = S.neutral - S.rate, tr = $("infTrend");
  if(tr){
    if(gapNow > 0.3){ tr.textContent = "\u25B2"; tr.style.color = "#FF8A75"; }
    else if(gapNow < -0.3){ tr.textContent = "\u25BC"; tr.style.color = "#7FD08A"; }
    else { tr.textContent = ""; }
  }
  $("rateVal").textContent = S.rate.toFixed(2) + "%";
  const pct = (needleFrom(S._live.inf, S._live.u, S._live.gdp)*100).toFixed(1) + "%";
  $("gmark").style.left = pct; $("gmark2").style.left = pct;
  $("gasVal").textContent = "$" + DISP.gas.toFixed(2);
  $("eggsVal").textContent = "$" + DISP.eggs.toFixed(2);
  $("jobsVal").textContent = S.u.toFixed(1) + "%";
  $("livesVal").textContent = S.lives;
  $("sbrChip").classList.toggle("hidden", !S.sbr);
  if(S.sbr) $("sbrVal").textContent = tFmt(S.btcHeld * S.btcPrice);
  $("itemName").textContent = S.item ? S.item.name : "EMPTY";
  $("itemTap").textContent = S.item ? "TAP TO USE" : "";
  $("itemSlot").classList.toggle("has-item", !!S.item);
  $("stMonth").textContent = S.playing || S.ended ? Math.min(S.month,48) + " / 48" : "-";
  $("stInf").textContent = S.playing || S.ended ? S.inf.toFixed(1) + "%" : "-";
  $("stRate").textContent = S.playing || S.ended ? S.rate.toFixed(2) + "%" : "-";
  $("stDebt").textContent = S.playing || S.ended ? tFmt(S.debt - DEBT0) : "-";
  /* GDP left, CPI right: the two ends, always in your face */
  const gdpPct = clamp((S._live.gdp + 4) / 10 * 100, 0, 100);
  $("gdpFill").style.height = gdpPct + "%";
  const fakePct = S._live.gdp > 0 ? clamp(S.distort * 0.35, 0, gdpPct) : 0;
  $("gdpFake").style.height = fakePct + "%";
  $("gdpVal").textContent = (S._live.gdp >= 0 ? "+" : "") + S._live.gdp.toFixed(1) + "%";
  $("gdpBar").classList.toggle("low", S._live.gdp < 1.2 && S._live.gdp >= -0.5);
  $("gdpBar").classList.toggle("bad", S._live.gdp < -0.5);
  $("gdpBar").classList.toggle("danger", S._live.gdp <= -2.5);
  const cpiPct = clamp((S._live.disp + 1) / 11 * 100, 0, 100);
  $("cpiFill").style.height = cpiPct + "%";
  $("cpiVal").textContent = S._live.disp.toFixed(1) + "%";
  $("cpiBar").classList.toggle("hot", S._live.inf >= 4.5 && S._live.inf < 7.5);
  $("cpiBar").classList.toggle("danger", S._live.inf >= 7.5);
  setScene(sceneFor());
  renderScenePrices();
}

let toastTimer = null;
function toast(msg){
  const t = $("toast");
  t.textContent = msg; t.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.add("hidden"), 2400);
}

/* ---------- overlay cards ---------- */
function showCard(tag, tagClass, title, body, primary, secondary, hint, onPrimary, onSecondary){
  S.paused = true; sfx("card");
  S.cardAction = onPrimary || null; S.cardSecondary = onSecondary || null;
  $("overlayCard").innerHTML =
    '<span class="tagchip ' + tagClass + '">' + tag + "</span>" +
    "<h2>" + title + "</h2>" +
    '<p class="txt">' + body + "</p>" +
    '<div class="gbar mini-gbar"><div class="gmark" style="left:' + (S.needle*100) + '%"></div></div>' +
    '<div class="glabels"><span style="color:#7FB2FF">RECESSION</span><span style="color:#FF8A75">INFLATION</span></div>' +
    '<button class="btn-gold" id="cardPrimary">' + primary + "</button>" +
    (secondary ? '<button class="btn-dim" id="cardSecondary">' + secondary + "</button>" : "") +
    (hint ? '<div class="hintline">' + hint + "</div>" : "");
  $("overlay").classList.remove("hidden");
  $("cardPrimary").onclick = () => { const f = S.cardAction; S.cardAction = null; S.cardSecondary = null; hideCard(); if(f) f(); };
  if(secondary) $("cardSecondary").onclick = () => { const f = S.cardSecondary; S.cardAction = null; S.cardSecondary = null; hideCard(); if(f) f(); else openSheet("screenWire"); };
}
function hideCard(){ $("overlay").classList.add("hidden"); if(S.playing && !S.ended) S.paused = false; }

function warningCard(side){ sfx("alarm");
  if(side === "hot"){
    pushWire("Savers\u2019 Gazette", "Pensions are shrinking. The retirees are marching on the bank.", {brk:true, warn:true});
    showCard("WARNING &middot; SAVERS\u2019 GAZETTE", "tag-warn", "Savers are marching",
      "Prices are eating pensions alive. If the needle pegs at INFLATION, the crowd stops asking and starts choosing.",
      "BACK TO PRINTING", "OPEN THE WIRE", "Warnings arrive before the needle pegs. Usually.");
  } else {
    pushWire("Union Daily", "Dole queues round the block. The street wants work, not speeches.", {brk:true, warn:true});
    showCard("WARNING &middot; UNION DAILY", "tag-warn", "The queues are growing",
      "Rates this high are strangling the street. If the needle pegs at RECESSION, the President finds a new chair.",
      "PRINT OUR WAY OUT", "OPEN THE WIRE", "Warnings arrive before the needle pegs. Usually.");
  }
}

/* ---------- scenario events ---------- */
const EVENTS = [
  {id:"sbr", when:() => S.month >= 12 && !S.sbrDone && (S.debt - DEBT0) > 1.2e12, run(){
    S.sbrDone = true;
    pushWire("Capitol Ledger", "A debt relief measure lands on the desk: stack bitcoin, cap the bleeding.", {brk:true});
    showCard("SCENARIO", "tag-event", "STRATEGIC BITCOIN RESERVE",
      "The debt is compounding faster than the economy. The proposal: take the seized stockpile, buy a million bitcoin, and let the hardest money on earth eat the softest debt ever printed. Signing puts $40B on the ticker today. After that the reserve rides the market, and every gain comes straight off the national debt.",
      "SIGN IT. STACK SATS", "KEEP PRINTING PAPER", "Debt relief, the orange way.",
      () => { S.sbr = true; S.btcHeld = 1000000; S.debt += 40e9; sfx("item"); toast("RESERVE ESTABLISHED: 1,000,000 BTC"); render(); },
      () => { pushWire("Capitol Ledger", "The reserve dies in committee. The printer keeps the pen.", {}); });
  }},
  {id:"war", when:() => S.month >= 8 && !S.warDone, run(){
    S.war = true; S.warLeft = 6; S.warDone = true; S.gasMult = 2.6; S.shockInf += 2.0;
    pushWire("Main Street Post", "War breaks out overseas. Gas spikes overnight.", {brk:true});
    showCard("SCENARIO", "tag-event", "WAR BREAKS OUT",
      "Jets overhead, convoys on the road, and the gas sign is spinning. The debt ticker just found a second gear. Hike and risk the street, or hold and feed the fire.",
      "BACK TO THE WAR ROOM", null, "War lasts about 6 months. It does not ask permission.");
  }},
  {id:"oil", when:() => S.month >= 4, run(){
    S.shockInf += 1.3; S.gasMult = Math.max(S.gasMult, 1.5);
    pushWire("Main Street Post", "Oil shock: tanker trouble sends fuel prices climbing.", {brk:true});
    showCard("SCENARIO", "tag-event", "OIL SHOCK",
      "A tanker, a strait, a problem. Fuel jumps and everything that rides on a truck follows it up.",
      "BLAME THE TANKER");
  }},
  {id:"boom", when:() => S.month >= 5, run(){
    S.u = Math.max(2.6, S.u - 0.8); S.shockInf += 0.4;
    showCard("SCENARIO", "tag-event", "TECH BOOM",
      "A new gadget has the whole street queueing and hiring. Jobs bloom, and so do prices, a little.",
      "TAKE THE CREDIT");
  }},
  {id:"bust", when:() => S.month >= 6, run(){
    S.u += 1.2; S.shockInf -= 0.5;
    pushWire("Union Daily", "Housing bust: the cranes have stopped.", {brk:true});
    showCard("SCENARIO", "tag-event", "HOUSING BUST",
      "The cranes stopped. The for-sale signs multiplied. The street is losing work faster than prices are falling.",
      "BACK TO THE BAILOUTS");
  }},
  {id:"vigilantes", when:() => S.month >= 7, run(){
    if(S.rate < 5.5){ S.shockInf += 0.8; }
    showCard("SCENARIO", "tag-event", "BOND VIGILANTES",
      "The bond market is selling first and asking later. Yields spike. " + (S.rate < 5.5 ? "They think your rate is a joke." : "Your high rate earns a grudging nod."),
      "BACK TO BEGGING MARKETS");
  }},
  {id:"jekyll", when:() => S.month >= 10 && !S.jekyllDone, run(){
    S.jekyllDone = true;
    pushWire("Hill Insider", "The chair has vanished for a weekend. Georgia, apparently. Duck season.", {brk:true});
    showCard("SCENARIO", "tag-event", "JEKYLL ISLAND WEEKEND",
      "An unmarked invitation: a hunting club in Georgia, first names only, no staff, no guest book. The men who built this bank in 1910 would approve. Go, and the street calms while the club quietly sends the bill to the debt ticker. Refuse, and your clean hands repair some of the damage from past rescues.",
      "GO IN SECRET", "REFUSE. STAY PUBLIC", "Documented: November 1910, the Aldrich Plan was drafted here in nine days. It became the Federal Reserve Act of 1913.",
      () => { S.inf += (2 - S.inf) * 0.35; S.u += (4.4 - S.u) * 0.3; S.debt *= 1.004; sfx("item"); toast("THE STREET CALMS. THE CLUB SENDS THE BILL."); render(); },
      () => { S.scarHot = Math.max(0, S.scarHot - 0.25); S.scarCold = Math.max(0, S.scarCold - 0.25); sfx("item"); toast("CLEAN HANDS: RESCUE SCARS FADE"); render(); });
  }},
  {id:"bailout", when:() => S.month >= 12 && !S.bailoutDone, run(){
    S.bailoutDone = true;
    S.inf += (2 - S.inf) * 0.30; S.u += (4.4 - S.u) * 0.35; S.distort = clamp(S.distort + 15, 0, 100); S.debt *= 1.01;
    pushWire("Bond Watch", "Emergency lending, off the books, again. Details in a few years, maybe.", {brk:true});
    showCard("SCENARIO", "tag-event", "THE SECRET BAILOUT",
      "Overnight, the window opens for the big banks: emergency loans, below-market rates, no press release. The street calms down fast. The pile of too-big-to-fail grows quietly in the back, and the bill goes to the ticker, as always.",
      "BACK TO THE BACK ROOM", null, "Documented: a 2011 audit counted $16.1 trillion in emergency loans from 2007-2010, much of it secret at the time.");
  }},
  {id:"scandal", when:() => S.month >= 14 && !S.scandalDone, run(){
    S.scandalDone = true;
    S.inf += 0.6; S.u += 0.2;
    pushWire("Hill Insider", "Two regional presidents resign over their portfolios. The ethics forms are being redesigned.", {brk:true});
    showCard("SCANDAL", "tag-warn", "THE TRADING SCANDAL",
      "Reporters have the brokerage statements: senior officials traded millions in stocks and property funds while setting the very policy that moved those prices. Two regional presidents resign by Friday. Your credibility takes the hit: prices believe you a little less.",
      "BACK TO THE ETHICS FORMS", null, "Documented: the 2020-21 trading scandal forced resignations and a full rewrite of the ethics rules, after the fact.");
  }},
  {id:"corp", when:() => S.month >= 16 && !S.corpDone, run(){
    S.corpDone = true;
    S.gdpVel += 0.5; S.distort = clamp(S.distort + 12, 0, 100); S.inf += 0.3;
    pushWire("Bond Watch", "The bank is shopping for corporate bonds. The junk shelf too.", {brk:true});
    showCard("SCENARIO", "tag-event", "CORPORATE BOND SHOPPING",
      "A first in the bank's history: the printer is now buying company debt directly, blue chips and junk alike. Markets cheer, GDP perks up, and a few more projects that should not exist now never have to die.",
      "BACK TO THE SHOPPING", null, "Documented: in 2020 the bank bought corporate bonds for the first time, high-yield 'junk' included.");
  }},
  {id:"snarl", when:() => S.month >= 3, run(){
    S.shockInf += 1.0;
    showCard("SCENARIO", "tag-event", "SUPPLY CHAINS SNARL AGAIN",
      "Ports jam, parts vanish, shelves thin out. The street has heard this excuse before. It is true anyway.",
      "BLAME THE PORTS");
  }}
];

function ladderCard(stage){
  if(stage === 1){
    S.gasFrozen = true; S.freezeLeft = 4; S.controlsLeft = 4; S.frozenGas = gasNow();
    showCard("SERFDOM LADDER &middot; STAGE 7", "tag-story", "PRICE CONTROLS",
      "The Hill has had enough of your needle. An official price board goes up: gas is frozen by law. The sign stops. The queues start. Underneath, the pressure keeps building.",
      "FREEZE EVERYTHING", null, "The ladder only advances while you are losing. It never moves back.");
  } else if(stage === 2){
    S.controlsLeft = 4;
    showCard("SERFDOM LADDER &middot; STAGE 8", "tag-story", "WAGE CONTROLS",
      "Prices were only the means. Now wages need permission too, and a new office allots both. Your lever still moves. It just matters less.",
      "ALLOT THE WAGES", null, "The ladder only advances while you are losing. It never moves back.");
  } else {
    S.lieLeft = 3;
    showCard("SERFDOM LADDER &middot; STAGE 12", "tag-story", "THE END OF TRUTH",
      "Loudspeakers on the bank. Posters of your face. From today, the panel publishes a calmer inflation number. The street keeps its own count.",
      "REVISE THE NUMBERS", null, "Displayed inflation is now revised. Street prices are not.");
  }
}

/* ---------- the Austrian bust ---------- */
function bustCard(){
  showCard("MALINVESTMENT &middot; THE BUST", "tag-story", "THE RECKONING ARRIVES",
    "The cranes stop. Projects that only made sense at cheap rates fold in a row, and the jobs go with them. GDP just corrected down 30%: the fake growth was never real. You did not build this bust with your hike. You built it in the boom, one cheap month at a time.",
    "FACE THE RECKONING", null, "The pile is smaller now. What is left is real.");
}

/* ---------- engine ---------- */
function infTarget(){ return 2.2 + (S.neutral - S.rate) * 1.5 + (S.war ? 0.9 : 0) + (S.scarHot || 0); }
function uTarget(){ return 4.3 + (S.rate - (S.neutral + 0.1)) * 1.05 + (S.scarCold || 0) * 0.6; }
function gdpTarget(){ const gap = S.neutral - S.rate; return 2.3 - (S.rate - (S.neutral + 0.2)) * 0.85 + (gap > 0.25 ? S.distort * 0.016 : 0) + (S.war ? -0.8 : 0); }
function needleFrom(inf, u, gdp){
  let n = 0.5 + (inf - 2) * 0.062 - (u - 4.4) * 0.052 + clamp((gdp - 2) * 0.012, -0.14, 0.08);
  if(inf < 1) n -= (1 - inf) * 0.028;
  return clamp(n, 0, 1);
}
const MONTH_MS = 4200;
let acc = 0, lastTs = 0;
function loop(ts){
  requestAnimationFrame(loop);
  if(!S) return;
  const dt = Math.min(100, ts - (lastTs || ts)); lastTs = ts;
  if(S.playing && !S.ended){
    wobT = ts;
    const driftT = clamp(1 + (S.neutral - S.rate) * 0.035, 0.9, 1.12);
    S.streetDrift = (S.streetDrift || 1) + (driftT - (S.streetDrift || 1)) * Math.min(1, dt / 800);
    const annual = 0.021 + S.rate*0.0038 + (S.war ? 0.012 : 0);
    S.debt *= 1 + (annual/12) * (dt / MONTH_MS);
    render();
    if(!S.paused){
      acc += dt;
      if(acc >= MONTH_MS){ acc = 0; monthTick(); }
    }
  }
}

function monthTick(){
  sfx("tick");
  const D = DIFFS[S.diff];
  S.week = 1 + Math.floor(Math.random()*4);
  /* the economy's neutral rate wanders, so sitting still stops working */
  S.neutral = clamp(S.neutral + rnd(-0.10, 0.10) + (4.7 - S.neutral) * 0.01, 3.4, 6.2);
  /* high rate: prices settle, jobs bleed. low rate: jobs heal, prices run. no safe corner. */
  const target = infTarget();
  S.infVel += (target - S.inf) * 0.34 * D.drift;
  S.infVel *= 0.62;
  S.inf += S.infVel + rnd(-0.15, 0.15) * D.noise + S.shockInf;
  S.shockInf *= 0.45;
  S.inf = clamp(S.inf, -1.5, 45);
  const uT = uTarget();
  S.uVel += (uT - S.u) * 0.24 * D.drift;
  S.uVel *= 0.66;
  S.u += S.uVel + rnd(-0.07, 0.07) * D.noise;
  S.u = clamp(S.u, 1.8, 14);
  /* Austrian layer: rates below the real (neutral) rate stockpile malinvestment.
     It flatters GDP while it builds. Hikes, or a pile too big to hide, expose it. */
  if(S.bustCd > 0) S.bustCd--;
  const gap = S.neutral - S.rate;
  if(gap > 0.25) S.distort += gap * 3.2 * D.drift;
  else S.distort -= 2.6 + (-gap) * 1.4;
  S.distort = clamp(S.distort, 0, 100);
  S.peakDistort = Math.max(S.peakDistort, S.distort);
  const gdpT = gdpTarget();
  S.gdpVel += (gdpT - S.gdp) * 0.26 * D.drift;
  S.gdpVel *= 0.64;
  S.gdp += S.gdpVel + rnd(-0.18, 0.18) * D.noise;
  /* above 3% growth runs hot: left alone, it cools off slowly on its own */
  if(S.gdp > 3) S.gdp -= (S.gdp - 3) * 0.15;
  S.gdp = clamp(S.gdp, -32, 9);
  /* the bust: a tall pile plus a real hike, or a pile that cannot be hidden */
  if(S.bustCd === 0 && ((S.distort >= 45 && S.rate >= S.neutral + 0.5) || S.distort >= 90)){
    const size = S.distort;
    S.u = clamp(S.u + 1.1 + size * 0.028, 1.8, 14);
    S.gdp = -30; /* the correction: GDP down 30%, the 1930s print */
    S.gdpVel = -1.0;
    S.shockInf -= 0.4;
    S.distort = size * 0.32;
    S.bustCd = 9;
    pushWire("Main Street Post", "The bust: cranes stopped, projects folding, layoffs in a row. The boom was borrowed.", {brk:true, warn:true});
    bustCard();
  }
  /* jolts: the street moves first and explains itself later */
  if(Math.random() < 0.07){
    if(Math.random() < 0.5){
      const j = rnd(0.35, 0.6) * (Math.random() < 0.6 ? 1 : -1);
      S.inf += j;
      if(j >= 0.75) pushWire("Main Street Post", "Prices jumped this month. Nobody knows why. Everybody knows who to blame.", {brk:true});
    } else {
      S.u += rnd(0.3, 0.55);
      pushWire("Union Daily", "Layoffs spiked this month. The canteen is quiet again.", {});
    }
  }
  if(!S.gasFrozen) S.priceLevel *= 1 + S.inf/700;
  else S.priceLevel *= 1 + S.inf/700; /* pressure builds under the freeze */
  S.gasMult += (1 - S.gasMult) * 0.25;
  if(S.war){ S.warLeft--; if(S.warLeft <= 0){ S.war = false; pushWire("Main Street Post", "Ceasefire signed. The convoys are going home.", {}); } }
  if(S.freezeLeft > 0){ S.freezeLeft--; if(S.freezeLeft === 0){ S.gasFrozen = false; S.frozenGas = null; toast("PRICE CONTROLS LIFTED"); pushWire("Main Street Post", "Controls lifted. The gas sign catches up all at once.", {brk:true}); } }
  if(S.controlsLeft > 0) S.controlsLeft--;
  if(S.lieLeft > 0) S.lieLeft--;
  S.needle = needleFrom(S.inf, S.u, S.gdp);
  S.history.push(S.needle);
  S.peakInf = Math.max(S.peakInf, S.inf);
  S.devSum += Math.abs(S.needle - 0.5);
  S.closest = Math.max(S.closest, Math.abs(S.needle - 0.5));
  if(S.itemIn > 0){ S.itemIn--; if(S.itemIn === 0 && !S.item){ S.item = ITEMS[Math.floor(Math.random()*ITEMS.length)]; toast("NEW ITEM DELIVERED"); } }
  /* warnings */
  if(S.needle >= D.warn && S.warnedR === 0){ S.warnedR = 1; warningCard("hot"); }
  else if(S.needle <= 1 - D.warn && S.warnedL === 0){ S.warnedL = 1; warningCard("cold"); }
  if(S.needle < 0.68) S.warnedR = 0;
  if(S.needle > 0.32) S.warnedL = 0;
  /* ladder */
  if(S.needle >= 0.72){ S.dangerRun++; sfx("danger"); } else S.dangerRun = 0;
  if(S.needle <= 0.28) sfx("danger");
  if(S.dangerRun === 2 && S.ladder < 3){ S.ladder++; ladderCard(S.ladder); }
  /* events */
  if(!S.paused && S.month - S.lastEvent >= 3 && Math.random() < 0.36){
    const evs = EVENTS.filter(e => e.when());
    if(evs.length){ const ev = evs[Math.floor(Math.random()*evs.length)]; S.lastEvent = S.month; ev.run();
      if(!S.shockGdpHit && (ev.id === "war" || ev.id === "oil" || ev.id === "bust" || ev.id === "snarl")){
        S.shockGdpHit = true; S.gdp = S.gdp > 0 ? S.gdp * 0.8 : S.gdp - 0.5;
      }
    }
  }
  ambientHeadline();
  if(Math.random() < 0.4) ambientHeadline();
  S.month++;
  if(S.sbr && S.btcHeld > 0){
    const before = S.btcHeld * S.btcPrice;
    const r = 0.03 + rnd(-0.085, 0.095) + (S.inf - 2) * 0.007;
    S.btcPrice = Math.max(8000, S.btcPrice * (1 + r));
    const gain = S.btcHeld * S.btcPrice - before;
    S.debt = Math.max(DEBT0 * 0.97, S.debt - gain);
    if(r > 0.14) pushWire("Orange Sheet", "The reserve is up " + Math.round(r * 100) + "% this month. The debt clock noticed.", {});
    else if(r < -0.13) pushWire("Orange Sheet", "The reserve is down " + Math.abs(Math.round(r * 100)) + "% this month. The stackers send their regards.", {});
  }
  if((S.needle >= 0.985 && S.inf >= 7.5) || S.inf >= 18){ if(!emergencySave("hot")) return endTerm("inflation"); }
  if((S.needle <= 0.015 && S.u >= 8.5) || S.u >= 11.5){ if(!emergencySave("cold")) return endTerm("recession"); }
  if(S.month > 48) return endTerm("survived");
  render();
}

/* ---------- the five lives: emergency meetings ---------- */
function emergencySave(side){
  if(S.lives <= 0) return false;
  S.lives--; S.meetings++;
  S.warnedR = 0; S.warnedL = 0; S.dangerRun = 0;
  if(side === "hot"){
    const pull = Math.max(1.3, 3.4 - S.meetings * 0.5);
    S.inf = Math.max(2.6, S.inf - pull); S.infVel *= 0.2; S.debt *= 1.008; S.scarHot += 0.4; S.priceLevel *= 1.05;
    showCard("EMERGENCY MEETING", "tag-event", "THE COMMITTEE BLINKS FIRST",
      "Sunday night. The governors on a secure call, one sentence in the statement. The rescue drags inflation back from the edge and the crowd goes home, for now. The ticker sends its regards. Emergency meetings left: " + S.lives + ".",
      "ADJOURN THE MEETING", null, "Five per term. The sixth crisis is yours alone.");
  } else {
    const pullU = Math.max(1.2, 2.8 - S.meetings * 0.4);
    S.u = Math.max(3.4, S.u - pullU); S.gdp = Math.max(S.gdp, 0.8); S.gdpVel += 0.4; S.distort += 8; S.scarCold += 0.35;
    showCard("EMERGENCY MEETING", "tag-event", "PRINTING AT MIDNIGHT",
      "The facility opens before the markets do. Credit flows, the queues shorten, the dole offices empty by Friday. It was bought with the printer, and the bill is already on the ticker. Emergency meetings left: " + S.lives + ".",
      "ADJOURN THE MEETING", null, "Five per term. The sixth crisis is yours alone.");
  }
  sfx("save");
  return true;
}

function ac(){ if(!AC){ try{ AC = new (window.AudioContext || window.webkitAudioContext)(); }catch(e){} } if(AC && AC.state === "suspended") AC.resume(); return AC; }
function tone(f0, f1, dur, type, vol, delay){
  if(!S || !S.settings || !S.settings.sfx) return;
  const c = ac(); if(!c) return;
  const t = c.currentTime + (delay || 0);
  const o = c.createOscillator(), g = c.createGain();
  o.type = type || "sine"; o.frequency.setValueAtTime(f0, t);
  if(f1) o.frequency.exponentialRampToValueAtTime(Math.max(f1, 1), t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol || 0.1, t + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + dur + 0.05);
}
function sfx(name){
  if(!S || !S.settings || !S.settings.sfx) return;
  if(name === "click") tone(1150, 900, 0.05, "square", 0.09);
  else if(name === "tick") tone(660, null, 0.03, "sine", 0.045);
  else if(name === "card") tone(300, 520, 0.09, "triangle", 0.09);
  else if(name === "alarm"){ tone(520, 520, 0.12, "square", 0.1); tone(392, 392, 0.15, "square", 0.1, 0.14); }
  else if(name === "item"){ tone(990, null, 0.07, "sine", 0.09); tone(1318, null, 0.11, "sine", 0.09, 0.07); }
  else if(name === "save"){ [392, 523.25, 659.25].forEach((f, i) => tone(f, null, 0.13, "triangle", 0.08, i * 0.08)); }
  else if(name === "death") tone(320, 52, 0.75, "sawtooth", 0.13);
  else if(name === "win"){ [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, null, 0.15, "triangle", 0.08, i * 0.1)); }
  else if(name === "danger") tone(96, null, 0.1, "sine", 0.11);
  else if(name === "dum"){ tone(165, 62, 0.16, "sine", 0.3); tone(131, 50, 0.26, "sine", 0.3, 0.17); }
}

/* ---------- music: real royalty-free tracks (Kevin MacLeod, CC BY 4.0) ---------- */
let AC = null;
const TRACKS = [
  {title:"Monkeys Spinning Monkeys", file:"assets/music-monkeys.mp3"},
  {title:"Merry Go", file:"assets/music-merrygo.mp3"},
  {title:"Pixelland", file:"assets/music-pixelland.mp3"}
];
let bgmEl = null, curTrack = -1;
function bgm(){ if(!bgmEl) bgmEl = document.getElementById("bgm"); return bgmEl; }
function musicStart(){
  if(!S || !S.settings || !S.settings.music) return;
  const a = bgm(); if(!a) return;
  const want = S.settings.track || 0;
  if(curTrack !== want){ curTrack = want; a.src = TRACKS[want].file; a.load(); }
  a.volume = 0.45;
  const p = a.play(); if(p && p.catch) p.catch(function(){});
}
function musicStop(){
  const a = bgm(); if(a) a.pause();
}
function cycleTrack(){
  S.settings.track = ((S.settings.track || 0) + 1) % TRACKS.length;
  const tn = document.getElementById("trackName");
  if(tn) tn.textContent = TRACKS[S.settings.track].title;
  if(S.settings.music){ curTrack = -1; musicStart(); }
  sfx("click");
}

/* ---------- endings & report ---------- */
function gradeFor(){
  const avg = S.history.length ? S.devSum / S.history.length : 0.25;
  let score = 100 - avg*170 - Math.max(0, S.peakInf - 4) * 3 - S.ladder * 8;
  if(S.endType === "survived") score += 6;
  score = clamp(score, 2, 99);
  const table = [[93,"A+"],[88,"A"],[82,"A-"],[76,"B+"],[70,"B"],[64,"B-"],[57,"C+"],[50,"C"],[43,"C-"],[36,"D+"],[29,"D"],[20,"D-"]];
  for(const [t,g] of table) if(score >= t) return g;
  return "F";
}
function endTerm(type){
  if(S.ended) return;
  sfx(type === "survived" ? "win" : "death");
  S.ended = true; S.playing = false; S.endType = type;
  $("sidebars").classList.add("hidden");
  const months = Math.min(S.month, 48);
  saveHall(months);
  if(type === "inflation"){
    setScene("disaster");
    $("screenDeath").innerHTML =
      '<div class="death-wrap"><div class="card" style="padding:24px 22px">' +
      '<span class="ending-ribbon ribbon-red">INFLATION ENDING &middot; MONTH ' + months + "</span><br>" +
      '<span class="stamp-big">THE CROWD HAS CHOSEN</span>' +
      '<p class="txt">Gas touched <b>$' + gasNow().toFixed(2) + '</b> and the street stopped asking for a plan. It demanded a strongman instead. The Minister of Prices has taken your office, your chair, and your parking space.</p>' +
      '<div class="chips"><span class="chip">' + months + ' MO</span><span class="chip">PEAK ' + S.peakInf.toFixed(1) + '%</span><span class="chip">DEBT ' + tFmt(S.debt - DEBT0) + "</span></div>" +
      '<button class="btn-gold" onclick="showReport()">SEE TERM REPORT</button>' +
      '<button class="btn-dim" onclick="newTerm()">NEW TERM</button></div></div>';
    showOnly("screenDeath");
  } else if(type === "recession"){
    setScene("recession");
    $("screenDeath").innerHTML =
      '<div class="death-wrap"><span class="ending-ribbon ribbon-blue">RECESSION ENDING &middot; MONTH ' + months + '</span>' +
      '<div class="memo"><div class="fromto">THE WHITE HOUSE<br>MEMORANDUM<br><br>From: The President<br>Re: Termination of appointment</div>' +
      '<div class="foot" style="margin-top:10px">Echoes of 1929-1933, when this bank raised rates into the crash and let the money supply collapse. An ex-chair admitted it decades later: "We did it. We\u2019re very sorry."</div>' +
      '<p class="body">Markets have fallen for three straight months and the dole queues are on the evening news. This is not personal. It is entirely personal. Clear your desk by Friday. The plant by the elevator is not yours to take.</p>' +
      '<div class="fine2">Severance: a book deal, a speaking tour, and a podcast.</div>' +
      '<button class="btn-gold" onclick="showReport()">SEE TERM REPORT</button>' +
      '<button class="btn-dim" onclick="newTerm()">NEW TERM</button></div></div>';
    showOnly("screenDeath");
  } else {
    showReport();
  }
  render();
}
function endLabel(){
  return {survived:"Full term", inflation:"Ousted - inflation", recession:"Ousted - recession", resigned:"Resigned"}[S.endType] || S.endType;
}
function showReport(){
  const months = Math.min(S.month, 48);
  const g = gradeFor();
  $("gradeVal").textContent = g;
  $("verdictVal").textContent =
    S.endType === "survived" && S.ladder === 0 ? "You served the full term and handed back a working currency. The street grumbles, as is tradition." :
    S.endType === "survived" ? "You kept your job for 48 months. The country kept the controls." :
    S.endType === "resigned" ? "You kept your job for " + months + " months. Then you signed the letter." :
    "You kept your job for " + months + " months. The street remembers the rest.";
  $("repMonths").textContent = months + " / 48";
  $("repPeak").textContent = S.peakInf.toFixed(1) + "%";
  $("repDebt").textContent = tFmt(S.debt - DEBT0);
  $("repEnd").textContent = endLabel();
  $("repMeet").textContent = S.meetings;
  $("repLives").textContent = S.lives;
  $("repSbr").textContent = S.sbr ? tFmt(S.btcHeld * S.btcPrice) : "None";
  $("squares").innerHTML = S.history.map(n => {
    const d = Math.abs(n - 0.5);
    const c = n < 0.2 ? "#4E7BD9" : n > 0.8 ? "#D94F3E" : d < 0.18 ? "#39C96B" : "#E8C93C";
    return '<i style="background:' + c + '"></i>';
  }).join("");
  $("postPreview").textContent = shareText();
  showOnly("screenReport");
}
function shareText(){
  const months = Math.min(S.month, 48);
  return "My term as Fed Chair: " + months + "/48 months. Peak inflation " + S.peakInf.toFixed(1) +
    "%, debt " + tFmt(S.debt - DEBT0) + ", grade " + gradeFor() + ". Ended: " + endLabel().toLowerCase() + ". The street remembers.";
}
function saveHall(months){
  try{
    const arr = JSON.parse(localStorage.getItem("fedchair-hall") || "[]");
    arr.push({name:"KELVIN WHALES", status:endLabel().toUpperCase(), months:months, debt:Math.round((S.debt - DEBT0)/1e11)/10, you:true, ts:Date.now()});
    localStorage.setItem("fedchair-hall", JSON.stringify(arr.slice(-12)));
  }catch(e){}
  renderHall();
}
function hallData(){
  let mine = [];
  try{ mine = JSON.parse(localStorage.getItem("fedchair-hall") || "[]"); }catch(e){}
  const all = FAKE_HALL.concat(mine);
  all.sort((a,b) => b.months - a.months || a.debt - b.debt);
  return all;
}
function statusClass(st){ return st.indexOf("SURVIVED") === 0 || st === "FULL TERM" ? "st-ok" : (st.indexOf("RESIGNED") === 0 ? "st-mid" : "st-bad"); }
function renderHall(){
  const data = hallData();
  $("hallList").innerHTML = data.slice(0,10).map((r,i) =>
    '<div class="hrow r' + (i+1) + (r.you ? " you" : "") + '"><div class="medal">' + (i+1) + '</div>' +
    '<div class="who"><div class="nm">' + r.name + '</div><div class="st ' + statusClass(r.status) + '">' + r.status + "</div></div>" +
    '<div class="nums"><div class="a">' + r.months + ' mo</div><div class="b">+$' + r.debt.toFixed(1) + "T debt</div></div></div>"
  ).join("");
  $("miniHall").innerHTML = data.slice(0,5).map((r,i) =>
    '<div class="hrow r' + (i+1) + '"><div class="medal">' + (i+1) + '</div>' +
    '<div class="who"><div class="nm">' + r.name + '</div><div class="st ' + statusClass(r.status) + '">' + r.status + "</div></div>" +
    '<div class="nums"><div class="a">' + r.months + ' mo</div></div></div>'
  ).join("");
}

/* ---------- flow ---------- */
const LOAD_LINES = ["PRINTING MONEY","WARMING UP THE PRINTER","CALLING IT TRANSITORY","BLAMING SUPPLY CHAINS","RAISING THE DEBT CEILING","SCHEDULING A PRESS CONFERENCE","MOVING THE GOALPOSTS","BURYING THE REPORT","SYNCING EXCUSES","DUCK HUNTING IN GEORGIA","CHECKING IN UNDER FIRST NAMES","COUNTING WHEELBARROWS"];
let loadTimer = null;
let loadMode = "brief";
function startLoad(mode){
  loadMode = mode || "brief";
  showOnly("screenLoad");
  $("loadCoin").classList.remove("flipped");
  let i = 0;
  const step = () => {
    if(i >= LOAD_LINES.length){ finishLoad(); return; }
    const el = $("loadLine");
    if(i === 8) $("loadCoin").classList.add("flipped");
    el.textContent = LOAD_LINES[i];
    el.classList.remove("linein"); void el.offsetWidth; el.classList.add("linein");
    $("loadFill").style.width = ((i + 1) / LOAD_LINES.length * 100) + "%";
    i++;
    loadTimer = setTimeout(step, 1050);
  };
  step();
}
function finishLoad(){
  if(loadTimer){ clearTimeout(loadTimer); loadTimer = null; }
  if($("screenLoad").classList.contains("hidden")) return;
  if(loadMode === "term"){ startTerm(); } else { showOnly("screenBrief"); }
}
function showOnly(id){
  ["screenTitle","screenLoad","screenBrief","screenDeath","screenReport"].forEach(s => $(s).classList.toggle("hidden", s !== id));
  if(!id) ["screenTitle","screenLoad","screenBrief","screenDeath","screenReport"].forEach(s => $(s).classList.add("hidden"));
}
function openSheet(id){
  ["screenWire","screenSettings","screenHall"].forEach(s => $(s).classList.toggle("hidden", s !== id));
  if(S.playing) S.paused = true;
  if(id === "screenWire"){ S.wire.forEach(w => w.read = true); S.unread = 0; renderWire(); }
}
function closeSheets(){
  ["screenWire","screenSettings","screenHall"].forEach(s => $(s).classList.add("hidden"));
  if(S.playing && !S.ended && $("overlay").classList.contains("hidden")) S.paused = false;
  renderWire();
}
function startTerm(){
  musicStart();
  const keepDiff = S ? S.diff : "chair";
  const keepSet = S ? S.settings : null;
  S = freshState();
  S.diff = keepDiff; if(keepSet) S.settings = keepSet;
  S.playing = true; S.screen = "game";
  showOnly(null);
  $("dock").classList.remove("hidden");
  $("sidebars").classList.remove("hidden");
  $("prices").classList.toggle("hidden", !S.settings.ticker);
  closeSheets(); hideCard();
  pushWire("Hill Insider", "A new chair takes the lever. The street holds its breath.", {});
  pushWire("Main Street Post", "Eggs at $2.99, gas at $3.49. Remember this calm.", {});
  render(); renderWire();
}
function newTerm(){ startLoad("term"); }
function resign(){
  if(!S.playing){ toast("NO TERM IN PROGRESS"); return; }
  closeSheets();
  endTerm("resigned");
}

/* ---------- wiring ---------- */
function bindSeg(el, fn){
  el.querySelectorAll(".dc").forEach(d => d.onclick = () => { sfx("click"); fn(d.dataset.diff); });
}
const DIFFLVL = {intern:1, chair:2, legend:3};
function setDiff(d){
  S.diff = d;
  ["diffSeg","diffSeg2"].forEach(id => {
    const el = $(id); if(!el) return;
    el.querySelectorAll(".dc").forEach(x => x.classList.toggle("on", DIFFLVL[x.dataset.diff] <= DIFFLVL[d]));
  });
}
document.addEventListener("pointerdown", () => {
  if(!S || !S.settings) return;
  if(S.settings.music) musicStart();
  if(S.settings.sfx || S.settings.music) ac();
}, true);
document.addEventListener("gesturestart", e => e.preventDefault());
document.addEventListener("dblclick", e => e.preventDefault(), {passive:false});
document.addEventListener("DOMContentLoaded", () => {
  S = freshState();
  $("sceneA").style.backgroundImage = "url(assets/scene-normal.webp)";
  $("sceneBg").style.backgroundImage = "url(assets/scene-normal.webp)";
  bindSeg($("diffSeg"), setDiff); bindSeg($("diffSeg2"), setDiff);
  $("startBtn").onclick = () => { startLoad(); };
  $("screenLoad").onclick = () => { finishLoad(); };
  $("howBtn").onclick = () => { showOnly("screenBrief"); };
  $("takeLeverBtn").onclick = () => startTerm();
  $("hallBtn").onclick = () => { renderHall(); openSheet("screenHall"); };
  $("hallBtn2").onclick = () => { renderHall(); openSheet("screenHall"); };
  $("newTermBtn").onclick = () => startLoad("term");
  $("wireBtn").onclick = () => openSheet("screenWire");
  $("settingsBtn").onclick = () => openSheet("screenSettings");
  document.querySelectorAll("[data-close]").forEach(b => b.onclick = closeSheets);
  $("markReadBtn").onclick = () => { S.wire.forEach(w => w.read = true); S.unread = 0; renderWire(); };
  document.querySelectorAll(".sw").forEach(sw => sw.onclick = () => {
    sw.classList.toggle("on");
    const key = sw.dataset.set, on = sw.classList.contains("on");
    S.settings[key] = on;
    if(key === "ticker") $("prices").classList.toggle("hidden", !on || !S.playing);
    if(key === "sfx" && on) setTimeout(() => sfx("save"), 30);
    if(key === "music"){ if(on){ musicStart(); } else musicStop(); }
  });
  $("resignBtn").onclick = resign;
  const tp = $("trackPick"); if(tp) tp.onclick = cycleTrack;
  const tn = $("trackName"); if(tn) tn.textContent = TRACKS[S.settings.track || 0].title;
  $("rateUp").onclick = () => { if(S.playing && !S.paused){ S.rate = clamp(S.rate + 0.25, 0, 20); sfx("click"); render(); } };
  $("rateDown").onclick = () => { if(S.playing && !S.paused){ S.rate = clamp(S.rate - 0.25, 0, 20); sfx("click"); render(); } };
  $("itemSlot").onclick = () => {
    if(!S.playing || S.paused || !S.item) return;
    const it = S.item; S.item = null; S.itemIn = 5 + Math.floor(Math.random()*4);
    if(it.side === "hot" || (it.side === "any" && S.needle >= 0.5)){ S.inf = Math.max(0.4, S.inf - 1.7); }
    else if(it.side === "cold" || it.side === "any"){ S.u = Math.max(2.2, S.u - 1.3); S.inf += 0.4; }
    sfx("item"); toast(it.name + " USED");
    render();
  };
  $("shareBtn").onclick = async () => {
    const text = shareText();
    if(navigator.share){ try{ await navigator.share({title:"Fed Chair Tycoon", text:text}); }catch(e){} }
    else { try{ await navigator.clipboard.writeText(text); toast("COPIED TO CLIPBOARD"); }catch(e){ toast("COPY FAILED"); } }
  };
  $("shareXBtn").onclick = () => window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(shareText()), "_blank");
  $("copyBtn").onclick = async () => { try{ await navigator.clipboard.writeText(shareText()); toast("COPIED"); }catch(e){ toast("COPY FAILED"); } };
  window.addEventListener("resize", layoutPrices);
  /* v23 wide desktop: news tab + rail relocation */
  const appEl = document.querySelector(".app");
  $("newsTab").onclick = () => {
    const open = appEl.classList.toggle("news-open");
    if(open){ S.unread = 0; renderWire(); }
    sfx("click");
  };
  const wideMQ = window.matchMedia("(min-width: 1101px)");
  function applyWide(){
    const wide = wideMQ.matches;
    const extras = $("settingsExtras"), railRight = $("railRight"), railLeft = $("railLeft"), stageEl = $("stage");
    if(wide){
      if(extras && railRight) [...railRight.children].forEach(p => extras.appendChild(p));
      if(stageEl && railLeft) stageEl.appendChild(railLeft);
    } else {
      if(railRight && extras) [...extras.children].forEach(p => railRight.appendChild(p));
      if(appEl && railLeft) appEl.insertBefore(railLeft, stageEl.parentElement === appEl ? stageEl : appEl.firstChild);
    }
    if(S && S.scene){ const cur = S.scene; S.scene = null; setScene(cur); }
    layoutPrices();
  }
  if(wideMQ.addEventListener) wideMQ.addEventListener("change", applyWide); else if(wideMQ.addListener) wideMQ.addListener(applyWide);
  applyWide();
  renderHall(); render(); renderWire();
  musicStart();
  requestAnimationFrame(loop);
});
