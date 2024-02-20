### [展示](https://magmac.github.io/infiniteScroll/)

# ✨ 使用 vue 實現滾動到底部自動載入新的資料 ✨

<p align="center">
  <img width="50" src="./src/assets/logo.svg" alt="logo">
</p>

## 步驟

### 下載後安裝

```
npm install
```

### 啟動

```
npm run dev
```

## 使用到的套件工具

- <font color=#cf9bf2>eslint</font> - 程式碼風格格式
- <font color=#cf9bf2>axios</font> - 處理 ajax 工具
- <font color=#cf9bf2>qs</font> - 序列化字串使用
- <font color=#cf9bf2>vuex</font> - 狀態管理元件
- <font color=#cf9bf2>vite</font> - 建構/打包專案工具

## 功能 task

### 1. 撈取 gitlab api ropos 資料

- ropos 資料來源 [Will 保哥](https://github.com/doggy8088/).

### 2. 計算 scroll 至底觸發撈取資料事件

- 計算滾動至底觸發 fetch data
- initial per_page: 30 判斷
- 監聽事件 per_page: 10 & next page 判斷
- api loading 防呆使用者體驗 "載入中..."" 判斷，避免使用者一直滾動頁面一直打 api
- api 拉取到最後資料防呆判斷 "沒有更多囉"，避免沒資料後又一直打 api

### 3. scroll top 製作

- 滾動至兩倍螢幕高右下出現 top 按鈕
- 點擊滾動至頂

## 流程大綱

1. 首先於頁面建構一個用來顯示資料的假資料畫面 ./app.vue
2. 於 gitlab 上註冊一組 gitlab api token
3. 建置 api 出入口 ./api
4. 統一打取 api 資料透過 vuex stores 做存取 ./stores
5. 實現關注點分離 view page 不做資料邏輯處理，只處理當頁邏輯應用 ./app.vue
6. 撰寫 scroll 監聽邏輯，撈取資料時機、防呆處理
7. 新增 scroll top 功能實作

repos 使用資料來源 [Will 保哥](https://github.com/doggy8088/).
