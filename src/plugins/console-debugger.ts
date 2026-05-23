import actions from '../actions/export';

export default function consoleDebugger() {

  return (store: any, stateExtractor: any) => {
    (window as any).ReactPlanner = {
      ...actions,

      getStore() {
        return store;
      },

      getState() {
        return stateExtractor(store.getState());
      },

      do(actions: any[], delay = 300) {
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
    console.log((window as any).ReactPlanner);
    console.groupEnd();
  };
}
