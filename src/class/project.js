class Project{

  static setAlterate( state ){
    console.log('setAlterate');
    return state.set('alterate', !state.alterate );
  }

}

export { Project as default };
