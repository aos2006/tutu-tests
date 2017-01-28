'use strict';
var getOnlyBrackets = (str) => {
  var regexp = /[^()\[\]{},<>]/g;
  return (str).replace(regexp, "");
};
var areBracketsInOrder = (str) => {
  let brackets = new Map(
      [
          [']', '['],
          ['}', '{'],
          [')', '('],
          ['>', '<']
      ]
  );
  let isClean = true;
  const iter = (i, len, isCleaning, brackets, cur, acc) => {
    if (i >= len && !isCleaning) return isCleaning && !acc.length;
    if (i >= len) return isCleaning && !acc.length;
    if (brackets.has(cur[i])) {
      let isCleaning = acc.pop() === brackets.get(cur[i]);
      return iter(++i, len, isCleaning, brackets, cur, acc);
    } else {
      acc.push(str[i]);
      return iter(++i, len, isCleaning, brackets, cur, acc);
    }
  }
  return iter(0, str.length, isClean, brackets, str, [])
};
var checkSyntax = (str) => {
  const newStr = getOnlyBrackets(str);
  return areBracketsInOrder(newStr) ? 0 : 1;
};
//console.log (checkSyntax("---((((((()))))))----") === 0);
//console.log (checkSyntax ("") === 0);
//console.log (checkSyntax ("before ( middle []) after ") === 0);
//console.log (checkSyntax (") (") === 1);
//console.log (checkSyntax ("} {") === 1);
//console.log (checkSyntax ("<>(])") === 1);
//console.log (checkSyntax ("(  [  <>  ()  ]  <>  )") === 0);
//console.log (checkSyntax ("   (      [)") === 1);

