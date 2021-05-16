/* display.js */
// import log from './logger';

export class DISPLAY {
  constructor(el){
    const canvas = document.querySelector(el);
    this.ctx = canvas.getContext('2d');
    if (this.ctx) {
      this.image = this.ctx.createImageData(8 * 16, 8 * 16);
    }
  }
  dispCharactors(num_chars, charROM){
    // try create image 
    // pixel of a char
    let CHAR_PIXEL = 24;
    // refer : https://www.programmingmat.jp/webhtml_lab/canvas_getdata.html
    // 16*16ピクセルのImageDataオブジェクト作成
    let imgData = this.ctx.createImageData(CHAR_PIXEL, CHAR_PIXEL);
    // local function for set imgData
    function _set_imgData(index, red = 0, green = 0, blue = 0, alpha = 255) {
      imgData.data[index] = red;
      imgData.data[index + 1] = green;
      imgData.data[index + 2] = blue;
      imgData.data[index + 3] = alpha;
    }
    function _set_imgPixel(x, y, red, grn, blu) {
      let pixelSize = Math.floor(CHAR_PIXEL / 8);
      for (let i = 1; i < pixelSize; i++) {
        for (let j = 1; j < pixelSize; j++) {
          _set_imgData(4 * (j + x * pixelSize + (i + y * pixelSize) * imgData.width), red, grn, blu);
        }
      }
    }
    function _drawChar(chardata) {
      for (let i = 1; i < (imgData.height - 1); i++) {
        for (let j = 1; j < (imgData.width - 1); j++) {
          _set_imgData((j + i * imgData.width) * 4, 0, 0, 0);
        }
      }
      // 各ピクセルの色情報設定
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (chardata[i] & (0x80 >> j)) {
            _set_imgPixel(j ,  i, 127, 127, 127);
          } 
          if (chardata[i + 8] & (0x80 >> j)) {
            _set_imgPixel(j ,  i, 255, 255, 255);
          } 
        }
      }

      for (let i = 0; i < imgData.width; i++) {
        _set_imgData((i + 0 * imgData.width) * 4, 255, 255, 255);
        _set_imgData((i + (imgData.height - 1) * imgData.width) * 4, 255, 255, 255);
      }
      for (let i = 0; i < imgData.height; i++) {
        _set_imgData((0 + i * imgData.width) * 4, 255, 255, 255);
        _set_imgData(((imgData.width - 1) + i * imgData.width) * 4, 255, 255, 255);
      }
    }
    // 
    for (let charnum = 0; charnum < num_chars ; charnum++) {
      let chardata = charROM.slice(charnum * 16, charnum * 16 + 16);
      // console.log(log.toHex(charnum) + ' : ' + log.toHexarray(chardata));
      _drawChar(chardata);
      let img_pos_x = charnum % 32;
      let img_pos_y = Math.floor(charnum / 32);
      this.ctx.putImageData(imgData, img_pos_x * CHAR_PIXEL, img_pos_y * CHAR_PIXEL);
    }
  }
}
