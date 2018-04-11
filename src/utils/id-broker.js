let shortid = require('shortid');

export class IDBroker {
  static acquireID() {
    return shortid.generate();
  }
}

export default IDBroker;
