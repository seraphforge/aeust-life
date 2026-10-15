# V0.1 Implementation Plan

Goal: 交付可維護的非官方校園平台與真實匿名回饋流程。
Architecture: Astro 靜態頁面 + Workers API + D1。共用驗證契約。
Spec: [design.md](design.md)
Execution: 依使用者指示在目前 Windows 工作目錄直接實作，逐階段驗證，不部署、不推送。

## 工作清單

- [x] Phase 1：確認空目錄與 Node/npm/Git；記錄 npm 離線限制。
- [ ] Phase 2：workspace、Astro/Tailwind、Workers 設定；確認依賴可用程度。
- [ ] Phase 3：導覽、設計 tokens、所有頁面、真實空狀態；驗證頁面輸出。
- [ ] Phase 4：先寫 shared 驗證與 API/migration 測試，確認失敗，再實作；執行測試。
- [ ] Phase 5：表單整合與錯誤／重試體驗；本機端到端驗證。
- [ ] Phase 6：型別檢查、build、API、SQL、基本安全、responsive／鍵盤檢查。
- [ ] Phase 7：README、貢獻／安全／授權、CI、部署與測試紀錄。

## Review focus

1. 非 JSON、畸形 JSON、過大 streaming body 都不能寫入。
2. Unicode 邊界、空白、未知欄位、蜜罐繞過必須可測。
3. API 未啟動、DB 失敗、非預期成功格式不能顯示成功；保留內容。
4. 惡意 Origin、缺限流設定、錯誤 method、GET feedback 不得洩漏資料。
5. migration 重跑、SQL 注入字串與資料庫 constraint 需以真 SQLite 驗證。
