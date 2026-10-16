// 佳音英語 Unit 2（課本 p.24–27）
window.JOY = window.JOY || {};
JOY.LESSONS = JOY.LESSONS || {};
JOY.LESSONS[2] = {
  lesson: 2,
  title: 'Which Animal Do You Like?',
  titleZh: '你喜歡哪一種動物？',
  boss: { name: '餅乾大王', emoji: '🍪' },

  speakers: {
    Abby: { pitch: 1.35, color: '#ff7eb6' },
    Nick: { pitch: 1.1,  color: '#5aa9ff' },
  },

  vocab: [
    { id: 'zebra',    en: 'zebra',    zh: '斑馬',   img: 'assets/lessons/l02/zebra.jpg',    core: true },
    { id: 'elephant', en: 'elephant', zh: '大象',   img: 'assets/lessons/l02/elephant.jpg', core: true },
    { id: 'hippo',    en: 'hippo',    zh: '河馬',   img: 'assets/lessons/l02/hippo.jpg',    core: true },
    { id: 'giraffe',  en: 'giraffe',  zh: '長頸鹿', img: 'assets/lessons/l02/giraffe.jpg',  core: true },
    { id: 'rhino',    en: 'rhino',    zh: '犀牛',   img: 'assets/lessons/l02/rhino.jpg',    core: true },
  ],

  dialogue: [
    { speaker: 'Abby', en: 'Sawubona, South Africa!',                      zh: '你好，南非！（Sawubona 是南非祖魯語的「你好」）' },
    { speaker: 'Nick', en: 'Abby, look! There are a lot of animals here.', zh: 'Abby，你看！這裡有好多動物。' },
    { speaker: 'Abby', en: 'Which animal do you like?',                    zh: '你喜歡哪一種動物？' },
    { speaker: 'Nick', en: 'I like zebras. And you?',                      zh: '我喜歡斑馬。那妳呢？' },
    { speaker: 'Abby', en: 'I like elephants.',                            zh: '我喜歡大象。' },
  ],

  reading: [
    { q: 'Where are Nick and Abby?', qZh: 'Nick 和 Abby 在哪裡？',
      options: ['Japan', 'South Africa', 'Thailand'], answer: 1 },
    { q: 'Which animal does Nick like?', qZh: 'Nick 喜歡哪一種動物？',
      options: ['zebras', 'elephants', 'hippos'], answer: 0 },
    { q: 'Which animal does Abby like?', qZh: 'Abby 喜歡哪一種動物？',
      options: ['giraffes', 'rhinos', 'elephants'], answer: 2 },
    { q: '"There are a lot of animals here." 是什麼意思？',
      options: ['這裡有好多動物。', '這裡沒有動物。', '動物在那裡。'], answer: 0 },
    { q: '"And you?" 是什麼意思？',
      options: ['你好嗎？', '那你呢？', '你是誰？'], answer: 1 },
  ],

  grammar: {
    lessons: [
      {
        title: 'a 和 an',
        explain: '一隻動物，前面要加 a 或 an。\n單字開頭的音是 a、e、i、o、u（母音）→ 用 an。\n其他的 → 用 a。',
        groups: [
          { label: 'a', tone: 'mint', items: ['a zebra', 'a hippo', 'a giraffe', 'a rhino'] },
          { label: 'an（a e i o u 開頭）', tone: 'pink', items: ['an elephant'] },
        ],
        pattern: [
          { en: 'a zebra',     zh: '一隻斑馬' },
          { en: 'an elephant', zh: '一隻大象' },
        ],
      },
      {
        title: '喜歡哪一種動物？',
        explain: '問別人：Which animal do you like?\n回答：I like ＿＿。\n說「喜歡某種動物」時，動物要用複數，在字尾加 s！\nzebra → zebras、elephant → elephants',
        pattern: [
          { en: 'Which animal do you like?', zh: '你喜歡哪一種動物？' },
          { en: 'I like hippos.',            zh: '我喜歡河馬。' },
          { en: 'I like zebras. And you?',   zh: '我喜歡斑馬。那你呢？' },
        ],
      },
    ],
    quiz: [
      { type: 'sort', q: '分類遊戲：要用 a 還是 an？先點單字，再點籃子！',
        groups: [{ id: 'a', label: 'a', say: 'a {x}' }, { id: 'an', label: 'an', say: 'an {x}' }],
        items: [['zebra', 'a'], ['hippo', 'a'], ['giraffe', 'a'], ['rhino', 'a'], ['elephant', 'an'], ['apple', 'an'], ['egg', 'an'], ['orange', 'an']],
        pick: 6 },
      { type: 'fill', q: '___ elephant', options: ['a', 'an'], answer: 1, hint: 'elephant 是 e 開頭 → an elephant' },
      { type: 'fill', q: '___ zebra', options: ['a', 'an'], answer: 0, hint: 'zebra 是 z 開頭 → a zebra' },
      { type: 'fill', q: 'I like ___.', options: ['hippos', 'hippo', 'a hippos'], answer: 0, hint: '說喜歡某種動物要用複數：I like hippos.' },
      { type: 'fill', q: '___ animal do you like?', options: ['Which', 'Who', 'Where'], answer: 0, hint: 'Which animal 是「哪一種動物」' },
      { type: 'fill', q: 'giraffe → 很多隻是 ___', options: ['giraffes', 'giraffe', 'giraffees'], answer: 0, hint: '字尾加 s：giraffes' },
      { type: 'tf', q: 'I like giraffe.', answer: false, hint: '要用複數：I like giraffes.' },
      { type: 'tf', q: 'a elephant', answer: false, hint: 'elephant 是 e 開頭，要用 an elephant' },
      { type: 'tf', q: 'I like rhinos.', answer: true },
      { type: 'tf', q: 'Which animal do you like?', answer: true },
    ],
  },
};
