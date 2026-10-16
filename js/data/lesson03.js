// 佳音英語 Unit 3（課本 p.30–33）
// 這課的單字課本上沒有插圖，所以是純文字單字（沒有 img）
window.JOY = window.JOY || {};
JOY.LESSONS = JOY.LESSONS || {};
JOY.LESSONS[3] = {
  lesson: 3,
  title: 'Be Quiet!',
  titleZh: '安靜！',
  boss: { name: '甜甜圈大王', emoji: '🍩' },

  speakers: {
    Abby: { pitch: 1.35, color: '#ff7eb6' },
    Nick: { pitch: 1.1,  color: '#5aa9ff' },
    Boy:  { pitch: 0.95, color: '#f0a020' },
  },

  vocab: [
    { id: 'singing',  en: 'singing',         zh: '唱歌' },
    { id: 'playing',  en: 'playing',         zh: '玩' },
    { id: 'studying', en: 'studying',        zh: '讀書' },
    { id: 'sleeping', en: 'sleeping',        zh: '睡覺',    core: true },
    { id: 'dancing',  en: 'dancing',         zh: '跳舞',    core: true },
    { id: 'writing',  en: 'writing',         zh: '寫字',    core: true },
    { id: 'picture',  en: 'taking a picture', zh: '拍照' },
    { id: 'cake',     en: 'making a cake',   zh: '做蛋糕' },
    { id: 'hopping',  en: 'hopping',         zh: '跳（單腳跳、青蛙跳）', core: true },
    { id: 'running',  en: 'running',         zh: '跑步',    core: true },
    { id: 'jogging',  en: 'jogging',         zh: '慢跑' },
    { id: 'swimming', en: 'swimming',        zh: '游泳',    core: true },
  ],
  choiceCount: 5, // 12 個單字，每次抽 5 題選擇題（拼字題 12 個都會考）

  dialogue: [
    { speaker: 'Boy',  en: 'Hey! Come here and be quiet.',              zh: '嘿！過來這裡，要安靜喔。' },
    { speaker: 'Nick', en: "What's the matter?",                        zh: '怎麼了？' },
    { speaker: 'Boy',  en: 'There are some lions sleeping over there.', zh: '那邊有一些獅子在睡覺。' },
    { speaker: 'Abby', en: "Thank you. You're so brave.",               zh: '謝謝你，你好勇敢。' },
    { speaker: 'Boy',  en: 'Run!!!',                                    zh: '快跑！！！' },
  ],

  reading: [
    { q: 'Who says "Be quiet"?', qZh: '誰說「要安靜」？',
      options: ['the boy', 'Nick', 'Abby'], answer: 0 },
    { q: 'What are sleeping over there?', qZh: '那邊有什麼在睡覺？',
      options: ['elephants', 'lions', 'zebras'], answer: 1 },
    { q: '"What\'s the matter?" 是什麼意思？',
      options: ['怎麼了？', '那是什麼？', '你好嗎？'], answer: 0 },
    { q: '"You\'re so brave." 是什麼意思？',
      options: ['你好勇敢。', '你好可愛。', '你好安靜。'], answer: 0 },
    { q: 'What do they do at the end?', qZh: '最後他們做了什麼？',
      options: ['They sleep.', 'They sing.', 'They run.'], answer: 2 },
  ],

  grammar: {
    lessons: [
      {
        title: '那邊有…正在做…',
        explain: '看到東西正在做某件事，可以說：\nThere is ＋ 一個 ＋ 動詞ing ＋ over there.\nThere are ＋ 很多個 ＋ 動詞ing ＋ over there.\n一個用 is，兩個以上用 are！',
        pattern: [
          { en: 'There is a frog hopping over there.',        zh: '那邊有一隻青蛙在跳。' },
          { en: 'There are some ducks swimming over there.',  zh: '那邊有一些鴨子在游泳。' },
          { en: 'There are some lions sleeping over there.',  zh: '那邊有一些獅子在睡覺。' },
        ],
      },
      {
        title: '動詞加 ing 的三種方法',
        explain: '① 大部分的動詞：直接加 ing。\n② 字尾是 e：先把 e 去掉，再加 ing。\n③ 短短的字、字尾是「母音＋子音」：重複最後一個字母，再加 ing。',
        groups: [
          { label: '① 直接加 ing', tone: 'mint', items: ['sing → singing', 'play → playing', 'study → studying', 'sleep → sleeping'] },
          { label: '② 去 e 加 ing', tone: 'pink', items: ['dance → dancing', 'write → writing', 'take → taking', 'make → making'] },
          { label: '③ 重複字尾加 ing', tone: 'lav', items: ['hop → hopping', 'run → running', 'jog → jogging', 'swim → swimming'] },
        ],
        pattern: [
          { en: 'singing',  zh: '唱歌（直接加 ing）' },
          { en: 'dancing',  zh: '跳舞（dance 去 e 加 ing）' },
          { en: 'swimming', zh: '游泳（swim 多一個 m）' },
        ],
      },
    ],
    quizCount: 10,
    quiz: [
      { type: 'sort', q: '分類遊戲：這個動詞要怎麼加 ing？先點動詞，再點籃子！',
        groups: [{ id: 'add', label: '直接加 ing' }, { id: 'e', label: '去 e 加 ing' }, { id: 'double', label: '重複字尾' }],
        items: [['sing', 'add', 'singing'], ['play', 'add', 'playing'], ['study', 'add', 'studying'], ['sleep', 'add', 'sleeping'],
                ['dance', 'e', 'dancing'], ['write', 'e', 'writing'], ['take', 'e', 'taking'], ['make', 'e', 'making'],
                ['hop', 'double', 'hopping'], ['run', 'double', 'running'], ['jog', 'double', 'jogging'], ['swim', 'double', 'swimming']],
        pick: 6 },
      { type: 'fill', q: 'There ___ a frog hopping over there.', options: ['is', 'are'], answer: 0, hint: 'a frog 是一隻 → is' },
      { type: 'fill', q: 'There ___ some ducks swimming over there.', options: ['is', 'are'], answer: 1, hint: 'some ducks 是很多隻 → are' },
      { type: 'fill', q: 'There are some lions ___ over there.', options: ['sleeping', 'sleep', 'sleepping'], answer: 0, hint: 'sleep 直接加 ing → sleeping' },
      { type: 'fill', q: 'run → ___', options: ['running', 'runing', 'runnning'], answer: 0, hint: 'run 要重複 n 再加 ing → running' },
      { type: 'fill', q: 'dance → ___', options: ['dancing', 'danceing', 'dancting'], answer: 0, hint: 'dance 去 e 再加 ing → dancing' },
      { type: 'fill', q: 'swim → ___', options: ['swiming', 'swimming', 'swimeing'], answer: 1, hint: 'swim 要重複 m 再加 ing → swimming' },
      { type: 'fill', q: 'write → ___', options: ['writeing', 'writting', 'writing'], answer: 2, hint: 'write 去 e 再加 ing → writing' },
      { type: 'tf', q: 'There is a frog hoping over there.', answer: false, hint: 'hop 要重複 p：hopping' },
      { type: 'tf', q: 'There are some ducks swimming over there.', answer: true },
      { type: 'tf', q: 'There is some lions sleeping over there.', answer: false, hint: 'some lions 是很多隻，要用 are' },
      { type: 'tf', q: 'making a cake', answer: true },
      { type: 'tf', q: 'takeing a picture', answer: false, hint: 'take 去 e 再加 ing → taking a picture' },
    ],
  },
};
