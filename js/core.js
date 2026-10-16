// 共用工具：存檔、發音、音效、角色顯示（主角宸毅＋小幫手 Tzuyu）
window.JOY = window.JOY || {};

(function () {
  const SAVE_KEY = 'joy-english-save-v1';
  const ZONES = ['vocab', 'reading', 'grammar'];
  JOY.ZONES = ZONES;
  JOY.TEACHER = /[?&]teacher\b/.test(location.search);

  /* ---------- 小工具 ---------- */
  JOY.$ = (sel, root = document) => root.querySelector(sel);
  JOY.$$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  JOY.esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  JOY.shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  JOY.pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  JOY.sample = (arr, n) => JOY.shuffle(arr).slice(0, n);

  /* ---------- 存檔（存在這台裝置的瀏覽器裡） ---------- */
  function fresh() {
    return { coins: 0, islands: {}, words: {}, owned: [], equipped: {}, seenIntro: false, heroName: '宸毅' };
  }
  function load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (raw) return Object.assign(fresh(), JSON.parse(raw));
    } catch (e) { /* 無痕模式或被封鎖時就從頭開始 */ }
    return fresh();
  }
  JOY.state = load();
  // 商店改版：舊的裝扮下架，退還金幣
  (function migrateShop() {
    const st = JOY.state;
    const old = JOY.OLD_SHOP_PRICES || {};
    let refund = 0;
    st.owned = st.owned.filter((id) => {
      if (JOY.SHOP.some((i) => i.id === id)) return true;
      refund += old[id] || 0;
      return false;
    });
    Object.keys(st.equipped).forEach((slot) => { if (!st.owned.includes(st.equipped[slot])) delete st.equipped[slot]; });
    if (refund) { st.coins += refund; st.refunded = refund; }
  })();
  JOY.save = () => {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(JOY.state)); } catch (e) { /* ignore */ }
  };
  JOY.resetSave = () => {
    try { localStorage.removeItem(SAVE_KEY); } catch (e) { /* ignore */ }
    JOY.state = fresh();
  };

  JOY.island = (lesson) => {
    const s = JOY.state.islands;
    if (!s[lesson]) s[lesson] = { vocab: 0, reading: 0, grammar: 0, boss: 0 };
    return s[lesson];
  };
  // 每課可以用 zones 指定有哪些區域（例如第 5 課只有課文森林）；boss: null 代表沒有島主
  JOY.lessonZones = (lesson) => (JOY.LESSONS[lesson] && JOY.LESSONS[lesson].zones) || ZONES;
  JOY.hasBoss = (lesson) => !!(JOY.LESSONS[lesson] && JOY.LESSONS[lesson].boss);
  JOY.zonesDone = (lesson) => JOY.lessonZones(lesson).every((z) => JOY.island(lesson)[z] > 0);
  JOY.islandCleared = (lesson) => (JOY.hasBoss(lesson) ? JOY.island(lesson).boss > 0 : JOY.zonesDone(lesson));
  // 整座島的平均星星（0–3）
  JOY.islandAvgStars = (lesson) => {
    const i = JOY.island(lesson);
    const zs = JOY.lessonZones(lesson).concat(JOY.hasBoss(lesson) ? ['boss'] : []);
    return Math.round(zs.reduce((n, z) => n + i[z], 0) / zs.length);
  };
  JOY.hasLesson = (lesson) => !!JOY.LESSONS[lesson];

  // 已經有課程內容的島都直接開放，可以跳著玩
  JOY.islandUnlocked = (lesson) => JOY.hasLesson(lesson);

  // 記錄星星並發金幣：新拿到的星星每顆 10 枚，島主加倍；重玩也有 2 枚鼓勵
  JOY.recordStars = (lesson, zone, stars) => {
    const isl = JOY.island(lesson);
    const gained = Math.max(0, stars - isl[zone]);
    isl[zone] = Math.max(isl[zone], stars);
    const coins = gained * (zone === 'boss' ? 20 : 10) + 2;
    JOY.state.coins += coins;
    JOY.save();
    return coins;
  };
  JOY.starsFor = (correct, total) => {
    const acc = total ? correct / total : 1;
    return acc >= 0.9 ? 3 : acc >= 0.7 ? 2 : 1;
  };

  // 單字圖鑑：答對一次就收集到，答對越多次星等越高
  JOY.wordKey = (lesson, id) => `${lesson}:${id}`;
  JOY.markWord = (key) => {
    JOY.state.words[key] = (JOY.state.words[key] || 0) + 1;
    JOY.save();
  };
  JOY.wordLevel = (key) => {
    const n = JOY.state.words[key] || 0;
    return n >= 6 ? 3 : n >= 3 ? 2 : n >= 1 ? 1 : 0;
  };

  /* ---------- 發音 ---------- */
  let voice = null;
  const PREFERRED = ['Samantha', 'Google US English', 'Microsoft Aria', 'Microsoft Jenny', 'Ava', 'Allison', 'Karen'];
  function chooseVoice() {
    if (!('speechSynthesis' in window)) return;
    const voices = speechSynthesis.getVoices().filter((v) => /^en[-_]/i.test(v.lang));
    voice =
      PREFERRED.map((n) => voices.find((v) => v.name.includes(n))).find(Boolean) ||
      voices.find((v) => /en[-_]US/i.test(v.lang)) ||
      voices[0] || null;
  }
  if ('speechSynthesis' in window) {
    chooseVoice();
    speechSynthesis.onvoiceschanged = chooseVoice;
  }
  // 唸法修正：縮寫要一個字母一個字母唸（PE → P. E.）
  const SAY_FIX = [[/\.\.\./g, '…'], [/\bPE\b/g, 'P. E.']];
  const fixSay = (t) => SAY_FIX.reduce((s, [re, to]) => s.replace(re, to), t);
  JOY.slow = false;
  let currentAudio = null;

  JOY.stopSpeak = () => {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    if (currentAudio) { currentAudio.pause(); currentAudio = null; }
  };

  // opts: { pitch, audio（自錄音檔路徑）, onend }
  JOY.speak = (text, opts = {}) => {
    JOY.stopSpeak();
    const done = () => opts.onend && opts.onend();
    if (opts.audio) {
      currentAudio = new Audio(opts.audio);
      currentAudio.onended = done;
      currentAudio.onerror = () => { currentAudio = null; JOY.speak(text, Object.assign({}, opts, { audio: null })); };
      currentAudio.play().catch(currentAudio.onerror);
      return;
    }
    if (!('speechSynthesis' in window)) { setTimeout(done, 300); return; }
    const u = new SpeechSynthesisUtterance(fixSay(text));
    if (voice) u.voice = voice;
    u.lang = voice ? voice.lang : 'en-US';
    u.rate = JOY.slow ? 0.6 : 0.85;
    u.pitch = opts.pitch || 1.1;
    u.onend = done;
    u.onerror = done;
    speechSynthesis.speak(u);
  };

  /* ---------- 音效 ---------- */
  let actx = null;
  function tone(freq, start, dur, type = 'sine', vol = 0.15) {
    const o = actx.createOscillator();
    const g = actx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(vol, actx.currentTime + start);
    g.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + start + dur);
    o.connect(g).connect(actx.destination);
    o.start(actx.currentTime + start);
    o.stop(actx.currentTime + start + dur);
  }
  JOY.sfx = (kind) => {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (kind === 'right') { tone(784, 0, 0.12); tone(1047, 0.1, 0.2); }
      else if (kind === 'wrong') { tone(330, 0, 0.15, 'triangle'); tone(262, 0.13, 0.25, 'triangle'); }
      else if (kind === 'pop') { tone(660, 0, 0.08); }
      else if (kind === 'coin') { tone(988, 0, 0.08, 'square', 0.06); tone(1319, 0.08, 0.2, 'square', 0.06); }
      else if (kind === 'win') { [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.12, 0.25)); }
      else if (kind === 'hit') { tone(180, 0, 0.12, 'sawtooth', 0.1); }
    } catch (e) { /* 沒有音效也沒關係 */ }
  };

  /* ---------- 小幫手 Tzuyu ---------- */
  JOY.TZ = {
    praise: ['太棒了！', '好厲害喔！', '答對了！你真聰明 ✨', '完全正確！', 'Great job！', '哇～你好棒！', 'Perfect！'],
    comfort: ['沒關係，我們再看一次～', '差一點點！慢慢來就好 😊', '別擔心，等一下還有機會喔！', '錯了也沒關係，這樣才會記得更清楚！'],
    cheer: ['加油！你可以的！', '我們一起努力吧！', '準備好了嗎？Let\'s go！'],
  };

  // 小頭像＋對話框
  JOY.tzBubble = (text, cls = '') =>
    `<div class="tz ${cls}"><img class="tz-head" src="assets/tzuyu-head.png" alt="Tzuyu"><div class="tz-bubble">${text}</div></div>`;

  JOY.heroName = () => JOY.state.heroName || '宸毅';

  // 小幫手 Tzuyu 全身（文法教室的老師）
  JOY.tzuyuHTML = (width, extraCls = '') =>
    `<div class="avatar tzuyu ${extraCls}" style="--w:${width}px"><img src="assets/tzuyu.png" alt="Tzuyu"></div>`;

  // 主角宸毅全身＋裝扮
  JOY.avatarHTML = (width, extraCls = '') => {
    const eq = JOY.state.equipped;
    const item = (slot) => JOY.SHOP.find((i) => i.id === eq[slot]);
    let acc = '';
    const aura = item('aura');
    if (aura) acc += auraHTML(aura.id);
    ['head', 'hand', 'pet'].forEach((slot) => {
      const it = item(slot);
      if (it) acc += `<span class="acc acc-${slot} acc-${it.id}">${it.emoji}</span>`;
    });
    return `<div class="avatar ${extraCls}" style="--w:${width}px">${acc}<img src="assets/hero.png" alt="${JOY.esc(JOY.heroName())}"></div>`;
  };
  function auraHTML(id) {
    if (id === 'rainbow') return '<span class="aura aura-rainbow"></span>';
    const ch = {
      thunder: ['⚡', '⚡', '⚡', '⚡', '⚡', '⚡'],
      fire: ['🔥', '🔥', '🔥', '🔥', '🔥', '🔥'],
    }[id] || ['✨', '⭐', '✨', '💫', '✨', '⭐'];
    return `<span class="aura aura-${id}">${ch.map((c, i) => `<i style="--i:${i}">${c}</i>`).join('')}</span>`;
  }

  JOY.starsHTML = (n, max = 3) =>
    '<span class="stars">' + Array.from({ length: max }, (_, i) => `<b class="${i < n ? 'on' : ''}">★</b>`).join('') + '</span>';

  // 單字的圖片：img 是課本插圖，label 是文字標籤（例如 1st）；都沒有就是純文字單字
  JOY.hasPic = (v) => !!(v.img || v.label);
  JOY.picHTML = (v, cls = '') =>
    v.img ? `<img class="pic ${cls}" src="${v.img}" alt="">`
    : v.label ? `<span class="pic pic-label ${cls}">${JOY.esc(v.label)}</span>`
    : '';

  JOY.confetti = () => {
    const box = document.createElement('div');
    box.className = 'confetti';
    const ch = ['🍬', '🍭', '⭐', '🍫', '✨', '🧁', '🍩'];
    for (let i = 0; i < 32; i++) {
      const s = document.createElement('span');
      s.textContent = JOY.pick(ch);
      s.style.left = Math.random() * 100 + '%';
      s.style.animationDelay = Math.random() * 0.8 + 's';
      s.style.fontSize = 18 + Math.random() * 20 + 'px';
      box.appendChild(s);
    }
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 3500);
  };
})();
