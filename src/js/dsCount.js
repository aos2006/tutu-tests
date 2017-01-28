'use strict';
let dsCount = (...args) => {
  const [str, ...rest] = args;
  const concatedSubstings = rest.join('');
  const iter = (count, position, curr, substring) => {
      if(curr.indexOf(substring, position) === -1) return count;

      let newPosition = curr.indexOf(substring, position);
      return iter(++count, ++newPosition, curr, substring);
  }

  return iter(0, 0, str.toLowerCase(), concatedSubstings.toLowerCase())


}
console.log('dsCount');
try {
  test(dsCount, ['ab___ab__', 'a', 'b'], 2);
  test(dsCount, ['___cd____', 'c', 'd'], 1);
  test(dsCount, ['de_______', 'd', 'e'], 1);
  test(dsCount, ['12_12__12', '1', '2'], 3);
  test(dsCount, ['_ba______', 'a', 'b'], 0);
  test(dsCount, ['_a__b____', 'a', 'b'], 0);
  test(dsCount, ['-ab-аb-ab', 'a', 'b'], 2);
  test(dsCount, ['aAa', 'a', 'a'], 2);
  console.info("Congratulations! All tests success passed.");
} catch(e) {
  console.error(e);
}

// Простая функция тестирования

function test(call, args, count, n) {
  let r = (call.apply(n, args) === count);
  console.assert(r, `Finded items count: ${count}`);
  if (!r) throw "Test failed!";
}

