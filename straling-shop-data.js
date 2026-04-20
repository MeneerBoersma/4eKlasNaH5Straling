// ═══════════════════════════════════════════════════════════════════
//  straling-shop-data.js  —  Gedeelde winkeldata voor H5 Straling
//  Gedeeld door index.html en paragraaf-5-1-straling.html
// ═══════════════════════════════════════════════════════════════════

const STRALING_SAVE_KEY = "straling_save";

const STRALING_SHOP = {
  body: [
    { id:"body_student", emoji:"🧑‍🎓", name:"Student",    price:0,   unlocked:true },
    { id:"body_ninja",   emoji:"🥷",   name:"Ninja",      price:200 },
    { id:"body_zombie",  emoji:"🧟",   name:"Zombie",     price:280 },
    { id:"body_robot",   emoji:"🤖",   name:"Robot",      price:380 },
    { id:"body_alien",   emoji:"👽",   name:"Alien",      price:480, starReq:15 },
    { id:"body_astro",   emoji:"👨‍🚀",  name:"Astronaut",  price:650, starReq:30 },
  ],
  hat: [
    { id:"hat_none",   emoji:"",   name:"Geen hoed",   price:0,   unlocked:true },
    { id:"hat_helm",   emoji:"🪖",  name:"Legerhelm",   price:80  },
    { id:"hat_cap",    emoji:"🧢",  name:"Pet",         price:120 },
    { id:"hat_top",    emoji:"🎩",  name:"Hoge hoed",   price:240 },
    { id:"hat_crown",  emoji:"👑",  name:"Kroon",       price:500, starReq:30 },
  ],
  badge: [
    { id:"badge_none",   emoji:"",   name:"Geen badge", price:0,   unlocked:true },
    { id:"badge_atom",   emoji:"⚛️",  name:"Atoom",      price:100 },
    { id:"badge_bolt",   emoji:"⚡",  name:"Bliksem",    price:140 },
    { id:"badge_fire",   emoji:"🔥",  name:"Vuur",       price:200 },
    { id:"badge_medal",  emoji:"🏅",  name:"Medaille",   price:280 },
    { id:"badge_rocket", emoji:"🚀",  name:"Raket",      price:360, starReq:18 },
    { id:"badge_trophy", emoji:"🏆",  name:"Trofee",     price:450, starReq:28 },
    { id:"badge_gem",    emoji:"💎",  name:"Diamant",    price:600, starReq:40 },
  ],
  bg: [
    { id:"bg_dark",  color:"linear-gradient(160deg,#0f172a,#1e293b)",          name:"Standaard", price:0,   unlocked:true },
    { id:"bg_space", color:"linear-gradient(160deg,#0f172a,#1e3a8a)",          name:"Ruimte",    price:120 },
    { id:"bg_green", color:"linear-gradient(160deg,#064e3b,#10b981)",          name:"Natuur",    price:160 },
    { id:"bg_fire",  color:"linear-gradient(160deg,#7f1d1d,#ef4444)",          name:"Vuur",      price:280 },
    { id:"bg_gold",  color:"linear-gradient(160deg,#78350f,#d97706)",          name:"Goud",      price:400, starReq:20 },
  ],
  appbg: [
    { id:"appbg_default", css:"linear-gradient(160deg,#0a0f1e,#111827 60%,#0a0f1e)", name:"Standaard",  price:0,   unlocked:true },
    { id:"appbg_green",   css:"linear-gradient(160deg,#022c22,#064e3b 60%,#022c22)", name:"Bosgroen",   price:300 },
    { id:"appbg_purple",  css:"linear-gradient(160deg,#1e0a3c,#2d1b69 60%,#1e0a3c)", name:"Paars",      price:400 },
    { id:"appbg_red",     css:"linear-gradient(160deg,#1a0505,#450a0a 60%,#1a0505)", name:"Bloedrood",  price:500, starReq:14 },
    { id:"appbg_ocean",   css:"linear-gradient(160deg,#001c3d,#0c4a6e 60%,#001c3d)", name:"Oceaan",     price:600, starReq:22 },
    { id:"appbg_galaxy",  css:"radial-gradient(ellipse at 30% 40%,#0f0c29 0%,#302b63 50%,#24243e 100%)", name:"Kosmisch", price:1400, starReq:40 },
  ],
};

const STRALING_CAT_LABELS = {
  body:  "🧍 Karakter",
  hat:   "🎩 Hoeden",
  badge: "🏅 Badges",
  bg:    "🎨 Avatar achtergrond",
  appbg: "🖥️ App achtergrond",
};

const STRALING_DEFAULT_AVATAR = {
  body:"body_student", hat:"hat_none", badge:"badge_none",
  bg:"bg_dark", appbg:"appbg_default"
};
const STRALING_DEFAULT_OWNED = [
  "body_student","hat_none","badge_none","bg_dark","appbg_default"
];

// ─── HELPERS ──────────────────────────────────────────────────────────────

function stralingResolveAvatar(avatar) {
  const av = Object.assign({}, STRALING_DEFAULT_AVATAR, avatar || {});
  return {
    body:  STRALING_SHOP.body.find(function(x)  { return x.id === av.body;  }) || STRALING_SHOP.body[0],
    hat:   STRALING_SHOP.hat.find(function(x)   { return x.id === av.hat;   }) || STRALING_SHOP.hat[0],
    badge: STRALING_SHOP.badge.find(function(x) { return x.id === av.badge; }) || STRALING_SHOP.badge[0],
    bg:    STRALING_SHOP.bg.find(function(x)    { return x.id === av.bg;    }) || STRALING_SHOP.bg[0],
    appbg: STRALING_SHOP.appbg.find(function(x) { return x.id === av.appbg; }) || STRALING_SHOP.appbg[0],
  };
}

function stralingApplyAppBackground(avatar) {
  var r = stralingResolveAvatar(avatar);
  document.body.style.background = r.appbg.css || "linear-gradient(160deg,#0a0f1e,#111827)";
  document.body.style.minHeight = "100vh";
}

function stralingRenderAvatarHTML(avatar, size) {
  size = size || 64;
  var r      = stralingResolveAvatar(avatar);
  var bodyFs = Math.round(size * .52);
  var hatFs  = Math.round(size * .32);
  var hatTop = Math.round(size * .04);
  var badgeFs= Math.round(size * .24);
  var badgeSz= Math.round(size * .36);

  var hatHTML = r.hat.emoji
    ? '<div style="position:absolute;top:' + hatTop + 'px;left:0;right:0;display:flex;justify-content:center;pointer-events:none">'
      + '<span style="font-size:' + hatFs + 'px;line-height:1">' + r.hat.emoji + '</span></div>'
    : '';
  var badgeHTML = r.badge.emoji
    ? '<div style="position:absolute;bottom:4px;right:4px;width:' + badgeSz + 'px;height:' + badgeSz + 'px;'
      + 'border-radius:50%;background:rgba(0,0,0,.45);border:1.5px solid rgba(255,255,255,.25);'
      + 'display:flex;align-items:center;justify-content:center;font-size:' + badgeFs + 'px;line-height:1">'
      + r.badge.emoji + '</div>'
    : '';

  return '<div style="width:' + size + 'px;height:' + size + 'px;border-radius:16px;background:' + r.bg.color + ';'
    + 'display:flex;align-items:center;justify-content:center;position:relative;flex-shrink:0;'
    + 'border:2px solid rgba(255,255,255,.15);box-shadow:0 4px 20px rgba(0,0,0,.4);overflow:hidden">'
    + '<span style="font-size:' + bodyFs + 'px;line-height:1;position:relative;top:' + Math.round(size * .06) + 'px">'
    + r.body.emoji + '</span>'
    + hatHTML + badgeHTML + '</div>';
}

function stralingLoadSave() {
  try {
    return JSON.parse(localStorage.getItem(STRALING_SAVE_KEY)) || {};
  } catch(e) { return {}; }
}

function stralingPersist(data) {
  try {
    var prev = stralingLoadSave();
    localStorage.setItem(STRALING_SAVE_KEY, JSON.stringify(Object.assign({}, prev, data)));
  } catch(e) {}
}

function stralingGetTotalStars(save) {
  var s = save || stralingLoadSave();
  var total = 0;
  ["stars_51", "stars_52", "stars_53"].forEach(function(k) {
    var arr = s[k];
    if (Array.isArray(arr)) arr.forEach(function(v) { total += (v || 0); });
  });
  return total;
}

// Max sterren groeit mee als nieuwe paragrafen worden toegevoegd
function stralingGetMaxStars(save) {
  var s = save || stralingLoadSave();
  var max = 0;
  ["stars_51", "stars_52", "stars_53"].forEach(function(k) {
    var arr = s[k];
    if (Array.isArray(arr)) max += arr.length * 3;
  });
  return max || 36; // §5.1 + §5.2 + §5.3 hebben elk 4 levels × 3 sterren
}
