/* nesrom.js */
import { parse } from './parser';
import log from './logger';

export class NESROM {
  constructor(nesBuffer, textarea_charROM) {
    let nesROM = parse(nesBuffer);
    if (nesROM === false) {
      textarea_charROM.value = 'This file is not NES format.';
      return;
    }
    this.headerROM = nesROM.headerROM;
    this.programROM= nesROM.programROM;
    this.characterROM= nesROM.characterROM;
    // show ROM data.
    this.display_charROM(textarea_charROM);
  }
  display_charROM(textarea_charROM) {
    // console.log('nesROM : ', nesROM);
    // console.log('isHorizontalMirror : ', nesROM.isHorizontalMirror);
    // console.log(nesROM.programROM);
    console.log('headerROM:');
    log.logHexarray(this.headerROM);
    // console.log('programROM:');
    // log.log_hexarray(nesROM.programROM);
    // console.log('characterROM:');
    // log.log_hexarray(nesROM.characterROM);
  
    textarea_charROM.value = '';
    textarea_charROM.value += 'header : ' + log.toHexarray(this.headerROM) + '\n';
    let program_pages = this.headerROM[4];
    let charrom_pages = this.headerROM[5];
    let mapper = (((this.headerROM[6] & 0xF0) >> 4) | this.headerROM[7] & 0xF0);
    textarea_charROM.value += 'program pages = ' + log.toHex(program_pages) + '\n';
    textarea_charROM.value += 'charrom pages = ' + log.toHex(charrom_pages) + '\n';
    textarea_charROM.value += 'mapper = ' + mapper + '\n';
    textarea_charROM.value += '------------------\n';
    // 
    // const PROGRAM_ROM_SIZE = 0x4000;   // unit size is 16KB
    const CHARACTOR_ROM_SIZE = 0x2000; // unit size is 8KB
    let spritesNum = CHARACTOR_ROM_SIZE * charrom_pages / 16;
    textarea_charROM.value += 'CHARACTOR_ROM_DATA:\n';
    for (let i = 0; i < spritesNum; i++) {
      let chardata = this.characterROM.slice(i * 16, i * 16 + 16);
      textarea_charROM.value += log.toHex(i) + ' : ' + log.toHexarray(chardata) + '\n';
    }
    textarea_charROM.value += '------------------\n';
  }
}

