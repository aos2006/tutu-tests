'use strict';
let checkSequence = (arr) => {
    let pairs = 0;
    const iter = (list) => {
      if (!list.length) return pairs;
      const newList = list.reduce((prev, item, i) => {
        if (
            `${prev}${item}` === '<>' ||
            `${prev}${item}` === '[]' ||
            `${prev}${item}` === '{}' ||
            `${prev}${item}` === '()'
        ) {
          ++pairs;
          list.splice(--i, 2);
          return iter(list, 0);
        }
        return item;
      });

      return pairs;
    }

    return iter(arr);
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
  return !sortedStr.length ? 0 : sortedStr.length / checkSequence(sortedStr) !== 2 ? 1 : 0;
}

console.log (checkSyntax ("---()[{{{{{{}}}}}}](){----") === 1);
console.log (checkSyntax ("") === 0);
console.log (checkSyntax ("before ( middle []) after ") === 0);
console.log (checkSyntax ("( {} [] <> ){(((])))}") === 1);
console.log (checkSyntax (") (", ['(']) === 0);
console.log (checkSyntax ("} {") === 1);
console.log (checkSyntax ("} {", ['{']) === 0);
console.log (checkSyntax ("<(   >)") === 1);
console.log (checkSyntax ("<(   >)", ['(']) === 0);
console.log (checkSyntax ("(  [  <[]>  ()  ]  <>  )") === 0);
console.log (checkSyntax ("(  [  <>  ()  ]  <>  )", ['<', '[', '(']) === 0);
console.log (checkSyntax ("   (      [)") === 1);
console.log (checkSyntax ("   (      [)", ['[']) === 0);

