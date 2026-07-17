/* ============================================================
   《嚕卡的DC戀愛攻略》劇情腳本
   主角:嚕卡(玩家視角,女主角)— 台詞使用注音文(ㄋㄌㄉㄛㄚㄇㄅ)
   可攻略:時千 / 文凱 / 柏全 / 航程 / 宗岳

   流程(Jordan 規格):
     加長開場 → 進群 → 共通劇情 ×5(每選項同時增減多人好感度)
     → routeGate:
        全員好感度差距 ≤ 1,或最高分同分並列 → 後宮結局
        否則 → 好感度最高者的個人劇情
     → 個人劇情之後將改為「三題問答全對=好結局,否則壞結局」
       (問答內容待 Jordan 提供,目前個人路線暫用第一章版本)
   ============================================================ */
const GAME = {
  title: "嚕卡的DC戀愛攻略",
  subtitle: "一個語音頻道,五個攻略對象。(暫定標題,可改)",
  start: "start",

  config: {
    textSpeed: 26,
    showAffection: true,   // 正式版想隱藏數字就改 false
    debugTags: true,       // 圖片都換好之後可改 false
  },

  characters: {
    ruka:      { name: "嚕卡", color: "#ff9eb5" },
    shiqian:   { name: "時千", color: "#4f7cd1", romanceable: true },  // 五分牛仔褲台男,一手陪伴,暈船中
    wenkai:    { name: "文凱", color: "#7ec97e", romanceable: true },  // 瘦瘦的宅男,觀察力驚人,疑惑中
    boquan:    { name: "柏全", color: "#a97ff2", romanceable: true },  // 帥潮男律師,失言前科,冷處理解除中
    hangcheng: { name: "航程", color: "#ff9d5c", romanceable: true },  // 人在廈門,情傷,說好不談感情
    zongyue:   { name: "宗岳", color: "#6fbfb4", romanceable: true },  // 舊情殘留+目前反感,最難攻略
    // 立繪到位後範例:
    // shiqian: { name:"時千", color:"#4f7cd1", romanceable:true,
    //            sprites:{ normal:"assets/char/shiqian_normal.png", 笑:"assets/char/shiqian_smile.png" } },
  },

  backgrounds: {
    room:   { label: "嚕卡的房間・深夜", css: "linear-gradient(180deg,#1a2035 0%,#232a4a 60%,#3a3357 100%)" },
    memory: { label: "半年前的回憶",     css: "linear-gradient(180deg,#d9c7a7 0%,#b99a7c 60%,#8a6f63 100%)" },
    dc:     { label: "DC 語音頻道",      css: "linear-gradient(180deg,#404eed 0%,#36393f 55%,#23272a 100%)" },
    game:   { label: "遊戲裡・排位中",   css: "linear-gradient(180deg,#173b3f 0%,#1f5e50 55%,#3f2a55 100%)" },
    cafe:   { label: "網聚餐廳",         css: "linear-gradient(180deg,#f2d0a4 0%,#d99e73 55%,#9c6b52 100%)" },
    street: { label: "散場後的夜路",     css: "linear-gradient(180deg,#20304f 0%,#41436a 55%,#8a5c7c 100%)" },
  },

  scenes: {
    /* ---------------- 加長開場 ---------------- */
    start: [
      { bg: "room" },
      { narrate: "凌晨十二點半。打完最後一場排位,我盯著天花板,睡意全無。" },
      { narrate: "書桌上,論文的檔案還開著——游標停在第三章的標題後面,閃了一整個晚上,一個字都沒有前進。" },
      { say: "ruka", text: "自我介紹一下。我叫嚕卡,師大研究所在讀,主業寫論文,副業——當網美。" },
      { narrate: "Threads 加上 IG,粉絲一萬多。不是什麼大咖,但偶爾會在路上被認出來、偶爾一篇貼文會突然爆掉的那種程度。" },
      { narrate: "(拍照、修圖、想文案,這些我閉著眼睛都會。鏡頭前的嚕卡,永遠從容,永遠可愛。)" },
      { narrate: "(——但只有我自己知道:關掉相機之後,論文寫不出來的嚕卡、感情一團亂的嚕卡,才是本體。)" },
      { narrate: "床角傳來小小的呼嚕聲。我家狗勾睡得比我還熟,睡姿還很囂張,肚皮朝天。" },
      { narrate: "(可愛。目前為止,牠是全世界唯一不會讓我心累的男生。)" },
      { narrate: "戀愛……嗎。說到這個,得先講一件半年前的往事。" },
      { jump: "memoryZongyue" },
    ],

    memoryZongyue: [
      { bg: "memory" },
      { show: "zongyue", pos: "center" },
      { narrate: "半年前,我跟宗岳之間,曾經有過一點說不清楚的什麼。" },
      { say: "zongyue", text: "妳傳的這什麼老哏圖……好啦,有點好笑。明天有空嗎?出來走走。" },
      { narrate: "每天聊天,也真的出去過一次。就在「好像要變成什麼」的前一步——" },
      { say: "zongyue", sprite: "皺眉", text: "……沒事。就這樣吧。" },
      { narrate: "幾次小小的摩擦,誰也沒把話說開。我們就這樣,退回了「普通朋友」。" },
      { narrate: "(但心裡某個角落,大概還留著一點什麼吧。)" },
      { hide: "zongyue" },
      { jump: "joinDC" },
    ],

    /* ---------------- 進群 ---------------- */
    joinDC: [
      { bg: "dc" },
      { narrate: "然後是上個月。聽說有個排位缺補的群,我就這樣,加進了宗岳國高中同學的 DC 群。" },
      { show: "zongyue", pos: "center", sprite: "皺眉" },
      { say: "zongyue", text: "……嚕卡?妳怎麼會在這。" },
      { say: "ruka", text: "路過。聽說ㄋ們缺一個會玩ㄉ,剛好,我很會。" },
      { say: "zongyue", text: "…………隨便妳。" },
      { narrate: "(嗯,態度冷得跟結冰的可樂一樣。這半年他對我大概就是這個溫度。)" },
      { show: "shiqian", pos: "left" },
      { say: "shiqian", text: "欸不是!新人欸!歡迎歡迎~我時千,本群暖爐,二十四小時營業。缺位子我補,缺人陪,我也補。" },
      { show: "boquan", pos: "right" },
      { say: "boquan", text: "初次見面,柏全,執業律師。嗯——我很喜歡目前事情的發展。" },
      { narrate: "(這人講話怎麼像在結辯。……而且我跟他之間有一筆舊帳,晚點再說。)" },
      { show: "wenkai", pos: "center" },
      { say: "wenkai", text: "……哈囉,我文凱。(小聲)原來嚕卡,就是妳……" },
      { narrate: "(聲音好小。而且總覺得,他已經開始在觀察我了。)" },
      { show: "hangcheng", pos: "center" },
      { say: "hangcheng", text: "航程,人在廈門。先說清楚:我不談感情。打遊戲可以,談心,點到為止。" },
      { say: "shiqian", text: "他就是傳說中的那個、3P大——" },
      { say: "hangcheng", sprite: "皺眉", text: "「三分球很準」的意思。時千,你再多講一個字試試看。" },
      { narrate: "(……我決定先不要深究這個話題。)" },
      { narrate: "就這樣,我在這個吵吵鬧鬧的語音頻道住了下來。屬於這個群的、雞飛狗跳的日常——開始了。" },
      { jump: "event1" },
    ],

    /* ---------------- 共通劇情 1:文凱的 AD ---------------- */
    event1: [
      { hide: "all" },
      { bg: "game" },
      { narrate: "晚上十一點,剛打完一局彈性積分。語音裡照例開起了賽後檢討大會。" },
      { show: "shiqian", pos: "left" },
      { say: "shiqian", text: "欸欸,說真的,文凱今天這隻 AD 玩得怎麼樣?大家評分一下。" },
      { show: "wenkai", pos: "center" },
      { say: "wenkai", text: "……幹嘛突然 cue 我。" },
      { show: "boquan", pos: "right" },
      { say: "boquan", text: "本席保留意見。先聽嚕卡的。" },
      { narrate: "一瞬間,整個語音都在等我開口。文凱的呼吸聲,好像也停了半拍。" },
      { choice: [
        { text: "「很強」",
          aff: { wenkai: 2, shiqian: -1, boquan: -1, hangcheng: -1, zongyue: -1 },
          jump: "e1a" },
        { text: "「還好」",
          aff: { wenkai: -1, shiqian: 1, boquan: 1, hangcheng: 1, zongyue: 1 },
          jump: "e1b" },
      ]},
    ],
    e1a: [
      { narrate: "(文凱內心:她說很強。嚕卡說我很強——!!今天的擊殺畫面,要剪起來永久收藏。)" },
      { say: "wenkai", sprite: "竊喜", text: "……還、還好啦。普通操作,普通操作。" },
      { narrate: "(他嘴上這樣說,但嘴角完全壓不住。竊喜的頻率,隔著螢幕都收得到。)" },
      { jump: "event2" },
    ],
    e1b: [
      { narrate: "(文凱內心:還好。……只是,還好嗎。)" },
      { say: "wenkai", sprite: "受傷", text: "……喔。我知道了。這句「還好」,我會記一輩子。" },
      { narrate: "(他半開玩笑地說著,可是那個聲音,聽起來是真的一個人默默傷心了。)" },
      { jump: "event2" },
    ],

    /* ---------------- 共通劇情 2:航程的照片 ---------------- */
    event2: [
      { hide: "all" },
      { bg: "dc" },
      { narrate: "又一個晚上。不知道誰起的頭,群裡玩起了「照片二選一」——輪流丟兩張舊照片出來,讓大家投票。" },
      { show: "shiqian", pos: "left" },
      { say: "shiqian", text: "下一組!航程的舊照片,左邊跟右邊,選一張!" },
      { show: "hangcheng", pos: "center" },
      { narrate: "我隨手一點——點開的那張,是航程和兩位朋友的、構圖非常微妙的合照。傳說中的那種。全語音瞬間安靜。" },
      { say: "hangcheng", text: "……等等。這張是誰翻出來的。" },
      { choice: [
        { text: "「好噁ㄛ」",
          aff: { hangcheng: -2, shiqian: 1, wenkai: 1, boquan: 1, zongyue: 1 },
          jump: "e2a" },
        { text: "「好帥ㄛ」",
          aff: { hangcheng: 1, shiqian: -1, wenkai: -1, boquan: -1, zongyue: -1 },
          jump: "e2b" },
      ]},
    ],
    e2a: [
      { narrate: "(航程內心:好噁……被這樣講,是真的有點受傷。……但是為什麼,心裡某個角落,居然有一點點享受?不對。冷靜。)" },
      { say: "hangcheng", sprite: "微妙", text: "……哈。妳這個反應,算及格。" },
      { narrate: "(他聽起來受傷,又好像在笑。這個人,真的很難懂。)" },
      { jump: "event3" },
    ],
    e2b: [
      { narrate: "(航程內心:好帥?她看著這張照片,說好帥?……難道,她也喜歡玩3P?……不,不可能,別亂想。)" },
      { say: "hangcheng", sprite: "動搖", text: "……嚕卡,妳的審美,滿特別的。" },
      { narrate: "(語音那頭傳來喝水嗆到的聲音。不只一個人。)" },
      { jump: "event3" },
    ],

    /* ---------------- 共通劇情 3:宗岳的七日殺 ---------------- */
    event3: [
      { hide: "all" },
      { bg: "dc" },
      { narrate: "某天晚餐時間,宗岳難得主動開了麥。" },
      { show: "zongyue", pos: "center" },
      { say: "zongyue", text: "……問一下。七日殺特價,有人要玩嗎。" },
      { show: "boquan", pos: "right" },
      { say: "boquan", text: "本席下週開庭,先行迴避。" },
      { show: "shiqian", pos: "left" },
      { say: "shiqian", text: "我看時間啦~殭屍遊戲喔,還不錯欸。" },
      { narrate: "大家七嘴八舌地討論著。不知道是不是錯覺,宗岳的游標,若有似無地飄向我的頭像。" },
      { choice: [
        { text: "「好ㄚ我也要玩」",
          aff: { zongyue: 1, shiqian: -1, wenkai: -1, boquan: -1, hangcheng: -1 },
          jump: "e3a" },
        { text: "「不要 超無聊ㄉ」",
          aff: { zongyue: -1, shiqian: 1, wenkai: 1, boquan: 1, hangcheng: 1 },
          jump: "e3b" },
      ]},
    ],
    e3a: [
      { narrate: "(宗岳內心:……她說好?她會說好?——半年了,這是她第一次答應我提的東西。不對,這不算約。冷靜。)" },
      { say: "zongyue", sprite: "心動", text: "……喔。那,遊戲的錢我先幫妳出。之後再說。" },
      { narrate: "(語音那頭,某個人的心跳,好像小小地悸動了一下。)" },
      { jump: "event4" },
    ],
    e3b: [
      { narrate: "(宗岳內心:……果然。那妳到底來這個群幹嘛。妳到底,有什麼企圖。)" },
      { say: "zongyue", sprite: "皺眉", text: "隨便。反正也沒差。" },
      { narrate: "(他的聲音,比平常又冷了一度。)" },
      { jump: "event4" },
    ],

    /* ---------------- 共通劇情 4:柏全的律師心得 ---------------- */
    event4: [
      { hide: "all" },
      { bg: "dc" },
      { narrate: "週五晚上,柏全開了他的招牌節目「免費法律小教室」,分享今天開庭的心得,講得頭頭是道。" },
      { show: "boquan", pos: "center" },
      { say: "boquan", text: "——所以說,契約自由的邊界,就在這裡。以上,本日免費法律小教室,下庭。" },
      { show: "shiqian", pos: "left" },
      { say: "shiqian", text: "靠,居然聽得懂。可惡,有點帥。" },
      { narrate: "我盯著他的頭像看了三秒,突然開口——" },
      { choice: [
        { text: "「有個律師男友感覺很可靠ㄟ」",
          aff: { boquan: 1, shiqian: -1, wenkai: -1, hangcheng: -1, zongyue: -1 },
          jump: "e4a" },
        { text: "「是ㄛ ㄋ這樣交ㄉ到女朋友ㄇ?」",
          aff: { boquan: -1, shiqian: 1, wenkai: 1, hangcheng: 1, zongyue: 1 },
          jump: "e4b" },
      ]},
    ],
    e4a: [
      { narrate: "(柏全內心:———異議!!心跳過速,請求暫停審理。等等,她剛剛、說了什麼?)" },
      { say: "boquan", sprite: "當機", text: "……咳。本席——呃,我是說我,需要三十秒,整理一下思緒。" },
      { narrate: "(那個永遠對答如流的男人,執業以來第一次,當庭當機。)" },
      { jump: "event5" },
    ],
    e4b: [
      { narrate: "(柏全內心:……原來,在她眼裡我是這樣的形象。敗訴的感覺,大概就是現在這樣。)" },
      { say: "boquan", sprite: "苦笑", text: "……哈,好問題。本案,容我保留答辯。" },
      { narrate: "(他笑著接住了。但接得,明顯比平常慢了半拍。)" },
      { jump: "event5" },
    ],

    /* ---------------- 共通劇情 5:時千的牛仔穿搭 ---------------- */
    event5: [
      { hide: "all" },
      { bg: "dc" },
      { narrate: "週末下午,時千在群裡連發五張自拍——【本日牛仔穿搭特輯】,招牌五分褲當然是絕對主角。" },
      { show: "shiqian", pos: "center" },
      { say: "shiqian", text: "怎樣!這套叫「台客文藝復興」!評分區開放,講話!" },
      { narrate: "群裡已經有人開始已讀不回。他的期待,全部押在我身上了。" },
      { choice: [
        { text: "「好帥ㄛ... 我真ㄉ覺得ㄋ這樣穿很有男人味」",
          aff: { shiqian: 1, wenkai: -1, boquan: -1, hangcheng: -1, zongyue: -1 },
          jump: "e5a" },
        { text: "「很醜ㄟ 真ㄉ不好看ㄚ」",
          aff: { shiqian: -1, wenkai: 1, boquan: 1, hangcheng: 1, zongyue: 1 },
          jump: "e5b" },
      ]},
    ],
    e5a: [
      { narrate: "(時千內心:男人味!!!她說我有男人味!!!這套從今天起就是本命戰服,誰都不准洗,先裱框。)" },
      { say: "shiqian", sprite: "得意", text: "欸嘿~妳很懂喔!那下次網聚,我就穿這套出場!" },
      { narrate: "(螢幕這頭都感覺得到,他已經在房間裡原地轉圈了。)" },
      { jump: "nextDay" },
    ],
    e5b: [
      { narrate: "(時千內心:很醜……嚕卡覺得我很醜嗎……可是,這件褲子陪我三年了欸……)" },
      { say: "shiqian", sprite: "受傷", text: "……好、好喔,參考參考。(小聲)明明就很好看啊……" },
      { narrate: "(一個台男的心,和他的五分褲一起,靜靜地碎在了語音頻道裡。)" },
      { jump: "nextDay" },
    ],

    /* ---------------- 網聚前夜 → 路線分歧 ---------------- */
    nextDay: [
      { hide: "all" },
      { bg: "dc" },
      { narrate: "幾天後的中午,群公告跳了出來。" },
      { show: "boquan", pos: "center" },
      { say: "boquan", text: "【公告】本週六,實體網聚。餐廳已訂,無故缺席者,視同放棄抗辯。" },
      { show: "shiqian", pos: "left" },
      { say: "shiqian", text: "律師揪團跟寄傳票一樣欸。嚕卡,妳一定要來喔!" },
      { hide: "all" },
      { narrate: "週六……總覺得,會發生什麼。腦海裡,浮現了一張臉——或者,好幾張臉。" },
      { jump: "routeGate" },
    ],

    routeGate: [
      // 全員好感度差距小 → 後宮結局;否則進最高者路線(最高分並列也走後宮)
      { if: { affGap: ["<=", 1] }, jump: "haremEnd" },
      { branchTopAff: {
        shiqian: "shiqianRoute",
        wenkai: "wenkaiRoute",
        boquan: "boquanRoute",
        hangcheng: "hangchengRoute",
        zongyue: "zongyueRoute",
        _default: "haremEnd",
      }},
    ],

    /* ---------------- 後宮結局(劇情待 Jordan 提供,先放暫定版) ---------------- */
    haremEnd: [
      { hide: "all" },
      { bg: "cafe" },
      { narrate: "網聚當天。不知道為什麼,五個人不約而同地,全部坐到了我旁邊的位置。" },
      { narrate: "時千搶著幫我倒水,文凱默默把我愛吃的推過來,柏全開始陳述座位的法律效力,航程視訊掛在桌邊,宗岳假裝在滑手機——耳朵是紅的。" },
      { narrate: "(——這個結局的完整劇情,製作中。敬請期待。)" },
      { ending: "後宮 · 全員集合END(暫定)", desc: "五人好感度不分上下時的結局。完整劇情製作中。" },
    ],

    /* ---------------- 時千線 ---------------- */
    shiqianRoute: [
      { bg: "cafe" },
      { narrate: "網聚當天。時千果然穿著他的招牌五分牛仔褲出現,整桌最吵的就是他。" },
      { show: "shiqian", pos: "center" },
      { say: "shiqian", text: "怎樣,本人比語音帥吧?這件褲子是戰服,重要場合限定。" },
      { say: "ruka", text: "所以ㄋ把網聚當重要場合?" },
      { say: "shiqian", text: "……被抓到。" },
      { bg: "street" },
      { narrate: "散場後,他說要陪我等公車。夜風把路邊的招牌吹得嘎嘎響。" },
      { say: "shiqian", text: "欸不是,我跟妳講認真的。妳聽好,不要笑。" },
      { say: "shiqian", text: "我知道群裡每個人都不錯。可是「一手陪伴」,講的從來不只是上線陪打。" },
      { say: "shiqian", text: "我暈了。暈得很徹底。妳上線我就上線,妳難過我就出現——之後,也想一直這樣。可以嗎?" },
      { choice: [
        { text: "「可以ㄚ。其實我也……注意ㄋ很久ㄌ。」" },
        { text: "「……那,先從每天ㄉ十分鐘開始?」" },
      ]},
      { say: "shiqian", text: "好——!那從今天起,換我當妳的本命位。公車來了也不准趕我走!" },
      { ending: "時千 · 一手陪伴END", desc: "從此以後,深夜的語音頻道裡,永遠有一個位子為妳而留。(問答版好/壞結局製作中)" },
    ],

    /* ---------------- 文凱線 ---------------- */
    wenkaiRoute: [
      { bg: "cafe" },
      { narrate: "網聚當天,文凱全程坐在角落,話不多,但我每次抬頭,都剛好對上他快速移開的視線。" },
      { bg: "street" },
      { narrate: "散場後,他在巷口叫住了我。瘦瘦的影子被路燈拉得好長。" },
      { show: "wenkai", pos: "center" },
      { say: "wenkai", text: "那個……我可以,問最後一個問題嗎。妳跟時千、跟柏全……到底、是怎樣的關係……" },
      { say: "ruka", text: "ㄋ觀察我多久ㄌ?" },
      { say: "wenkai", text: "……從妳進群的第三天。啊、不是,我不是變態,我只是——" },
      { narrate: "(他慌張地揮手,差點打翻自己的眼鏡。)" },
      { say: "wenkai", text: "我只是,第一次覺得……螢幕另一邊的人,比新番還重要。所以才一直,忍不住去看。" },
      { choice: [
        { text: "「那ㄋ要不要把『觀察』,改成正式研究?」" },
        { text: "「先加LINE。研究計畫書,之後補交。」" },
      ]},
      { say: "wenkai", text: "!!……我、我會排進度表的!週報、月報都可以交!" },
      { ending: "文凱 · 觀察對象END", desc: "他的觀察日記翻到了新的一頁,標題只有兩個字:嚕卡。(問答版好/壞結局製作中)" },
    ],

    /* ---------------- 柏全線 ---------------- */
    boquanRoute: [
      { bg: "cafe" },
      { narrate: "網聚隔天,柏全單獨約了我。他說,這叫「開庭」。" },
      { show: "boquan", pos: "center" },
      { say: "boquan", text: "本案案由:失言。被告柏全,當庭認罪,不主張任何阻卻事由。" },
      { say: "ruka", text: "ㄋ那句話,我冷處理ㄌㄋ三個禮拜。ㄋ知道ㄅ。" },
      { say: "boquan", text: "知道。每一天都知道。所以今天不辯護——只求和解。" },
      { say: "boquan", text: "和解條件如下:往後我說的每一句話,妳都是唯一優先的聽眾;失言條款,終身有效,違者任妳處置。" },
      { narrate: "(帥是真的帥,嘴也是真的會講。可惡。)" },
      { say: "boquan", text: "另外,容我補充一句庭外意見——認識妳之後的每一天,我都很喜歡事情的發展。" },
      { choice: [
        { text: "「和解可以。緩刑觀察一個月。」" },
        { text: "「駁回。……但,准許保釋。」" },
      ]},
      { say: "boquan", text: "成交。本席宣布:當庭釋放——並自願被妳,無限期羈押。" },
      { ending: "柏全 · 和解成立END", desc: "那位最會說話的律師,從此把結辯的對象,換成了妳一個人。(問答版好/壞結局製作中)" },
    ],

    /* ---------------- 航程線 ---------------- */
    hangchengRoute: [
      { bg: "room" },
      { narrate: "網聚那天,航程人在廈門,只能掛在視訊裡被大家輪流調戲。散場後的深夜,他的通話請求亮了起來。" },
      { show: "hangcheng", pos: "center" },
      { say: "hangcheng", text: "妳怎麼還沒睡。" },
      { say: "ruka", text: "ㄋ不也是。廈門又下雨ㄌ?" },
      { say: "hangcheng", text: "嗯。……嚕卡,我跟妳說實話。之前那段感情,把我傷得挺深的。深到我跟自己說,不要再來一次了。" },
      { say: "hangcheng", text: "群裡那些外號、那些傳聞,隨他們講。反正心關起來,就不會再痛第二次。" },
      { say: "ruka", text: "我沒有要ㄋ現在談ㄚ。" },
      { say: "ruka", text: "先這樣就好——隔著一個海峽,每天講講話。ㄋ想通ㄌ再說,我不催。" },
      { say: "hangcheng", text: "……妳這個人,真的很奇怪。" },
      { say: "hangcheng", text: "好。就先這樣。哪天我真的想通了——第一個,講給妳聽。" },
      { choice: [
        { text: "「一言為定。」" },
        { text: "「那我先睡ㄌ。明天ㄉ通話,不准遲到。」" },
      ]},
      { say: "hangcheng", text: "嗯。……晚安,嚕卡。今天的雨,好像沒那麼吵了。" },
      { ending: "航程 · 隔海未滿END", desc: "還不是戀人。但那扇關了很久的門,為妳留了一條縫,和一盞燈。(問答版好/壞結局製作中)" },
    ],

    /* ---------------- 宗岳線 ---------------- */
    zongyueRoute: [
      { bg: "street" },
      { narrate: "網聚散場。人群散去之後,剩下我,和「剛好順路」的宗岳。他強調了三次,順路。" },
      { show: "zongyue", pos: "center", sprite: "皺眉" },
      { say: "zongyue", text: "……妳到底想幹嘛。" },
      { say: "ruka", text: "什麼意思?" },
      { say: "zongyue", text: "跑來我朋友的群,跟他們一個一個聊得那麼開心。時千、柏全……連航程都對妳另眼相看。" },
      { say: "ruka", text: "所以ㄋ在不爽什麼?" },
      { say: "zongyue", text: "我沒有。" },
      { narrate: "(又來了。半年前我們就是這樣——誰也不把話說開,然後越走越遠。)" },
      { jump: "zongyueTrue" },  // 問答版實裝前,先固定走好結局(zongyueBad 保留待問答版使用)
    ],

    zongyueTrue: [
      { say: "zongyue", text: "……算了。" },
      { say: "zongyue", sprite: "彆扭", text: "其實那個時候,我也喜歡過妳。那些摩擦,後來想想,全都是小事。" },
      { say: "zongyue", text: "只是看妳在群裡跟大家笑成那樣……我才發現,我根本沒放下。" },
      { say: "ruka", text: "ㄋ這個人,真ㄉ很彆扭ㄟ。" },
      { say: "zongyue", text: "嗯,我知道。……所以這一次,換我先把話說開。嚕卡,重新來過,可以嗎?" },
      { narrate: "路燈下,那個最冷的人,耳朵紅得藏不住。" },
      { ending: "宗岳 · 破鏡重圓TRUE END", desc: "最難攻略的男人,把最軟的一句話,留給了妳。(問答版好/壞結局製作中)" },
    ],

    zongyueBad: [
      { say: "zongyue", text: "……沒事。到了,我走這邊。" },
      { narrate: "話,又一次停在喉嚨裡。他的背影消失在巷口,和半年前那天,一模一樣。" },
      { narrate: "(我們大概……還需要一點時間。或者,需要我更認真一點。)" },
      { ending: "宗岳 · 最熟悉的陌生人END", desc: "(此結局將改為問答版壞結局)" },
    ],
  },
};
