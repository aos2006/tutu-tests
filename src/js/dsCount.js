'use strict';

export default class Count{
 dsCount = (...args) => {
    const [str, ...rest] = args;
    const concatenatedSubstrings = rest.join('');
    const iter = (count, position, curr, substring) => {
      let newPosition = curr.indexOf(substring, position);
      if( newPosition === -1) return count;
      return iter(++count, ++newPosition, curr, substring);
    }

    return iter(0, 0, str, concatenatedSubstrings)


  }

  init() {
    console.log('dsCount');
    try {
      test(this.dsCount, ['ab___ab__', 'A', 'b'], 0);
      test(this.dsCount, ['___cd____', 'c', 'd'], 1);
      test(this.dsCount, ['de_______', 'd', 'e'], 1);
      test(this.dsCount, ['12_12__12', '1', '2'], 3);
      test(this.dsCount, ['_ba______', 'a', 'b'], 0);
      test(this.dsCount, ['_a__b____', 'a', 'b'], 0);
      test(this.dsCount, ['-ab-аb-ab', 'a', 'b'], 2);
      test(this.dsCount, ['aAa', 'a', 'a'], 0);
      console.info("Congratulations! All tests success passed.");
    } catch(e) {
      console.error(e);
    }
  }
}

function test(call, args, count, n) {
  let r = (call.apply(n, args) === count);
  console.assert(r, `Finded items count: ${count}`);
  if (!r) throw "Test failed!";
}


