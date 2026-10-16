# 🍭 Joy English 糖果群島

🌐 **線上版**：<https://xup45p3.github.io/Joy-English/>（把這個網址給學生就能玩；老師模式在網址後面加 `?teacher`）

主角宸毅和小幫手 Tzuyu 一起闖糖果島學英文！一課一座島，每座島有：

- 🏘️ **單字村**：單字卡 → 選擇題／聽音選圖／拼字／配對
- 🌳 **課文森林**：逐句朗讀（可切換中文、慢速）→ 閱讀理解
- 🕳️ **文法洞穴**：Tzuyu 文法小教室 → 填空選擇／對錯判斷
- 🏰 **島主城堡**：三區都完成後開放的綜合大挑戰

已經有內容的島都直接開放，可以跳著玩。

另外還有星星評分、金幣、宸毅的衣櫃（用金幣幫主角換裝扮）、單字圖鑑。學習進度存在各自的裝置上，不需要登入。

## 目前進度

課程內容來自佳音英語課本。目前完成第 1～9 課，第 10～15 課在地圖上會顯示「🚧 建造中」。

| 課 | 島 | 課名 | 單字 | 文法重點 |
|---|---|---|---|---|
| 1 | 🍬 水果糖島 | Let's Go! | 8 種交通方式 | by ＋ 交通工具、走路用 on foot |
| 2 | 🍪 餅乾島 | Which Animal Do You Like? | 5 種動物 | a／an、I like ＋ 複數 |
| 3 | 🍩 甜甜圈島 | Be Quiet! | 12 個動詞 ing（沒有插圖） | There is／are … ing over there、加 ing 的三種方法 |
| 4 | 🧁 杯子蛋糕島 | My Favorite Subject | 5 個科目 | my／your／his／her、名字加 's |
| 5 | 🍦 冰淇淋島 | Be a Diligent Student | 無 | 無（只有課文跟讀） |
| 6 | 🌈 彩虹糖島 | What Grade Are You In? | 序數 first～sixth | I'm in the ＿＿ grade. |
| 7 | 🍫 巧克力島 | My Favorite Season | 4 個季節 | My favorite season is ＿＿、句尾加 , too |
| 8 | 🍭 棒棒糖島 | What Do You Want? | 4 種食物 | do／does、want／wants |
| 9 | 🍮 布丁島 | The Songkran Festival | 1～4 月 | in ＋ 月份、this year／next year |

新增課程後，記得也更新這張表。

## 在自己電腦上打開

直接用瀏覽器打開 `index.html` 就能玩（建議用 Chrome 或 Safari）。

**老師模式**：在網址後面加上 `?teacher`（例如 `index.html?teacher`），島主城堡不用先完成三個地方也能直接挑戰，方便備課和測試。

**清除進度**：地圖頁最下方有「清除所有進度」按鈕。

## 新增一課

以下用「新增第 10 課」為例，之後的課照樣把數字加 1：

1. 複製目前最後一課 `js/data/lesson09.js`，改名成 `lesson10.js`
2. 把裡面的 `JOY.LESSONS[9]` 改成 `JOY.LESSONS[10]`、`lesson: 9` 改成 `lesson: 10`，再填入課文、單字、文法和題目
3. 單字圖片放在 `assets/lessons/l10/`，每個單字一張。課本沒有插圖的話，可以整課都不放圖（像第 3 課），或用 `label` 文字標籤代替（像第 6 課）
4. 在 `index.html` 裡、`lesson09.js` 那行下面多加一行 `<script src="js/data/lesson10.js"></script>`
5. 打開網頁確認第 10 課的島可以進去，再更新上面的「目前進度」表

### 每課可以用的特別設定

| 設定 | 用途 | 例子 |
|---|---|---|
| `zones: ['reading']` | 這課只開放哪些區域 | 第 5 課 |
| `readingMode: 'readAloud'` | 課文森林改成逐句跟讀，不考試 | 第 5 課 |
| `boss: null` | 沒有島主 | 第 5 課 |
| `choiceCount: 8` | 單字很多時，選擇題每次只抽幾題（拼字題每個單字都會考） | 第 3 課 |
| `grammar.quizCount: 10` | 文法題庫每次只抽幾題 | 第 3、4、8 課 |
| 單字的 `label: '1st'` | 沒有插圖時用文字標籤當圖 | 第 6 課 |
| 單字的 `spell: 'scooter'` | 片語只拼其中一個字 | 第 1 課 |
| 文法題 `type: 'sort'` | 分類遊戲（2～3 個籃子） | 第 2、3、4、8 課 |

島名和顏色在 `js/data/islands.js` 修改。也可以直接把課本照片給 Claude，請它幫你整理成資料檔。

## 換成自己錄的發音

在單字或課文句子上加 `audio: 'assets/audio/l07/spring.mp3'`，就會改播放這個音檔。沒有音檔的地方，會繼續用瀏覽器內建的語音。

## 上線（GitHub Pages，免費）

第一次上線只要做一次：

1. 在 GitHub 建立一個新的 repository，**不要**勾選「Add a README file」，保持空的
2. 在 VS Code 的終端機（PowerShell）裡，確認位置在專案資料夾，執行下面的指令（最後兩行的網址換成你的 repository 網址）：

   ```powershell
   git add .
   git commit -m "第一版"
   git remote add origin https://github.com/你的帳號/repository名稱.git
   git push -u origin main
   ```

   第一次 `push` 會跳出 GitHub 登入視窗，登入後就會開始上傳。`-u` 會記住上傳的位置，之後只要打 `git push` 就好。
3. 到 repository 的 **Settings → Pages**，Source 選 `Deploy from a branch`，Branch 選 `main`、資料夾選 `/ (root)`，按下 Save
4. 大約一分鐘後，就會得到 `https://你的帳號.github.io/repository名稱/` 這個網址，把它給學生就可以玩了

注意：

- 請用上面的指令上傳，**不要**在 GitHub 網頁上直接拖曳檔案。網頁上傳時 `.gitignore` 不會生效，`素材/` 裡的課本照片會被一起傳上去。
- 免費的 GitHub 帳號只能用「公開」的 repository 架設 Pages，任何人都看得到裡面的檔案。

## 版本管理（Git）

這個資料夾用 Git 記錄每一次修改，改壞了可以退回之前的版本。`.gitignore` 列出不會被記錄、也不會上傳的東西：`素材/`、`.venv/`、`.vscode/`，以及 macOS、Windows 的系統檔。

### 改完內容後：存一個版本並更新網站

```powershell
git status
git add .
git commit -m "新增第 10 課"
git push
```

| 指令 | 作用 |
|---|---|
| `git status` | 看這次改了哪些檔案（可以略過，只是確認用） |
| `git add .` | 把改過的檔案全部放進「準備存檔」的清單 |
| `git commit -m "…"` | 存成一個版本，引號裡寫這次改了什麼 |
| `git push` | 把新版本上傳到 GitHub；有開 GitHub Pages 的話，大約一分鐘後網站會自動更新 |

## 檔案結構

```
index.html            網站入口
README.md             說明文件（就是這份）
.gitignore            不要記錄、不要上傳的檔案清單
css/style.css         所有畫面樣式
js/core.js            存檔、發音、音效、角色顯示（宸毅、Tzuyu）
js/games.js           各種遊戲玩法與題目引擎
js/app.js             地圖、島嶼、圖鑑、衣櫃等畫面
js/data/islands.js    15 座糖果島的名稱與顏色
js/data/shop.js       宸毅的裝扮商店（舊商店的東西會自動退金幣）
js/data/lessonXX.js   每一課的內容
assets/               hero.png／hero-head.png 是宸毅，tzuyu.png 是小幫手；lessons/ 是單字插圖
素材/                 原始課本照片與角色原圖（需要時自己建立，只留在本機，不會上傳）
```
