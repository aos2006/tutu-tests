'use strict';
let checkSequence = (arr) => {
    const iter = (list) => {
      if (list.length === 0) return 0;
      if (list.length === 1) return 1;
      const newList = list.reduce((prev, item, i) => {
        if (
            prev + item === '<>' ||
            prev + item === '[]' ||
            prev + item === '{}' ||
            prev + item === '()'
        ) {
          if (list.length === 2) {
            list.splice(0, 2);
            return list;
          }
          list.splice(i - 1, 2)
          return list;
        }

        return item;
      }, list[0]);

      return iter(newList);
    }

    return iter(arr)
}

const checkSyntax = (str, excludedBrackets = []) => {
  let bracketsList = new Map(
      [
       ['(', {car: ')', cdr: '('}],
       [')', {car: '(', cdr: ')'}],
       ['[', {car: ']', cdr: '['}],
       [']', {car: '[', cdr: ']'}],
       ['{', {car: '}', cdr: '{'}],
       ['}', {car: '{', cdr: '}'}],
       ['<', {car: '>', cdr: '<'}],
       ['>', {car: '<', cdr: '>'}],
      ]
  );
  excludedBrackets.length > 0 ? excludedBrackets.forEach(item => {
    bracketsList.delete(bracketsList.get(item).car);
    bracketsList.delete(item);
  }) : null;
  let sortedStr = str.split('').filter(char => bracketsList.has(char));
  return checkSequence(sortedStr);
}

console.log (checkSyntax ("---(++++)----") === 0);
console.log (checkSyntax ("") === 0);
console.log (checkSyntax ("before ( middle []) after ") === 0);
console.log (checkSyntax (") (") === 1);
console.log (checkSyntax (") (", ['(']) === 0);
console.log (checkSyntax ("} {") === 1);
console.log (checkSyntax ("} {", ['{']) === 0);
console.log (checkSyntax ("<(   >)") === 1);
console.log (checkSyntax ("<(   >)", ['(']) === 0);
console.log (checkSyntax ("(  [  <>  ()  ]  <>  )") === 0);
console.log (checkSyntax ("(  [  <>  ()  ]  <>  )", ['<', '[', '(']) === 0);
console.log (checkSyntax ("   (      [)") === 1);
console.log (checkSyntax ("   (      [)", ['[']) === 0);

