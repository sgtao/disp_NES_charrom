/* parser.js */

// import log from './logger';

const NES_HEADER_SIZE = 0x0010;
const PROGRAM_ROM_SIZE = 0x4000;
const CHARACTER_ROM_SIZE = 0x2000;

// const NesROM = {
//   isHorizontalMirror = false,
//   characterROM = new Uint8Array(),
//   programROM   = new Uint8Array(),
// };

export function parse(nesBuffer) {
  const nes = new Uint8Array(nesBuffer);
  // log.hexarray(nes);
  if ([].slice.call(nes, 0, 3).map(v => String.fromCharCode(v)).join('') !== 'NES') {
    console.log('This file is not NES format.');
    return false;
  }
  const programROMPages = nes[4];
  const characterROMPages = nes[5];
  const isHorizontalMirror = !(nes[6] & 0x01);
  const mapper = (((nes[6] & 0xF0) >> 4) | nes[7] & 0xF0);
  console.info('prom pages =', programROMPages);
  console.info('crom pages =', characterROMPages);
  console.info('mapper', mapper);
  const characterROMStart = NES_HEADER_SIZE + programROMPages * PROGRAM_ROM_SIZE;
  const characterROMEnd = characterROMStart + characterROMPages * CHARACTER_ROM_SIZE;

  // console.log('prom pages = ', programROMPages);
  const nesROM = {
    isHorizontalMirror,
    headerROM: nes.slice(0, NES_HEADER_SIZE - 1),
    programROM: nes.slice(NES_HEADER_SIZE, characterROMStart - 1),
    characterROM: nes.slice(characterROMStart, characterROMEnd - 1),
  };
  return nesROM;
}

