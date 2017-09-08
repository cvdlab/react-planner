import actions from '../actions/export';

export default function consoleDebugger() {

  return (store, stateExtractor) => {
    window.ReactPlanner = {
      ...actions,

      getStore() {
        return store;
      },

      getState() {
        return stateExtractor(store.getState())
      },

      do(actions, delay = 300) {
        actions = actions.reverse();
        let dispatch = store.dispatch;
        let dispatchAction = () => {
          console.info(`There are other ${actions.length} actions on stack`);
          if (actions.length === 0) return;
          dispatch(actions.pop());
          if (actions.length === 0) return;
          setTimeout(dispatchAction, delay);
        };
        setTimeout(dispatchAction, 0);
      }
    };

    console.groupCollapsed("ReactPlanner");
    console.info("ReactPlanner is ready");
    console.info("console.log(ReactPlanner)");
    console.log(window.ReactPlanner);
    console.groupEnd();
  }
}
