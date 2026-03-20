# 脈輪平衡測試系統

零依賴的靜態 web app，內含：

- 120 題脈輪量表
- 7 點 Likert 作答介面
- 7 脈輪平衡開發度、閉塞傾向、過度活躍傾向
- 作答品質檢查與信心係數
- 本機自動儲存與 JSON 匯出

## 檔案

- `index.html`：頁面結構
- `styles.css`：介面樣式
- `app.js`：題庫、問卷流程、評分演算法、結果頁

## 啟動

直接在此目錄啟動本機靜態伺服器：

```bash
python3 -m http.server 4173
```

然後在瀏覽器打開：

```text
http://localhost:4173
```

## 計分模型

- 每個脈輪 16 題主量表
- `B`：平衡表現
- `D`：閉塞表現
- `E`：過度活躍表現
- 額外 8 題效度控制題

目前每輪配置為：

```text
6 題平衡 + 5 題閉塞 + 5 題過度
```

每輪主分數核心：

```text
DH = 1 - D
EH = 1 - E
Core = harmonic_mean(B, DH, EH)
Penalty = 1 - 0.10 * abs(D - E)
RawPct = Core * Penalty * 100
```

高分條件不是「能量強」，而是：

1. 平衡表現高
2. 閉塞低
3. 過度活躍低

主分數採用最初的 `B / D / E` 三軸整合方式：

- `B` 代表平衡表現平均
- `D` 代表閉塞表現平均
- `E` 代表過度活躍表現平均
- 分數同時考慮平衡高、閉塞低、過度活躍低三個條件

整體協調度則不是看全局標準差，而是看相鄰脈輪之間的落差：

```text
FlowBlock_i = abs(Final_i - Final_i+1)
AvgResistance = mean(FlowBlock_1 ... FlowBlock_6)
Coherence = 100 - AvgResistance
```

信心係數獨立呈現，只用來標示結果可靠度，不再反向拉高或壓低脈輪主分數。

## 結果判讀層

除了每輪主分數外，結果頁還會額外衍生幾組系統指標來生成文案：

- `avgPressure`：七輪平均壓力，來自每輪 `(閉塞 + 過度) / 2`
- `largestFlowBlock`：相鄰脈輪中落差最大的斷點
- `patternCounts`：7 輪中 `balanced / blocked / excess / mixed` 的分布
- `strainedResources`：主分數仍可用，但壓力已偏高的輪位
- `calmResources`：主分數高且壓力相對低的穩定支點
- `integrationProfile`：下三輪與上三輪平均差距，加上心輪在中段的橋接狀態

結果文案不只看「分數高低」，還會同時參考：

1. 平衡表現是否真的穩
2. 高分是否其實帶著代償或過勞
3. 低分是偏閉塞、偏過度，還是兩邊拉扯
4. 問題是出在單一輪位，還是輪位之間的轉換斷點
5. 上下層功能是失衡、倒掛，還是中段橋接不足

## 備註

這是一套自評系統，不是醫療或心理診斷工具。
