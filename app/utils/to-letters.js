export default function toLetters(num) {
  num = num + 1;
  let mod = num % 26;
  let pow = num / 26 | 0;
  let out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');
  return pow ? toLetters(pow) + out : out;
}
