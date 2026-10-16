// 遊戲玩法：單字卡、課文朗讀、文法小教室、題目引擎、結算畫面
(function () {
  const { $, $$, esc, shuffle, sample, pick } = JOY;

  // 任何有 data-say 的按鈕，點了就唸出來
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-say]');
    if (!b) return;
    e.stopPropagation();
    JOY.speak(b.dataset.say, { pitch: +b.dataset.pitch || undefined, audio: b.dataset.audio || undefined });
  });
  const sayBtn = (text, opts = {}, cls = '') =>
    `<button class="say ${cls}" data-say="${esc(text)}"${opts.audio ? ` data-audio="${esc(opts.audio)}"` : ''}${opts.pitch ? ` data-pitch="${opts.pitch}"` : ''} aria-label="播放發音">🔊</button>`;
  JOY.sayBtn = sayBtn;
  const hasZh = (s) => /[一-鿿]/.test(s);

  /* ================= 單字卡 ================= */
  JOY.runFlashcards = (root, L, onStart) => {
    let i = 0;
    const seen = new Set();
    const n = L.vocab.length;
    const done = JOY.island(L.lesson).vocab > 0;

    function draw() {
      const v = L.vocab[i];
      seen.add(i);
      const allSeen = seen.size === n || done;
      root.innerHTML = `
        ${JOY.tzBubble(i === 0 ? '先來認識這一課的單字！點卡片可以翻面看中文喔 🍬' : '點 🔊 跟著唸一次吧！')}
        <div class="flash-wrap">
          <button class="flash" aria-label="翻面">
            <div class="flash-inner">
              <div class="flash-face front">${JOY.picHTML(v, 'big')}<div class="word-big">${esc(v.en)}</div></div>
              <div class="flash-face back"><div class="zh-big">${esc(v.zh)}</div><div class="word-mid">${esc(v.en)}</div></div>
            </div>
          </button>
          ${sayBtn(v.en, v, 'say-float')}
        </div>
        <div class="flash-nav">
          <button class="btn ghost" data-act="prev" ${i === 0 ? 'disabled' : ''}>◀</button>
          <div class="dots">${L.vocab.map((_, k) => `<i class="${k === i ? 'on' : seen.has(k) ? 'seen' : ''}"></i>`).join('')}</div>
          <button class="btn ghost" data-act="next" ${i === n - 1 ? 'disabled' : ''}>▶</button>
        </div>
        <div class="center"><button class="btn big" data-act="go" ${allSeen ? '' : 'disabled'}>${allSeen ? '開始挑戰！⚔️' : `看完 ${n} 張卡片就能挑戰（${seen.size}/${n}）`}</button></div>`;
      $('.flash', root).onclick = () => { $('.flash', root).classList.toggle('flipped'); JOY.sfx('pop'); };
      $('[data-act=prev]', root).onclick = () => { i--; draw(); };
      $('[data-act=next]', root).onclick = () => { i++; draw(); };
      $('[data-act=go]', root).onclick = onStart;
      JOY.speak(v.en, v);
    }
    draw();
  };

  /* ================= 課文朗讀 ================= */
  JOY.runDialogue = (root, L, onStart) => {
    let showZh = false;
    let playing = false;
    const line = (d, k) => {
      const sp = L.speakers[d.speaker] || {};
      return `<button class="line" data-k="${k}" style="--c:${sp.color || '#ff7eb6'}">
          <span class="who">${esc(d.speaker)}</span>
          <span class="txt"><span class="en">${esc(d.en)}</span><span class="zh">${esc(d.zh)}</span></span>
          <span class="mini">🔊</span>
        </button>`;
    };
    root.innerHTML = `
      ${JOY.tzBubble('我們一起來聽課文！點任何一句可以單獨聽，也可以按「全部播放」 🎧')}
      <div class="toolbar">
        <button class="btn" data-act="all">▶ 全部播放</button>
        <label class="toggle"><input type="checkbox" data-act="zh"> 顯示中文</label>
        <label class="toggle"><input type="checkbox" data-act="slow" ${JOY.slow ? 'checked' : ''}> 🐢 慢速</label>
      </div>
      <div class="dialogue">${L.dialogue.map(line).join('')}</div>
      <div class="center"><button class="btn big" data-act="go">${L.readingMode === 'readAloud' ? '開始跟讀 🎤' : '回答問題 ✏️'}</button></div>`;

    const lines = $$('.line', root);
    const playLine = (k, next) => {
      lines.forEach((el) => el.classList.toggle('active', +el.dataset.k === k));
      lines[k].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      const d = L.dialogue[k];
      JOY.speak(d.en, { pitch: (L.speakers[d.speaker] || {}).pitch, audio: d.audio, onend: next });
    };
    lines.forEach((el) => (el.onclick = () => { playing = false; playLine(+el.dataset.k, () => el.classList.remove('active')); }));
    $('[data-act=all]', root).onclick = () => {
      playing = true;
      const step = (k) => {
        if (!playing || k >= lines.length) { lines.forEach((el) => el.classList.remove('active')); playing = false; return; }
        playLine(k, () => setTimeout(() => step(k + 1), 350));
      };
      step(0);
    };
    $('[data-act=zh]', root).onchange = (e) => { showZh = e.target.checked; root.classList.toggle('show-zh', showZh); };
    $('[data-act=slow]', root).onchange = (e) => { JOY.slow = e.target.checked; };
    $('[data-act=go]', root).onclick = () => { playing = false; JOY.stopSpeak(); onStart(); };
  };

  /* ================= 跟讀（只要會唸的課） ================= */
  JOY.runReadAlong = (root, L, onDone) => {
    let i = 0;
    const n = L.dialogue.length;
    function draw() {
      const d = L.dialogue[i];
      const sp = L.speakers[d.speaker] || {};
      root.innerHTML = `
        <div class="quiz-top"><div class="progress"><i style="width:${Math.round((i / n) * 100)}%"></i></div><span class="count">第 ${i + 1} 句 / 共 ${n} 句</span></div>
        <div class="tz-slot">${JOY.tzBubble('先聽一次，再大聲跟著唸！唸好了就按「我唸好了」 🎤', 'small')}</div>
        <div class="q-area pop-in readalong">
          <div class="ra-who" style="--c:${sp.color || '#ff7eb6'}">${esc(d.speaker)}</div>
          <div class="ra-en">${esc(d.en)}</div>
          <div class="ra-zh">${esc(d.zh)}</div>
          <div class="row">
            <button class="btn ghost" data-act="listen">🔊 再聽一次</button>
            <button class="btn ghost" data-act="slow">🐢 慢慢聽</button>
          </div>
        </div>
        <div class="q-foot"><button class="btn big" data-act="done">${i === n - 1 ? '我唸好了，完成！🎉' : '我唸好了 ✓'}</button></div>`;
      const play = (slow) => {
        const was = JOY.slow;
        JOY.slow = slow;
        JOY.speak(d.en, { pitch: sp.pitch, audio: d.audio });
        JOY.slow = was;
      };
      $('[data-act=listen]', root).onclick = () => play(JOY.slow);
      $('[data-act=slow]', root).onclick = () => play(true);
      $('[data-act=done]', root).onclick = () => {
        JOY.sfx('right');
        if (++i < n) draw(); else onDone();
      };
      setTimeout(() => play(JOY.slow), 250);
    }
    draw();
  };

  /* ================= 文法小教室 ================= */
  JOY.runGrammarLesson = (root, L, onStart) => {
    const pages = L.grammar.lessons;
    let i = 0;
    function draw() {
      const p = pages[i];
      const last = i === pages.length - 1;
      root.innerHTML = `
        <div class="class-card">
          <div class="class-head"><span class="badge">文法 ${i + 1}/${pages.length}</span><h2>${esc(p.title)}</h2></div>
          <div class="class-body">
            ${JOY.tzuyuHTML(110, 'teacher')}
            <div class="chalk">${p.explain.split('\n').map((t) => `<p>${esc(t)}</p>`).join('')}</div>
          </div>
          ${p.groups ? `<div class="groups">${p.groups.map((g) => `
            <div class="group tone-${g.tone || 'mint'}"><h3>${esc(g.label)}</h3>
              <div class="chips">${g.items.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</div></div>`).join('')}
          </div>` : ''}
          <div class="patterns">${p.pattern.map((s) => `
            <div class="pattern">${sayBtn(s.en)}<div><div class="en">${esc(s.en)}</div><div class="zh">${esc(s.zh)}</div></div></div>`).join('')}
          </div>
        </div>
        <div class="flash-nav">
          <button class="btn ghost" data-act="prev" ${i === 0 ? 'disabled' : ''}>◀ 上一頁</button>
          ${last ? '<button class="btn big" data-act="go">開始練習 ✏️</button>' : '<button class="btn" data-act="next">下一頁 ▶</button>'}
        </div>`;
      $('[data-act=prev]', root).onclick = () => { i--; draw(); };
      const nx = $('[data-act=next]', root);
      if (nx) nx.onclick = () => { i++; draw(); };
      const go = $('[data-act=go]', root);
      if (go) go.onclick = onStart;
    }
    draw();
  };

  /* ================= 題目產生器 ================= */
  const vocabSpeak = (v) => ({ text: v.en, audio: v.audio });

  function vocabChoice(L, v, type) {
    const others = sample(L.vocab.filter((o) => o.id !== v.id), 3);
    const opts = shuffle([v, ...others]);
    const answer = opts.indexOf(v);
    if (!opts.every(JOY.hasPic)) type = { pic2en: 'zh2en', en2pic: 'en2zh', listen: 'listenText' }[type] || type;
    const base = { kind: 'choice', answer, wordKey: JOY.wordKey(L.lesson, v.id), sayAfter: vocabSpeak(v) };
    if (type === 'pic2en') {
      return Object.assign(base, {
        prompt: `${JOY.picHTML(v, 'big')}<p class="q-zh">這是什麼？</p>`,
        options: opts.map((o) => esc(o.en)),
      });
    }
    if (type === 'zh2en') {
      return Object.assign(base, {
        prompt: `<div class="zh-big">${esc(v.zh)}</div><p class="q-zh">英文怎麼說？</p>`,
        options: opts.map((o) => esc(o.en)),
      });
    }
    if (type === 'listenText') {
      return Object.assign(base, {
        prompt: `<p class="q-zh">聽聽看，是哪一個？</p>`,
        speak: vocabSpeak(v), autoSpeak: true, bigSpeak: true,
        options: opts.map((o) => esc(o.en)),
      });
    }
    if (type === 'en2zh') {
      return Object.assign(base, {
        prompt: `<div class="word-big">${esc(v.en)}</div><p class="q-zh">是什麼意思？</p>`,
        speak: vocabSpeak(v), autoSpeak: true,
        options: opts.map((o) => esc(o.zh)),
      });
    }
    if (type === 'en2pic') {
      return Object.assign(base, {
        prompt: `<div class="word-big">${esc(v.en)}</div><p class="q-zh">是哪一張圖？</p>`,
        speak: vocabSpeak(v), autoSpeak: true,
        options: opts.map((o) => JOY.picHTML(o, 'pic-opt')),
        optStyle: 'pic',
      });
    }
    // listen：聽發音選圖
    return Object.assign(base, {
      prompt: `<p class="q-zh">聽聽看，是哪一個？</p>`,
      speak: vocabSpeak(v), autoSpeak: true, bigSpeak: true,
      options: opts.map((o) => `${JOY.picHTML(o, 'pic-opt')}<span class="opt-zh">${esc(o.zh)}</span>`),
      optStyle: 'pic',
    });
  }

  function spellQ(L, v) {
    return { kind: 'spell', v, wordKey: JOY.wordKey(L.lesson, v.id), sayAfter: vocabSpeak(v) };
  }

  // L.choiceCount：單字很多的課，選擇題每次只抽幾題；拼字題每個單字都會考（順序隨機）
  // 題型每次隨機抽：有圖的單字 5 種，純文字單字 3 種；先把每種輪過一次再重複，題型才會平均
  const PIC_TYPES = ['pic2en', 'en2pic', 'zh2en', 'en2zh', 'listen'];
  const TEXT_TYPES = ['zh2en', 'en2zh', 'listenText'];
  function typeDeck(L, n) {
    const pool = L.vocab.every(JOY.hasPic) ? PIC_TYPES : TEXT_TYPES;
    let deck = [];
    while (deck.length < n) deck = deck.concat(shuffle(pool));
    return deck.slice(0, n);
  }
  // 配對遊戲：有圖的課隨機決定是「英文配圖」還是「英文配中文」
  const matchQ = (L) => {
    const items = sample(L.vocab, Math.min(4, L.vocab.length));
    const usePic = items.every(JOY.hasPic) && Math.random() < 0.5;
    return { kind: 'match', items, usePic, lesson: L.lesson, noRetry: true };
  };

  JOY.buildVocabQuestions = (L) => {
    const words = sample(L.vocab, L.choiceCount || L.vocab.length);
    const types = typeDeck(L, words.length);
    const choice = words.map((v, k) => vocabChoice(L, v, types[k]));
    const spell = shuffle(L.vocab).map((v) => spellQ(L, v));
    return [...choice, ...spell, matchQ(L)];
  };

  JOY.buildReadingQuestions = (L) =>
    L.reading.map((r) => {
      const quoted = (r.q.match(/"([^"]+)"/) || [])[1];
      const speakText = hasZh(r.q) ? quoted : r.q;
      const order = shuffle(r.options.map((_, k) => k));
      return {
        kind: 'choice',
        prompt: `<div class="q-en">${esc(r.q)}</div>${r.qZh ? `<div class="q-zh">${esc(r.qZh)}</div>` : ''}`,
        speak: speakText ? { text: speakText } : null,
        options: order.map((k) => esc(r.options[k])),
        answer: order.indexOf(r.answer),
      };
    });

  // grammar.quizCount 有設定時，每次隨機抽幾題（分類遊戲一定會出），並保留原本的出題順序
  function pickGrammar(G) {
    const all = G.quiz;
    if (!G.quizCount || G.quizCount >= all.length) return all;
    const must = all.filter((g) => g.type === 'sort');
    const rest = sample(all.filter((g) => g.type !== 'sort'), G.quizCount - must.length);
    return all.filter((g) => must.includes(g) || rest.includes(g));
  }

  JOY.buildGrammarQuestions = (L) =>
    pickGrammar(L.grammar).map((g) => {
      if (g.type === 'sort') {
        let items = g.items;
        if (g.pick && g.pick < items.length) {
          // 隨機挑幾個，但每個籃子都要平均分到
          const min = Math.min(2, Math.floor(g.pick / g.groups.length));
          do { items = sample(g.items, g.pick); }
          while (g.groups.some((gr) => items.filter((it) => it[1] === gr.id).length < min));
        }
        return { kind: 'sort', prompt: g.q, groups: g.groups, items: shuffle(items), noRetry: true };
      }
      if (g.type === 'tf') {
        return {
          kind: 'choice',
          prompt: `<p class="q-zh">這句話對嗎？</p><div class="q-en">${esc(g.q)}</div>`,
          options: ['⭕ 對', '❌ 錯'],
          answer: g.answer ? 0 : 1,
          optStyle: 'tf',
          hint: g.hint,
          hintAlways: !g.answer,
        };
      }
      const order = shuffle(g.options.map((_, k) => k));
      const isSentence = g.q.includes('___') && !/[=→]/.test(g.q) && !hasZh(g.q); // 有中文或符號的題目答對後不唸
      return {
        kind: 'choice',
        prompt: `<p class="q-zh">選出正確的答案</p><div class="q-en">${esc(g.q).replace('___', '<span class="blank">＿＿</span>')}</div>`,
        options: order.map((k) => esc(g.options[k])),
        answer: order.indexOf(g.answer),
        hint: g.hint,
        fillBlank: g.options[g.answer],
        sayAfter: isSentence ? { text: g.q.replace('___', g.options[g.answer]) } : null,
      };
    });

  JOY.buildBossQuestions = (L) => {
    const types = typeDeck(L, 4);
    const vocab = sample(L.vocab, 4).map((v, k) => vocabChoice(L, v, types[k]));
    const spell = L.vocab.length ? [spellQ(L, pick(L.vocab))] : [];
    return shuffle([
      ...vocab, ...spell,
      ...sample(JOY.buildReadingQuestions(L), 3),
      ...sample(JOY.buildGrammarQuestions(L), 3),
    ]);
  };

  /* ================= 各題型畫面 ================= */
  function renderChoice(q, area, answer) {
    area.innerHTML = `
      <div class="q-prompt">${q.prompt}
        ${q.speak ? (q.bigSpeak ? `<button class="say say-huge" data-say="${esc(q.speak.text)}"${q.speak.audio ? ` data-audio="${esc(q.speak.audio)}"` : ''}>🔊</button>` : sayBtn(q.speak.text, q.speak)) : ''}
      </div>
      <div class="opts ${q.optStyle ? 'opts-' + q.optStyle : ''} n${q.options.length}">
        ${q.options.map((o, k) => `<button class="opt" data-k="${k}">${o}</button>`).join('')}
      </div>`;
    if (q.speak && q.autoSpeak) setTimeout(() => JOY.speak(q.speak.text, q.speak), 250);
    $$('.opt', area).forEach((b) => (b.onclick = () => {
      const k = +b.dataset.k;
      $$('.opt', area).forEach((x) => (x.disabled = true));
      const ok = k === q.answer;
      b.classList.add(ok ? 'right' : 'wrong');
      $$('.opt', area)[q.answer].classList.add('right');
      if (q.fillBlank) {
        const bl = $('.blank', area);
        if (bl) { bl.textContent = q.fillBlank; bl.classList.add('filled'); }
      }
      answer(ok);
    }));
  }

  function renderSpell(q, area, answer) {
    const v = q.v;
    const target = v.spell || v.en; // 例如 by scooter 只拼 scooter
    const letters = target.replace(/\s/g, '').split('');
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('').filter((c) => !letters.includes(c));
    const tiles = shuffle([...letters, ...sample(alphabet, 2)]);
    const filled = []; // 每格放的是 tile 索引
    area.innerHTML = `
      <div class="q-prompt">${JOY.picHTML(v, 'big')}<p class="q-zh">「${esc(v.spellZh || v.zh)}」的英文怎麼拼？</p>${sayBtn(target, v.spell ? {} : v)}</div>
      <div class="slots">${target.split(' ').map((w) => `<span class="slot-word">${w.split('').map(() => '<i class="slot"></i>').join('')}</span>`).join('')}</div>
      <div class="tiles">${tiles.map((c, k) => `<button class="tile" data-k="${k}">${c}</button>`).join('')}</div>
      <div class="center"><button class="btn ghost small" data-act="clear">↺ 清除</button></div>`;
    const slots = $$('.slot', area);
    const tileEls = $$('.tile', area);
    const sync = () => {
      slots.forEach((s, k) => { s.textContent = filled[k] != null ? tiles[filled[k]] : ''; s.classList.toggle('has', filled[k] != null); });
      tileEls.forEach((t, k) => (t.disabled = filled.includes(k)));
    };
    let locked = false;
    tileEls.forEach((t) => (t.onclick = () => {
      if (locked) return;
      JOY.sfx('pop');
      filled.push(+t.dataset.k);
      sync();
      if (filled.length === letters.length) {
        locked = true;
        const typed = filled.map((k) => tiles[k]).join('');
        const ok = typed === letters.join('');
        if (!ok) {
          slots.forEach((s, k) => { s.textContent = letters[k]; s.classList.add('fix'); });
          $('.slots', area).insertAdjacentHTML('afterend',
            `<p class="spell-note">你拼的是 <s>${esc(typed)}</s>，正確答案是 <b>${esc(target)}</b></p>`);
        }
        $('.slots', area).classList.add(ok ? 'right' : 'wrong');
        tileEls.forEach((x) => (x.disabled = true));
        answer(ok);
      }
    }));
    slots.forEach((s, k) => (s.onclick = () => { if (!locked && k < filled.length) { filled.splice(k); sync(); } }));
    $('[data-act=clear]', area).onclick = () => { if (!locked) { filled.length = 0; sync(); } };
  }

  function renderMatch(q, area, answer) {
    const left = shuffle(q.items);
    const right = shuffle(q.items);
    let sel = null;
    let mistakes = 0;
    let matched = 0;
    area.innerHTML = `
      <div class="q-prompt"><p class="q-zh">配對遊戲：先點英文，再點對應的${q.usePic ? '圖片' : '中文'}！</p></div>
      <div class="match">
        <div class="col">${left.map((v) => `<button class="m-item m-en" data-id="${v.id}">${esc(v.en)}</button>`).join('')}</div>
        <div class="col">${right.map((v) => `<button class="m-item m-pic" data-id="${v.id}">${q.usePic ? JOY.picHTML(v, 'pic-opt') : `<span class="m-zh">${esc(v.zh)}</span>`}</button>`).join('')}</div>
      </div>`;
    $$('.m-en', area).forEach((b) => (b.onclick = () => {
      $$('.m-en', area).forEach((x) => x.classList.remove('sel'));
      b.classList.add('sel');
      sel = b;
      const v = q.items.find((x) => x.id === b.dataset.id);
      JOY.speak(v.en, v);
    }));
    $$('.m-pic', area).forEach((b) => (b.onclick = () => {
      if (!sel) { b.classList.add('shake'); setTimeout(() => b.classList.remove('shake'), 400); return; }
      if (sel.dataset.id === b.dataset.id) {
        JOY.sfx('right');
        [sel, b].forEach((x) => { x.classList.remove('sel'); x.classList.add('done'); x.disabled = true; });
        JOY.markWord(JOY.wordKey(q.lesson, b.dataset.id));
        sel = null;
        if (++matched === q.items.length) answer(mistakes === 0);
      } else {
        mistakes++;
        JOY.sfx('wrong');
        b.classList.add('shake');
        setTimeout(() => b.classList.remove('shake'), 400);
      }
    }));
  }

  function renderSort(q, area, answer) {
    let sel = null;
    let mistakes = 0;
    let placed = 0;
    area.innerHTML = `
      <div class="q-prompt"><p class="q-zh">${esc(q.prompt)}</p></div>
      <div class="sort-chips">${q.items.map(([t], k) => `<button class="chip-btn" data-k="${k}">${esc(t)}</button>`).join('')}</div>
      <div class="bins" style="grid-template-columns:repeat(${q.groups.length},1fr)">${q.groups.map((g, k) => `
        <button class="bin t${k}" data-g="${g.id}"><b>${esc(g.label)}</b><span class="bin-list"></span></button>`).join('')}
      </div>`;
    const chips = $$('.chip-btn', area);
    chips.forEach((c) => (c.onclick = () => {
      chips.forEach((x) => x.classList.remove('sel'));
      c.classList.add('sel');
      sel = c;
      JOY.sfx('pop');
    }));
    $$('.bin', area).forEach((bin) => (bin.onclick = () => {
      if (!sel) { bin.classList.remove('shake'); void bin.offsetWidth; bin.classList.add('shake'); return; }
      const [text, group, shown] = q.items[+sel.dataset.k];
      if (group === bin.dataset.g) {
        JOY.sfx('right');
        // 第三個欄位是放進籃子後顯示的字（例如 hop → hopping）；group.say 是唸法，{x} 會換成這個字
        const g = q.groups.find((x) => x.id === group);
        const word = shown || text;
        $('.bin-list', bin).insertAdjacentHTML('beforeend', `<span class="chip">${esc(word)}</span>`);
        sel.remove();
        sel = null;
        JOY.speak((g.say || '{x}').replace('{x}', word));
        if (++placed === q.items.length) answer(mistakes === 0);
      } else {
        mistakes++;
        JOY.sfx('wrong');
        bin.classList.remove('shake'); void bin.offsetWidth; bin.classList.add('shake');
        sel.classList.remove('shake'); void sel.offsetWidth; sel.classList.add('shake');
      }
    }));
  }

  const RENDER = { choice: renderChoice, spell: renderSpell, match: renderMatch, sort: renderSort };

  /* ================= 題目引擎 ================= */
  // 答錯的題目會放到最後再出一次（最多重來 2 次）
  // 分數只算第一次就答對的題目；答錯的次數另外記錄，在結算畫面顯示
  JOY.runQuiz = (root, { questions, boss, onDone }) => {
    const total = questions.length;
    const queue = questions.map((q, i) => Object.assign({ tries: 0, no: i + 1 }, q));
    let firstRight = 0;
    let wrongTimes = 0;
    let unfixed = 0; // 錯滿 3 次、沒有再出的題目
    let answered = 0;
    let firstDone = 0;
    let hp = total;

    root.innerHTML = `
      <div class="quiz-top"><div class="progress"><i></i></div><span class="count"></span></div>
      ${boss ? `<div class="boss"><div class="boss-body">${boss.emoji}<span class="boss-face">😠</span></div>
        <div class="boss-info"><b>${esc(boss.name)}</b><div class="hp"><i></i></div></div></div>` : ''}
      <div class="tz-slot"></div>
      <div class="q-area"></div>
      <div class="q-foot"></div>`;
    const area = $('.q-area', root);
    const foot = $('.q-foot', root);
    const tz = $('.tz-slot', root);
    const say = (t) => (tz.innerHTML = JOY.tzBubble(t, 'small'));

    function updateBars() {
      const all = answered + queue.length;
      $('.progress i', root).style.width = Math.round((answered / all) * 100) + '%';
      const q = queue[0];
      $('.count', root).textContent = q && q.tries ? `訂正第 ${q.no} 題` : `第 ${Math.min(firstDone + 1, total)} 題 / 共 ${total} 題`;
      if (boss) $('.hp i', root).style.width = (hp / total) * 100 + '%';
    }

    function next() {
      JOY.stopSpeak();
      foot.innerHTML = '';
      if (!queue.length) {
        if (boss) $('.boss', root).classList.add('defeated');
        setTimeout(() => onDone(firstRight, total, wrongTimes, unfixed), boss ? 900 : 200);
        return;
      }
      const q = queue[0];
      updateBars();
      say(q.tries ? '這題我們再試一次，你一定可以！💪' : answered === 0 ? pick(JOY.TZ.cheer) : '下一題～');
      area.classList.remove('pop-in');
      void area.offsetWidth;
      area.classList.add('pop-in');
      RENDER[q.kind](q, area, (ok) => onAnswer(q, ok));
    }

    function onAnswer(q, ok) {
      queue.shift();
      answered++;
      if (!q.tries) firstDone++;
      if (!ok) wrongTimes++;
      if (ok) {
        if (!q.tries) firstRight++;
        if (q.wordKey) JOY.markWord(q.wordKey);
        JOY.sfx('right');
        if (boss) { hp = Math.max(0, hp - 1); const b = $('.boss', root); b.classList.remove('hit'); void b.offsetWidth; b.classList.add('hit'); JOY.sfx('hit'); $('.boss-face', root).textContent = '😵'; }
        say(pick(JOY.TZ.praise) + (q.hint && q.hintAlways ? `<br><small>💡 ${esc(q.hint)}</small>` : ''));
        if (q.sayAfter) setTimeout(() => JOY.speak(q.sayAfter.text, q.sayAfter), 350);
      } else {
        JOY.sfx('wrong');
        if (boss) { const b = $('.boss', root); b.classList.remove('laugh'); void b.offsetWidth; b.classList.add('laugh'); $('.boss-face', root).textContent = '😝'; }
        say(pick(JOY.TZ.comfort) + (q.hint ? `<br><small>💡 ${esc(q.hint)}</small>` : ''));
        if (q.sayAfter) setTimeout(() => JOY.speak(q.sayAfter.text, q.sayAfter), 350);
        if (!q.noRetry && q.tries < 2) {
          // 重出時選項重新洗牌
          const again = q.kind === 'choice' ? reshuffle(q) : q;
          queue.push(Object.assign({}, again, { tries: q.tries + 1 }));
        } else {
          if (!q.noRetry) unfixed++;
          if (boss) hp = Math.max(0, hp - 1);
        }
      }
      $('.progress i', root).style.width = Math.round((answered / (answered + queue.length)) * 100) + '%';
      foot.innerHTML = `<button class="btn big">${queue.length ? '下一題 ▶' : boss ? '最後一擊！💥' : '完成！🎉'}</button>`;
      $('button', foot).onclick = next;
    }

    function reshuffle(q) {
      const order = shuffle(q.options.map((_, k) => k));
      return Object.assign({}, q, { options: order.map((k) => q.options[k]), answer: order.indexOf(q.answer) });
    }

    next();
  };

  /* ================= 結算畫面 ================= */
  JOY.showResult = (root, { lesson, zone, correct, total, wrong = 0, unfixed = 0, readAloud = false, onAgain, onBack }) => {
    const stars = JOY.starsFor(correct, total);
    const coins = JOY.recordStars(lesson, zone, stars);
    const msg = stars === 3 ? '全部都會了！你是英文小天才 🌟' : stars === 2 ? '很棒喔！再玩一次就能拿到三顆星！' : '完成了！你很努力，我們多練習幾次就會更厲害 😊';
    root.innerHTML = `
      <div class="result">
        <h2>${zone === 'boss' ? '打倒島主了！🏆' : '挑戰完成！'}</h2>
        <div class="big-stars">${JOY.starsHTML(stars)}</div>
        ${readAloud ? `<div class="result-acc"><p>跟著唸完 <b>${total}</b> 句，好棒！🎤</p></div>` : `<div class="result-acc">
          <p>共 ${total} 題，第一次就答對 <b>${correct}</b> 題</p>
          ${!wrong ? '<p>一次都沒有答錯！🎯</p>'
            : unfixed ? `<p>答錯 <b>${wrong}</b> 次，還有 <b>${unfixed}</b> 題要再練習</p>`
            : `<p>答錯 <b>${wrong}</b> 次，都已經訂正好了 👍</p>`}
        </div>`}
        <div class="coin-gain">🪙 +${coins}</div>
        ${JOY.tzBubble(msg)}
        <div class="row">
          <button class="btn ghost" data-act="again">↺ 再玩一次</button>
          <button class="btn big" data-act="back">回到島上 🏝️</button>
        </div>
      </div>`;
    JOY.sfx(stars === 3 ? 'win' : 'coin');
    if (stars === 3) JOY.confetti();
    $('[data-act=again]', root).onclick = onAgain;
    $('[data-act=back]', root).onclick = onBack;
    JOY.updateCoins && JOY.updateCoins();
  };
})();
