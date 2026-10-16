// 佳音英語 Unit 7（課本 p.54–57）
window.JOY = window.JOY || {};
JOY.LESSONS = JOY.LESSONS || {};
JOY.LESSONS[7] = {
  lesson: 7,
  title: 'My Favorite Season',
  titleZh: '我最喜歡的季節',
  boss: { name: '巧克力大王', emoji: '🍫' },

  // 角色說話時的聲音高低（1 = 正常）
  speakers: {
    Abby:   { pitch: 1.35, color: '#ff7eb6' },
    Nick:   { pitch: 1.1,  color: '#5aa9ff' },
    Momoko: { pitch: 1.0,  color: '#a07cff' },
  },

  // 單字：img 是圖片路徑。每個單字都會出拼字題。
  // 想換成自己錄的發音，加上 audio: 'assets/audio/l07/spring.mp3' 即可。
  vocab: [
    { id: 'spring',    en: 'spring',    zh: '春天',      img: 'assets/lessons/l07/spring.jpg', core: true },
    { id: 'summer',    en: 'summer',    zh: '夏天',      img: 'assets/lessons/l07/summer.jpg', core: true },
    { id: 'fall',      en: 'fall',      zh: '秋天',      img: 'assets/lessons/l07/fall.jpg',   core: true },
    { id: 'winter',    en: 'winter',    zh: '冬天',      img: 'assets/lessons/l07/winter.jpg', core: true },
  ],

  // 課文：逐句朗讀
  dialogue: [
    { speaker: 'Abby',   en: 'Konnichiwa, Japan!',                                        zh: '你好，日本！（Konnichiwa 是日文的「你好」）' },
    { speaker: 'Nick',   en: 'Abby, look! How beautiful!',                                zh: 'Abby，你看！好美啊！' },
    { speaker: 'Abby',   en: "Yeah! I can't believe my eyes.",                            zh: '對啊！我真不敢相信我的眼睛。' },
    { speaker: 'Momoko', en: 'Hello, my name is Momoko. Welcome to Japan!',               zh: '哈囉，我的名字是 Momoko。歡迎來到日本！' },
    { speaker: 'Nick',   en: "Hi, I'm Nick. This is Abby.",                               zh: '嗨，我是 Nick。這是 Abby。' },
    { speaker: 'Momoko', en: "My favorite season is spring. What's your favorite season?", zh: '我最喜歡的季節是春天。你最喜歡的季節是什麼？' },
    { speaker: 'Abby',   en: 'My favorite season is spring, too.',                        zh: '我最喜歡的季節也是春天。' },
  ],

  // 閱讀理解題（answer 是正確選項的索引，從 0 開始）
  reading: [
    { q: 'Where are Nick and Abby?', qZh: 'Nick 和 Abby 在哪裡？',
      options: ['Japan', 'Taiwan', 'America'], answer: 0 },
    { q: 'Who says "Welcome to Japan!"?', qZh: '誰說了「歡迎來到日本！」？',
      options: ['Abby', 'Nick', 'Momoko'], answer: 2 },
    { q: "What's Momoko's favorite season?", qZh: 'Momoko 最喜歡的季節是什麼？',
      options: ['spring', 'summer', 'winter'], answer: 0 },
    { q: "What's Abby's favorite season?", qZh: 'Abby 最喜歡的季節是什麼？',
      options: ['fall', 'spring', 'summer'], answer: 1 },
    { q: '"How beautiful!" 是什麼意思？',
      options: ['好美啊！', '好好吃！', '好冷啊！'], answer: 0 },
  ],

  // 文法小教室（Tzuyu 講解）＋ 練習題
  grammar: {
    lessons: [
      {
        title: '問別人最喜歡的季節',
        explain: '想知道別人最喜歡哪個季節，就問 What is your favorite season?\n回答的時候說 My favorite season is ＿＿。\n小提醒：What is 可以縮寫成 What\'s 喔！',
        pattern: [
          { en: 'What is your favorite season?', zh: '你最喜歡的季節是什麼？' },
          { en: 'My favorite season is winter.',  zh: '我最喜歡的季節是冬天。' },
        ],
      },
      {
        title: 'too 是「也」',
        explain: '別人說完，你也一樣的時候，在句子最後面加上「, too」。\n記得 too 前面要加逗號！',
        pattern: [
          { en: 'My favorite season is spring.',      zh: '我最喜歡的季節是春天。' },
          { en: 'My favorite season is spring, too.', zh: '我最喜歡的季節也是春天。' },
        ],
      },
    ],
    quiz: [
      { type: 'fill', q: 'What ___ your favorite season?', options: ['is', 'are', 'do'], answer: 0, hint: 'What is your favorite season?' },
      { type: 'fill', q: '___ favorite season is summer.', options: ['I', 'My', 'Me'], answer: 1, hint: '「我的」最喜歡的季節 → My' },
      { type: 'fill', q: "What's = ?", options: ['What is', 'What does', 'What are'], answer: 0, hint: "What's 是 What is 的縮寫" },
      { type: 'fill', q: 'My favorite season is fall, ___.', options: ['to', 'too', 'two'], answer: 1, hint: '「也」是 too（兩個 o）' },
      { type: 'tf', q: 'What is you favorite season?', answer: false, hint: '要用 your（你的）：What is your favorite season?' },
      { type: 'tf', q: 'My favorite season is winter.', answer: true },
      { type: 'tf', q: 'My favorite season are spring.', answer: false, hint: 'season 是一個，要用 is：My favorite season is spring.' },
      { type: 'tf', q: "What's your favorite season?", answer: true },
    ],
  },
};
