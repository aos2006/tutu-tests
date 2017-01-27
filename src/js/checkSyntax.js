'use strict';
let compose = (f, g) => (str, ex) => f(g(str, ex));
let checkSequence = (arr) => {
    let pairs = 0;
    const iter = (list) => {
      if (!list.length) return pairs;
      return list.reduce((prev, item, i) => {
        if (
            `${prev}${item}` === '<>' ||
            `${prev}${item}` === '[]' ||
            `${prev}${item}` === '{}' ||
            `${prev}${item}` === '()'
        ) {
          ++pairs;
          list.splice(--i, 2);
          iter(list);
        }
        return item;
      });
    }
    iter(arr);
    return pairs;
}
const sortBracketsStr = (str, excludedBrackets = []) => {
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

  return str.split('').filter(char => bracketsList.has(char));
}

const checkSyntax = (str, excludedBrackets = []) => {
  let sortedArr = compose(arr => arr, sortBracketsStr)(str, excludedBrackets);
  let pairs = checkSequence(sortedArr);
  let arrLen = sortedArr.length;
  if(!arrLen) return 0;
  return arrLen / pairs === 2 ? 0 : 1;
}

console.log (checkSyntax ("---()[][]----") === 0);
console.log (checkSyntax ("") === 0);
console.log (checkSyntax ("[]{}{}((()))") === 0);
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

