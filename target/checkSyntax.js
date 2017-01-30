'use strict';
var getOnlyBrackets = function getOnlyBrackets(str) {
  var regexp = /[^()\[\]{},<>]/g;
  return str.replace(regexp, "");
};
var areBracketsInOrder = function areBracketsInOrder(str) {
  var brackets = new Map([[']', '['], ['}', '{'], [')', '('], ['>', '<']]);
  var isClean = true;
  var iter = function iter(_x, _x2, _x3, _x4, _x5, _x6) {
    var _again = true;

    _function: while (_again) {
      var i = _x,
          len = _x2,
          isCleaning = _x3,
          brackets = _x4,
          cur = _x5,
          acc = _x6;
      _again = false;

      if (i >= len && !isCleaning) return isCleaning && !acc.length;
      if (i >= len) return isCleaning && !acc.length;
      if (brackets.has(cur[i])) {
        var _isCleaning = acc.pop() === brackets.get(cur[i]);
        _x = ++i;
        _x2 = len;
        _x3 = _isCleaning;
        _x4 = brackets;
        _x5 = cur;
        _x6 = acc;
        _again = true;
        _isCleaning = undefined;
        continue _function;
      } else {
        acc.push(str[i]);
        _x = ++i;
        _x2 = len;
        _x3 = isCleaning;
        _x4 = brackets;
        _x5 = cur;
        _x6 = acc;
        _again = true;
        _isCleaning = undefined;
        continue _function;
      }
    }
  };
  return iter(0, str.length, isClean, brackets, str, []);
};
var checkSyntax = function checkSyntax(str) {
  var newStr = getOnlyBrackets(str);
  return areBracketsInOrder(newStr) ? 0 : 1;
};
console.log('checkSyntax');
console.log(checkSyntax("---((((((()))))))----") === 0);
console.log(checkSyntax("") === 0);
console.log(checkSyntax("before ( middle []) after ") === 0);
console.log(checkSyntax(") (") === 1);
console.log(checkSyntax("} {") === 1);
console.log(checkSyntax("<>(])") === 1);
console.log(checkSyntax("(  [  <>  ()  ]  <>  )") === 0);
console.log(checkSyntax("   (      [)") === 1);