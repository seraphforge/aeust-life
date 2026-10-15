# AEUST Life

**欸，今天要幹嘛？**  
大學生活，別只剩下課表。

由亞東科技大學通訊工程系一年級學生 **Nagi** 發起的校園生活平台。想把散落的活動資訊、興趣與交流機會，慢慢整理成學生找得到、用得上的入口。

**AEUST Life 為學生自主發起的非官方專案，與學校官方行政系統無隸屬關係。**

V0.1 是開發中的 foundation，尚未正式部署。活動、社團、揪團、美食與二手頁面均為規劃介紹，沒有虛構活動、名單、評價或使用人數。沒有登入、交易、公開回饋查詢或管理後台。

## 技術與結構

- Astro 7.3.3 靜態頁面、TypeScript 6.0.3 strict、Tailwind CSS 4.3.3（官方 PostCSS 整合）。版本與可用快取相容，依賴鎖定在 `package-lock.json`；不代表永遠是最新版本。
- Cloudflare Workers TypeScript API、D1／SQLite SQL migration。
- Node 24 內建 test runner 與真 SQLite 測試，不需要額外測試框架。
- Cloudflare Pages 承載靜態網站，同網域 `/api/*` Worker route 處理 API。

```text
aeust-life/
├── frontend/                 Astro、元件、樣式、所有路由
├── backend/
│   ├── src/                  Workers API 與 binding 介面
│   ├── tooling/              獨立安裝的 Wrangler
│   └── wrangler.jsonc        僅供本機的 D1／限流設定
├── shared/                   前後端共用回饋驗證
├── database/migrations/      SQL schema
├── scripts/                  離線 API、D1 與建置驗證
├── tests/                    驗證、API、SQL、提交邏輯測試
├── docs/                     設計、API、隱私、部署與驗證紀錄
└── .github/workflows/ci.yml   檢查、測試與 build；不部署
```

額外的 `shared/` 避免驗證規則漂移。`backend/tooling/` 不加入 workspace，讓前端安裝不必同時下載 Wrangler／workerd；在可連線環境第一次安裝後，應將它產生的 lockfile 一併提交。當前環境无法下載 Wrangler，未偽造其 lockfile。

## Windows 開發環境

Windows 11、Node.js **24 LTS（至少 24.13.0，<25）**、npm 11+、Git。PowerShell 可執行以下指令。若執行原則阻擋 npm.ps1，使用 `npm.cmd`，不需修改系統執行原則。

從目前工作目錄進入專案：

```powershell
cd "C:\Users\0ping\Desktop\AEUST Life\aeust-life"
npm ci
```

一般安裝需要 npm registry 網路。不要停用公司／系統代理或安全控制來繞過限制。受管理的離線環境需由使用者在允許連線的終端完成安裝。這次已透過既有快取安裝前端依賴；`npm ci` 仍是一般開發與 CI 的標準流程。

## 啟動：只看前端

```powershell
npm run dev
```

開啟 **http://127.0.0.1:4321**。不需帳號、API Key 或 `.env`。後端未開啟時，表單會回報連線失敗並保留內容。

Astro 在偵測到 agent 時可能啟動背景服務；停止該服務：

```powershell
cd frontend
node ../node_modules/astro/bin/astro.mjs dev stop
```

## 啟動：離線 SQLite API

在第二個 PowerShell 視窗、專案根目錄執行：

```powershell
npm run dev:api:sqlite
```

伺服器僅監聽 `127.0.0.1:8787`，啟動時自動套用 migration。資料實際存於 `.local/feedback.sqlite`，不是假送出；只有成功寫入才回 201。Node 24.13 會顯示內建 SQLite experimental warning，這只用於開發與測試。

**這是 SQLite 開發 adapter，不是 Cloudflare D1 模擬器，也不能取代 D1 整合驗證。** 生產 API 不載入 Node／SQLite adapter。此服務與 Wrangler 都使用 8787，請擇一啟動。

## 啟動：真正 Workers／D1 本機開發

在可連線的本機終端安裝工具，無需登入 Cloudflare：

```powershell
npm run setup:cloudflare
npm run db:migrate
npm run dev:api
```

`db:migrate` 執行 `wrangler d1 migrations apply aeust-life-local --local`。設定中的全零 UUID 僅為本機 placeholder，不代表已建立任何遠端資源。D1 本機資料位於 `.wrangler/` 並已忽略。

前端 Vite 將 `/api` proxy 到 8787；CORS 只允許 `localhost:4321` 與 `127.0.0.1:4321`。若改連接埠，需同步調整 allowlist。

## 驗證指令

```powershell
npm run check          # Astro 與 Workers strict TypeScript
npm run check:tests    # 測試與本機 scripts 的型別
npm test               # 真 SQLite + API + validation + submit tests
npm run build          # Astro 靜態網站
npm run test:build     # 建置後路由、連結、CSP 與表單安全檢查
npm run build:worker   # Wrangler deploy --dry-run，無正式部署
npm run test:d1        # 隔離的本機 D1 migration 重跑與寫入
```

`test:d1` 的測試 DB 放在 `.local/d1-test-*`，不接觸開發用 DB。CI 會執行上述檢查，沒有自動正式部署。尚未在 GitHub 上執行 CI，不能宣稱遠端 CI 已通過。

完整的實測結果與限制見 [docs/verification.md](docs/verification.md)。

## 目前完成度

- 首頁、探索、活動、社團、揪團、美食、二手、開發進度、關於、回饋與 404 的原始碼。
- 匿名回饋的前後端驗證、Unicode 字數、12 KiB body 上限、prepared statement、SQLite schema、CORS、蜜罐與限流 binding 設計。
- 成功／失敗狀態、避免重複點擊、失敗保留內容、未啟用 JavaScript 時防止原生 GET 外洩。
- 安全標頭、鍵盤 focus、skip link、響應式斷點與 reduced motion。
- 僅本機驗證，**尚不能視為完成正式發布驗收**。D1 執行、完整建置、實際瀏覽器與部署驗證詳見紀錄。

## 開源與下一版

專案原始碼使用 [MIT](LICENSE)。不含學校官方素材、外部照片或外部字型。套件各自依其授權；新增素材前請確認來源與授權。

GitHub 使用者：[seraphforge](https://github.com/seraphforge)。Repository 連結留在 `frontend/src/config.ts` 的 `repositoryUrl`，目前為空，不假設遠端倉庫已存在。

歡迎透過 [CONTRIBUTING.md](CONTRIBUTING.md) 參與。V0.2 建議先完成部署／隱私維運，再做有來源與人工審核的活動資訊，不急著加入帳號或交易。

部署前請閱讀 [docs/deployment.md](docs/deployment.md)、[SECURITY.md](SECURITY.md) 與 [docs/privacy.md](docs/privacy.md)。
