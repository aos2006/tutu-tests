console.log('parseUrl');
let parseUrl = (url) => {
  let a = document.createElement('a');
  a.href = url;
  return new Map([
      ['href', url],
      ['protocol', a.protocol],
      ['hostname', a.hostname],
      ['hash', a.hash],
      ['port', a.port],
      ['host', a.host],
      ['pathname', a.pathname],
      ['origin', a.origin],
  ]);
}

let a = parseUrl('http://tutu.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo');

console.log(a.get('href'));
console.log(a.get('hash'));
console.log(a.get('port'));
console.log(a.get('host'));
console.log(a.get('protocol'));
console.log(a.get('hostname'));
console.log(a.get('pathname'));
console.log(a.get('origin'));
