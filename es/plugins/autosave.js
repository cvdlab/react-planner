var localStorage = window.hasOwnProperty('localStorage') ? window.localStorage : false;
import { loadProject } from '../actions/project-actions';

var TIMEOUT_DELAY = 500;

var timeout = null;

export default function autosave(autosaveKey, delay,selectPanicButton,plan) {

  return function (store, stateExtractor) {

    delay = delay || TIMEOUT_DELAY;

    if (!autosaveKey) return;
    if (!localStorage) return;

    //revert
      // var data = localStorage.getItem(autosaveKey);
      // var json = JSON.parse(data);
      // console.log(plan,"plan")
      // store.dispatch(loadProject(plan));
    

    //update
    store.subscribe(function () {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(function () {
        var state = stateExtractor(store.getState());
        let json=state.scene.toJS()
        console.log(state.scene.toJS(),"state")
        localStorage.setItem(autosaveKey, JSON.stringify(state.scene.toJS()));
        let items =json["layers"]["layer-1"]["items"]
        for (var key in items) { 
          let item= items[key]
          if (item["selected"]==true){
            selectPanicButton(item["id"])
            

            // store.dispatch(loadProject(json));

            


          }

          

        }

        /*let scene = state.sceneHistory.last;
        if (scene) {
          let json = JSON.stringify(scene.toJS());
          localStorage.setItem(autosaveKey, json);
        }*/
      }, 100);
    });
  };
}