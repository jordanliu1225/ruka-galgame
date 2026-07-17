/* ============================================================
   簡易網頁視覺小說引擎 v0.1
   讀取 js/script.js 裡的 GAME 物件並執行。
   一般情況下只需要編輯 script.js,不需要動這支檔案。
   ============================================================ */
(() => {
"use strict";

const $  = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const els = {
  titleScreen:   $("#title-screen"),
  playScreen:    $("#play-screen"),
  bg:            $("#bg-layer"),
  slots: { left: $("#slot-left"), center: $("#slot-center"), right: $("#slot-right") },
  namePlate:     $("#name-plate"),
  text:          $("#dialogue-text"),
  hint:          $("#advance-hint"),
  choiceBox:     $("#choice-box"),
  affHud:        $("#affection-hud"),
  backlog:       $("#backlog"),
  backlogList:   $("#backlog-list"),
  saveload:      $("#saveload"),
  saveloadTitle: $("#saveload-title"),
  slotList:      $("#slot-list"),
  endingScreen:  $("#ending-screen"),
  endingTitle:   $("#ending-title"),
  endingDesc:    $("#ending-desc"),
  toast:         $("#toast"),
};

const POSITIONS = ["left", "center", "right"];
const SAVE_PREFIX = "galgame_ruka_save_";
const SLOT_COUNT = 3;

let state = null;
let typing = null;          // {timer, full}
let waiting = false;        // 等待玩家點擊推進
let choosing = false;       // 選項顯示中
let autoMode = false, skipMode = false;
let autoTimer = null, toastTimer = null, titleArm = 0;
let saveloadMode = "save";
let bgmEl = null, currentBgm = null;

function cfg(key, def) {
  return (GAME.config && GAME.config[key] !== undefined) ? GAME.config[key] : def;
}

function newState() {
  return {
    scene: GAME.start || "start", index: 0,
    aff: {}, flags: {}, bg: null,
    sprites: { left: null, center: null, right: null },
    log: [],
  };
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
}
function xmlEscape(s) {
  return String(s).replace(/[&<>]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[m]));
}

/* ---------- 佔位立繪(還沒有圖片時自動使用) ---------- */
function spriteSrc(charId, expr) {
  const c = GAME.characters[charId] || {};
  const s = c.sprites && c.sprites[expr || "normal"];
  if (s) return s;
  const color = c.color || "#cccccc";
  const label = xmlEscape((c.name || charId) + (expr && expr !== "normal" ? "·" + expr : ""));
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="640" viewBox="0 0 360 640">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0" stop-color="${color}" stop-opacity="0.95"/>` +
    `<stop offset="1" stop-color="${color}" stop-opacity="0.55"/></linearGradient></defs>` +
    `<circle cx="180" cy="150" r="86" fill="url(#g)"/>` +
    `<path d="M60 640 C60 420 120 320 180 320 C240 320 300 420 300 640 Z" fill="url(#g)"/>` +
    `<text x="180" y="596" text-anchor="middle" font-size="30" font-family="sans-serif" fill="#fff" opacity="0.9">${label}</text>` +
    `<text x="180" y="626" text-anchor="middle" font-size="16" font-family="sans-serif" fill="#fff" opacity="0.7">立繪佔位圖</text>` +
    `</svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

/* ---------- 背景 ---------- */
function setBg(id) {
  state.bg = id;
  const b = (GAME.backgrounds || {})[id];
  els.bg.style.opacity = 0;
  setTimeout(() => {
    if (b && b.img) {
      els.bg.style.background = `url('${b.img}') center/cover no-repeat`;
    } else if (b) {
      els.bg.style.background = b.css || "#222";
    } else {
      els.bg.style.background = "#222";
    }
    const tag = (cfg("debugTags", false) && b)
      ? "場景:" + (b.label || id) + (b.img ? "" : "(佔位背景)")
      : "";
    els.bg.setAttribute("data-tag", tag);
    els.bg.style.opacity = 1;
  }, 200);
}

/* ---------- 立繪 ---------- */
function showChar(charId, expr, pos) {
  pos = pos || "center";
  for (const p of POSITIONS) {
    if (p !== pos && state.sprites[p] && state.sprites[p].id === charId) {
      state.sprites[p] = null;
      renderSlot(p);
    }
  }
  state.sprites[pos] = { id: charId, expr: expr || "normal" };
  renderSlot(pos);
}
function hideChar(charId) {
  for (const p of POSITIONS) {
    if (charId === "all" || (state.sprites[p] && state.sprites[p].id === charId)) {
      state.sprites[p] = null;
      renderSlot(p);
    }
  }
}
function renderSlot(pos) {
  const slot = els.slots[pos];
  const sp = state ? state.sprites[pos] : null;
  slot.innerHTML = "";
  slot.classList.remove("dim");
  if (!sp) return;
  const img = document.createElement("img");
  img.src = spriteSrc(sp.id, sp.expr);
  img.alt = (GAME.characters[sp.id] || {}).name || sp.id;
  img.className = "sprite";
  slot.appendChild(img);
  requestAnimationFrame(() => img.classList.add("in"));
}
function highlightSpeaker(charId) {
  for (const p of POSITIONS) {
    const sp = state.sprites[p];
    els.slots[p].classList.toggle("dim", !!(sp && charId && sp.id !== charId));
  }
}

/* ---------- 對話 ---------- */
function doSay(inst) {
  const isNarr = inst.narrate !== undefined;
  const charId = isNarr ? null : inst.say;
  const c = charId ? GAME.characters[charId] : null;
  const text = isNarr ? inst.narrate : inst.text;

  if (!isNarr && inst.sprite) {
    for (const p of POSITIONS) {
      const sp = state.sprites[p];
      if (sp && sp.id === charId) { sp.expr = inst.sprite; renderSlot(p); }
    }
  }
  highlightSpeaker(charId);

  if (c) {
    els.namePlate.textContent = c.name;
    els.namePlate.style.background = c.color || "#888";
    els.namePlate.classList.remove("hidden");
  } else {
    els.namePlate.classList.add("hidden");
  }

  state.log.push({ name: c ? c.name : "", text });
  if (state.log.length > 200) state.log.shift();

  waiting = true;
  typeText(text);
}

function getTextSpeed() { return cfg("textSpeed", 30); }
function stopTyping() { if (typing) { clearInterval(typing.timer); typing = null; } }
function typeText(full) {
  stopTyping();
  els.hint.classList.add("hidden");
  els.text.textContent = "";
  if (skipMode || getTextSpeed() <= 0) { finishTyping(full); return; }
  let i = 0;
  const timer = setInterval(() => {
    i++;
    els.text.textContent = full.slice(0, i);
    if (i >= full.length) finishTyping(full);
  }, getTextSpeed());
  typing = { timer, full };
}
function finishTyping(full) {
  stopTyping();
  els.text.textContent = full;
  els.hint.classList.remove("hidden");
  scheduleAuto();
}
function scheduleAuto() {
  clearTimeout(autoTimer);
  if ((autoMode || skipMode) && waiting && !choosing) {
    autoTimer = setTimeout(() => advance(), skipMode ? 120 : 1600);
  }
}

/* ---------- 選項 ---------- */
function doChoice(inst) {
  choosing = true;
  waiting = false;
  els.hint.classList.add("hidden");
  els.choiceBox.innerHTML = "";
  els.choiceBox.classList.remove("hidden");
  inst.choice.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = opt.text;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      els.choiceBox.classList.add("hidden");
      choosing = false;
      state.log.push({ name: "▶ 選擇", text: opt.text });
      if (opt.aff) applyAff(opt.aff);
      if (opt.flag) Object.assign(state.flags, opt.flag);
      if (opt.jump) gotoScene(opt.jump); else state.index++;
      run();
    });
    els.choiceBox.appendChild(btn);
  });
}

/* ---------- 好感度 / 條件 ---------- */
function applyAff(map) {
  for (const [id, d] of Object.entries(map)) {
    state.aff[id] = (state.aff[id] || 0) + d;
    const c = GAME.characters[id];
    if (c) toast(`${d > 0 ? "❤" : "💔"} ${c.name} 好感度 ${d > 0 ? "+" : ""}${d}`);
  }
  renderAffHud();
}
function renderAffHud() {
  els.affHud.innerHTML = "";
  if (!cfg("showAffection", false) || !state) return;
  for (const [id, c] of Object.entries(GAME.characters)) {
    if (!c.romanceable) continue;
    const v = state.aff[id] || 0;
    const el = document.createElement("div");
    el.className = "aff-item";
    el.innerHTML = `<span class="dot" style="background:${c.color || "#888"}"></span>${escapeHtml(c.name)} <b>${v}</b>`;
    els.affHud.appendChild(el);
  }
}
function matchCond(cond) {
  const cmp = (a, op, b) =>
    op === ">=" ? a >= b :
    op === "<=" ? a <= b :
    op === ">"  ? a >  b :
    op === "<"  ? a <  b :
    op === "!=" ? a != b : a == b;
  if (cond.aff)  { const [id, op, v] = cond.aff;  return cmp(state.aff[id] || 0, op, v); }
  if (cond.flag) { const [k, op, v] = cond.flag;  return cmp(state.flags[k], op, v); }
  return false;
}
function pickTopAff(map) {
  const ids = Object.keys(map).filter((k) => k !== "_default");
  let best = ids[0], bestV = -Infinity;
  for (const id of ids) {
    const v = state.aff[id] || 0;
    if (v > bestV) { bestV = v; best = id; }
  }
  const tied = ids.filter((id) => (state.aff[id] || 0) === bestV).length > 1;
  if ((bestV <= 0 || tied) && map._default) return map._default;
  return map[best];
}

/* ---------- 主迴圈 ---------- */
function gotoScene(key) { state.scene = key; state.index = 0; }
function run() {
  let guard = 0;
  while (guard++ < 1000) {
    const scene = GAME.scenes[state.scene];
    if (!scene) { console.error("找不到場景:", state.scene); return; }
    if (state.index >= scene.length) {
      showEnding({ ending: "劇情結束", desc: "(此路線的內容到這裡為止)" });
      return;
    }
    const inst = scene[state.index];

    // 阻塞指令:顯示後等待玩家操作
    if (inst.say !== undefined || inst.narrate !== undefined) { doSay(inst); return; }
    if (inst.choice) { doChoice(inst); return; }
    if (inst.ending) { showEnding(inst); return; }

    // 非阻塞指令
    if (inst.bg) setBg(inst.bg);
    if (inst.show) showChar(inst.show, inst.sprite, inst.pos);
    if (inst.hide) hideChar(inst.hide);
    if (inst.aff) applyAff(inst.aff);
    if (inst.flag) Object.assign(state.flags, inst.flag);
    if (inst.bgm !== undefined) playBgm(inst.bgm);

    if (inst.jump && inst.if && matchCond(inst.if)) { gotoScene(inst.jump); continue; }
    if (inst.jump && !inst.if) { gotoScene(inst.jump); continue; }
    if (inst.branchTopAff) { gotoScene(pickTopAff(inst.branchTopAff)); continue; }

    state.index++;
  }
  console.error("指令執行過多,劇本裡可能有無窮迴圈");
}

function advance() {
  if (choosing || overlayOpen() || !isPlaying()) return;
  if (typing) { finishTyping(typing.full); return; }
  if (!waiting) return;
  waiting = false;
  clearTimeout(autoTimer);
  state.index++;
  run();
}

/* ---------- 結局 ---------- */
function showEnding(inst) {
  waiting = false; choosing = false;
  stopTyping(); clearTimeout(autoTimer);
  autoMode = false; skipMode = false;
  updateQuickMenuUI();
  els.endingTitle.textContent = inst.ending;
  els.endingDesc.textContent = inst.desc || "";
  els.endingScreen.classList.remove("hidden");
}

/* ---------- 存檔 / 讀檔 ---------- */
function openSaveLoad(mode) {
  saveloadMode = mode;
  els.saveloadTitle.textContent = mode === "save" ? "存檔" : "讀取進度";
  renderSlots();
  els.saveload.classList.remove("hidden");
}
function readSlot(n) {
  try { return JSON.parse(localStorage.getItem(SAVE_PREFIX + n)); }
  catch { return null; }
}
function renderSlots() {
  els.slotList.innerHTML = "";
  for (let n = 1; n <= SLOT_COUNT; n++) {
    const data = readSlot(n);
    const div = document.createElement("div");
    div.className = "save-slot" + (data ? "" : " empty");
    div.innerHTML = data
      ? `<b>存檔 ${n}</b><span class="slot-when">${escapeHtml(data.when || "")}</span><span class="slot-prev">${escapeHtml(data.preview || "")}</span>`
      : `<b>存檔 ${n}</b><span class="slot-prev">(空)</span>`;
    div.addEventListener("click", () => {
      if (saveloadMode === "save") {
        if (!state) return;
        doSave(n);
        renderSlots();
        toast("已存檔 ✓");
      } else if (data) {
        els.saveload.classList.add("hidden");
        doLoad(data);
      }
    });
    els.slotList.appendChild(div);
  }
}
function doSave(n) {
  const last = state.log[state.log.length - 1];
  // 讀檔時會重新執行目前這句台詞並再記錄一次,
  // 所以存檔時若正顯示台詞,紀錄要先扣掉最後一筆,避免讀檔後重複。
  const logToSave = waiting ? state.log.slice(0, -1) : state.log.slice();
  const data = {
    when: new Date().toLocaleString("zh-TW", { hour12: false }),
    scene: state.scene, index: state.index,
    aff: state.aff, flags: state.flags, bg: state.bg, sprites: state.sprites,
    log: logToSave.slice(-50),
    preview: last ? (last.name ? last.name + ":" : "") + String(last.text).slice(0, 24) : "",
  };
  localStorage.setItem(SAVE_PREFIX + n, JSON.stringify(data));
}
function doLoad(data) {
  if (!GAME.scenes[data.scene]) { toast("這個存檔屬於舊版劇本,無法讀取"); return; }
  closeAllOverlays();
  state = newState();
  state.scene = data.scene;
  state.index = data.index || 0;
  state.aff = data.aff || {};
  state.flags = data.flags || {};
  state.log = data.log || [];
  state.sprites = data.sprites || { left: null, center: null, right: null };
  waiting = false; choosing = false;
  els.choiceBox.classList.add("hidden");
  showScreen("play");
  if (data.bg) setBg(data.bg); else { els.bg.style.background = "#111"; els.bg.setAttribute("data-tag", ""); }
  for (const p of POSITIONS) renderSlot(p);
  renderAffHud();
  run();
}

/* ---------- 對話紀錄 ---------- */
function openLog() {
  if (!state) return;
  els.backlogList.innerHTML = "";
  for (const item of state.log) {
    const div = document.createElement("div");
    div.className = "log-item";
    div.innerHTML = (item.name ? `<b>${escapeHtml(item.name)}</b>` : "") + `<span>${escapeHtml(item.text)}</span>`;
    els.backlogList.appendChild(div);
  }
  els.backlog.classList.remove("hidden");
  els.backlogList.scrollTop = els.backlogList.scrollHeight;
}

/* ---------- BGM ---------- */
function playBgm(id) {
  if (!bgmEl) { bgmEl = new Audio(); bgmEl.loop = true; bgmEl.volume = 0.6; }
  const src = id && GAME.bgm ? GAME.bgm[id] : null;
  if (!src) { bgmEl.pause(); currentBgm = null; return; }
  if (currentBgm !== id) { bgmEl.src = src; currentBgm = id; }
  bgmEl.play().catch(() => {});
}

/* ---------- 畫面切換 / 雜項 ---------- */
function showScreen(name) {
  els.titleScreen.classList.toggle("hidden", name !== "title");
  els.playScreen.classList.toggle("hidden", name !== "play");
}
function isPlaying() { return !!state && !els.playScreen.classList.contains("hidden"); }
function overlayOpen() { return [...$$(".overlay")].some((o) => !o.classList.contains("hidden")); }
function closeAllOverlays() { $$(".overlay").forEach((o) => o.classList.add("hidden")); }
function closeTopOverlay() {
  if (!els.endingScreen.classList.contains("hidden")) { backToTitle(); return; }
  for (const o of [els.backlog, els.saveload]) {
    if (!o.classList.contains("hidden")) { o.classList.add("hidden"); return; }
  }
}
function toast(msg) {
  els.toast.textContent = msg;
  els.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove("show"), 2000);
}
function updateQuickMenuUI() {
  const a = $('#quick-menu [data-act="auto"]');
  const s = $('#quick-menu [data-act="skip"]');
  if (a) a.classList.toggle("active", autoMode);
  if (s) s.classList.toggle("active", skipMode);
}

function startNewGame() {
  state = newState();
  closeAllOverlays();
  els.choiceBox.classList.add("hidden");
  els.namePlate.classList.add("hidden");
  els.hint.classList.add("hidden");
  els.text.textContent = "";
  els.bg.style.background = "#111";
  els.bg.setAttribute("data-tag", "");
  for (const p of POSITIONS) renderSlot(p);
  renderAffHud();
  showScreen("play");
  run();
}
function backToTitle() {
  closeAllOverlays();
  stopTyping();
  clearTimeout(autoTimer);
  autoMode = false; skipMode = false;
  updateQuickMenuUI();
  waiting = false; choosing = false;
  els.choiceBox.classList.add("hidden");
  if (bgmEl) bgmEl.pause();
  currentBgm = null;
  state = null;
  showScreen("title");
}
function maybeTitle() {
  const now = Date.now();
  if (now - titleArm < 3000) { backToTitle(); return; }
  titleArm = now;
  toast("再按一次「標題」確認返回(未存檔進度會消失)");
}

function quickAction(act) {
  if (act === "auto") {
    autoMode = !autoMode; skipMode = false;
    updateQuickMenuUI(); scheduleAuto();
  } else if (act === "skip") {
    skipMode = !skipMode; autoMode = false;
    updateQuickMenuUI();
    if (skipMode && typing) finishTyping(typing.full);
    scheduleAuto();
  } else if (act === "log") openLog();
  else if (act === "save") openSaveLoad("save");
  else if (act === "load") openSaveLoad("load");
  else if (act === "title") maybeTitle();
}

/* ---------- 事件 ---------- */
function bind() {
  $("#btn-start").addEventListener("click", startNewGame);
  $("#btn-load-title").addEventListener("click", () => openSaveLoad("load"));
  $("#btn-ending-title").addEventListener("click", backToTitle);
  els.playScreen.addEventListener("click", advance);
  $$("#quick-menu button").forEach((b) =>
    b.addEventListener("click", (e) => { e.stopPropagation(); quickAction(b.dataset.act); })
  );
  $$(".overlay .close-btn").forEach((b) =>
    b.addEventListener("click", () => b.closest(".overlay").classList.add("hidden"))
  );
  [els.backlog, els.saveload].forEach((o) =>
    o.addEventListener("click", (e) => { if (e.target === o) o.classList.add("hidden"); })
  );
  document.addEventListener("keydown", (e) => {
    if ((e.key === " " || e.key === "Enter") && !overlayOpen() && isPlaying()) {
      e.preventDefault();
      advance();
    }
    if (e.key === "Escape") closeTopOverlay();
  });
}

function init() {
  document.title = GAME.title || "Galgame";
  $("#game-title").textContent = GAME.title || "未命名遊戲";
  $("#game-subtitle").textContent = GAME.subtitle || "";
  bind();
  showScreen("title");
}
init();

})();
