export function myaction() {
  return {
    type: "MYACTION"
  }
}

export function myaction2() {
  return (dispatch, getState, {myCustomData}) => {

    console.log('myCustomData', myCustomData);

    dispatch({
      type: "MYACTION2"
    })

  }
}
