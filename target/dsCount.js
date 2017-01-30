'use strict';
var dsCount = function dsCount() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var str = args[0];
  var rest = args.slice(1);

  var concatedSubstings = rest.join('');
  var iter = function iter(_x, _x2, _x3, _x4) {
    var _again = true;

    _function: while (_again) {
      var count = _x,
          position = _x2,
          curr = _x3,
          substring = _x4;
      _again = false;

      if (curr.indexOf(substring, position) === -1) return count;

      var newPosition = curr.indexOf(substring, position);
      _x = ++count;
      _x2 = ++newPosition;
      _x3 = curr;
      _x4 = substring;
      _again = true;
      newPosition = undefined;
      continue _function;
    }
  };

  return iter(0, 0, str.toLowerCase(), concatedSubstings.toLowerCase());
};
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
} catch (e) {
  console.error(e);
}

// Простая функция тестирования

function test(call, args, count, n) {
  var r = call.apply(n, args) === count;
  console.assert(r, 'Finded items count: ' + count);
  if (!r) throw "Test failed!";
}