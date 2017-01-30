import 'whatwg-fetch'
export class Table {
  constructor(table) {
    this.grid = table;
    this.maxCount = 10;
    this.headItems = {
      '1': {
         isSortDown: true
      },
      '2': {
        isSortDown: true
      },
      '3': {
        isSortDown: true
      },
      '4': {
        isSortDown: true
      },
      '5': {
        isSortDown: true
      }
    }
    this.apiUrls = {
      smallSize: `http://www.filltext.com/?rows=${this.maxCount}&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}`,
      bigSize: `http://www.filltext.com/?rows=${this.maxCount}&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}`
    }
  }


  toggleClass = (elem, className) => {
    elem.classList.toggle(className);
  }

  sortMethods = {
    'string': (isDown, colNum) => (rowA, rowB) => {
      return isDown ?
      rowA.cells[colNum].getAttribute('data-sort-value') > rowB.cells[colNum].getAttribute('data-sort-value') :
      rowA.cells[colNum].getAttribute('data-sort-value') < rowB.cells[colNum].getAttribute('data-sort-value');
    },
    'number': (isDown, colNum) => (rowA, rowB) => {
      return isDown ?
      rowA.cells[colNum].getAttribute('data-sort-value') - rowB.cells[colNum].getAttribute('data-sort-value') :
      rowB.cells[colNum].getAttribute('data-sort-value') - rowA.cells[colNum].getAttribute('data-sort-value');
    }
  }

  hideLoader = (elem, className) => elem.classList.toggle(className);

  getSiblings = (className, elem) => [].filter.call(document.querySelectorAll(className), item => item.id !== elem.id);

  run = (list, fn) => {
    try {
      this.hideLoader(document.querySelector('.js-loader'), 'loader--show');
      fn(list);
    } catch (e) {
      this.grid.innerHTML = `<tr><td>${'Что-то пошло не так'}</td></tr>`;
    }
  }

  render = (list) => {
    let tbody = document.createElement('tbody');
    let td = document.createElement('td');

    list.forEach((item) => {
      let row = document.createElement('tr');
      Object.keys(item).forEach(key => {
          let td = document.createElement('td');
          td.textContent = item[key];
          let val = +item[key] ? item[key] : item[key].toLowerCase();
          td.setAttribute('data-sort-value', val);
          row.appendChild(td);
      });
      tbody.appendChild(row);
    });

    this.grid.appendChild(tbody);
  }


  sortGrid = (colNum, type, id) => {
    let tbody = this.grid.getElementsByTagName('tbody')[0];
    let rowsArray = [].slice.call(tbody.rows);
      rowsArray.sort(this.sortMethods[type](this.headItems[id].isSortDown, colNum));
      this.grid.removeChild(tbody);
      rowsArray.forEach(item => tbody.appendChild(item))
      this.grid.appendChild(tbody);
      this.headItems[id].isSortDown = !this.headItems[id].isSortDown;

}

  handleClick = (ev) => {
    if (ev.target.tagName !== 'TH') return null;
    this.toggleClass(ev.target, 'table__cell--sort-down');
    [].forEach.call(
        this.getSiblings('.table__cell', ev.target),
        item => {
          if (!item.classList.contains('table__cell--sort-down')) item.classList.add('table__cell--sort-down');
        });
    this.sortGrid(ev.target.cellIndex, ev.target.getAttribute('data-type'), ev.target.id);
  }

  init(){
    fetch(this.apiUrls.smallSize).then((resp) => {
      if(resp.status === 200) {
        resp.json().then(data => this.run(data, this.render));
      }
    }).catch(err => this.run(err, this.render));

    this.grid.addEventListener('click', this.handleClick);
  }

}

export default Table;