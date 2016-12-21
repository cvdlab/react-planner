var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var shortid = require('shortid');

export var IDBroker = function () {
  function IDBroker() {
    _classCallCheck(this, IDBroker);
  }

  _createClass(IDBroker, [{
    key: 'acquireID',
    value: function acquireID() {
      return shortid.generate();
    }

    // releaseID(ID){
    //
    // }

  }]);

  return IDBroker;
}();

var IDBrokerInstance = new IDBroker();
export default IDBrokerInstance;