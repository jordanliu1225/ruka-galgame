/* ============================================================
   《嚕卡的DC戀愛攻略》劇情腳本
   主角:嚕卡(玩家視角,女主角)
   可攻略:時千 / 文凱 / 柏全 / 航程 / 宗岳
   好感度設計:
     序章宗岳 +1(舊情殘留)
     共通線三次選擇:C1 +1、C2 +1、C3(深夜私訊)+2
     路線分歧:好感度最高者;同分或皆 0 → 五缺一END
     宗岳線門檻:好感度 >= 4 才有 TRUE END(最難攻略)
   立繪/背景目前為佔位圖,素材到位後填 sprites / img 路徑即可。
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
    /* ---------------- 序章 ---------------- */
    start: [
      { bg: "room" },
      { narrate: "凌晨十二點半。打完最後一場排位,我盯著天花板,睡意全無。" },
      { say: "ruka", text: "自我介紹一下。我叫嚕卡,興趣是打遊戲、看戲——然後一不小心,把自己的人生也活成了一部戲。" },
      { narrate: "故事,要從半年前說起。" },
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
      { aff: { zongyue: 1 } },
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
      { say: "ruka", text: "路過。聽說你們缺一個會玩的,剛好,我很會。" },
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
      { narrate: "就這樣,我在這個吵吵鬧鬧的語音頻道住了下來。第一個晚上——" },
      { choice: [
        { text: "接了時千的宵夜文(附五分牛仔褲自拍)", jump: "c1_shiqian",   aff: { shiqian: 1 } },
        { text: "接了文凱突然丟出的貓咪梗圖",           jump: "c1_wenkai",    aff: { wenkai: 1 } },
        { text: "接了柏全的《本週敗訴心得》長文",       jump: "c1_boquan",    aff: { boquan: 1 } },
        { text: "接了航程半夜丟出來的一首老歌",         jump: "c1_hangcheng", aff: { hangcheng: 1 } },
        { text: "接了宗岳難得的一句「妳還沒睡?」",     jump: "c1_zongyue",   aff: { zongyue: 1 } },
      ]},
    ],

    c1_shiqian: [
      { show: "shiqian", pos: "center" },
      { say: "shiqian", text: "妳懂欣賞喔!這件五分牛仔褲,耐穿、透氣、蹲下去不卡,台男的浪漫懂嗎。" },
      { say: "ruka", text: "浪漫在哪,我只看到膝蓋。" },
      { say: "shiqian", text: "哈哈哈哈,先加個好友啦。以後排位,妳的補位我包了。" },
      { jump: "gameNight" },
    ],
    c1_wenkai: [
      { show: "wenkai", pos: "center" },
      { say: "wenkai", text: "那個……這隻貓,很像妳今天超鬼的那波操作。……不好笑嗎,對不起。" },
      { say: "ruka", text: "很好笑啊,我存起來了。" },
      { say: "wenkai", text: "!……(已上線)(正在輸入……)(已離線)" },
      { narrate: "(他是當機了嗎。)" },
      { jump: "gameNight" },
    ],
    c1_boquan: [
      { show: "boquan", pos: "center" },
      { say: "boquan", text: "喔?妳終於肯理我了。本席深感欣慰。" },
      { say: "ruka", text: "我是在跟大家聊天,你不要自作多情。" },
      { say: "boquan", text: "了解,那我收回欣慰,保留感動。……我很喜歡目前事情的發展。" },
      { narrate: "(這個人,冷處理三個禮拜好像還不夠。)" },
      { jump: "gameNight" },
    ],
    c1_hangcheng: [
      { show: "hangcheng", pos: "center" },
      { say: "hangcheng", text: "這首歌,廈門這邊下雨的時候聽,剛好。" },
      { say: "ruka", text: "你那邊常下雨?" },
      { say: "hangcheng", text: "常。習慣了。……妳居然會回我,大部分人看到我都繞道。" },
      { narrate: "(繞道?為什麼?……算了,以後再問。)" },
      { jump: "gameNight" },
    ],
    c1_zongyue: [
      { show: "zongyue", pos: "center" },
      { say: "ruka", text: "還沒睡啊。你不是都很早睡?" },
      { say: "zongyue", text: "……今天例外。妳跟他們聊就好,幹嘛突然回我。" },
      { say: "ruka", text: "你先傳的欸。" },
      { say: "zongyue", text: "…………睡了。晚安。" },
      { narrate: "(嘴硬。但半年來,這是他第一次主動傳訊息給我。)" },
      { jump: "gameNight" },
    ],

    /* ---------------- 共通線:開團之夜 ---------------- */
    gameNight: [
      { bg: "game" },
      { hide: "all" },
      { narrate: "之後的每個晚上,我幾乎都掛在群裡。開團、輸了互嘴、贏了鬼叫,快樂得很沒營養。" },
      { show: "shiqian", pos: "left" },
      { say: "shiqian", text: "嚕卡上線啦!來來來,位子讓妳,我去坐冷板凳,沒關係,習慣了(並沒有)。" },
      { show: "wenkai", pos: "center" },
      { say: "wenkai", text: "(小聲)……她跟時千,最近好像,越來越熟了……" },
      { show: "boquan", pos: "right" },
      { say: "boquan", text: "各位,開打之前容我陳述一句:我,很喜歡目前事情的發展。" },
      { show: "zongyue", pos: "center", sprite: "皺眉" },
      { say: "zongyue", text: "你那句話今天講第三次了。打就打。" },
      { narrate: "殘局。隊友全倒,只剩我——和最後一個還活著的隊友。" },
      { choice: [
        { text: "衝過去救時千(他在賣慘討救援)",       aff: { shiqian: 1 } },
        { text: "衝過去救文凱(他小聲說了句救我)",     aff: { wenkai: 1 } },
        { text: "衝過去救柏全(他說要跟死神辯論)",     aff: { boquan: 1 } },
        { text: "衝過去救航程(他說別管我,快跑)",     aff: { hangcheng: 1 } },
        { text: "衝過去救宗岳(他什麼都沒說)",         aff: { zongyue: 1 } },
      ]},
      { narrate: "……結果雙雙陣亡。但語音裡笑到有人打翻飲料。這波,值。" },
      { hide: "all" },
      { narrate: "凌晨三點,下線。手機的通知,亮了起來——" },
      { choice: [
        { text: "回時千:「睡了沒?再陪妳聊十分鐘」",           jump: "c3_shiqian",   aff: { shiqian: 2 } },
        { text: "回文凱:「妳跟時千……很熟嗎(收回訊息)」",     jump: "c3_wenkai",    aff: { wenkai: 2 } },
        { text: "回柏全:「本席申請單獨通話,案由:失言」",     jump: "c3_boquan",    aff: { boquan: 2 } },
        { text: "回航程:「廈門在下雨。就是想找個人說話」",     jump: "c3_hangcheng", aff: { hangcheng: 2 } },
        { text: "回宗岳:「……妳今天玩得很開心?」",             jump: "c3_zongyue",   aff: { zongyue: 2 } },
      ]},
    ],

    c3_shiqian: [
      { bg: "room" },
      { show: "shiqian", pos: "center" },
      { say: "shiqian", text: "就十分鐘,講好了喔。超過我自己罰半蹲。" },
      { say: "ruka", text: "你每次都說十分鐘,結果都聊到四點。" },
      { say: "shiqian", text: "欸不是,那是因為妳話多……好啦,是我捨不得下線。半蹲我認了。" },
      { narrate: "(螢幕這頭的我,嘴角好像有一點點失守。)" },
      { jump: "nextDay" },
    ],
    c3_wenkai: [
      { bg: "room" },
      { show: "wenkai", pos: "center" },
      { say: "wenkai", text: "那個……妳跟時千,很熟嗎。啊、我沒有別的意思,只是做個,紀錄……" },
      { say: "ruka", text: "紀錄?你在寫觀察日記喔?" },
      { say: "wenkai", text: "……對不起。(已收回訊息)(已收回訊息)(已收回訊息)" },
      { narrate: "(收回之前我全都看到了。這個人,意外地有點可愛。)" },
      { jump: "nextDay" },
    ],
    c3_boquan: [
      { bg: "room" },
      { show: "boquan", pos: "center" },
      { say: "boquan", text: "本席請求發言。關於三週前的失言——" },
      { say: "ruka", text: "駁回。書面陳述,五十字以內。" },
      { say: "boquan", text: "「我錯了,而且錯得毫無辯護空間。請求一個重新開庭的機會。」——四十二字,含標點。" },
      { narrate: "(……哼。算他有誠意。冷處理,考慮解除觀察。)" },
      { jump: "nextDay" },
    ],
    c3_hangcheng: [
      { bg: "room" },
      { show: "hangcheng", pos: "center" },
      { say: "hangcheng", text: "失眠,老毛病。……欸,妳說,一個說好不再談感情的人,大半夜傳訊息給一個女生,算什麼?" },
      { say: "ruka", text: "算三分球出手。進不進,再說。" },
      { say: "hangcheng", text: "哈。……好久沒有人敢這樣接我的話了。晚安,嚕卡。" },
      { jump: "nextDay" },
    ],
    c3_zongyue: [
      { bg: "room" },
      { show: "zongyue", pos: "center" },
      { say: "ruka", text: "開心啊。不行喔?" },
      { say: "zongyue", text: "沒有不行。……早點睡。" },
      { narrate: "(三句話,句句是句點。)" },
      { narrate: "(可是半年了——這是他第一次,在深夜先找我說話。)" },
      { jump: "nextDay" },
    ],

    /* ---------------- 網聚前夜 ---------------- */
    nextDay: [
      { bg: "dc" },
      { hide: "all" },
      { narrate: "隔天中午,群公告跳了出來。" },
      { show: "boquan", pos: "center" },
      { say: "boquan", text: "【公告】本週六,實體網聚。餐廳已訂,無故缺席者,視同放棄抗辯。" },
      { show: "shiqian", pos: "left" },
      { say: "shiqian", text: "律師揪團跟寄傳票一樣欸。嚕卡,妳一定要來喔!" },
      { hide: "all" },
      { narrate: "週六……總覺得,會發生什麼。腦海裡,浮現了一張臉。" },
      { jump: "routeGate" },
    ],

    routeGate: [
      { branchTopAff: {
        shiqian: "shiqianRoute",
        wenkai: "wenkaiRoute",
        boquan: "boquanRoute",
        hangcheng: "hangchengRoute",
        zongyue: "zongyueRoute",
        _default: "normalEnd",
      }},
    ],

    /* ---------------- 時千線 ---------------- */
    shiqianRoute: [
      { bg: "cafe" },
      { narrate: "網聚當天。時千果然穿著他的招牌五分牛仔褲出現,整桌最吵的就是他。" },
      { show: "shiqian", pos: "center" },
      { say: "shiqian", text: "怎樣,本人比語音帥吧?這件褲子是戰服,重要場合限定。" },
      { say: "ruka", text: "所以你把網聚當重要場合?" },
      { say: "shiqian", text: "……被抓到。" },
      { bg: "street" },
      { narrate: "散場後,他說要陪我等公車。夜風把路邊的招牌吹得嘎嘎響。" },
      { say: "shiqian", text: "欸不是,我跟妳講認真的。妳聽好,不要笑。" },
      { say: "shiqian", text: "我知道群裡每個人都不錯。可是「一手陪伴」,講的從來不只是上線陪打。" },
      { say: "shiqian", text: "我暈了。暈得很徹底。妳上線我就上線,妳難過我就出現——之後,也想一直這樣。可以嗎?" },
      { choice: [
        { text: "「可以啊。其實我也……注意你很久了。」" },
        { text: "「……那,先從每天的十分鐘開始?」" },
      ]},
      { say: "shiqian", text: "好——!那從今天起,換我當妳的本命位。公車來了也不准趕我走!" },
      { ending: "時千 · 一手陪伴END", desc: "從此以後,深夜的語音頻道裡,永遠有一個位子為妳而留。" },
    ],

    /* ---------------- 文凱線 ---------------- */
    wenkaiRoute: [
      { bg: "cafe" },
      { narrate: "網聚當天,文凱全程坐在角落,話不多,但我每次抬頭,都剛好對上他快速移開的視線。" },
      { bg: "street" },
      { narrate: "散場後,他在巷口叫住了我。瘦瘦的影子被路燈拉得好長。" },
      { show: "wenkai", pos: "center" },
      { say: "wenkai", text: "那個……我可以,問最後一個問題嗎。妳跟時千、跟柏全……到底、是怎樣的關係……" },
      { say: "ruka", text: "你觀察我多久了?" },
      { say: "wenkai", text: "……從妳進群的第三天。啊、不是,我不是變態,我只是——" },
      { narrate: "(他慌張地揮手,差點打翻自己的眼鏡。)" },
      { say: "wenkai", text: "我只是,第一次覺得……螢幕另一邊的人,比新番還重要。所以才一直,忍不住去看。" },
      { choice: [
        { text: "「那你要不要把『觀察』,改成正式研究?」" },
        { text: "「先加LINE。研究計畫書,之後補交。」" },
      ]},
      { say: "wenkai", text: "!!……我、我會排進度表的!週報、月報都可以交!" },
      { ending: "文凱 · 觀察對象END", desc: "他的觀察日記翻到了新的一頁,標題只有兩個字:嚕卡。" },
    ],

    /* ---------------- 柏全線 ---------------- */
    boquanRoute: [
      { bg: "cafe" },
      { narrate: "網聚隔天,柏全單獨約了我。他說,這叫「開庭」。" },
      { show: "boquan", pos: "center" },
      { say: "boquan", text: "本案案由:失言。被告柏全,當庭認罪,不主張任何阻卻事由。" },
      { say: "ruka", text: "你那句話,我冷處理了你三個禮拜。你知道吧。" },
      { say: "boquan", text: "知道。每一天都知道。所以今天不辯護——只求和解。" },
      { say: "boquan", text: "和解條件如下:往後我說的每一句話,妳都是唯一優先的聽眾;失言條款,終身有效,違者任妳處置。" },
      { narrate: "(帥是真的帥,嘴也是真的會講。可惡。)" },
      { say: "boquan", text: "另外,容我補充一句庭外意見——認識妳之後的每一天,我都很喜歡事情的發展。" },
      { choice: [
        { text: "「和解可以。緩刑觀察一個月。」" },
        { text: "「駁回。……但,准許保釋。」" },
      ]},
      { say: "boquan", text: "成交。本席宣布:當庭釋放——並自願被妳,無限期羈押。" },
      { ending: "柏全 · 和解成立END", desc: "那位最會說話的律師,從此把結辯的對象,換成了妳一個人。" },
    ],

    /* ---------------- 航程線 ---------------- */
    hangchengRoute: [
      { bg: "room" },
      { narrate: "網聚那天,航程人在廈門,只能掛在視訊裡被大家輪流調戲。散場後的深夜,他的通話請求亮了起來。" },
      { show: "hangcheng", pos: "center" },
      { say: "hangcheng", text: "妳怎麼還沒睡。" },
      { say: "ruka", text: "你不也是。廈門又下雨了?" },
      { say: "hangcheng", text: "嗯。……嚕卡,我跟妳說實話。之前那段感情,把我傷得挺深的。深到我跟自己說,不要再來一次了。" },
      { say: "hangcheng", text: "群裡那些外號、那些傳聞,隨他們講。反正心關起來,就不會再痛第二次。" },
      { say: "ruka", text: "我沒有要你現在談啊。" },
      { say: "ruka", text: "先這樣就好——隔著一個海峽,每天講講話。你想通了再說,我不催。" },
      { say: "hangcheng", text: "……妳這個人,真的很奇怪。" },
      { say: "hangcheng", text: "好。就先這樣。哪天我真的想通了——第一個,講給妳聽。" },
      { choice: [
        { text: "「一言為定。」" },
        { text: "「那我先睡了。明天的通話,不准遲到。」" },
      ]},
      { say: "hangcheng", text: "嗯。……晚安,嚕卡。今天的雨,好像沒那麼吵了。" },
      { ending: "航程 · 隔海未滿END", desc: "還不是戀人。但那扇關了很久的門,為妳留了一條縫,和一盞燈。" },
    ],

    /* ---------------- 宗岳線(最難) ---------------- */
    zongyueRoute: [
      { bg: "street" },
      { narrate: "網聚散場。人群散去之後,剩下我,和「剛好順路」的宗岳。他強調了三次,順路。" },
      { show: "zongyue", pos: "center", sprite: "皺眉" },
      { say: "zongyue", text: "……妳到底想幹嘛。" },
      { say: "ruka", text: "什麼意思?" },
      { say: "zongyue", text: "跑來我朋友的群,跟他們一個一個聊得那麼開心。時千、柏全……連航程都對妳另眼相看。" },
      { say: "ruka", text: "所以你在不爽什麼?" },
      { say: "zongyue", text: "我沒有。" },
      { narrate: "(又來了。半年前我們就是這樣——誰也不把話說開,然後越走越遠。)" },
      { if: { aff: ["zongyue", ">=", 4] }, jump: "zongyueTrue" },
      { jump: "zongyueBad" },
    ],

    zongyueTrue: [
      { say: "zongyue", text: "……算了。" },
      { say: "zongyue", sprite: "彆扭", text: "其實那個時候,我也喜歡過妳。那些摩擦,後來想想,全都是小事。" },
      { say: "zongyue", text: "只是看妳在群裡跟大家笑成那樣……我才發現,我根本沒放下。" },
      { say: "ruka", text: "你這個人,真的很彆扭欸。" },
      { say: "zongyue", text: "嗯,我知道。……所以這一次,換我先把話說開。嚕卡,重新來過,可以嗎?" },
      { narrate: "路燈下,那個最冷的人,耳朵紅得藏不住。" },
      { ending: "宗岳 · 破鏡重圓TRUE END", desc: "最難攻略的男人,把最軟的一句話,留給了妳。" },
    ],

    zongyueBad: [
      { say: "zongyue", text: "……沒事。到了,我走這邊。" },
      { narrate: "話,又一次停在喉嚨裡。他的背影消失在巷口,和半年前那天,一模一樣。" },
      { narrate: "(我們大概……還需要一點時間。或者,需要我更認真一點。)" },
      { ending: "宗岳 · 最熟悉的陌生人END", desc: "宗岳好感度不足(需要 4 以上)。提示:那則深夜私訊是關鍵,平常也要多靠近他一點。" },
    ],

    /* ---------------- 普通結局 ---------------- */
    normalEnd: [
      { bg: "dc" },
      { hide: "all" },
      { narrate: "週六的網聚,大家吃吃喝喝、互相爆料,誰也沒有特別靠近誰。" },
      { narrate: "回家路上我想,也許這樣就很好——五缺一的時候,永遠有人第一個喊我的名字。" },
      { narrate: "(戀愛什麼的……下一個賽季再說吧。)" },
      { ending: "日常 · 五缺一END", desc: "沒有人的好感度特別突出。故事回到熱鬧的語音頻道,等待下一次心動。" },
    ],
  },
};
