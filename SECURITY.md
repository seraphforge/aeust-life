# 安全政策

本專案仍在 V0.1 開發階段，尚未正式部署。安全問題請勿附上真實學生資料、密碼、Token 或可識別回饋內容。

## 回報管道

目前尚未建立公開 Repository 與專用私人安全回報管道。**公開部署前必須啟用 GitHub Private Vulnerability Reporting 或公布經維護者確認的私人聯絡方式。** 不捏造聯絡信箱。

在私人管道可用之前，不要在公開 Issue 或匿名回饋表單提交尚未修復漏洞的利用細節。一般不含敏感資訊的使用問題可透過回饋表單描述。

## 已實作與限制

- 僅接受 JSON，驗證類型／內容／未知欄位，內容 10–2000 Unicode code points，request 上限 12 KiB（含 stream 實際計數）。
- 參數化 SQL，沒有回饋讀取 API；任何資料庫錯誤均回傳一般訊息。
- Origin 精確 allowlist，沒有 wildcard 或 credentials；CORS 不是認證，也擋不住偽造 Origin 的非瀏覽器 bot。
- 蜜罐、Cloudflare 限流 binding（每來源每分鐘 5 次、每位置整體每分鐘 60 次）；binding／可信 IP 缺失時生產環境拒絕寫入。
- Cloudflare 限流為位置內近似控制，並非全球精確配額。共享校園 NAT 可能讓多人共用限額；公開測試需評估誤擋。IP 不入 DB 或應用日誌，但 Cloudflare 作為基礎設施會處理連線資訊。
- 應用只記錄固定事件代碼與 HTTP 狀態，不記錄回饋、IP、完整標頭或原始例外。
- 靜態部署 CSP 禁止 inline script/style，搭配 nosniff、frame 防護、Referrer／Permissions Policy。`_headers` 由 Cloudflare Pages 處理，Astro dev 不會自動套用。
- 前端表單在 JavaScript 初始化前禁止送出，HTML 使用 POST，避免 GET query 洩漏內容。
- 沒有登入、權限假設、管理端點、支付或假帳號。

## 公開部署的安全門檻

1. 通過真 Workers／D1、正式 build、瀏覽器與標頭檢查；不得只靠 Node adapter 宣稱生產已驗證。
2. 正式 allowlist、D1 binding、独立的 rate-limit namespace、`ENVIRONMENT=production`，並移除本機 origin。
3. 確認 HTTPS、日誌保存與存取權限、資料保存期限、刪除與回報流程。
4. 在允許連網環境執行 `npm audit` 與 Wrangler tooling audit，評估相關公告；更新並驗證鎖檔。
5. 依流量啟用額外反 bot 驗證（例如 Turnstile）、入口防護與使用量通知。這些尚未實作，不能宣稱蜜罐能阻止有意攻擊。
6. 未來若增加管理後台，必須先有真正的身分驗證、角色權限、稽核與 CSRF 防護；不能把隱藏網址當權限。

不承諾未設置的漏洞賞金或回應 SLA。修復結果與受影響版本應在私人協調後公開。
