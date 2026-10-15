# AEUST Life V0.1 設計

目標：由學生發起、為學生而做的非官方校園生活平台。這版交付可執行前端、匿名回饋 API、SQLite-compatible migration，以及可重現的本機驗證。

## 架構

- npm workspaces：frontend（Astro 靜態輸出）、backend（Workers）；shared（共用驗證型別）是原始碼目錄，不是額外套件。database 保存 migration，scripts 保存測試／本機工具。
- 靜態 Astro 比 SSR 少一個執行依賴，V0.1 不需要登入或動態公開資料；獨立 Worker 比 Pages Functions 更清楚區隔 API 與靜態部署。
- 前端開發使用 /api proxy 至 127.0.0.1:8787。正式環境使用同網域 /api/* Worker route，避免把任意 API 網域加入 CSP。單獨啟動前端時 API 失敗明確顯示，不製造成功。
- 不使用外部字型、圖片、官方 Logo、假活動、假評價或假統計。

## 視覺

校園獨立刊物：米白紙張、墨色字、橘红主色、萊姆與淡紫輔色。大標題、粗線框、票券與貼紙圖形皆由 CSS／自製 SVG 形成。手機先行，鍵盤可操作，提供 reduced-motion、skip link、明確 focus。

## 匿名回饋契約

POST /api/feedback，JSON { type: idea|bug|other, content: string, website: string }。website 為蜜罐。只接受這三個欄位；內容 trim 後 10–2000 Unicode code points；request 上限 12 KiB。資料表只存 UUID、類型、內容、UTC 時間。成功必須等候 DB 寫入。

精確比對 Origin allowlist；缺 Origin 拒絕；只接受 JSON；prepared statement；失敗回覆不包含例外。每個來源 IP 每 60 秒 5 次的 Cloudflare rate-limit binding，另設整體每 60 秒 60 次；只限縮濫用，不宣稱是嚴格全球配額。IP 僅作限流 key，不入資料庫或應用日誌。生產環境 binding／可信 IP 缺失即拒絕寫入。無公開讀取回饋 API。

## 功能範圍

首頁、探索、活動、社團、揪團、美食、二手、進度、關於、回饋。除回饋之外皆為真實的介紹／空狀態，未啟用投稿、交易、登入或聊天。後續上線揪團／交易以前需有規範、審核與檢舉流程。

## 驗證

共用表單驗證、API 錯誤／安全邊界、真 SQLite migration／參數化寫入、前端建置與 Astro 型別檢查、Workers typecheck／dry-run、本機 D1 整合、瀏覽器互動。環境阻擋項目獨立列出，不能以替代測試冒充 Cloudflare 測試。
