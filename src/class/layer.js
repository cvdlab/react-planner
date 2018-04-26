class Layer{

  static select( state, layerID, elementPrototype, elementID ){
    console.log('select Layer');

    /*layer.withMutations(layer => {
      layer.setIn([prototype, ID, 'selected'], true);
      layer.updateIn(['selected', prototype], elements => elements.push(ID));
    });*/

    state = state.setIn(['scene', 'layer', layerID, elementPrototype, elementID, 'selected'], true);
    state = state.updateIn(['scene', 'layer', layerID, 'selected', elementPrototype], elements => elements.push(elementID));

    return state;
  }

}

export { Layer as default };
