import * as actions from './actions';
import {ContentX} from './contentX.jsx';
import reducer from './reducer';
import {ButtonX} from './buttonX.jsx'

export default {
  actions: actions,

  contents: {
    'MY_CUSTOM_MODE': ContentX,
  },

  reducer: reducer,

  toolbarButtons: [ButtonX],

  onReady: function(state){
    console.log('myplugin ready')
  },
}
