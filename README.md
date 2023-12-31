# electron-server

+ Electronでローカルサーバーと通信

## ローカルディレクトリの構築メモ

### Electronのインストール

```
npm init
npm install --save-dev electron
```

--save-dev オプションは electron の依存関係を dependencies でなく devDependencies に設定する。
```
  "devDependencies": {
    "electron": "^25.2.0"
  }
```
配布用ビルドで dependencies に electron があるとエラーになる。

### package.json の修正

+ "main" を "main.js" に変更。
+ scripts に "start": "electron ." を追加。

```
  "main": "main.js",
  "scripts": {
    "start": "electron .",
  },
```

### 開発モードで実行

+ Electronから起動 isElectron:true
```
npm start
```

+ ブラウザで index.html を直接読み込んだ場合（エクスプローラで index.html を実行した場合）は isElectron:false で動く。

## 配布用パッケージ作成

### package.json の修正

+ author と description を記述する。空欄だと make エラーになる。

### ビルド

```
npm install --save-dev @electron-forge/cli
npx electron-forge import
npm run make
```

### CSP (Content-Security-Policy)

+ [electron-test](https://github.com/morimoto-hiroshi/electron-test)のCSPヘッダに加えて、content-srcの記述が必要。

```
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; connect-src http://localhost:3000/"">

```

+ [MDN - コンテンツセキュリティポリシー (CSP)](https://developer.mozilla.org/ja/docs/Web/HTTP/CSP)

## 参考

+ [Electron 公式 - クイックスタート](https://www.electronjs.org/ja/docs/latest/tutorial/quick-start)
+ [Zenn Electron入門 - メインプロセスとレンダラープロセス](https://zenn.dev/sprout2000/books/6f6a0bf2fd301c/viewer/13319)
