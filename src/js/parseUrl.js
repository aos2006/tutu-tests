export default class Url {
  parseUrl = (url) => {
    if (url === '') throw new Error('Неккоректный url');
    let a = document.createElement ('a');
    a.href = url;
    return a;
  }

  a = this.parseUrl('http://tutu.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo');
  init() {
    console.log(this.a.href);
    console.log(this.a.hash);
    console.log(this.a.port);
    console.log(this.a.host);
    console.log(this.a.protocol);
    console.log(this.a.hostname);
    console.log(this.a.pathname);
    console.log(this.a.origin);
  }

}
