# 視覺設計系統

主要來源：`frontend/src/styles/global.css`。Tailwind 4 的 `@theme` 同時產生 utility tokens；元件以語意 class 表達可讀的視覺組合。

| Token | 值／用途 |
|---|---|
| paper | #f6f4ec，米白背景 |
| ink | #242821，文字與粗框 |
| muted | #65695f，次要說明 |
| accent | #ef502f，主按鈕／裝飾；正文用更深的 #c23e22 |
| lime | #d7eb87，生活橫幅與選取狀態 |
| purple | #ded6ee，輔助貼紙與人物卡 |
| line | #d6d7cc，分隔線 |

- 字體：系統繁中字型堆疊，不下載字型；monospace 用於小型英文索引。
- 字級：首頁 h1 fluid 4–6.3rem，內頁 2.65–4.8rem，h2 1.7–2.6rem。手機縮放，正文 line-height 1.75–2。
- 間距：4/8/12/16/24/32/48/64px 為基礎；section 使用 clamp(3.5rem,7vw,6rem)，最大內容宽 1200px。
- 按鈕：最小高度 48px、實色、1.5px 框；hover 小幅位移、鍵盤明確 outline，disabled 禁止重複送出。
- 卡片：8px 圓角、粗框、圖形標誌、文字狀態；不僅靠顏色辨識。
- 導覽：桌面橫向，手機兩列且保持所有入口可用，不依賴 JavaScript hamburger。
- 表單：原生 label/fieldset/legend/radio，aria-describedby、live status、字數計數。Honeypot 不進 tab order。
- 空狀態：說明未開放原因、下一步與回饋入口，不顯示假資料。
- 斷點：Tailwind sm 640／md 768／lg 1024；版面另在 1100px 與 380px 調整卡片和裝飾。
- 動效：只用短 transition；`prefers-reduced-motion` 關閉。無自動輪播／閃爍。

自製 CSS 票券、幾何圖形與 favicon，沒有學校標誌或第三方圖片。實際手機／平板／桌面與讀屏 QA 仍需依 verification.md 完成，不能僅憑 CSS 宣稱全面無障礙相容。
