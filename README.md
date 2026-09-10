# AI 驗光紀錄輔助學習系統 V0.7 

馬偕醫護管理專科學校・視光學科｜Kuan-Wei Lee / 李冠緯｜© 2026

## 今晚版本的核心流程

1. 學生以攝影機拍攝或上傳 **眼睛及健康篩檢紀錄表 V3.3（2 頁）**。
2. Gemini 2.5 Flash 進行固定版型與手寫紀錄結構化。
3. V0.6 Recording Rule Engine 檢查完整性、格式與前後一致性。
4. Gemini 產生臨床推理與 Problem List / Plan / Patient Education 個人化回饋。
5. 學生裝置保留學習紀錄與原始影像；可下載 ZIP / CSV。
6. 去識別化的學習資料自動送至 Google Apps Script，再寫入 Google Sheet 班級後台。

> V0.6 是 Classroom Pilot。它評的是 **Recording correctness + learning feedback**，不自行建立疾病診斷或轉介數值門檻。

---

## 檔案

- `index.html`：GitHub Pages 前台。
- `Code.gs`：Google Apps Script 後台。
- `appsscript.json`：Apps Script V8 / Asia-Taipei 設定。
- `SUBMISSIONS_HEADERS.csv`：Google Sheet `Submissions` 欄位參考；實際上 `setup()` 會自動建立工作表。

---

# A. 建立 Google Sheet 後台

## 1. 建立一份新的 Google Sheet

建議名稱：

`AI驗光紀錄輔助學習系統_班級後台_115-1`

取得網址中的 Spreadsheet ID：

`https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`

## 2. 開啟 Apps Script

Google Sheet → **擴充功能 → Apps Script**。

把 `Code.gs` 全部貼入 Apps Script 編輯器。

若使用 manifest，可在專案設定顯示 `appsscript.json` 後貼入本資料夾版本。

## 3. 設定 Script Properties

Apps Script → **專案設定 → 指令碼屬性（Script properties）**：

| Key | Value | 必要 |
|---|---|---|
| `SPREADSHEET_ID` | 上一步取得的 Sheet ID | 必填 |
| `CLASS_TOKEN` | 自訂班級同步碼，例如一組課堂代碼 | 建議 |

`CLASS_TOKEN` 不是完整的身分驗證，只是課堂試跑時降低不必要寫入的簡易門檻。

## 4. 執行 setup()

在 Apps Script 編輯器選擇 `setup` → 執行。

第一次會要求 Google 授權。

執行成功後，Google Sheet 會自動建立：

- `Submissions`：每次分析的完整學習資料
- `Students`：學生跨次練習摘要
- `Dashboard`：班級基本統計
- `Settings`：系統版本資訊
- `SyncLog`：後台同步紀錄 / 錯誤

## 5. 部署 Web App

Apps Script：

**部署 → 新增部署作業 → 類型：網頁應用程式（Web app）**

建議：

- Execute as：**Me**
- Who has access：依學校 Google Workspace 權限設定；Classroom Pilot 需讓學生瀏覽器可 POST 到此 Web App

部署後複製以 `/exec` 結尾的 Web App URL。

---

# B. 設定前台

開啟 `index.html` → **設定**：

1. 填入學生自己的 Gemini API Key。
2. Model 固定使用 `gemini-2.5-flash`。
3. Google Apps Script Web App URL：貼入 `/exec` URL。
4. 課程名稱：例如 `視光學實驗`。
5. 預設班級：例如 `五視一孝`。
6. 班級同步碼：若 Apps Script 有設定 `CLASS_TOKEN`，此處填相同內容。
7. 勾選「分析完成後自動同步 Google Sheet」。
8. 按「測試送出」，再到 `SyncLog` 確認是否收到 `PING`。

### V0.6 API Key 原則

本版本是 Classroom Pilot，仍由瀏覽器直接呼叫 Gemini API，因此：

- ✅ 可由每位學生使用自己的 API Key。
- ❌ 不要把教師共用 API Key 寫進 `index.html` 或 GitHub Repository。
- V1.0 再改成 Backend / API Proxy，讓 Gemini Key 完全留在伺服器端。

---

# C. 上 GitHub Pages

## 最簡單方式

1. 建立一個 GitHub Repository，例如：
   `ai-optometry-record-learning`
2. 將本資料夾中的 `index.html` 上傳至 repository root。
3. `README.md` 也可一起上傳。
4. GitHub Repository → **Settings → Pages**。
5. Source 選擇 **Deploy from a branch**。
6. Branch 選 `main`、Folder 選 `/ (root)`。
7. 儲存後即可取得 GitHub Pages 網址。

`Code.gs` 不會在 GitHub Pages 執行；它必須部署在 Google Apps Script。

---

# D. V0.6 已完成的 V3.3 結構

C 區目前已結構化：

- Cover Test：sc / cc、Distance / Near
- EOM / Motility、9-point
- Stereopsis：Test、sc/cc、sec arc / threshold / Gross / No stereo / Unable
- Color Vision：HRR / Ishihara / D-15 / TCU / Other、OD / OS、Interpretation
- NCT / IOP：時間、OD / OS 各三次原始值
- Worth 4 Dot：DV / NV、Light / Dark、interpretation
- NPC：Target / Break / Recovery
- Pupils
- Screening VF OD / OS
- Hirschberg / Krimsky / Brückner
- NPA / Amp / Pinhole VA
- Maddox Rod / Modified Thorington
- NRA / PRA
- Slit Lamp Anterior Segment：OD / OS × Lids/Lashes、Conjunctiva、Cornea、AC/Angle、Iris、Lens
- Posterior Segment：OD / OS × Media、Disc、C/D H/V、Vessels、Macula、Background
- Gait

D 區目前已結構化：

- VAsc / Vsc：Distance + Near，OD / OS / OU
- Entering Rx：Sph / Cyl / Axis / Add / Prism / Base
- VAcc / Vcc：Distance + Near
- Final Rx：Sph / Cyl / Axis / Add / Prism / Base
- Binocular / Monocular PD，Distance / Near
- VA through Final Rx：Distance Vacc、Near VA、Range OU
- Other tests

E 區目前已補：

- Problem List
- Follow-up
- Recommend correction
- Further exam
- Ophthalmology referral
- Referral urgency：一般 / 儘速 / 緊急
- Referral form
- Patient Education
- Next appointment

---

# E. V0.6 規則策略

目前有三種提示：

- `Error`：可客觀判定的紀錄格式錯誤，例如 Cyl 有值卻缺 Axis、Axis 超出 1–180°、數值格式錯誤。
- `Warning`：紀錄不完整或前後不一致，例如 IOP 沒有保留三次原始值、轉介卻缺 urgent level。
- `Review`：OCR confidence 不足、版本疑義等需要人工確認情況；不直接當成確定錯誤。

V0.6 **尚未加入**「IOP > 某值即轉介」、「VA 差多少即異常」等臨床數值門檻。這些應先經教師定稿與 Gold Standard 驗證，再進 Rule Version 1.0。

---

# F. 今晚正式試跑前 Checklist

- [ ] 用一份「完整正確 V3.3」跑一次，確認前三個規則分數應接近滿分。
- [ ] 用一份「刻意漏 Axis / IOP 少一次 / Referral 不一致」測試提示。
- [ ] Gemini extraction 至少人工核對 3–5 份。
- [ ] `SyncLog` 收到 PING。
- [ ] `Submissions` 收到真實測試資料。
- [ ] `Students` 正確累加同學的 attempts / avg / best score。
- [ ] GitHub Pages HTTPS 下測試攝影機權限。
- [ ] 手機 Safari / Chrome 至少各測一次上傳流程。
- [ ] 測試 PDF 兩頁上傳。
- [ ] 確認測試表單已去識別化，不含受檢者敏感個資。

---

## 下一版建議（V0.7 → V1.0）

1. 建立 40–60 份 Gold Standard（正確 + 人工植入錯誤）。
2. 對每個 V3.3 欄位計算 extraction accuracy。
3. Rule Engine 與教師判定比較 precision / recall。
4. 教師 Dashboard 改成真正的全班 longitudinal learning analytics。
5. 加入「學生修正後再上傳」前後版本比較。
6. 將 Gemini 呼叫移入安全 Backend / API Proxy。
7. 再決定是否導入臨床數值門檻。


## V0.6.3 教師後台密碼鎖

- 「教師紀錄」「教師分析」「後台設定」三個頁面需先輸入管理密碼。
- 成功後只在目前分頁 session 解鎖；關閉分頁後需重新輸入。
- 右上角「鎖定後台」可手動登出。
- 前端只保存密碼的 SHA-256 雜湊，不保存明文。
- 注意：GitHub Pages 是靜態前端，這屬於介面層存取控制；正式版仍應使用後端登入/權限驗證。
