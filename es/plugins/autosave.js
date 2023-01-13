var localStorage = window.hasOwnProperty('localStorage') ? window.localStorage : false;
import { loadProject } from '../actions/project-actions';

var TIMEOUT_DELAY = 500;

var timeout = null;

export default function autosave(autosaveKey, delay,requestURL,layoutId) {

  return function (store, stateExtractor) {

    delay = delay || TIMEOUT_DELAY;

    if (!autosaveKey) return;
    if (!localStorage) return;

    //revert
    if (localStorage.getItem(autosaveKey) !== null) {
      var data = localStorage.getItem(autosaveKey);
      var json = JSON.parse(data);


      var items=json["layers"]["layer-1"]["items"]
      console.log(json["layers"]["layer-1"]["items"],json)
      var count=0
      
      setInterval(function() {
        if (count%2==0){
          console.log("test",count)
          json["layers"]["layer-1"]["items"]={}
        }else{
          console.log("test",count)
          json["layers"]["layer-1"]["items"]=items
        }
        count=count+1
        store.dispatch(loadProject(json));

        console.log("Interval reached every 5s")
      },1000);
      store.dispatch(loadProject(json));
    }
    // var path=requestURL //have to modify
    // axios.get(path).then((res)=>{
    //    data =res.data
    //    store.dispatch(loadProject(json));   
    
    // })

    //update
    store.subscribe(function () {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(function () {
        var state = stateExtractor(store.getState());
        localStorage.setItem(autosaveKey, JSON.stringify(state.scene.toJS()));
        /*let scene = state.sceneHistory.last;
        if (scene) {
          let json = JSON.stringify(scene.toJS());
          localStorage.setItem(autosaveKey, json);
        }*/
      }, delay);
    });
  };
}