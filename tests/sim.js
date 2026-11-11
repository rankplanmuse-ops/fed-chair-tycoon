const fs = require("fs");
const html = fs.readFileSync(process.env.HOME + "/workspace/fed-chair-tycoon/index.html", "utf8");
const js = fs.readFileSync(process.env.HOME + "/workspace/fed-chair-tycoon/game.js", "utf8");
const store = {};
global.localStorage = { getItem:k=>store[k]??null, setItem:(k,v)=>{store[k]=v}, removeItem:k=>{delete store[k]} };
class El { constructor(id){ this.id=id; this.children=[]; this.style={setProperty:()=>{},getPropertyValue:()=>""}; this.dataset={}; this._cls=new Set(); this.textContent=""; this.innerHTML=""; this.value=""; this.offsetHeight=250;
  this.classList={ add:(...c)=>c.forEach(x=>this._cls.add(x)), remove:(...c)=>c.forEach(x=>this._cls.delete(x)), toggle:(c,f)=>{ if(f===undefined) f=!this._cls.has(c); f?this._cls.add(c):this._cls.delete(c); return f; }, contains:c=>this._cls.has(c) }; }
  querySelectorAll(){ return []; } querySelector(){ return new El("q"); } }
const els = {}; global.__els = els;
global.document = { getElementById:id=>els[id]||(els[id]=new El(id)), querySelectorAll:()=>[], querySelector:()=>new El("q"), addEventListener:()=>{}, documentElement:new El("html"), body:new El("body") };
global.window = { addEventListener:()=>{} };
global.navigator = {}; global.location = { href:"" };
const run = new Function("document","window","localStorage","navigator","location", js + "\n; return {start:()=>{ S = freshState(); S.diff='chair'; S.playing=true; S.screen='game'; return S; }, tick:()=>monthTick(), S:()=>S};");
const api = run(global.document, global.window, global.localStorage, global.navigator, global.location);
function sim(name, strat){
  const S = api.start(); let guard = 0;
  while(!S.ended && guard++ < 70){ strat(S); api.tick(); S.paused = false; }
  console.log(name.padEnd(22), "end:", (S.endType||"TIMEOUT").padEnd(10), "month:", Math.min(S.month,48), "meetings:", S.meetings, "peakInf:", S.peakInf.toFixed(1));
}
sim("hold 1.50 (printer)", S => { S.rate = 1.5; });
sim("hold 9.00 (crusher)", S => { S.rate = 9.0; });
for(let i=0;i<3;i++) sim("adaptive " + (i+1), S => { const gap = S.rate - S.neutral; if(S.inf > 3.1 && gap < 1.6) S.rate += 0.25; else if(S.inf < 1.7 && gap > -1.2) S.rate -= 0.25; else if(S.u > 6.4 && gap > -1.6) S.rate -= 0.25; S.rate = Math.max(0.5, Math.min(11, S.rate)); });
