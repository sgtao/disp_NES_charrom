/* reload.js */
import { NES } from './nes';

// reload file
export function reload(filename) {
  const reader = new FileReader();
  reader.readAsArrayBuffer(filename);
  reader.onload = () => {
    const nesBuffer = new Uint8Array(reader.result);
    const nes = new NES(nesBuffer);
    nes.disp_charrom();
  };
}
