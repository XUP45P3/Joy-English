// 佳音英語 Unit 9（課本 p.66–69）
window.JOY = window.JOY || {};
JOY.LESSONS = JOY.LESSONS || {};
JOY.LESSONS[9] = {
  lesson: 9,
  title: 'The Songkran Festival',
  titleZh: '潑水節',
  boss: { name: '布丁大王', emoji: '🍮' },

  speakers: {
    Abby: { pitch: 1.35, color: '#ff7eb6' },
    Nick: { pitch: 1.1,  color: '#5aa9ff' },
  },

  vocab: [
    { id: 'january',  en: 'January',  zh: '一月', img: 'assets/lessons/l09/january.jpg',  core: true },
    { id: 'february', en: 'February', zh: '二月', img: 'assets/lessons/l09/february.jpg', core: true },
    { id: 'march',    en: 'March',    zh: '三月', img: 'assets/lessons/l09/march.jpg',    core: true },
    { id: 'april',    en: 'April',    zh: '四月', img: 'assets/lessons/l09/april.jpg',    core: true },
  ],

  dialogue: [
    { speaker: 'Abby', en: 'Sawadee ka, Thailand!',                     zh: '你好，泰國！（Sawadee ka 是泰文的「你好」）' },
    { speaker: 'Nick', en: "Ouch! Let's fight back, Abby!",             zh: '好痛！Abby，我們反擊吧！' },
    { speaker: 'Abby', en: 'Oh yeah! The Songkran Festival is in April.', zh: '對耶！潑水節在四月。' },
    { speaker: 'Nick', en: "It's a lot of fun!",                        zh: '好好玩喔！' },
  ],

  reading: [
    { q: 'Where are Nick and Abby?', qZh: 'Nick 和 Abby 在哪裡？',
      options: ['Thailand', 'France', 'Japan'], answer: 0 },
    { q: 'When is the Songkran Festival?', qZh: '潑水節在什麼時候？',
      options: ['in January', 'in March', 'in April'], answer: 2 },
    { q: '"Let\'s fight back!" 是什麼意思？',
      options: ['我們反擊吧！', '我們回家吧！', '我們走路吧！'], answer: 0 },
    { q: '"It\'s a lot of fun!" 是什麼意思？',
      options: ['好好玩喔！', '好可怕喔！', '好多水喔！'], answer: 0 },
  ],

  grammar: {
    lessons: [
      {
        title: '節日在幾月？',
        explain: '說節日在哪一個月：節日 ＋ is in ＋ 月份。\n月份前面要用 in！\n月份的第一個字母一定要大寫：January、April…',
        pattern: [
          { en: 'The Songkran Festival is in April.', zh: '潑水節在四月。' },
          { en: 'Easter is in April this year.',      zh: '今年的復活節在四月。' },
          { en: "Valentine's Day is in February.",    zh: '情人節在二月。' },
        ],
      },
      {
        title: '今年和明年',
        explain: 'this year 是「今年」，next year 是「明年」。\n放在句子最後面就可以了！',
        groups: [
          { label: 'this year 今年', tone: 'mint', items: ['Easter is in April this year.'] },
          { label: 'next year 明年', tone: 'pink', items: ['Easter is in March next year.'] },
        ],
        pattern: [
          { en: 'Easter is in April this year.', zh: '今年的復活節在四月。' },
          { en: 'Easter is in March next year.', zh: '明年的復活節在三月。' },
        ],
      },
    ],
    quiz: [
      { type: 'fill', q: 'Easter is ___ April.', options: ['in', 'on', 'at'], answer: 0, hint: '月份前面用 in' },
      { type: 'fill', q: 'The Songkran Festival is in ___.', options: ['April', 'april', 'APRIL'], answer: 0, hint: '月份第一個字母要大寫：April' },
      { type: 'fill', q: "Valentine's Day is in ___.", options: ['February', 'January', 'March'], answer: 0, hint: '情人節是 2 月 14 日 → February' },
      { type: 'fill', q: "New Year's Day is in ___.", options: ['April', 'January', 'March'], answer: 1, hint: '新年是 1 月 1 日 → January' },
      { type: 'fill', q: 'Easter is in April ___ year.（今年）', options: ['this', 'next', 'these'], answer: 0, hint: '今年是 this year' },
      { type: 'fill', q: 'Easter is in March ___ year.（明年）', options: ['this', 'next', 'last'], answer: 1, hint: '明年是 next year' },
      { type: 'tf', q: 'Easter is in april this year.', answer: false, hint: '月份要大寫：April' },
      { type: 'tf', q: 'The Songkran Festival is in April.', answer: true },
      { type: 'tf', q: 'Easter is on April.', answer: false, hint: '月份前面用 in：Easter is in April.' },
      { type: 'tf', q: "Valentine's Day is in February.", answer: true },
    ],
  },
};
