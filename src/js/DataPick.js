export default class DadaPick {
  generate() {
    let div = document.createElement('div');
    let tmpl =
        `<div>
            <button data-size="small" class="btn js-data-pick">Маленький объем данных</button>
            <button data-size="big" class="btn js-data-pick">Большой объем данных</button>
        </div>`;
    div.innerHTML = tmpl;
    return div;
  }
}
