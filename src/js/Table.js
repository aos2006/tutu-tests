import 'whatwg-fetch';
import Pagination from './Pagination';
import DataPick from './DataPick';
import Search from './Search';
import Loader from './Loader';

export class Table {
  constructor(table) {
    this.container = table
    this.grid = document.createElement('table');
    this.additionalInfo = new Map();
    this.maxCount = 50;
    this.smallSize = 32;
    this.bigSize = 1000;
    this.page = 1;
    this.lastBody = new Map();
    this.memo = {
      str: null,
      rowsArray: null
    };
    this.tbody = null;
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
      smallSize: `http://www.filltext.com/?rows=${this.smallSize}&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}`,
      bigSize: `http://www.filltext.com/?rows=${this.bigSize}&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}`
    }
  }

  headData = [
    {
      id: 1,
      className: 'table__cell table__cell--sort-down',
      attr: 'number',
      txt: 'id'
    },
    {
      id: 2,
      className: 'table__cell table__cell--sort-down',
      attr: 'string',
      txt: 'Имя'
    },
    {
      id: 3,
      className: 'table__cell table__cell--sort-down',
      attr: 'string',
      txt: 'Фамилия'
    },
    {
      id: 4,
      className: 'table__cell table__cell--sort-down',
      attr: 'string',
      txt: 'email'
    },
    {
      id: 5,
      className: 'table__cell table__cell--sort-down',
      attr: 'string',
      txt: 'Телефон'
    }
  ]

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

  filters = {
    'byString': (str, rowsArray) => {
      if (this.memo.str === str) {
        return this.memo.rowsArray;
      }
      let filtered = [].filter.call(rowsArray, item => {
        let tds = [].filter.call (item.querySelectorAll('td'), td =>
            td.textContent.indexOf (str) !== -1
        )
        return tds.length ? true : false
      })

      this.memo = {str: str, rowsArray: filtered};
      return filtered;
    }
  }

  get table() {
    return this.grid;
  }

  get tableBody() {
   return this.table.querySelector('tbody');
  }

  get gridRows() {
    return [].slice.call(this.tableBody.rows);
  }

  get filterMethods(){
    return this.filters;
  }

  initializeEvents(data){
    data.forEach(item => {
      Array.isArray(item.elem) ?
          item.elem.forEach(el => el.addEventListener(item.eventName, item.fn)) :
          item.elem.addEventListener(item.eventName, item.fn);
    });
  }

  load = (api, fn) => {
    fetch(api).then((resp) => {
      if(resp.status === 200) {
        resp.json().then(data => fn(data));
      }
    }).catch(err => fn(err));
  }

  checkElem = (el) => {
    if (el.tagName === 'TH') this.handleThClick(el);
    if (el.tagName === 'TD') this.handleTdClick(el);
    if (el.classList.contains('js-search')) this.handleFind();
    if (el.classList.contains('js-data-pick')) {
      this.handleStart(
          el,
          el.getAttribute('data-size') === 'small' ? true : false
      );
    }
  }

  add(el) {
    this.grid.appendChild(el);
  }

  hasBody() {
    return this.grid.querySelector('tbody') ?  true : false;
  }

  replace(old, newEl) {
    return old.replaceWith(newEl);
  }

  getPartOfList(list, i) {
    let from = (this.maxCount * i) - this.maxCount;
    let to = this.maxCount * i;
    let newList = list.slice(from, to);
    return newList;
  }

  handleChangePage = (ev, i) => {
    ev.preventDefault();
    this.page = i;
    let list = this.getPartOfList(this.list, this.page);
    let tbody = this.tbodyRender(list);
    let tbodyEl = this.grid.querySelector('tbody');
    this.hasBody() ? this.replace(tbodyEl, tbody) : this.add(tbody);
    this.lastBody.set('body', tbody);
  }

  handleTdClick = (el) => {
    let info = document.querySelector('.additional-info');
    let parent = el.parentNode;
    let id = parent.id;
    let additionalInfoContent =
        `<section class="additional-info">
           <header class="additional-info__header">
                <h2 class="additional-info__title">
                    Выбран пользователь: 
                    <b>${this.additionalInfo.get(id).fullName}</b>
                </h2>
                 <p class="additional-info__descr">
                    Описание:<br>
                    ${this.additionalInfo.get(id).descr} 
                </p>
                <p>Адресс проживания: <b>${this.additionalInfo.get(id).adress['streetAddress']}</b></p>
                <p>Город: <b>${this.additionalInfo.get(id).adress['city']}</b></p>
                <p>Провинция: <b>${this.additionalInfo.get(id).adress['state']}</b></p>
                <p>Индекс: <b>${this.additionalInfo.get(id).adress['zip']}</b></p>
              
            </header>
         </section>`;
    if (info) {
      info.innerHTML = additionalInfoContent;
      return;
    }

    this.grid.insertAdjacentHTML('afterEnd', additionalInfoContent);

  }

  updateAcc = (acc, item) => {
    acc.appendChild(item.cloneNode(true));
    return acc;
  }

  handleThClick = (el) => {
    this.toggleClass(el, 'table__cell--sort-down');
    let sortedRows = this.sortGrid({
      colNum: el.cellIndex,
      type: el.getAttribute('data-type'),
      id: el.id,
      rowsArray: [].slice.call(this.gridRows),
    });
    this.replace(
        this.grid.querySelector('tbody'),
        this.modifyTableBody(sortedRows, this.updateAcc));
    [].forEach.call(
        this.getSiblings('.table__cell', el),
        item => {
          if (!item.classList.contains('table__cell--sort-down')) item.classList.add('table__cell--sort-down');
        });
  }

  handleClick = (ev) => {
    this.checkElem(ev.target);
  }

  handleFind = (ev) => {
    let lastBodyRows = this.lastBody.get('body');
    let input = this.container.querySelector('input');
    let tbody = this.grid.querySelector('tbody');
    if (input.value === '') {
      this.hasBody() ? this.replace(tbody, this.lastBody.get('body')) :
          this.add(this.lastBody.get('body'));
      return;
    }
    let rows = [].slice.call(lastBodyRows.rows);
    let filtered = this.filterMethods.byString(input.value, rows);
    this.replace(tbody, this.modifyTableBody(filtered, this.updateAcc));
  }

  handleStart = (el, dataSize) => {
    el.parentNode.remove();
    this.start(dataSize)
  }

  toggleClass = (elem, className) => {
    elem.classList.toggle(className);
  }

  getSiblings = (className, elem) => [].filter.call(document.querySelectorAll(className), item => item.id !== elem.id);

  run = (list, fn) => {
    try {
      fn(list);
    } catch (e) {
      this.grid.innerHTML = `<tr><td>${'Что-то пошло не так'}</td></tr>`;
    }
  }

  headRender(headItems){
     let thead = document.createElement('thead');
     let tr = document.createElement('tr');
     headItems.forEach((item, i) => {
       let td = document.createElement('th');
       td.className = item.className;
       td.id = item.id;
       td.setAttribute('data-type', item.attr);
       td.innerHTML =
           ` ${item.txt}
            <i class="glyphicon glyphicon-chevron-up up"></i>
            <i class='glyphicon glyphicon-chevron-down down'></i>`;
       tr.appendChild(td);
     });

    thead.appendChild(tr);
    return thead;
  }

  tbodyRender(list){
    let tbody = document.createElement('tbody');
    let td = document.createElement('td');
    list.forEach((item) => {
        let row = document.createElement('tr');
        Object.keys(item).forEach(key => {
          if (key !== 'description' && key !== 'adress') {
            let td = document.createElement('td');
            td.textContent = item[key];
            let val = +item[key] ? item[key] : item[key] + ''.toLowerCase();
            td.setAttribute('data-sort-value', val);
            row.id = item['id'];
            row.appendChild(td);
          } else {
            this.additionalInfo.set(`${item['id']}`, {
              'fullName': `${item['firstName']} ${item['lastName']}`,
              'adress': item['adress'],
              'descr': item['description']
            });
          }
        });
        tbody.appendChild(row);
    });

    return tbody;
  }

  tableRender(list) {
    let thead = this.headRender(this.headData);
    let tbody = this.tbodyRender(this.getPartOfList(list, this.page));
    this.grid.appendChild(thead);
    this.grid.appendChild(tbody);
    this.grid.className = 'table table-hover table-bordered';
    this.lastBody.set('body', tbody);
    return this.grid;
  }

  render = (list) => {
     let table = this.tableRender(list);
     let search = new Search();
     let pagination = new Pagination(
         {
           listSize: list.length,
           handleClick: this.handleChangePage,
           step: this.maxCount
         }
         );
     this.container.append(table);
     this.container.prepend(search.generate());
     this.container.append(pagination.generate());
  }


  sortGrid = ({colNum, type, id, rowsArray}) => {
      let sorted = rowsArray.sort(this.sortMethods[type](this.headItems[id].isSortDown, colNum));
      this.headItems[id].isSortDown = !this.headItems[id].isSortDown;
      return sorted;
  }

  modifyTableBody(arrRows, fn){
      return arrRows.reduce(fn, document.createElement('tbody'));
  }

  start = (isSmall) => {
    let url = isSmall ? this.apiUrls.smallSize : this.apiUrls.bigSize;
    let loader = new Loader();
    this.container.appendChild(loader.generate());
    this.load(url, (data) => {
      this.run(data, (list) => {
        this.toggleClass(this.container.querySelector('.js-loader'), 'loader--show');
        this.list = list;
        this.render(list);
      })
    })
  }

  init(){
    if (!this.container){
      alert('В конструктор не передан элемент');
    }
    let dataPick = new DataPick();
    this.initializeEvents(
        [
            {elem: this.container, eventName: 'click', fn: this.handleClick}
        ]
    );

    this.container.appendChild(dataPick.generate());
  }

}

export default Table;