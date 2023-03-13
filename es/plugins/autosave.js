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
            selectPanicButton(item["id"],false)
            

            // store.dispatch(loadProject(json));

            


          }
                 

        }


        let areas=json["layers"]["layer-1"]["areas"]


        for (var key in areas) { 
          let area= areas[key]

          if (area["selected"]==true){
            let vertices=area["vertices"]
            let x=0
            let y=0
            // console.log("vertices",vertices)
            vertices.map((vertex)=>{
              x+=json["layers"]["layer-1"]["vertices"][vertex]["x"]
              y+=json["layers"]["layer-1"]["vertices"][vertex]["y"]

            })

            console.log("x= ",x/vertices.length,"y= ",y/vertices.length)

            

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