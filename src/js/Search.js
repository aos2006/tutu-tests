export default class Search {
  generate() {
    let div = document.createElement('div');
    let tmpl =
        `<div class="search">
            <input type="text" class="field" placeholder="Введите текст">
            <button class="btn js-search" type="button">Найти</button>
        </div>`;
    div.innerHTML = tmpl;
    return div;
  }
}
