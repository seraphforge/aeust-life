# V0.3 Ticket：現況盤點與候選開發計畫

本文件是開發前盤點，尚不是已完成的功能或已確認的 API 契約。

## 實際基準

- 工作目錄：`C:\Users\0ping\Desktop\aeust-life`。
- 未找到根目錄或專案子目錄的 `AGENTS.md`。
- README、package.json 與 API 文件描述 V0.1。
- Worker 只有 `GET /api/health` 與 `POST /api/feedback`。
- Migration 只有 `0001_feedback.sql`；未找到 tickets 或 ticket_messages。
- 未找到學生 Ticket 頁面、管理員頁面、Access JWT 驗證或 Ticket 測試。
- Git main 尚無 commit，現有專案檔案全部未追蹤。`git diff` 空白不能證明沒有檔案變更；實作前須保存檔案基準供逐檔比較，不自動提交或推送。
- SQLite adapter 只執行 0001，資料庫介面只有寫入能力；Ticket 需要查詢及原子操作支援。

使用者描述的既有 Ticket 實作與此目錄不符。確認正確目錄／分支，或確認以此 V0.1 為基準新增系統前，不新增 Migration 或建立相衝突的 API。

## 基準驗證

- `npm run check`：通過，Astro 16 檔案，0 errors/warnings/hints，Worker TypeScript 通過。
- `npm test`：24/24 通過，全部為現有 Feedback、SQL、輸入與送出邏輯測試。
- `npm run build`：失敗。首次 Vite 快取 rename EPERM；沙箱外重跑進入靜態建置後，PostCSS 報 ENOENT，嘗試開啟 `frontend/tailwindcss`。尚未定位根因或修改設定。
- `git diff --stat`、`git diff --check`：無輸出；受全部檔案未追蹤的限制。
- 尚未執行本次瀏覽器、HTTP 或真 D1 runtime 驗證。

## 建議方案

保留 Astro 靜態前端與 Workers + D1，將 Ticket 增量加入獨立模組。保留 Feedback 路徑、回應契約及既有 Migration。替代方案是先補齊另一份既有 Ticket 分支後再延伸；若該版本存在，應優先使用，避免製造不相容 API 或 Migration。此任務不需要重建框架或增加學生帳號。

匿名存取採工單識別碼加高熵私密憑證：伺服器只存雜湊，建立成功時交付憑證；不放在 URL query、日誌或持久瀏覽器儲存。學生手動保存，憑證遺失無法依身分找回。所有私密回應 no-store，以純文字呈現訊息。不存在與憑證錯誤使用一致錯誤；讀取與寫入都需限流。

## 階段與驗收

### 0. 確認基準及排除建置問題

確認 Ticket 原始碼位置，讀取該版本規範和測試；或確認從目前目錄新增。定位 Tailwind 匯入失敗，僅修必要設定或依賴問題，不改 unrelated UI。保存實作前檔案內容以便 Diff。

### 1. 學生匿名建立工單

新增向前 Migration，保留 0001；包含工單、訊息、外鍵、狀態約束與索引。建立 API 原子寫入工單與首則訊息，產生高熵憑證並只保存雜湊。新增學生表單與成功憑證保存提示，失敗保留輸入，禁止重複點擊、無 JavaScript 時避免 GET 洩漏。

獨立測試：合法建立、資料庫原子失敗、輸入和大小上限、限流、必要 binding 缺失、蜜罐、成功回應格式、憑證不以明文落庫、Feedback 回歸，以及瀏覽器成功／失敗操作。

### 2. 私密查詢、追加回覆與時間軸

新增手動輸入工單識別碼和私密憑證的查詢頁，憑證經標頭或 POST body 傳送。驗證後才讀取訊息；穩定排序和分頁，顯示狀態及時間。回覆與工單更新需原子操作。明確定義已結案是否允許追加回覆，避免前後端行為不一致。

獨立測試：錯誤憑證、跨工單存取、未知工單、限流與故障安全、XSS 純文字呈現、追加後時間軸、重新整理的隱私行為、離線保留輸入、重複送出與併發狀態變更。

### 3. 管理員 API 與後台

伺服器驗證 Cloudflare Access JWT 簽章、固定 issuer/audience、有效時間及允許演算法；信任設定的 JWKS 來源，不信任 token 自帶的金鑰網址。設定缺失或驗證失敗時拒絕存取，不增加本機免驗證後門。管理列表分頁、工單詳情、回覆、狀態轉換與必要稽核原子寫入；寫入含 Origin／CSRF 防護。

獨立測試：缺失／偽造／過期／錯誤 audience 或 issuer JWT、JWKS 故障與輪替、有效簽章、未授權列表與寫入、狀態轉換、學生不能冒充管理員、管理瀏覽器流程。測試金鑰僅在測試期間產生。

### 4. 整合及交付

補齊真 Workers/D1 本機測試、Migration 升級與舊 Feedback 資料保存、瀏覽器端到端測試、安全標頭及部署文件。區分 SQLite adapter 與 D1 runtime 的測試證據。

每階段完成後依序執行 `npm run check`、`npm test`、`npm run build`，加上該階段 API／操作測試，再檢查 Git Diff 與未追蹤檔案的基準差異。任一必要檢查未通過，不宣稱階段完成。

## 需使用者手動完成的雲端事項

實作可以用本機資料庫及測試簽章驗證；一旦需要真帳號、正式資料庫或密鑰即停止，不操作雲端設定。

- 建立 Access application，設定管理員 allow policy、team issuer 和 audience，保護管理頁與 API。
- 確認 Workers 入口沒有繞過驗證的路徑，設定正式 origin、D1 binding 和限流 namespace。
- 使用者確認備份、Migration 套用順序、資料保存與刪除流程，再自行執行正式資料庫變更。
- 正式部署與實際 Access 登入驗收需另外授權；不自動部署或推送 GitHub。
