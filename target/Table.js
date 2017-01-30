'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Table = (function () {
  function Table() {
    var _this = this;

    _classCallCheck(this, Table);

    this.grid = document.getElementById('table');

    this.handleClick = function (ev) {
      if (ev.target.tagName !== 'TH') return null;
      _this.sortGrid(ev.target.cellIndex, ev.target.getAttribute('data-type'));
    };
  }

  _createClass(Table, [{
    key: 'sortGrid',
    value: function sortGrid(colNum, type) {
      console.log(colNum, type);
    }
  }, {
    key: 'init',
    value: function init() {
      alert('Init');
      this.grid.onClick = this.handleClick;
    }
  }]);

  return Table;
})();

exports.Table = Table;
exports['default'] = Table;