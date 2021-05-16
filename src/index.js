// import sub from './sub' // sub.js をインポートする(.jsは省略可能)
// import './sub'; // sub.js をインポート(更に省略するケース)
import { NES } from './scripts/nes';
import { reload } from './scripts/reload';

import './styles.scss';

function init() {
  fetch('./roms/hello.nes')
    .then((res) => res.arrayBuffer())
    .then((nesBuffer) => {
      // console.log('nesBuffer:', nesBuffer);
      const nes = new NES(nesBuffer);
      nes.disp_charrom();
      // nes.start();
    });
}
document.addEventListener('DOMContentLoaded', function () {
  init();
});

// reload elements
var dropZone = document.getElementById('drop-zone');
var fileInput = document.getElementById('file-input');

dropZone.addEventListener('dragover', function (e) {
  e.stopPropagation();
  e.preventDefault();
  this.style.background = '#e1e7f0';
}, false);

dropZone.addEventListener('dragleave', function (e) {
  e.stopPropagation();
  e.preventDefault();
  this.style.background = '#ffffff';
}, false);

fileInput.addEventListener('change', function () {
  reload(this.files[0]);
});

dropZone.addEventListener('drop', function (e) {
  e.stopPropagation();
  e.preventDefault();
  this.style.background = '#ffffff'; //背景色を白に戻す
  var files = e.dataTransfer.files; //ドロップしたファイルを取得
  if (files.length > 1) return alert('アップロードできるファイルは1つだけです。');
  fileInput.files = files; //inputのvalueをドラッグしたファイルに置き換える。
  reload(files[0]);
}, false);
