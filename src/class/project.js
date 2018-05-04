class Project{

  static setAlterate( state ){
    return { updatedState: state.set('alterate', !state.alterate ) };
  }

}

export { Project as default };
