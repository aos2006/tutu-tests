//Задача #1
'use strict';

var getSubstring = function getSubstring(_ref) {
  var str = _ref.str;
  var subStr1 = _ref.subStr1;
  var subStr2 = _ref.subStr2;

  if (str === '') return -1;
  var subStrPosition1 = str.lastIndexOf(subStr1, str.length - 1);
  var subStrPosition2 = str.lastIndexOf(subStr2, str.length - 1);

  return subStrPosition1 !== -1 ? subStrPosition1 : subStrPosition2 !== -1 ? subStrPosition2 : subStrPosition1 === subStrPosition2 ? subStrPosition1 : -1;
};

function func(s, a, b) {

  if (s.match(/^$/)) {
    return -1;
  }

  var i = s.length - 1;
  var aIndex = -1;
  var bIndex = -1;

  while (aIndex == -1 && bIndex == -1 && i > 0) {
    if (s.substring(i, i + 1) == a) {
      aIndex = i;
    }
    if (s.substring(i, i + 1) == b) {
      bIndex = i;
    }
    i = i - 1;
  }
  if (aIndex != -1) {
    if (bIndex == -1) {
      return aIndex;
    } else {
      return Math.max(aIndex, bIndex);
    }
  }

  if (bIndex != -1) {
    return bIndex;
  } else {
    return -1;
  }
}

console.log('Refactoring task 1', func('12345560', '0', '0'), getSubstring({ str: '12345560', subStr1: '0', subStr2: '0' }));

//Задача 2
var drawRating = function drawRating(vote) {
  if (vote > 0 && vote <= 100) return Math.ceil(vote / 20);
  throw new Error('Некорректное значение');
};

// Проверка работы результата
console.log(drawRating(0));
console.log(drawRating(1));
console.log(drawRating(50));
console.log(drawRating(99));
console.log(drawRating(-1));