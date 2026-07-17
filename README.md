# 嚕卡的DC戀愛攻略(網頁 Galgame)

純 HTML/CSS/JS 的視覺小說,**不用編譯、不用後端**,可直接部署到 GitHub Pages。
主角嚕卡(玩家視角)可攻略五位對象:時千、文凱、柏全、航程、宗岳。
立繪與背景目前為佔位圖,素材到位後填入 `js/script.js` 的路徑即可。

## 結局一覽(共 7 個)

| 結局 | 條件 |
|---|---|
| 時千 · 一手陪伴END | 時千好感度最高 |
| 文凱 · 觀察對象END | 文凱好感度最高 |
| 柏全 · 和解成立END | 柏全好感度最高 |
| 航程 · 隔海未滿END | 航程好感度最高 |
| 宗岳 · 破鏡重圓TRUE END | 宗岳好感度最高**且 ≥ 4**(最難) |
| 宗岳 · 最熟悉的陌生人END | 宗岳好感度最高但 < 4 |
| 日常 · 五缺一END | 最高好感度同分(或全 0) |

好感度來源:序章宗岳 +1(舊情)、共通線選擇 C1 +1、C2 +1、深夜私訊 C3 +2。

## 本機執行

```
python -m http.server 8123
```

然後開 http://localhost:8123 (直接雙擊 index.html 也能玩,但存檔功能建議用 http)。

## 專案結構

| 路徑 | 說明 |
|---|---|
| `index.html` / `css/style.css` | 畫面外觀 |
| `js/engine.js` | 引擎本體(通常不用動) |
| `js/script.js` | ★ 劇情腳本:角色(`romanceable: true` = 可攻略)、背景、場景全部在這 |
| `assets/char/` | 立繪(去背 PNG) |
| `assets/bg/` | 背景圖 |
| `assets/bgm/` | 音樂(選配) |

## 已支援功能

打字機對話、立繪(左/中/右三個位置、說話者高亮、表情切換)、選項、好感度系統、
條件分歧與多結局(`branchTopAff` 依好感度最高者分歧)、3 格存檔(localStorage)、
對話紀錄、AUTO / 快轉、還沒有圖片時自動產生佔位立繪與佔位背景、手機可玩。

## 劇情指令速查(`js/script.js` 的 scenes)

| 指令 | 範例 | 說明 |
|---|---|---|
| 背景 | `{ bg: "classroom" }` | 切換到 backgrounds 裡定義的背景 |
| 顯示立繪 | `{ show: "hina", sprite: "smile", pos: "left" }` | pos:left / center / right |
| 隱藏立繪 | `{ hide: "hina" }` 或 `{ hide: "all" }` | |
| 台詞 | `{ say: "hina", text: "……", sprite: "生氣" }` | sprite 可順便切換表情 |
| 旁白 | `{ narrate: "……" }` | 不顯示名牌 |
| 選項 | `{ choice: [ { text: "……", jump: "場景", aff: { hina: 1 }, flag: { met: true } } ] }` | jump/aff/flag 都是選填 |
| 好感度 | `{ aff: { hina: 1 } }` | 可為負數 |
| 旗標 | `{ flag: { metRei: true } }` | |
| 條件跳轉 | `{ if: { aff: ["hina", ">=", 3] }, jump: "goodEnd" }` | 也可用 `{ flag: ["met", "==", true] }` |
| 跳轉 | `{ jump: "sceneKey" }` | |
| 好感度分歧 | `{ branchTopAff: { hina: "hinaEnd", rei: "reiEnd", _default: "normalEnd" } }` | 好感度最高者;同分或皆 0 走 `_default` |
| 結局 | `{ ending: "TRUE END", desc: "……" }` | |
| 音樂 | `{ bgm: "main" }` / `{ bgm: null }` | 需先在 `GAME.bgm` 定義 |

一行可以同時放多個「非阻塞」指令(如 `bg` + `show`),但 `say / narrate / choice / ending` 一行一個。

## 素材規格

- **立繪**:去背 PNG、直式,高度建議 ≥ 1000px;同角色多表情請用同一構圖(只換臉)
- **背景**:16:9 橫式,建議 ≥ 1280×720(JPG/PNG)
- **BGM**(選配):MP3/OGG
- 檔名用小寫英數,例如 `hina_normal.png`、`classroom.jpg`
