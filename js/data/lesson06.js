// 佳音英語 Unit 6（課本 p.48–51）
// 序數單字用 label（1st、2nd…）當圖片
window.JOY = window.JOY || {};
JOY.LESSONS = JOY.LESSONS || {};
JOY.LESSONS[6] = {
  lesson: 6,
  title: 'What Grade Are You In?',
  titleZh: '你讀幾年級？',
  boss: { name: '彩虹糖大王', emoji: '🌈' },

  speakers: {
    Abby:        { pitch: 1.35, color: '#ff7eb6' },
    Nick:        { pitch: 1.1,  color: '#5aa9ff' },
    'Mona Lisa': { pitch: 0.9,  color: '#6b8e4e' },
  },

  vocab: [
    { id: 'first',  en: 'first',  zh: '第一', label: '1st', core: true },
    { id: 'second', en: 'second', zh: '第二', label: '2nd', core: true },
    { id: 'third',  en: 'third',  zh: '第三', label: '3rd', core: true },
    { id: 'fourth', en: 'fourth', zh: '第四', label: '4th', core: true },
    { id: 'fifth',  en: 'fifth',  zh: '第五', label: '5th', core: true },
    { id: 'sixth',  en: 'sixth',  zh: '第六', label: '6th', core: true },
  ],

  dialogue: [
    { speaker: 'Nick',      en: "Abby, look! It's the Mona Lisa.",     zh: 'Abby，你看！是蒙娜麗莎。' },
    { speaker: 'Mona Lisa', en: 'Hi there. What grade are you in?',    zh: '嗨，你們好。你們讀幾年級？' },
    { speaker: 'Abby',      en: "I'm in the second grade.",            zh: '我讀二年級。' },
    { speaker: 'Nick',      en: 'Me too.',                             zh: '我也是。' },
    { speaker: 'Nick',      en: 'We... we... we... gotta go now.',     zh: '我們……我們……我們得走了。' },
  ],

  reading: [
    { q: 'What do Nick and Abby see?', qZh: 'Nick 和 Abby 看到什麼？',
      options: ['the Mona Lisa', 'the Louvre', 'some lions'], answer: 0 },
    { q: 'Who asks "What grade are you in?"', qZh: '誰問「你們讀幾年級？」',
      options: ['Abby', 'the Mona Lisa', 'Nick'], answer: 1 },
    { q: 'What grade is Abby in?', qZh: 'Abby 讀幾年級？',
      options: ['first', 'second', 'third'], answer: 1 },
    { q: 'What grade is Nick in?', qZh: 'Nick 讀幾年級？',
      options: ['second', 'fourth', 'sixth'], answer: 0 },
    { q: '"Me too." 是什麼意思？',
      options: ['我也是。', '我不是。', '我兩個。'], answer: 0 },
  ],

  grammar: {
    lessons: [
      {
        title: '你讀幾年級？',
        explain: '問別人：What grade are you in?\n回答：I am in the ＿＿ grade.（I am 可以縮寫成 I\'m）\n年級要用「第幾」的序數，前面要加 the 喔！',
        pattern: [
          { en: 'What grade are you in?',  zh: '你讀幾年級？' },
          { en: 'I am in the first grade.', zh: '我讀一年級。' },
          { en: "I'm in the second grade.", zh: '我讀二年級。' },
        ],
      },
      {
        title: '序數：第一、第二、第三…',
        explain: '1、2、3 很特別，要背起來：first、second、third。\n4 以後大多是數字加 th：fourth、sixth。\n5 要特別注意：five 變成 fifth！',
        groups: [
          { label: '特別的三個', tone: 'pink', items: ['1st first', '2nd second', '3rd third'] },
          { label: '加 th', tone: 'mint', items: ['4th fourth', '5th fifth', '6th sixth'] },
        ],
        pattern: [
          { en: 'first, second, third',  zh: '第一、第二、第三' },
          { en: 'fourth, fifth, sixth',  zh: '第四、第五、第六' },
        ],
      },
    ],
    quiz: [
      { type: 'fill', q: 'What grade ___ you in?', options: ['are', 'is', 'do'], answer: 0, hint: 'you 用 are：What grade are you in?' },
      { type: 'fill', q: 'I am in ___ second grade.', options: ['the', 'a', 'an'], answer: 0, hint: '年級前面要加 the' },
      { type: 'fill', q: 'I am in the ___ grade.（3 年級）', options: ['third', 'three', 'thirth'], answer: 0, hint: '第三是 third' },
      { type: 'fill', q: '5th = ___', options: ['fifth', 'fiveth', 'fivth'], answer: 0, hint: 'five 變成 fifth' },
      { type: 'fill', q: '1st = ___', options: ['first', 'one', 'oneth'], answer: 0, hint: '第一是 first' },
      { type: 'fill', q: '2nd = ___', options: ['twoth', 'second', 'two'], answer: 1, hint: '第二是 second' },
      { type: 'tf', q: 'I am in the four grade.', answer: false, hint: '要用序數：I am in the fourth grade.' },
      { type: 'tf', q: 'What grade are you in?', answer: true },
      { type: 'tf', q: "I'm in the sixth grade.", answer: true },
      { type: 'tf', q: 'I am in first grade.', answer: false, hint: '年級前面要加 the：I am in the first grade.' },
    ],
  },
};
