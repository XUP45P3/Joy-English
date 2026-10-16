// 佳音英語 Unit 8（課本 p.60–63）
window.JOY = window.JOY || {};
JOY.LESSONS = JOY.LESSONS || {};
JOY.LESSONS[8] = {
  lesson: 8,
  title: 'What Do You Want?',
  titleZh: '你想要什麼？',
  boss: { name: '棒棒糖大王', emoji: '🍭' },

  speakers: {
    Abby:   { pitch: 1.35, color: '#ff7eb6' },
    Nick:   { pitch: 1.1,  color: '#5aa9ff' },
    Momoko: { pitch: 1.0,  color: '#a07cff' },
  },

  vocab: [
    { id: 'fried-rice',    en: 'fried rice',    zh: '炒飯',  img: 'assets/lessons/l08/fried-rice.jpg',    core: true },
    { id: 'fried-noodles', en: 'fried noodles', zh: '炒麵',  img: 'assets/lessons/l08/fried-noodles.jpg', core: true },
    { id: 'fish',          en: 'fish',          zh: '魚',    img: 'assets/lessons/l08/fish.jpg',          core: true },
    { id: 'soup',          en: 'soup',          zh: '湯',    img: 'assets/lessons/l08/soup.jpg',          core: true },
  ],

  dialogue: [
    { speaker: 'Momoko', en: "Let's have a picnic under the tree.", zh: '我們在樹下野餐吧。' },
    { speaker: 'Abby',   en: "Thank you. You're so kind.",          zh: '謝謝妳，妳人真好。' },
    { speaker: 'Momoko', en: 'What do you want?',                   zh: '妳想要什麼？' },
    { speaker: 'Abby',   en: 'I want sushi.',                       zh: '我想要壽司。' },
    { speaker: 'Momoko', en: 'What does he want?',                  zh: '他想要什麼？' },
    { speaker: 'Abby',   en: 'He wants...',                         zh: '他想要……' },
    { speaker: 'Nick',   en: 'Durians!!',                           zh: '榴槤！！' },
  ],

  reading: [
    { q: 'Where do they have a picnic?', qZh: '他們在哪裡野餐？',
      options: ['in the house', 'under the tree', 'on the bridge'], answer: 1 },
    { q: 'Who says "Let\'s have a picnic"?', qZh: '誰說「我們來野餐吧」？',
      options: ['Momoko', 'Abby', 'Nick'], answer: 0 },
    { q: 'What does Abby want?', qZh: 'Abby 想要什麼？',
      options: ['soup', 'sushi', 'fish'], answer: 1 },
    { q: 'What does Nick want?', qZh: 'Nick 想要什麼？',
      options: ['durians', 'fried rice', 'sushi'], answer: 0 },
    { q: '"You\'re so kind." 是什麼意思？',
      options: ['你好可愛。', '你人真好。', '你好厲害。'], answer: 1 },
  ],

  grammar: {
    lessons: [
      {
        title: '問「你」想要什麼',
        explain: '問對方想要什麼：What do you want?\n回答：I want ＿＿。\n「我」和「你」後面的 want 都不用加 s 喔！',
        pattern: [
          { en: 'What do you want?',     zh: '你想要什麼？' },
          { en: 'I want fried noodles.', zh: '我想要炒麵。' },
        ],
      },
      {
        title: '問「他／她」想要什麼',
        explain: '問別人（he 他、she 她、或一個人的名字）想要什麼，要用 does：\nWhat does he want?\n回答的時候，want 要變成 wants（加 s）！\n小秘訣：問句裡已經有 does 了，所以問句裡的 want 不加 s。',
        pattern: [
          { en: 'What does Nini want?', zh: 'Nini 想要什麼？' },
          { en: 'She wants fried rice.', zh: '她想要炒飯。' },
          { en: 'What does he want?',   zh: '他想要什麼？' },
          { en: 'He wants fish.',       zh: '他想要魚。' },
        ],
      },
      {
        title: '誰用 do？誰用 does？',
        explain: '先看「誰」想要，再決定用 do 還是 does！\nI、you、we、they 和「兩個人以上」→ 用 do，want 不加 s。\nhe、she、it 和「一個人的名字」→ 用 does，want 要加 s 變 wants。',
        // 分組表：groups 會畫成兩欄
        groups: [
          { label: 'do ／ want', tone: 'mint', items: ['I', 'you', 'we', 'they', '兩個人以上'] },
          { label: 'does ／ wants', tone: 'pink', items: ['he', 'she', 'it', '一個人的名字（Nick、Momoko）'] },
        ],
        pattern: [
          { en: 'What do they want?',   zh: '他們想要什麼？' },
          { en: 'They want soup.',      zh: '他們想要湯。' },
          { en: 'What does it want?',   zh: '牠想要什麼？' },
          { en: 'It wants fish.',       zh: '牠想要魚。' },
        ],
      },
      {
        title: '兩個人以上怎麼辦？',
        explain: '兩個人以上要先換成 they 或 we：\nNick and Abby 是兩個人（沒有我）→ they → 用 do、want。\nNick and I 有「我」在裡面 → we → 也是用 do、want！',
        groups: [
          { label: 'Nick and Abby = they', tone: 'mint', items: ['Nick + Abby（兩個人，沒有我）', '→ they', '→ do、want'] },
          { label: 'Nick and I = we', tone: 'mint', items: ['Nick + 我（有我在裡面）', '→ we', '→ do、want'] },
        ],
        pattern: [
          { en: 'What do Nick and Abby want?', zh: 'Nick 和 Abby 想要什麼？' },
          { en: 'They want sushi.',            zh: '他們想要壽司。' },
          { en: 'What do Nick and I want?',    zh: 'Nick 和我想要什麼？' },
          { en: 'We want fried rice.',         zh: '我們想要炒飯。' },
        ],
      },
    ],
    quizCount: 10, // 題庫 17 題，每次隨機抽 10 題
    quiz: [
      { type: 'fill', q: 'What ___ you want?', options: ['do', 'does'], answer: 0, hint: '問「你」用 do：What do you want?' },
      { type: 'fill', q: 'What ___ he want?', options: ['do', 'does'], answer: 1, hint: '問「他」用 does：What does he want?' },
      { type: 'fill', q: 'She ___ fried rice.', options: ['want', 'wants'], answer: 1, hint: 'She 後面要用 wants' },
      { type: 'fill', q: 'What does Nini ___?', options: ['want', 'wants'], answer: 0, hint: '問句裡有 does，want 就不加 s' },
      { type: 'tf', q: 'He want soup.', answer: false, hint: 'He 後面要用 wants：He wants soup.' },
      { type: 'tf', q: 'What does she want?', answer: true },
      { type: 'tf', q: 'I wants sushi.', answer: false, hint: 'I 後面的 want 不加 s：I want sushi.' },
      { type: 'sort', q: '分類遊戲：先點一個主詞，再點它要去的籃子！',
        groups: [{ id: 'do', label: 'do ／ want', say: '{x} want' }, { id: 'does', label: 'does ／ wants', say: '{x} wants' }],
        items: [['I', 'do'], ['you', 'do'], ['we', 'do'], ['they', 'do'], ['Nick and Abby', 'do'], ['Nick and I', 'do'],
                ['he', 'does'], ['she', 'does'], ['it', 'does'], ['Momoko', 'does']],
        pick: 6 },
      { type: 'fill', q: 'Nick and Abby = ___', options: ['They', 'He', 'We'], answer: 0, hint: '兩個人、沒有我 → They' },
      { type: 'fill', q: 'Nick and I = ___', options: ['They', 'We', 'I'], answer: 1, hint: '有「我」在裡面 → We' },
      { type: 'fill', q: 'What ___ Nick and Abby want?', options: ['do', 'does'], answer: 0, hint: 'Nick and Abby 是兩個人 = they → 用 do' },
      { type: 'fill', q: 'Nick and Abby ___ sushi.', options: ['want', 'wants'], answer: 0, hint: '兩個人 = they → want 不加 s' },
      { type: 'fill', q: 'What ___ Nick and I want?', options: ['do', 'does'], answer: 0, hint: 'Nick and I = we → 用 do' },
      { type: 'fill', q: 'It ___ fish.', options: ['want', 'wants'], answer: 1, hint: 'it（牠）→ wants' },
      { type: 'tf', q: 'Nick and Abby wants fried rice.', answer: false, hint: '兩個人 = they → Nick and Abby want fried rice.' },
      { type: 'tf', q: 'We want soup.', answer: true },
      { type: 'tf', q: 'What does they want?', answer: false, hint: 'they 要用 do：What do they want?' },
    ],
  },
};
