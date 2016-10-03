"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomColor = randomColor;
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
  var r = getRandomIntInclusive(0, 255).toString(16);
  var g = getRandomIntInclusive(0, 255).toString(16);
  var b = getRandomIntInclusive(0, 255).toString(16);

  return "#" + r + g + b;
}