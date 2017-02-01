'use strict';
export default class Syntax {

  areBracketsInOrder = (str) => {
    let closeBrackets = new Map(
        [
          [']', '['],
          ['}', '{'],
          [')', '('],
          ['>', '<'],
        ]
    );

    let openBrackets = new Map(
        [
          ['[', '['],
          ['{', '{'],
          ['(', '('],
          ['<', '<'],
        ]
    )
    let isError = false;

    const iter = (i, len, isError, acc) => {
      if (i > len || isError) return !isError && !acc.length;

      if (closeBrackets.has(str[i])) {
        let isError = acc.pop() !== closeBrackets.get(str[i]);
        return iter(++i, len, isError, acc);
      }

      if (openBrackets.has(str[i])) {
          acc.push(openBrackets.get(str[i]));
          return iter(++i, len, isError, acc);
      }

      return iter(++i, len, isError, acc);
    }
    return iter(0, str.length, isError, [])
  };

  checkSyntax = (str) => {
    return this.areBracketsInOrder(str) ? 0 : 1;
  };

  init() {
    console.log('checkSyntax')
    console.log (this.checkSyntax("---((((((()))))))----") === 0);
    console.log (this.checkSyntax("---()(----") === 1);
    console.log (this.checkSyntax ("") === 0);
    console.log (this.checkSyntax ("before ( middle []) after ") === 0);
    console.log (this.checkSyntax (") (") === 1);
    console.log (this.checkSyntax ("} {") === 1);
    console.log (this.checkSyntax ("<>(])") === 1);
    console.log (this.checkSyntax ("(  [  <>  ()  ]  <>  )") === 0);
    console.log (this.checkSyntax ("   (      [)") === 1);
  }
}

