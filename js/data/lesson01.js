// 佳音英語 Unit 1（課本 p.18–21）
window.JOY = window.JOY || {};
JOY.LESSONS = JOY.LESSONS || {};
JOY.LESSONS[1] = {
  lesson: 1,
  title: "Let's Go!",
  titleZh: '我們出發吧！',
  boss: { name: '水果糖大王', emoji: '🍬' },

  speakers: {
    Abby: { pitch: 1.35, color: '#ff7eb6' },
    Nick: { pitch: 1.1,  color: '#5aa9ff' },
  },

  // 片語單字：spell 是拼字題要拼的字，spellZh 是拼字題顯示的中文
  vocab: [
    { id: 'scooter', en: 'by scooter', zh: '騎機車',     img: 'assets/lessons/l01/scooter.jpg', spell: 'scooter', spellZh: '機車' },
    { id: 'taxi',    en: 'by taxi',    zh: '搭計程車',   img: 'assets/lessons/l01/taxi.jpg',    spell: 'taxi',    spellZh: '計程車', core: true },
    { id: 'train',   en: 'by train',   zh: '搭火車',     img: 'assets/lessons/l01/train.jpg',   spell: 'train',   spellZh: '火車',   core: true },
    { id: 'foot',    en: 'on foot',    zh: '走路',       img: 'assets/lessons/l01/foot.jpg' },
    { id: 'bicycle', en: 'by bicycle', zh: '騎腳踏車',   img: 'assets/lessons/l01/bicycle.jpg', spell: 'bicycle', spellZh: '腳踏車' },
    { id: 'bus',     en: 'by bus',     zh: '搭公車',     img: 'assets/lessons/l01/bus.jpg',     spell: 'bus',     spellZh: '公車',   core: true },
    { id: 'car',     en: 'by car',     zh: '坐車',       img: 'assets/lessons/l01/car.jpg',     spell: 'car',     spellZh: '汽車',   core: true },
    { id: 'plane',   en: 'by plane',   zh: '搭飛機',     img: 'assets/lessons/l01/plane.jpg',   spell: 'plane',   spellZh: '飛機',   core: true },
  ],

  dialogue: [
    { speaker: 'Nick', en: "Abby, look! What's that?",                        zh: 'Abby，你看！那是什麼？' },
    { speaker: 'Abby', en: 'A hot air balloon?',                              zh: '一個熱氣球？' },
    { speaker: 'Nick', en: "It's cool!",                                      zh: '好酷喔！' },
    { speaker: 'Abby', en: 'You can say that again.',                         zh: '你說得一點也沒錯。' },
    { speaker: 'Nick', en: "Let's go to South Africa by hot air balloon!",    zh: '我們搭熱氣球去南非吧！' },
  ],

  reading: [
    { q: 'What do Nick and Abby see?', qZh: 'Nick 和 Abby 看到什麼？',
      options: ['a hot air balloon', 'a plane', 'a train'], answer: 0 },
    { q: 'Where do they want to go?', qZh: '他們想去哪裡？',
      options: ['Japan', 'South Africa', 'France'], answer: 1 },
    { q: 'How do they go to South Africa?', qZh: '他們要怎麼去南非？',
      options: ['by bus', 'on foot', 'by hot air balloon'], answer: 2 },
    { q: '"It\'s cool!" 是什麼意思？',
      options: ['好冷喔！', '好酷喔！', '好熱喔！'], answer: 1 },
    { q: '"You can say that again." 是什麼意思？',
      options: ['你說得沒錯！', '請再說一次。', '我聽不懂。'], answer: 0 },
  ],

  grammar: {
    lessons: [
      {
        title: '用 by 說「怎麼去」',
        explain: '想說「搭什麼去」，就用 by ＋ 交通工具：\nby bus 搭公車、by car 坐車、by plane 搭飛機……\nby 後面直接接交通工具，不用加 a 或 the 喔！',
        pattern: [
          { en: "Let's go to South Africa by hot air balloon!", zh: '我們搭熱氣球去南非吧！' },
          { en: "Let's go to school by bus.",                   zh: '我們搭公車去學校吧。' },
        ],
      },
      {
        title: '走路是 on foot',
        explain: '走路去不是 by foot，要說 on foot！\nLet\'s go to ＿＿ 是「我們去＿＿吧！」\n別人邀請你，你可以回答 Sure!（好啊！）',
        groups: [
          { label: 'by ＋ 交通工具', tone: 'mint', items: ['by scooter', 'by taxi', 'by train', 'by bicycle', 'by bus', 'by car', 'by plane'] },
          { label: '走路要用 on', tone: 'pink', items: ['on foot'] },
        ],
        pattern: [
          { en: "Let's go to the park on foot!", zh: '我們走路去公園吧！' },
          { en: 'Sure!',                         zh: '好啊！' },
        ],
      },
    ],
    quiz: [
      { type: 'fill', q: "Let's go to the park ___ foot.", options: ['on', 'by'], answer: 0, hint: '走路要說 on foot' },
      { type: 'fill', q: "Let's go to school ___ bus.", options: ['on', 'by'], answer: 1, hint: '搭交通工具用 by：by bus' },
      { type: 'fill', q: "Let's go to Japan by ___.", options: ['plane', 'foot', 'scooter'], answer: 0, hint: '去日本要搭飛機：by plane' },
      { type: 'fill', q: "Let's ___ to the zoo by car.", options: ['go', 'goes', 'going'], answer: 0, hint: "Let's 後面直接接 go" },
      { type: 'fill', q: "Let's go to the park! — ___!", options: ['Sure', 'Sorry', 'Ouch'], answer: 0, hint: 'Sure! 是「好啊！」' },
      { type: 'tf', q: "Let's go to the park by foot.", answer: false, hint: "走路要用 on foot：Let's go to the park on foot." },
      { type: 'tf', q: "Let's go to Taipei by train.", answer: true },
      { type: 'tf', q: "Let's go to school on bus.", answer: false, hint: "搭公車要用 by：Let's go to school by bus." },
      { type: 'tf', q: "Let's go to the park on foot!", answer: true },
    ],
  },
};
