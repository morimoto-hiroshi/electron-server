const {app, BrowserWindow} = require('electron');

/**
 * ウィンドウ作成
 */
const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
    })
    mainWindow.loadFile('public/index.html', {query: {isElectron: true}});

    //デベロッパーツール(f12)表示
    mainWindow.webContents.openDevTools()
}

//Electron の初期化が完了した。
app.whenReady().then(() => {
    createWindow()

    //MacではDockアイコンクリック時にウィンドウが無ければ開く。
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
});

//全ウィンドウが閉じたら終了。ただしMacは除く。
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

//httpサーバー
const http = require('http');
const url = require('url');
const PORT = 3000; //httpサーバーのポート
http.createServer((request, response) => {
    console.log(`${new Date()} ${request.method} ${request.url}`);
    const urlPathname = url.parse(request.url).pathname;
    switch (urlPathname) {
        case '/api/hello':
            response.writeHead(200, {'Content-Type': 'text/json'});
            response.write(JSON.stringify({'msg': 'hello this is http-server on main.js'}));
            response.end();
            return;
    }
    response.writeHead(404);
    response.end();
}).listen(PORT);
