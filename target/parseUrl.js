'use strict';

console.log('parseUrl');
var parseUrl = function parseUrl(url) {
  if (url === '') throw new Error('Неккоректный url');
  var a = document.createElement('a');
  a.href = url;
  return a;
};

var a = parseUrl('http://tutu.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo');

console.log(a.href);
console.log(a.hash);
console.log(a.port);
console.log(a.host);
console.log(a.protocol);
console.log(a.hostname);
console.log(a.pathname);
console.log(a.origin);