function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


export function randomColor() {
  let r = getRandomIntInclusive(0, 255).toString(16);
  let g = getRandomIntInclusive(0, 255).toString(16);
  let b = getRandomIntInclusive(0, 255).toString(16);

  return `#${r}${g}${b}`;
}
