import 'whatwg-fetch';
import Pagination from './Pagination';

export class Table {
  constructor(table) {
    this.container = table
    this.grid = document.createElement('table');
    this.additionalInfo = new Map();
    this.maxCount = 50;
    this.smallSize = 32;
    this.bigSize = 1000;
    this.page = 1;
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

  set lastBody (newBody) {
    this.last = newBody;
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

  checkTagName = (el) => {
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
    let newList = list.slice(from,  to);
    return newList;
  }

  handleChangePage = (ev, i) => {
    ev.preventDefault();
    this.page = i;
    let list = this.getPartOfList(this.list, this.page);
    let tbody = this.tbodyRender(list, this.page);
    let tbodyEl = this.grid.querySelector('tbody');
    this.hasBody() ? this.replace(tbodyEl, tbody) : this.add(tbody);
    this.lastBody = tbody;
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

  handleThClick = (el) => {
    this.toggleClass(el, 'table__cell--sort-down');
    let sortedRows = this.sortGrid({
      colNum: el.cellIndex,
      type: el.getAttribute('data-type'),
      id: el.id,
      rowsArray: [].slice.call(this.gridRows),
    });
    this.replace(this.grid.querySelector('tbody'), this.modifyTableBody(sortedRows));
    [].forEach.call(
        this.getSiblings('.table__cell', el),
        item => {
          if (!item.classList.contains('table__cell--sort-down')) item.classList.add('table__cell--sort-down');
        });
  }

  handleClick = (ev) => {
    this.checkTagName(ev.target);
  }

  handleFind = (ev) => {
    let input = this.container.querySelector('input');
    let tbody = this.grid.querySelector('tbody');
    if (input.value === '') {
      this.hasBody() ? this.replace(tbody, this.last) : this.add(this.last);
      return;
    }
    let rows = [].slice.call(this.last.rows);
    let filtered = this.filterMethods.byString(input.value, rows);
    this.replace(tbody, this.modifyTableBody(filtered));
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
      console.log(e);
      this.grid.innerHTML = `<tr><td>${'Что-то пошло не так'}</td></tr>`;
    }
  }

  paginationRender({list, fn, step}) {
    let pagination = new Pagination({
      listSize: list.length,
      handleClick: fn,
      step: step
    });
    return pagination.generate();
  }

  loaderRender() {
    let div = document.createElement('div');
    div.style.position = 'relative';
    let loader =
        `<div class="loader js-loader loader--show">
            <i class="loader__icon glyphicon glyphicon-refresh"></i>
         </div>`;
    div.innerHTML = loader;
    return div;
  }

  selectDataSizeRender() {
    let div = document.createElement('div');
    let tmpl =
        `<div>
            <button data-size="small" class="btn js-data-pick">Маленький объем данных</button>
            <button data-size="big" class="btn js-data-pick">Большой объем данных</button>
        </div>`;
    div.innerHTML = tmpl;
    return div;
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
    return this.grid;
  }
  searchRender() {
    let div = document.createElement('div');
    let tmpl =
        `<div class="search">
            <input type="text" class="field" placeholder="Введите текст">
            <button class="btn js-search" type="button">Найти</button>
        </div>`;
    div.innerHTML = tmpl;
    return div;
  }

  render = (list) => {
     let table = this.tableRender(list);
     let search = this.searchRender();
     let pagination = this.paginationRender({list: list, fn: this.handleChangePage, step: this.maxCount});
     this.container.append(table);
     this.container.prepend(search);
     this.container.append(pagination);
  }


  sortGrid = ({colNum, type, id, rowsArray}) => {
      let sorted = rowsArray.sort(this.sortMethods[type](this.headItems[id].isSortDown, colNum));
      this.headItems[id].isSortDown = !this.headItems[id].isSortDown;
      return sorted;
  }

  modifyTableBody(arrRows){
      let tableBody = document.createElement('tbody');
      arrRows.forEach(item => tableBody.appendChild(item))
      return tableBody;
  }

  start = (isSmall) => {
    let url = isSmall ? this.apiUrls.smallSize : this.apiUrls.bigSize
    this.container.appendChild(this.loaderRender());
    this.load(url, (data) => {
      this.run(data, (list) => {
        this.toggleClass(this.container.querySelector('.js-loader'), 'loader--show');
        this.list = list;
        this.render(list);
      })
    })
  }

  init(){
    this.initializeEvents(
        [
            {elem: this.container, eventName: 'click', fn: this.handleClick}
        ]
    );
    this.container.appendChild(this.selectDataSizeRender());
  }

}

export default Table;