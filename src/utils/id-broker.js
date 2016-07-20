var shortid = require('shortid');

export class IDBroker {

  acquireID() {
    return shortid.generate();
  }

  // releaseID(ID){
  //
  // }
}

let IDBrokerInstance = new IDBroker();
export default IDBrokerInstance;
