const RANDOM_ARR = new Uint8Array(16);

const byteToHex: string[] = [];
const offset = 0;

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

export const uuid = () => {
  const randoms = crypto.getRandomValues(RANDOM_ARR);

  randoms[6] = (randoms[6] & 0x0f) | 0x40;
  randoms[8] = (randoms[8] & 0x3f) | 0x80;

  return (
    byteToHex[randoms[offset + 0]] +
    byteToHex[randoms[offset + 1]] +
    byteToHex[randoms[offset + 2]] +
    byteToHex[randoms[offset + 3]] +
    "-" +
    byteToHex[randoms[offset + 4]] +
    byteToHex[randoms[offset + 5]] +
    "-" +
    byteToHex[randoms[offset + 6]] +
    byteToHex[randoms[offset + 7]] +
    "-" +
    byteToHex[randoms[offset + 8]] +
    byteToHex[randoms[offset + 9]] +
    "-" +
    byteToHex[randoms[offset + 10]] +
    byteToHex[randoms[offset + 11]] +
    byteToHex[randoms[offset + 12]] +
    byteToHex[randoms[offset + 13]] +
    byteToHex[randoms[offset + 14]] +
    byteToHex[randoms[offset + 15]]
  ).toLowerCase();
};
