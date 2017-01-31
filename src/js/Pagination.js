export default class Pagination {
  constructor({listSize, step, handleClick}) {
    this.listSize = listSize;
    this.handleClick = handleClick;
    this.step = step;
  }

  generate() {
    let list = document.createElement('nav');
    list.classList.add('nav');
    let ul = document.createElement('ul');
    ul.classList.add('pagination');
    for (let i = 1; i < this.listSize / this.step + 1; i++) {
      let li = document.createElement('li');
      let a = document.createElement('a');
      a.href = '#';
      a.textContent = i;
      li.appendChild(a);
      li.addEventListener('click', (ev) => this.handleClick(ev, i));
      ul.appendChild(li)
    }
    list.appendChild(ul);
    return list;
  }
}
