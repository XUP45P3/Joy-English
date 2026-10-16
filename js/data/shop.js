// 主角（宸毅）的裝扮商店。slot 相同的東西一次只能穿一件。
// 之後若有自己畫的裝扮圖，可以把 emoji 換成 img: 'assets/shop/xxx.png'
window.JOY = window.JOY || {};
JOY.SHOP = [
  { id: 'cap',      slot: 'head', name: '棒球帽',     emoji: '🧢', price: 20 },
  { id: 'gradcap',  slot: 'head', name: '博士帽',     emoji: '🎓', price: 35 },
  { id: 'tophat',   slot: 'head', name: '魔術帽',     emoji: '🎩', price: 45 },
  { id: 'crown',    slot: 'head', name: '國王皇冠',   emoji: '👑', price: 80 },

  { id: 'soccer',   slot: 'hand', name: '足球',       emoji: '⚽', price: 20 },
  { id: 'basket',   slot: 'hand', name: '籃球',       emoji: '🏀', price: 25 },
  { id: 'trophy',   slot: 'hand', name: '冠軍獎盃',   emoji: '🏆', price: 50 },
  { id: 'sword',    slot: 'hand', name: '勇者之劍',   emoji: '🗡️', price: 60 },
  { id: 'rocket',   slot: 'hand', name: '火箭',       emoji: '🚀', price: 70 },

  { id: 'puppy',    slot: 'pet',  name: '小狗狗',     emoji: '🐶', price: 40 },
  { id: 'trex',     slot: 'pet',  name: '暴龍',       emoji: '🦖', price: 60 },
  { id: 'robot',    slot: 'pet',  name: '機器人',     emoji: '🤖', price: 70 },
  { id: 'dragon',   slot: 'pet',  name: '小飛龍',     emoji: '🐉', price: 90 },

  { id: 'sparkle',  slot: 'aura', name: '閃亮星光',   emoji: '✨', price: 40 },
  { id: 'thunder',  slot: 'aura', name: '閃電',       emoji: '⚡', price: 50 },
  { id: 'fire',     slot: 'aura', name: '火焰',       emoji: '🔥', price: 60 },
  { id: 'rainbow',  slot: 'aura', name: '彩虹光環',   emoji: '🌈', price: 50 },
];
JOY.SLOTS = { head: '帽子', hand: '手持', pet: '寵物', aura: '特效' };
// 舊版商店的東西（已下架）：存檔裡有的話退還金幣
JOY.OLD_SHOP_PRICES = { bow: 20, flower: 25, cupcake: 40, lollipop: 20, balloon: 30, icecream: 30, wand: 50, bunny: 40, kitty: 40, unicorn: 80, candyrain: 60 };
