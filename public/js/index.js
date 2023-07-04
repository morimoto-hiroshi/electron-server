/**
 * ロード時の初期化処理
 */
window.onload = () => {
    //ボタンのハンドラ設定
    document.querySelector('#file-read-button').onclick = onFileReadButton;
    document.querySelector('#file-write-button').onclick = onFileWriteButton;

    //ローカルサーバーとの通信
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/api/hello', true);
    xhr.onload = () => {
        const result = JSON.parse(xhr.response);
        document.querySelector('#api-result').innerText = result.msg;
    };
    xhr.send(null);
}

/**
 * 読み込みボタン
 */
async function onFileReadButton() {
    const pickerOpts = {
        types: [
            {
                accept: {'text/*': ['.txt', '.json']},
                description: 'テキストファイル',
            },
        ],
        excludeAcceptAllOption: true,
        multiple: false,
    };
    try {
        const fileHandles = await window.showOpenFilePicker(pickerOpts);
        for (var handle of fileHandles) {
            const file = await handle.getFile();
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function () {
                document.querySelector('#file-read-result').value = reader.result;
            };
            reader.onerror = function () {
                document.querySelector('#file-read-result').innerText = `ERROR: ${reader.error}`;
            };
        }
    } catch (e) {
        console.log('onFileReadButton', e);
    }
}

/**
 * 保存ボタン
 */
async function onFileWriteButton() {
    const text = document.querySelector('#file-read-result').value;
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', 'data.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
