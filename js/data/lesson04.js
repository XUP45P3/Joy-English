// 佳音英語 Unit 4（課本 p.36–39）
window.JOY = window.JOY || {};
JOY.LESSONS = JOY.LESSONS || {};
JOY.LESSONS[4] = {
  lesson: 4,
  title: 'My Favorite Subject',
  titleZh: '我最喜歡的科目',
  boss: { name: '杯子蛋糕大王', emoji: '🧁' },

  speakers: {
    Abby: { pitch: 1.35, color: '#ff7eb6' },
    Nick: { pitch: 1.1,  color: '#5aa9ff' },
  },

  vocab: [
    { id: 'chinese', en: 'Chinese', zh: '國語', img: 'assets/lessons/l04/chinese.jpg', core: true },
    { id: 'english', en: 'English', zh: '英文', img: 'assets/lessons/l04/english.jpg', core: true },
    { id: 'math',    en: 'math',    zh: '數學', img: 'assets/lessons/l04/math.jpg',    core: true },
    { id: 'art',     en: 'art',     zh: '美術', img: 'assets/lessons/l04/art.jpg',     core: true },
    { id: 'pe',      en: 'PE',      zh: '體育', img: 'assets/lessons/l04/pe.jpg' },
  ],

  dialogue: [
    { speaker: 'Abby', en: 'Bonjour, France!',                                        zh: '你好，法國！（Bonjour 是法文的「你好」）' },
    { speaker: 'Nick', en: "Abby, look! It's the Louvre.",                            zh: 'Abby，你看！是羅浮宮。' },
    { speaker: 'Abby', en: "My favorite subject is art. What's your favorite subject?", zh: '我最喜歡的科目是美術。你最喜歡的科目是什麼？' },
    { speaker: 'Nick', en: 'My favorite subject is art, too.',                        zh: '我最喜歡的科目也是美術。' },
    { speaker: 'Abby', en: 'Are you kidding?',                                        zh: '你在開玩笑吧？' },
  ],

  reading: [
    { q: 'Where are Nick and Abby?', qZh: 'Nick 和 Abby 在哪裡？',
      options: ['France', 'Japan', 'Thailand'], answer: 0 },
    { q: 'What do they see?', qZh: '他們看到什麼？',
      options: ['the Mona Lisa', 'the Louvre', 'a hot air balloon'], answer: 1 },
    { q: "What's Abby's favorite subject?", qZh: 'Abby 最喜歡的科目是什麼？',
      options: ['math', 'English', 'art'], answer: 2 },
    { q: "What's Nick's favorite subject?", qZh: 'Nick 最喜歡的科目是什麼？',
      options: ['art', 'PE', 'Chinese'], answer: 0 },
    { q: '"Are you kidding?" 是什麼意思？',
      options: ['你在開玩笑吧？', '你喜歡嗎？', '你會畫畫嗎？'], answer: 0 },
  ],

  grammar: {
    lessons: [
      {
        title: '最喜歡的科目',
        explain: '問別人：What is your favorite subject?\n回答：My favorite subject is ＿＿。\n小提醒：Chinese 和 English 是語言，第一個字母一定要大寫！',
        pattern: [
          { en: 'What is your favorite subject?', zh: '你最喜歡的科目是什麼？' },
          { en: 'My favorite subject is English.', zh: '我最喜歡的科目是英文。' },
        ],
      },
      {
        title: '我的、你的、他的、她的',
        explain: '「誰的」最喜歡的科目，要用不同的字：\nmy 我的、your 你的、his 他的（男生）、her 她的（女生）\n名字後面加 \'s 就是「某某人的」：Nini\'s、Tom\'s',
        groups: [
          { label: 'his 他的（男生）', tone: 'mint', items: ['Tom → his', 'Nick → his', 'Jay → his'] },
          { label: 'her 她的（女生）', tone: 'pink', items: ['Nini → her', 'Abby → her', 'Momoko → her'] },
        ],
        pattern: [
          { en: "What is Nini's favorite subject?", zh: 'Nini 最喜歡的科目是什麼？' },
          { en: 'Her favorite subject is English.', zh: '她最喜歡的科目是英文。' },
          { en: "What is Tom's favorite subject?",  zh: 'Tom 最喜歡的科目是什麼？' },
          { en: 'His favorite subject is math.',    zh: '他最喜歡的科目是數學。' },
        ],
      },
    ],
    quizCount: 10,
    quiz: [
      { type: 'sort', q: '分類遊戲：要用 his 還是 her？先點名字，再點籃子！',
        groups: [{ id: 'his', label: 'his 他的', say: 'his' }, { id: 'her', label: 'her 她的', say: 'her' }],
        items: [['Tom', 'his'], ['Nick', 'his'], ['Jay', 'his'], ['Dad', 'his'], ['Nini', 'her'], ['Abby', 'her'], ['Momoko', 'her'], ['Mom', 'her']],
        pick: 6 },
      { type: 'fill', q: 'What is ___ favorite subject?', options: ['your', 'you', 'I'], answer: 0, hint: '「你的」是 your' },
      { type: 'fill', q: '___ favorite subject is PE.', options: ['My', 'I', 'Me'], answer: 0, hint: '「我的」是 My' },
      { type: 'fill', q: "What is Tom___ favorite subject?", options: ["'s", 's', 'is'], answer: 0, hint: "名字後面加 's：Tom's" },
      { type: 'fill', q: 'Nini 的科目 → ___ favorite subject is art.', options: ['Her', 'His', 'She'], answer: 0, hint: 'Nini 是女生 → Her' },
      { type: 'fill', q: 'Tom 的科目 → ___ favorite subject is math.', options: ['Her', 'His', 'He'], answer: 1, hint: 'Tom 是男生 → His' },
      { type: 'fill', q: 'My favorite subject is ___.', options: ['English', 'english', 'ENGlish'], answer: 0, hint: 'English 第一個字母要大寫' },
      { type: 'tf', q: 'My favorite subject is chinese.', answer: false, hint: 'Chinese 要大寫：My favorite subject is Chinese.' },
      { type: 'tf', q: "What is Nini's favorite subject?", answer: true },
      { type: 'tf', q: 'Her favorite subject is art.', answer: true },
      { type: 'tf', q: 'She favorite subject is math.', answer: false, hint: '「她的」要用 Her：Her favorite subject is math.' },
      { type: 'tf', q: 'His favorite subject is PE.', answer: true },
    ],
  },
};
