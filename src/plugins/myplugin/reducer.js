export default (state, action) => {
  switch (action.type) {
    case 'MYACTION':
      console.log("you have dispatched MYACTION!")
      return state.set('mode', 'MY_CUSTOM_MODE');

    default:
      return state;
  }
};
