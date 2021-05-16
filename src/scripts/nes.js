/* nes.js */
import { NESROM } from './nesrom';
import { DISPLAY } from './display';

const area_charROM = document.querySelector('#charROM');
const textarea_charROM = area_charROM.querySelector('.textArea');

export class NES {
  constructor(nesBuffer) {
    this.nesROM = new NESROM(nesBuffer, textarea_charROM);
    // this.disp_charrom();
  }
  disp_charrom() {
    let chardisp = new DISPLAY('#display');
    chardisp.dispCharactors(512, this.nesROM.characterROM);
  }
}
