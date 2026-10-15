# API V0.1

## GET /api/health

200 `{ "ok": true, "service": "aeust-life-api" }`。只表示 Worker handler 可執行，不檢查 D1 是否完成 migration。其他 method 405。

## POST /api/feedback

必須帶允許的 `Origin` 與 `Content-Type: application/json`。

```json
{ "type": "idea", "content": "希望未來可以找到更多跨系交流的機會。", "website": "" }
```

- type：`idea`、`bug`、`other`。
- content：trim 後 10–2000 Unicode code points，不接受控制字元（允許換行與 tab）或不完整 UTF-16。
- website：蜜罐，必須是空字串。禁止額外欄位，不收聯絡方式。
- request bytes 最大 12288；不只依賴可偽造的 Content-Length。
- 201 `{ "ok": true }` 僅在 SQL 成功後回傳；不回傳內容／id。
- 400 格式或驗證錯誤；403 origin／preflight 不符；405 method；413 過大；415 非 JSON；429 限流（Retry-After: 60）；503 DB／限流／必要 binding 不可用。

只有 `/api/feedback` 的 OPTIONS 支援 CORS preflight，僅允許 POST 與 Content-Type。回應不允許 credentials、不使用 wildcard。

沒有 GET feedback、列表、搜尋、匯出或管理 API。HTML markup 與 SQL 字串以純文字儲存；未來管理介面必須做輸出 escaping，不可直接 innerHTML。

目前沒有 idempotency key。若寫入成功但回應中斷，前端無法知道已寫入，會保留內容並提示結果不明；再次送出可能重複。V0.2 可依實際需求設計不增加個資的去重策略。
