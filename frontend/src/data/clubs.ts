// 保留 2026-10-23 官網分類名單，另依官方介紹補入 USR資訊服務社；不代表目前招生狀態。
// category 保留官方分類；displayCategory 為本站導覽分類，不宣稱是官方分類。
// 特色為官方文字的摘要改寫；空活動陣列代表待補充，不推測現行活動或招生狀態。
// 無人機特色依使用者指定文案，另標示 project，並非官方文字佐證。
export const clubsReviewedAt = '2026-10-23';
export const clubsIndexUrl = 'https://sad.aeust.edu.tw/p/412-1073-4864.php';
export const clubCategories = ['系學會', '運動性', '服務性', '技術性', '其他社團'] as const;
export type ClubCategory = typeof clubCategories[number];
export interface Club {
  name: string;
  category: string;
  displayCategory: ClubCategory;
  feature: string;
  activities: string[];
  sourceUrl: string;
  categorySourceUrl: string;
  verificationNotes: string[];
  featureSource: 'official' | 'project' | 'pending';
}
export const clubs: Club[] = [
  {
    "name": "材織系學會",
    "category": "自治性組織",
    "feature": "想知道加入後能體驗什麼？特色資料待補充，官方介紹頁尚缺可核對的文字，先從來源連結認識社團。",
    "activities": [],
    "sourceUrl": "https://sad.aeust.edu.tw/p/450-1073-37139,c0.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4865.php",
    "featureSource": "pending",
    "displayCategory": "系學會",
    "verificationNotes": [
      "特色待確認：官方介紹頁缺少可核對文字，尚不能確認可體驗內容。",
      "活動待確認：官方介紹頁尚無可核對的活動文字。"
    ]
  },
  {
    "name": "機械系學會",
    "category": "自治性組織",
    "feature": "想知道加入後能體驗什麼？特色資料待補充，官方介紹頁尚缺可核對的文字，先從來源連結認識社團。",
    "activities": [],
    "sourceUrl": "https://sad.aeust.edu.tw/p/450-1073-37148,c0.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4865.php",
    "featureSource": "pending",
    "displayCategory": "系學會",
    "verificationNotes": [
      "特色待確認：官方介紹頁缺少可核對文字，尚不能確認可體驗內容。",
      "活動待確認：官方介紹頁尚無可核對的活動文字。"
    ]
  },
  {
    "name": "電機系學會",
    "category": "自治性組織",
    "feature": "想知道加入後能體驗什麼？特色資料待補充，官方介紹頁尚缺可核對的文字，先從來源連結認識社團。",
    "activities": [],
    "sourceUrl": "https://sad.aeust.edu.tw/p/450-1073-37140,c0.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4865.php",
    "featureSource": "pending",
    "displayCategory": "系學會",
    "verificationNotes": [
      "特色待確認：官方介紹頁缺少可核對文字，尚不能確認可體驗內容。",
      "活動待確認：官方介紹頁尚無可核對的活動文字。"
    ]
  },
  {
    "name": "電子系學會",
    "category": "自治性組織",
    "feature": "想知道加入後能體驗什麼？特色資料待補充，官方介紹頁尚缺可核對的文字，先從來源連結認識社團。",
    "activities": [],
    "sourceUrl": "https://sad.aeust.edu.tw/p/450-1073-37141,c0.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4865.php",
    "featureSource": "pending",
    "displayCategory": "系學會",
    "verificationNotes": [
      "特色待確認：官方介紹頁缺少可核對文字，尚不能確認可體驗內容。",
      "活動待確認：官方介紹頁尚無可核對的活動文字。"
    ]
  },
  {
    "name": "工管系學會",
    "category": "自治性組織",
    "feature": "一起參與系上事務，透過與學校溝通，幫同學處理疑問，也在活動中認識彼此。",
    "activities": [
      "迎新活動",
      "聖誕節活動週"
    ],
    "sourceUrl": "https://sad.aeust.edu.tw/p/450-1073-37142,c0.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4865.php",
    "featureSource": "official",
    "displayCategory": "系學會",
    "verificationNotes": []
  },
  {
    "name": "設計系學會",
    "category": "自治性組織",
    "feature": "想知道加入後能體驗什麼？特色資料待補充，官方介紹頁尚缺可核對的文字，先從來源連結認識社團。",
    "activities": [],
    "sourceUrl": "https://sad.aeust.edu.tw/p/450-1073-37143,c0.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4865.php",
    "featureSource": "pending",
    "displayCategory": "系學會",
    "verificationNotes": [
      "特色待確認：官方介紹頁缺少可核對文字，尚不能確認可體驗內容。",
      "活動待確認：官方介紹頁尚無可核對的活動文字。"
    ]
  },
  {
    "name": "護理系學會",
    "category": "自治性組織",
    "feature": "和系上夥伴互相幫忙，一起參與捐血、護師節與校慶活動，累積課堂外的共同回憶。",
    "activities": [
      "捐血活動",
      "小食代",
      "護師節",
      "加冠典禮",
      "校慶啦啦隊"
    ],
    "sourceUrl": "https://sad.aeust.edu.tw/p/450-1073-37144,c0.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4865.php",
    "featureSource": "official",
    "displayCategory": "系學會",
    "verificationNotes": []
  },
  {
    "name": "資管系學會",
    "category": "自治性組織",
    "feature": "和系上夥伴建立像家人般的連結，一起參與官方介紹中的寒假優先區活動。",
    "activities": [
      "寒假優先區活動"
    ],
    "sourceUrl": "https://sad.aeust.edu.tw/p/450-1073-37145,c0.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4865.php",
    "featureSource": "official",
    "displayCategory": "系學會",
    "verificationNotes": []
  },
  {
    "name": "醫管系學會",
    "category": "自治性組織",
    "feature": "在迎新和家聚活動中認識系上同學，也能透過研習營和夥伴一起接觸專業知識。",
    "activities": [
      "跨系迎新",
      "寒暑假優先區活動",
      "系上家聚",
      "研習營"
    ],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-37146,c4865.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4865.php",
    "featureSource": "official",
    "displayCategory": "系學會",
    "verificationNotes": []
  },
  {
    "name": "行銷系學會",
    "category": "自治性組織",
    "feature": "把課堂學到的管理帶進系上活動，和師生交流，也一起參與學生自治與權益事務。",
    "activities": [
      "越來越愛尼",
      "聖誕餐會",
      "小行運動會"
    ],
    "sourceUrl": "https://sad.aeust.edu.tw/p/450-1073-37147,c0.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4865.php",
    "featureSource": "official",
    "displayCategory": "系學會",
    "verificationNotes": []
  },
  {
    "name": "通訊系學會",
    "category": "自治性組織",
    "feature": "想知道加入後能體驗什麼？特色資料待補充，官方介紹頁尚缺可核對的文字，先從來源連結認識社團。",
    "activities": [],
    "sourceUrl": "https://sad.aeust.edu.tw/p/450-1073-37099,c0.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4865.php",
    "featureSource": "pending",
    "displayCategory": "系學會",
    "verificationNotes": [
      "特色待確認：官方介紹頁缺少可核對文字，尚不能確認可體驗內容。",
      "活動待確認：官方介紹頁尚無可核對的活動文字。"
    ]
  },
  {
    "name": "嘻哈研究社",
    "category": "康樂性社團",
    "feature": "一起拆解喜歡的歌曲、試著寫詞和唱饒舌，還能找夥伴合作做歌、玩 Freestyle。",
    "activities": [
      "成果發表 cypher 饒舌接力"
    ],
    "sourceUrl": "https://sad.aeust.edu.tw/p/450-1073-44628,c0.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4866.php",
    "featureSource": "official",
    "displayCategory": "其他社團",
    "verificationNotes": []
  },
  {
    "name": "熱音社",
    "category": "康樂性社團",
    "feature": "想知道加入後能體驗什麼？特色資料待補充，官方介紹頁尚缺可核對的文字，先從來源連結認識社團。",
    "activities": [],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-37122,c4866.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4866.php",
    "featureSource": "pending",
    "displayCategory": "其他社團",
    "verificationNotes": [
      "特色待確認：官方介紹頁缺少可核對文字，尚不能確認可體驗內容。",
      "活動待確認：官方介紹頁尚無可核對的活動文字。"
    ]
  },
  {
    "name": "宮羽國樂社",
    "category": "康樂性社團",
    "feature": "接觸二胡、古箏與中國笛等國樂器，在教學與演奏中找到喜歡的聲音。",
    "activities": [
      "國樂器教學",
      "國樂演奏"
    ],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-37121,c4866.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4866.php",
    "featureSource": "official",
    "displayCategory": "其他社團",
    "verificationNotes": []
  },
  {
    "name": "吉他社",
    "category": "康樂性社團",
    "feature": "找夥伴自由組團，練習彈唱喜歡的歌，從一起練習到站上舞台，慢慢培養默契。",
    "activities": [
      "經典曲目彈奏",
      "流行歌曲彈唱"
    ],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-37116,c4866.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4866.php",
    "featureSource": "official",
    "displayCategory": "其他社團",
    "verificationNotes": []
  },
  {
    "name": "熱舞社",
    "category": "康樂性社團",
    "feature": "和喜歡跳舞的人一起練 HipHop、Jazz，從律動到成果展演，找到屬於自己的舞感。",
    "activities": [
      "迎新",
      "Circle in 方城",
      "聖誕活動",
      "成果發表",
      "小盃盃",
      "送舊"
    ],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-37118,c4866.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4866.php",
    "featureSource": "official",
    "displayCategory": "其他社團",
    "verificationNotes": []
  },
  {
    "name": "管樂社",
    "category": "康樂性社團",
    "feature": "和音樂同好一起學習管樂器、交流樂理，再用演出分享練習的成果。",
    "activities": [
      "樂理工作坊",
      "聖誕快閃與交換禮物",
      "音樂成果會"
    ],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-37120,c4866.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4866.php",
    "featureSource": "official",
    "displayCategory": "其他社團",
    "verificationNotes": []
  },
  {
    "name": "火狐狸康輔社",
    "category": "康樂性社團",
    "feature": "想知道加入後能體驗什麼？特色資料待補充，官方介紹頁尚缺可核對的文字，先從來源連結認識社團。",
    "activities": [],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-37119,c4866.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4866.php",
    "featureSource": "pending",
    "displayCategory": "其他社團",
    "verificationNotes": [
      "特色待確認：官方介紹頁缺少可核對文字，尚不能確認可體驗內容。",
      "活動待確認：官方介紹頁尚無可核對的活動文字。"
    ]
  },
  {
    "name": "先進動力研究社",
    "category": "學藝性社團",
    "feature": "接觸先進動力車輛的研發、製作與驗證，探索課堂之外的車輛技術。",
    "activities": [],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-46959,c4867.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4867.php",
    "featureSource": "official",
    "displayCategory": "技術性",
    "verificationNotes": [
      "活動待確認：官方介紹頁尚無可核對的活動文字。"
    ]
  },
  {
    "name": "樂印客社",
    "category": "學藝性社團",
    "feature": "把自己的圖文設計做成印花作品，參訪印花業者，也能體驗擺攤分享創作。",
    "activities": [
      "印花操作課程",
      "印花公司參訪",
      "淡水校區擺攤"
    ],
    "sourceUrl": "https://sad.aeust.edu.tw/p/450-1073-44629,c0.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4867.php",
    "featureSource": "official",
    "displayCategory": "技術性",
    "verificationNotes": [
      "活動地點與時效待確認：官方介紹提及「淡水校區擺攤」，未附日期及場地說明；保留來源內容，不視為本學期活動。"
    ]
  },
  {
    "name": "AI智慧創新應用研究社",
    "category": "學藝性社團",
    "feature": "想知道加入後能體驗什麼？特色資料待補充，官方介紹頁尚缺可核對的文字，先從來源連結認識社團。",
    "activities": [],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-58072,c4867.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4867.php",
    "featureSource": "pending",
    "displayCategory": "技術性",
    "verificationNotes": [
      "特色待確認：官方介紹頁缺少可核對文字，尚不能確認可體驗內容。",
      "活動待確認：官方介紹頁尚無可核對的活動文字。",
      "前台分類待確認：暫依官方名稱歸入技術性，實作內容仍待官方補充。"
    ]
  },
  {
    "name": "日本文化研究社",
    "category": "學藝性社團",
    "feature": "想知道加入後能體驗什麼？特色資料待補充，官方介紹頁尚缺可核對的文字，先從來源連結認識社團。",
    "activities": [],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-57498,c4867.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4867.php",
    "featureSource": "pending",
    "displayCategory": "其他社團",
    "verificationNotes": [
      "特色待確認：官方介紹頁缺少可核對文字，尚不能確認可體驗內容。",
      "活動待確認：官方介紹頁尚無可核對的活動文字。"
    ]
  },
  {
    "name": "智慧無人機足球競技研究社",
    "category": "學藝性社團",
    "feature": "從零開始認識無人機，學習飛行操控，體驗無人機足球與團隊競技。",
    "activities": [],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-55828,c4867.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4867.php",
    "featureSource": "project",
    "displayCategory": "技術性",
    "verificationNotes": [
      "特色待確認：此文案由專案提供，尚無官方文字佐證。",
      "活動待確認：官方介紹頁尚無可核對的活動文字。",
      "前台分類待確認：暫依名稱歸入技術性；官方分類為學藝性社團，實作內容仍待確認。"
    ]
  },
  {
    "name": "秀繡社",
    "category": "學藝性社團",
    "feature": "想知道加入後能體驗什麼？特色資料待補充，官方介紹頁尚缺可核對的文字，先從來源連結認識社團。",
    "activities": [],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-55145,c4867.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4867.php",
    "featureSource": "pending",
    "displayCategory": "其他社團",
    "verificationNotes": [
      "特色待確認：官方介紹頁缺少可核對文字，尚不能確認可體驗內容。",
      "活動待確認：官方介紹頁尚無可核對的活動文字。"
    ]
  },
  {
    "name": "EYE攝影社",
    "category": "學藝性社團",
    "feature": "從相機基礎操作練到實際拍攝，參加主題外拍，也能用影像記錄校園活動。",
    "activities": [
      "跨校攝影交流與外拍",
      "校園活動攝影支援",
      "攝影課程與實作"
    ],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-37138,c4867.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4867.php",
    "featureSource": "official",
    "displayCategory": "技術性",
    "verificationNotes": []
  },
  {
    "name": "THE WORLD社",
    "category": "學藝性社團",
    "feature": "想知道加入後能體驗什麼？特色資料待補充，官方介紹頁尚缺可核對的文字，先從來源連結認識社團。",
    "activities": [],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-37137,c4867.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4867.php",
    "featureSource": "pending",
    "displayCategory": "其他社團",
    "verificationNotes": [
      "特色待確認：官方介紹頁缺少可核對文字，尚不能確認可體驗內容。",
      "活動待確認：官方介紹頁尚無可核對的活動文字。"
    ]
  },
  {
    "name": "春暉悠桌遊社",
    "category": "學藝性社團",
    "feature": "從新手教學開始，試玩推理、卡牌和派對桌遊，在一起解題與歡笑中練習溝通。",
    "activities": [
      "主題桌遊日",
      "新手教學"
    ],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-37136,c4867.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4867.php",
    "featureSource": "official",
    "displayCategory": "其他社團",
    "verificationNotes": []
  },
  {
    "name": "園藝社",
    "category": "學藝性社團",
    "feature": "一起認識植物的美與特色，從官方介紹的多肉主題開始，發現綠色生活的樂趣。",
    "activities": [
      "多肉植物主題活動"
    ],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-37135,c4867.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4867.php",
    "featureSource": "official",
    "displayCategory": "其他社團",
    "verificationNotes": []
  },
  {
    "name": "動畫漫畫模型研究社",
    "category": "學藝性社團",
    "feature": "想知道加入後能體驗什麼？特色資料待補充，官方介紹頁尚缺可核對的文字，先從來源連結認識社團。",
    "activities": [],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-37134,c4867.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4867.php",
    "featureSource": "pending",
    "displayCategory": "其他社團",
    "verificationNotes": [
      "特色待確認：官方介紹頁缺少可核對文字，尚不能確認可體驗內容。",
      "活動待確認：官方介紹頁尚無可核對的活動文字。"
    ]
  },
  {
    "name": "聖經真理研究社",
    "category": "學藝性社團",
    "feature": "和不同科系的夥伴讀聖經、唱詩歌，交流對生命的想法，也能參與跨校聚會與服務。",
    "activities": [
      "聖經與詩歌社課",
      "跨校聚會",
      "聚餐交流",
      "兒童品格故事活動",
      "少年生命教育服務"
    ],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-37133,c4867.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4867.php",
    "featureSource": "official",
    "displayCategory": "其他社團",
    "verificationNotes": [
      "時效待確認：官方介紹含未標明學期的「本學期」及固定聚會時段，不作為現行社課時間。"
    ]
  },
  {
    "name": "iPower社",
    "category": "學藝性社團",
    "feature": "透過戲劇創作與舞台演出練習表達，和夥伴一起合作，也把關懷帶進公益服務。",
    "activities": [
      "主題戲劇創作與演出",
      "九校交流與迎新",
      "兒少陪伴與公益服務"
    ],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-37132,c4867.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4867.php",
    "featureSource": "official",
    "displayCategory": "其他社團",
    "verificationNotes": []
  },
  {
    "name": "啡嚐玩咖社",
    "category": "學藝性社團",
    "feature": "想知道加入後能體驗什麼？特色資料待補充，官方介紹頁尚缺可核對的文字，先從來源連結認識社團。",
    "activities": [],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-37131,c4867.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4867.php",
    "featureSource": "pending",
    "displayCategory": "其他社團",
    "verificationNotes": [
      "特色待確認：官方介紹頁缺少可核對文字，尚不能確認可體驗內容。",
      "活動待確認：官方介紹頁尚無可核對的活動文字。"
    ]
  },
  {
    "name": "生存遊戲暨軍事設備研究社",
    "category": "學藝性社團",
    "feature": "從裝備使用與基礎戰術教學開始，和夥伴到專業場地體驗不同形式的生存遊戲。",
    "activities": [
      "BB 槍出團活動",
      "裝備介紹",
      "競賽與特別活動"
    ],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-37129,c4867.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4867.php",
    "featureSource": "official",
    "displayCategory": "其他社團",
    "verificationNotes": []
  },
  {
    "name": "校園團契社",
    "category": "學藝性社團",
    "feature": "用唱歌學韓文、練英文會話，透過海外青年交流和文化活動，認識不同生活背景的朋友。",
    "activities": [
      "唱歌學韓文",
      "英文會話班",
      "海外青年交流",
      "泰國水節",
      "棋盤遊戲"
    ],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-37128,c4867.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4867.php",
    "featureSource": "official",
    "displayCategory": "其他社團",
    "verificationNotes": []
  },
  {
    "name": "原住民青年社",
    "category": "學藝性社團",
    "feature": "體驗傳統舞蹈、族語歌曲與飾品製作，透過演出和部落參訪認識原住民族文化。",
    "activities": [
      "校內外演出",
      "迎新與送舊",
      "部落參訪"
    ],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-37127,c4867.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4867.php",
    "featureSource": "official",
    "displayCategory": "其他社團",
    "verificationNotes": []
  },
  {
    "name": "羽球社",
    "category": "體育性社團",
    "feature": "一起學羽球規則、開心打球，在球場上認識朋友，再用社內交流賽切磋一下。",
    "activities": [
      "社內交流賽"
    ],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-42296,c4868.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4868.php",
    "featureSource": "official",
    "displayCategory": "運動性",
    "verificationNotes": []
  },
  {
    "name": "桌球社",
    "category": "體育性社團",
    "feature": "在歡樂的氣氛裡和夥伴一起打桌球，透過友誼賽與各式競賽交流球技，享受切磋的樂趣。",
    "activities": [
      "友誼賽",
      "各式競賽"
    ],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-37112,c4868.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4868.php",
    "featureSource": "official",
    "displayCategory": "運動性",
    "verificationNotes": []
  },
  {
    "name": "排球社",
    "category": "體育性社團",
    "feature": "跟著學長姐從基礎練起，和夥伴一起打球，也能體驗不同規則的校內盃賽。",
    "activities": [
      "校內盃賽",
      "團聚打球",
      "寒暑假社團旅遊"
    ],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-37111,c4868.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4868.php",
    "featureSource": "official",
    "displayCategory": "運動性",
    "verificationNotes": []
  },
  {
    "name": "籃球社",
    "category": "體育性社團",
    "feature": "想知道加入後能體驗什麼？特色資料待補充，官方介紹頁尚缺可核對的文字，先從來源連結認識社團。",
    "activities": [],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-37110,c4868.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4868.php",
    "featureSource": "pending",
    "displayCategory": "運動性",
    "verificationNotes": [
      "特色待確認：官方介紹頁缺少可核對文字，尚不能確認可體驗內容。",
      "活動待確認：官方介紹頁尚無可核對的活動文字。"
    ]
  },
  {
    "name": "棒球社",
    "category": "體育性社團",
    "feature": "和整支隊伍一起練習、一起進步，在比賽中體驗彼此支援的團隊合作。",
    "activities": [
      "日常練習",
      "大專盃",
      "系季盃"
    ],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-37108,c4868.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4868.php",
    "featureSource": "official",
    "displayCategory": "運動性",
    "verificationNotes": []
  },
  {
    "name": "電子競技社",
    "category": "體育性社團",
    "feature": "找隊友一起玩遊戲、參與線上線下聯誼賽，在競技之外也認識新的朋友。",
    "activities": [
      "遊戲活動",
      "官方與民間賽事",
      "講座"
    ],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-37106,c4868.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4868.php",
    "featureSource": "official",
    "displayCategory": "運動性",
    "verificationNotes": [
      "時效待確認：官方介紹的連續兩年獲獎未標示年份，不作為當年度成果。"
    ]
  },
  {
    "name": "袋棍球社",
    "category": "體育性社團",
    "feature": "接觸源自北美原住民的袋棍球，在對抗與團隊合作中感受這項運動的熱血。",
    "activities": [
      "小型比賽",
      "交流活動"
    ],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-51587,c4868.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4868.php",
    "featureSource": "official",
    "displayCategory": "運動性",
    "verificationNotes": []
  },
  {
    "name": "FUN馨服務社",
    "category": "服務性社團",
    "feature": "一起參與服務學習，從活動設計、實際行動到反思，練習用志工的角度關心身邊的人與環境。",
    "activities": [
      "服務學習工作坊",
      "水湳洞淨港",
      "伊甸服務",
      "團隊建立與志工社課",
      "泰北國際志工"
    ],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-37104,c4869.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4869.php",
    "featureSource": "official",
    "displayCategory": "服務性",
    "verificationNotes": []
  },
  {
    "name": "國際志工社",
    "category": "服務性社團",
    "feature": "透過社區與國際服務學習關懷他人，在行動和反思中拓展看世界的角度。",
    "activities": [
      "社區服務",
      "在地服務",
      "國際志工服務"
    ],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-37103,c4869.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4869.php",
    "featureSource": "official",
    "displayCategory": "服務性",
    "verificationNotes": [
      "時效待確認：官方介紹仍含疫情期間無法出國的敘述，現行海外服務安排尚未確認。"
    ]
  },
  {
    "name": "交通安全服務社",
    "category": "服務性社團",
    "feature": "想知道加入後能體驗什麼？特色資料待補充，官方介紹頁尚缺可核對的文字，先從來源連結認識社團。",
    "activities": [],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-37101,c4869.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4869.php",
    "featureSource": "pending",
    "displayCategory": "服務性",
    "verificationNotes": [
      "特色待確認：官方介紹頁缺少可核對文字，尚不能確認可體驗內容。",
      "活動待確認：官方介紹頁尚無可核對的活動文字。"
    ]
  },
  {
    "name": "外籍學生聯誼會",
    "category": "聯誼性社團",
    "feature": "想知道加入後能體驗什麼？特色資料待補充，官方介紹頁尚缺可核對的文字，先從來源連結認識社團。",
    "activities": [],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-49919,c5413.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-5413.php",
    "featureSource": "pending",
    "displayCategory": "其他社團",
    "verificationNotes": [
      "特色待確認：官方介紹頁缺少可核對文字，尚不能確認可體驗內容。",
      "活動待確認：官方介紹頁尚無可核對的活動文字。"
    ]
  },
  {
    "name": "USR資訊服務社",
    "category": "服務性社團",
    "displayCategory": "服務性",
    "feature": "和師生一起分享專業知識，參與營隊與國中社團服務，在互相學習中幫助縮小學習落差。",
    "activities": [
      "USR大手攜小手營隊",
      "社團課程",
      "協助國中社團活動"
    ],
    "sourceUrl": "https://sad.aeust.edu.tw/p/405-1073-37102,c4869.php",
    "categorySourceUrl": "https://sad.aeust.edu.tw/p/412-1073-4869.php",
    "featureSource": "official",
    "verificationNotes": [
      "名單與分類待確認：本次官方分類頁未列出此社團；保留既有官方來源紀錄，不推定已停社。",
      "來源待確認：本次官方介紹連結回傳 HTTP 404；既有介紹與活動僅作歷史資料保留。"
    ]
  }
];
