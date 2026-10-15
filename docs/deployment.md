# Cloudflare 部署前準備

本次沒有登入、建立雲端資源、部署或推送 GitHub。下列是維護者未來手動操作流程，不是已完成的事項。

## 先完成本機驗收

1. 在允許網路與開發子程序的 Windows 終端 `npm ci`。
2. `npm run check`、`npm run check:tests`、`npm test`、`npm run build`、`npm run test:build` 全部通過。
3. `npm run setup:cloudflare` 後保存 `backend/tooling/package-lock.json`，以後該工具安裝改用 `npm ci --prefix backend/tooling`。
4. `npm run build:worker` 與 `npm run test:d1` 必須通過。啟動 `npm run db:migrate`、`npm run dev:api` 與前端，測試真 D1 表單流程。
5. 實際瀏覽器檢查 360/768/1440px、鍵盤、無 JavaScript、網路中斷、429 與 503；確認成功與失敗不遺失使用者未送出的內容。
6. 執行 dependency audit，評估安全更新。此環境受網路限制，未取得最新 audit 結果。

## 建立資源（只由維護者手動執行）

先登入自己的 Cloudflare 帳號，確認方案、資源限制與可能費用；不要把憑證傳給聊天或提交到 Git。

在 `backend` 目錄，工具位置為 `tooling/node_modules/wrangler/bin/wrangler.js`。登入後可手動執行 `node tooling/node_modules/wrangler/bin/wrangler.js d1 create aeust-life-feedback`，取得真正 UUID。此操作會建立遠端資源，本次未執行。

從 `backend/wrangler.production.example.jsonc` 複製為 `backend/wrangler.production.jsonc`，填入已建立的 UUID、自己的網域與 zone，確認：

- `ENVIRONMENT` 必須為 `production`。
- `ALLOWED_ORIGINS` 必須為精確的 HTTPS 網站來源，不包含本機、wildcard 或尾斜線。
- `DB` 指向正式 D1，migration 路徑正確。
- 兩組限流 namespace 在帳號內獨立，不與其他專案碰撞。
- 同網域 Worker route 為 `你的網域/api/*`；Pages 處理其他頁面。
- `workers_dev` 維持 false，除非另有驗證過的公開入口設計。

確認後才在 backend 執行：

```powershell
# 會變更遠端資料庫；僅在明確準備發布後由維護者執行
node tooling/node_modules/wrangler/bin/wrangler.js d1 migrations apply aeust-life-feedback --remote --config wrangler.production.jsonc
# 會發布 Worker；本專案 CI 不會執行
node tooling/node_modules/wrangler/bin/wrangler.js deploy --config wrangler.production.jsonc
```

## Pages

以 `aeust-life/` 作為 GitHub Repository 根目錄（不要把上一層的 .scratch 或 npm cache 推送）。Pages 建置命令 `npm ci && npm run build`，輸出 `frontend/dist`，Node 24。設定自訂網域後，將同網域 `/api/*` route 交給 Worker。僅發布靜態網站到 pages.dev 不會自動建立 API。

目前架構固定使用同 origin API，不需 PUBLIC_API_URL，CSP `connect-src 'self'` 可保持簡單。若未來改分離 API 網域，需要同時更新前端 endpoint、CSP、CORS 與測試；不能只放寬成 `*`。

`frontend/public/_headers` 會複製到輸出。部署後確認 CSP、nosniff、Permissions-Policy、Referrer-Policy、frame 防護都實際存在；Vite dev server 不會讀取 Pages `_headers`。

## 開放學生使用以前

- 驗證真實 API 201 後 D1 確有資料；測試 400/403/405/413/415/429/503，且沒有公開讀取端點。
- 確認 HTTPS，必要時在網域層設定 HSTS；不盲目啟用 includeSubDomains／preload。
- 確定資料保存期限、清除流程、管理權限與私人安全回報管道。
- 評估校園共享 IP 限流誤擋。原生 limiter 每 Cloudflare 位置生效且非精確全球計數；不可把它當成本上限保證。
- 依濫用情況設計 Turnstile／WAF，設定用量通知。這些尚未啟用。
- 公開 GitHub Repo 後才填入 `frontend/src/config.ts` 的 repositoryUrl。不要假設 repo 已存在。

官方參考：[Astro CSS](https://docs.astro.build/en/guides/styling/)、[Tailwind PostCSS](https://tailwindcss.com/docs/installation/using-postcss)、[D1 本機開發](https://developers.cloudflare.com/d1/best-practices/local-development/)、[Rate Limiting binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/)。
