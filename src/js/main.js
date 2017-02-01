import Table from './Table';
import Syntax from './checkSyntax';
import Count from './dsCount';
import Url from './parseUrl';
import Refactoring from './refactoring';
import Algorithm from './Algorithm';
let table = new Table(document.getElementById('table'));
table.init();

let syntax = new Syntax();
syntax.init();

let count = new Count();
count.init();

let url = new Url();
url.init();

let algorithm = new Algorithm();
console.log (algorithm.init ());

let refactoring = new Refactoring();
refactoring.init();