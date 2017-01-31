export default class Loader {
  generate() {
    let div = document.createElement('div');
    div.style.position = 'relative';
    let loader =
        `<div class="loader js-loader loader--show">
            <i class="loader__icon glyphicon glyphicon-refresh"></i>
         </div>`;
    div.innerHTML = loader;
    return div;
  }
}
