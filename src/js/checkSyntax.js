'use strict';
export default class Syntax {
  getOnlyBrackets = (str) => {
    var regexp = /[^()\[\]{},<>]/g;
    return (str).replace(regexp, "");
  };
  areBracketsInOrder = (str) => {
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

  checkSyntax = (str) => {
    const newStr = this.getOnlyBrackets(str);
    return this.areBracketsInOrder(newStr) ? 0 : 1;
  };

  init() {
    console.log('checkSyntax')
    console.log (this.checkSyntax("---((((((()))))))----") === 0);
    console.log (this.checkSyntax ("") === 0);
    console.log (this.checkSyntax ("before ( middle []) after ") === 0);
    console.log (this.checkSyntax (") (") === 1);
    console.log (this.checkSyntax ("} {") === 1);
    console.log (this.checkSyntax ("<>(])") === 1);
    console.log (this.checkSyntax ("(  [  <>  ()  ]  <>  )") === 0);
    console.log (this.checkSyntax ("   (      [)") === 1);
  }
}

