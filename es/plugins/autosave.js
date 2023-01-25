var localStorage = window.hasOwnProperty('localStorage') ? window.localStorage : false;
import axios from 'axios';
import { useEffect } from 'react';
import { loadProject } from '../actions/project-actions';

var TIMEOUT_DELAY = 50000;

var timeout = null;

export default function autosave(autosaveKey, delay,isAdmin,json) {

  

  return function (store, stateExtractor) {

    delay = delay || TIMEOUT_DELAY;

    if (!autosaveKey) return;
    if (!localStorage) return;

    //revert//
    
    
    // if (localStorage.getItem(autosaveKey) !== null) {
      // var data = localStorage.getItem(autosaveKey);
      // var json = JSON.parse(data);
   
      
      //  var path='http://127.0.0.1:5000/get'
    // axios.get(path).then((res)=>{
      var count=0
      console.log("then block")
      // json =res.data
      

      var items=json["layers"]["layer-1"]["items"]
   if(!isAdmin){   setInterval(function() {
        if (count%2==0){
          let tempItems={...items}
          for (var key in tempItems){
            console.log(tempItems[key])
            if((tempItems[key]["type"]=="panic-button")||tempItems[key]["type"]=="panic-button-orange"){
              delete tempItems[key]
            }
          }
          json["layers"]["layer-1"]["items"]=tempItems
        }else{
          json["layers"]["layer-1"]["items"]=items
        }
        count=count+1
        store.dispatch(loadProject(json));

      },1000);
    }else{
       store.dispatch(loadProject(json));   

    }
    
    // })
  
  // }

  // if (localStorage.getItem(autosaveKey) !== null) {
  //   var data = localStorage.getItem(autosaveKey);
  //   var json = JSON.parse(data);
  //   store.dispatch(loadProject(json));
  // }
  
    

    //update
    store.subscribe(function () {
      if (localStorage.getItem(autosaveKey) !== null) {
        var data = localStorage.getItem(autosaveKey);
        var json = JSON.parse(data);
        var items=json["layers"]["layer-1"]["items"]
        var ids=items.keys
        for (id in ids ){
          console.log(id)
        }
        // store.dispatch(loadProject(json));
      }
      // if (timeout) clearTimeout(timeout);
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