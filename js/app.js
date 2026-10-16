// 畫面與路由：#/ 地圖、#/island/7 島嶼、#/play/7/vocab 關卡、#/book 圖鑑、#/wardrobe 衣櫃
(function () {
  const { $, $$, esc, pick } = JOY;
  const app = $('#app');

  const ZONE_INFO = {
    vocab:   { name: '單字村',   emoji: '🏘️', desc: '單字卡・選擇・拼字・配對' },
    reading: { name: '課文森林', emoji: '🌳', desc: '聽課文・閱讀理解' },
    grammar: { name: '文法洞穴', emoji: '🕳️', desc: '文法小教室・填空・對錯' },
    boss:    { name: '島主城堡', emoji: '🏰', desc: '綜合大挑戰' },
  };

  function header(back, title) {
    return `<header class="bar">
      ${back ? `<a class="back" href="${back.href}">‹ ${esc(back.label)}</a>` : '<span class="logo">🍭 Joy English</span>'}
      <h1>${esc(title)}</h1>
      <a class="coins" href="#/wardrobe" title="金幣（可以買裝扮）">🪙 <b>${JOY.state.coins}</b></a>
    </header>`;
  }
  JOY.updateCoins = () => { const b = $('.coins b'); if (b) b.textContent = JOY.state.coins; };

  /* ================= 地圖 ================= */
  function renderMap() {
    const isl = JOY.ISLANDS;
    const ROW = 150;
    const xs = isl.map((_, i) => 50 + 30 * Math.sin(i * 1.15));
    const ys = isl.map((_, i) => 90 + i * ROW);
    const H = ys[ys.length - 1] + 120;
    let d = `M ${xs[0]} ${ys[0]}`;
    for (let i = 1; i < isl.length; i++) {
      const my = (ys[i - 1] + ys[i]) / 2;
      d += ` C ${xs[i - 1]} ${my}, ${xs[i]} ${my}, ${xs[i]} ${ys[i]}`;
    }
    const current = isl.map((i) => i.lesson).filter((l) => JOY.islandUnlocked(l) && !JOY.islandCleared(l))[0];
    const intro = !JOY.state.seenIntro;
    const name = JOY.heroName();
    const refunded = JOY.state.refunded;
    if (refunded) { delete JOY.state.refunded; JOY.save(); }

    app.innerHTML = `
      ${header(null, '糖果群島')}
      <main class="map-page">
        <section class="hero">
          ${JOY.avatarHTML(118)}
          ${JOY.tzBubble(intro
            ? `嗨，${esc(name)}！我是你的小幫手 Tzuyu 🍬 歡迎來到糖果群島！每一座島就是一課，我們一起闖關、收集星星和金幣吧！`
            : refunded
            ? `${esc(name)}，商店換新裝扮囉！舊的裝扮已經退還 ${refunded} 枚金幣，快去衣櫃看看 🧢`
            : pick([`${esc(name)}，今天想去哪一座島呢？`, `歡迎回來，${esc(name)}！我們繼續冒險吧！`, '每天學一點點，就會越來越厲害喔！', `${esc(name)}加油！我會一直陪著你 💪`]))}
          <nav class="hero-nav">
            ${current ? `<a class="btn go-on" href="#/island/${current}">🏝️ 繼續冒險：第 ${current} 課</a>` : ''}
            <a class="btn" href="#/book">📖 單字圖鑑</a>
            <a class="btn" href="#/wardrobe">🧢 ${esc(name)}的衣櫃</a>
          </nav>
        </section>
        ${JOY.TEACHER ? '<div class="teacher-bar">👩‍🏫 老師模式：島主城堡不用先完成三個地方也能挑戰</div>' : ''}
        <div class="sea" style="height:${H}px">
          <svg class="route" viewBox="0 0 100 ${H}" preserveAspectRatio="none" aria-hidden="true">
            <path d="${d}" vector-effect="non-scaling-stroke"/>
          </svg>
          ${isl.map((it, i) => islandNode(it, xs[i], ys[i], it.lesson === current)).join('')}
        </div>
        <footer class="map-foot">
          <button class="btn ghost small" data-act="reset">🧹 清除所有進度</button>
          <p>會清除這台裝置上的星星、金幣、裝扮和單字圖鑑</p>
        </footer>
      </main>`;
    if (intro) { JOY.state.seenIntro = true; JOY.save(); }
    $$('[data-act=reset]').forEach((b) => (b.onclick = () => {
      if (!confirm('確定要清除這台裝置上的所有進度、金幣、裝扮和單字圖鑑嗎？\n清除後無法復原喔！')) return;
      JOY.resetSave();
      renderMap();
      window.scrollTo(0, 0);
    }));
    const cur = $('.island.current');
    if (cur && !intro) cur.scrollIntoView({ block: 'center' });
  }

  function islandNode(it, x, y, isCurrent) {
    const has = JOY.hasLesson(it.lesson);
    const open = JOY.islandUnlocked(it.lesson);
    const cleared = has && JOY.islandCleared(it.lesson);
    const cls = ['island', !has ? 'soon' : !open ? 'locked' : '', cleared ? 'cleared' : '', isCurrent ? 'current' : ''].join(' ');
    const label = !open ? '🚧 建造中' : JOY.starsHTML(JOY.islandAvgStars(it.lesson));
    const inner = `
      <span class="blob" style="--c:${it.color}"><span class="em">${it.emoji}</span>${cleared ? '<span class="flag">🚩</span>' : ''}</span>
      <span class="name"><small>第 ${it.lesson} 課</small>${esc(it.name)}</span>
      <span class="sub">${label}</span>
      ${isCurrent ? '<img class="here" src="assets/hero-head.png" alt="">' : ''}`;
    const style = `left:${x}%;top:${y}px`;
    return open
      ? `<a class="${cls}" style="${style}" href="#/island/${it.lesson}">${inner}</a>`
      : `<button class="${cls}" style="${style}" data-locked="${has ? 1 : 0}">${inner}</button>`;
  }

  document.addEventListener('click', (e) => {
    const b = e.target.closest('.island[data-locked]');
    if (!b) return;
    b.classList.remove('shake'); void b.offsetWidth; b.classList.add('shake');
    JOY.sfx('wrong');
  });

  /* ================= 島嶼 ================= */
  function renderIsland(lesson) {
    const L = JOY.LESSONS[lesson];
    const meta = JOY.ISLANDS.find((i) => i.lesson === lesson);
    if (!L || !JOY.islandUnlocked(lesson)) return go('#/');
    const st = JOY.island(lesson);
    const ready = JOY.zonesDone(lesson);
    const zones = JOY.lessonZones(lesson);
    const msg = JOY.islandCleared(lesson)
      ? '這座島你已經闖過了！想拿更多星星可以再挑戰喔 ⭐'
      : L.readingMode === 'readAloud' ? '這一課不用背，只要跟著我一起唸就好囉！🎤'
      : ready ? '三個地方都完成了！島主在城堡等你，一起去打倒它吧！⚔️'
      : `${zones.map((z) => ZONE_INFO[z].name).join('、')}，想先去哪裡都可以喔！${L.boss ? '全部完成就能挑戰島主！' : ''}`;
    app.innerHTML = `
      ${header({ href: '#/', label: '地圖' }, `第 ${lesson} 課`)}
      <main class="island-page" style="--c:${meta.color}">
        <section class="island-hero">
          <div class="em">${meta.emoji}</div>
          <div><h2>${esc(meta.name)}</h2><p class="en-title">${esc(L.title)}</p><p class="zh-title">${esc(L.titleZh)}</p></div>
        </section>
        ${JOY.tzBubble(msg)}
        <div class="zones n${zones.length}">
          ${zones.map((z) => zoneCard(lesson, z, st[z], true, null, L)).join('')}
        </div>
        ${L.boss ? `<div class="zones boss-row">${zoneCard(lesson, 'boss', st.boss, ready || JOY.TEACHER, L.boss)}</div>` : ''}
      </main>`;
  }

  function zoneCard(lesson, z, stars, open, boss, L) {
    const info = Object.assign({}, ZONE_INFO[z], z === 'reading' && L && L.readingMode === 'readAloud' ? { desc: '聽課文・跟著唸' } : {});
    const inner = `
      <span class="z-em">${boss && open ? boss.emoji : info.emoji}</span>
      <span class="z-name">${info.name}</span>
      <span class="z-desc">${open ? (boss ? `打倒「${esc(boss.name)}」` : info.desc) : '🔒 先完成上面的地方'}</span>
      ${JOY.starsHTML(stars)}`;
    return open
      ? `<a class="zone zone-${z} ${stars ? 'done' : ''}" href="#/play/${lesson}/${z}">${inner}</a>`
      : `<div class="zone zone-${z} locked">${inner}</div>`;
  }

  /* ================= 關卡 ================= */
  function renderPlay(lesson, zone) {
    const L = JOY.LESSONS[lesson];
    if (!L || !JOY.islandUnlocked(lesson)) return go('#/');
    if (zone === 'boss' ? !L.boss : !JOY.lessonZones(lesson).includes(zone)) return go(`#/island/${lesson}`);
    if (zone === 'boss' && !JOY.zonesDone(lesson) && !JOY.TEACHER) return go(`#/island/${lesson}`);
    const info = ZONE_INFO[zone];
    app.innerHTML = `
      ${header({ href: `#/island/${lesson}`, label: '島嶼' }, `${info.emoji} ${info.name}`)}
      <main class="play-page zone-bg-${zone}"><div class="stage"></div></main>`;
    const stage = $('.stage');
    const back = () => go(`#/island/${lesson}`);
    const quiz = (questions, boss) => {
      window.scrollTo(0, 0);
      JOY.runQuiz(stage, {
        questions, boss,
        onDone: (correct, total, wrong, unfixed) => {
          window.scrollTo(0, 0);
          JOY.showResult(stage, { lesson, zone, correct, total, wrong, unfixed, onAgain: () => renderPlay(lesson, zone), onBack: back });
        },
      });
    };
    if (zone === 'vocab') JOY.runFlashcards(stage, L, () => quiz(JOY.buildVocabQuestions(L)));
    else if (zone === 'reading' && L.readingMode === 'readAloud') {
      // 只要會唸：聽完課文後逐句跟讀，跟讀完就算完成
      JOY.runDialogue(stage, L, () => JOY.runReadAlong(stage, L, () => {
        window.scrollTo(0, 0);
        const n = L.dialogue.length;
        JOY.showResult(stage, { lesson, zone, correct: n, total: n, readAloud: true, onAgain: () => renderPlay(lesson, zone), onBack: back });
      }));
    }
    else if (zone === 'reading') JOY.runDialogue(stage, L, () => quiz(JOY.buildReadingQuestions(L)));
    else if (zone === 'grammar') JOY.runGrammarLesson(stage, L, () => quiz(JOY.buildGrammarQuestions(L)));
    else {
      stage.innerHTML = `
        <div class="boss-intro">
          <div class="boss-big">${L.boss.emoji}<span>😠</span></div>
          <h2>${esc(L.boss.name)} 出現了！</h2>
          ${JOY.tzBubble('答對題目就能攻擊島主！答錯也不要緊，我會陪你一起再試一次 💪')}
          <button class="btn big">開始戰鬥！⚔️</button>
        </div>`;
      $('.boss-intro .btn').onclick = () => quiz(JOY.buildBossQuestions(L), L.boss);
    }
  }

  /* ================= 單字圖鑑 ================= */
  function renderBook() {
    const lessons = JOY.ISLANDS.filter((i) => JOY.hasLesson(i.lesson) && JOY.LESSONS[i.lesson].vocab.length);
    let got = 0, all = 0;
    const sections = lessons.map((meta) => {
      const L = JOY.LESSONS[meta.lesson];
      const cards = L.vocab.map((v) => {
        const lv = JOY.wordLevel(JOY.wordKey(L.lesson, v.id));
        all++; if (lv) got++;
        return lv
          ? `<button class="card got lv${lv}" data-say="${esc(v.en)}"${v.audio ? ` data-audio="${esc(v.audio)}"` : ''}>
              ${JOY.picHTML(v, 'card-pic')}<b>${esc(v.en)}</b><span>${esc(v.zh)}</span>${JOY.starsHTML(lv)}</button>`
          : `<div class="card missing">${JOY.picHTML(v, 'card-pic')}<b>？？？</b><span>還沒收集</span></div>`;
      }).join('');
      return `<section><h3>${meta.emoji} 第 ${meta.lesson} 課・${esc(meta.name)}</h3><div class="cards">${cards}</div></section>`;
    }).join('');
    app.innerHTML = `
      ${header({ href: '#/', label: '地圖' }, '📖 單字圖鑑')}
      <main class="book-page">
        <div class="book-head">
          <div class="meter"><i style="width:${all ? (got / all) * 100 : 0}%"></i></div>
          <p>已收集 <b>${got}</b> / ${all} 個單字</p>
        </div>
        ${JOY.tzBubble(got === all && all ? '哇！全部的單字都收集到了，太厲害了！🏆' : '在遊戲裡答對單字就能收集到卡片！答對越多次，卡片的星星越多喔 ⭐ 點卡片可以聽發音。')}
        ${sections}
      </main>`;
  }

  /* ================= 衣櫃（商店） ================= */
  let shopTab = 'head';
  function renderWardrobe() {
    const s = JOY.state;
    const items = JOY.SHOP.filter((i) => i.slot === shopTab);
    app.innerHTML = `
      ${header({ href: '#/', label: '地圖' }, `🧢 ${JOY.heroName()}的衣櫃`)}
      <main class="wardrobe-page">
        <section class="stage-preview">${JOY.avatarHTML(170, 'preview')}</section>
        <section class="shop">
          ${JOY.tzBubble(`${esc(JOY.heroName())}，用闖關賺到的金幣買新裝扮吧！帽子、球、寵物，你最想要哪一個？🛍️`)}
          <div class="tabs">${Object.entries(JOY.SLOTS).map(([k, n]) => `<button class="tab ${k === shopTab ? 'on' : ''}" data-tab="${k}">${n}</button>`).join('')}</div>
          <div class="items">${items.map((it) => {
            const owned = s.owned.includes(it.id);
            const worn = s.equipped[it.slot] === it.id;
            const btn = worn ? '<span class="tag">穿戴中・點一下脫下</span>'
              : owned ? '<span class="tag">點一下穿上</span>'
              : `<span class="price ${s.coins < it.price ? 'poor' : ''}">🪙 ${it.price}</span>`;
            return `<button class="item ${worn ? 'worn' : ''} ${owned ? 'owned' : ''}" data-id="${it.id}"><span class="it-em">${it.emoji}</span><span class="it-name">${esc(it.name)}</span>${btn}</button>`;
          }).join('')}</div>
        </section>
      </main>`;
    $$('.tab').forEach((t) => (t.onclick = () => { shopTab = t.dataset.tab; renderWardrobe(); }));
    $$('.item').forEach((b) => (b.onclick = () => {
      const it = JOY.SHOP.find((x) => x.id === b.dataset.id);
      if (s.equipped[it.slot] === it.id) { delete s.equipped[it.slot]; JOY.sfx('pop'); }
      else if (s.owned.includes(it.id)) { s.equipped[it.slot] = it.id; JOY.sfx('pop'); }
      else if (s.coins >= it.price) {
        if (!confirm(`要花 ${it.price} 枚金幣買「${it.name}」嗎？`)) return;
        s.coins -= it.price; s.owned.push(it.id); s.equipped[it.slot] = it.id; JOY.sfx('coin');
      } else {
        b.classList.remove('shake'); void b.offsetWidth; b.classList.add('shake');
        JOY.sfx('wrong');
        $('.shop .tz-bubble').textContent = `還差 ${it.price - s.coins} 枚金幣！去島上闖關賺金幣吧 💪`;
        return;
      }
      JOY.save();
      renderWardrobe();
    }));
  }

  /* ================= 路由 ================= */
  function go(hash) { location.hash = hash; }
  function route() {
    JOY.stopSpeak();
    const h = location.hash.replace(/^#\/?/, '').split('/');
    window.scrollTo(0, 0);
    if (h[0] === 'island') renderIsland(+h[1]);
    else if (h[0] === 'play') renderPlay(+h[1], h[2]);
    else if (h[0] === 'book') renderBook();
    else if (h[0] === 'wardrobe') renderWardrobe();
    else renderMap();
  }
  window.addEventListener('hashchange', route);
  route();
})();
