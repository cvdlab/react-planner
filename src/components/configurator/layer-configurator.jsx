import React, {PropTypes, Component} from 'react';
import ContentTitle from '../style/content-title';
import ContentContainer from '../style/content-container';
import FormLabel from '../style/form-label';
import FormBlock from '../style/form-block';
import FormNumberInput from '../style/form-number-input';
import FormTextInput from '../style/form-text-input';
import FormSlider from '../style/form-slider';

import FormSubmitButton from '../style/form-submit-button';
import CancelButton from '../style/cancel-button';
import DeleteButton from '../style/delete-button';

export default class LayerConfigurator extends Component {

  constructor(props, context) {
    super(props, context);

    let state = props.state;
    let scene = state.scene;
    let layerID = scene.selectedLayer;
    let layer = scene.layers.get(layerID);

    this.state = {
      layerID: scene.selectedLayer,
      dataName: layer.name,
      dataOpacity: layer.opacity,
      dataAltitude: layer.altitude,
      dataOrder: layer.order,
    };
  }

  componentWillReceiveProps(nextProps) {
    let state = nextProps.state;
    let scene = state.scene;
    let layerID = scene.selectedLayer;

    if (layerID === this.props.layerID) return;

    let layer = scene.layers.get(layerID);

    this.setState({
      layerID: scene.selectedLayer,
      dataName: layer.name,
      dataOpacity: layer.opacity,
      dataAltitude: layer.altitude,
      dataOrder: layer.order,
    });
  }

  onSubmit(event) {
    event.preventDefault();

    let {sceneActions} = this.context;

    let {layerID, dataName, dataOpacity, dataAltitude, dataOrder} = this.state;
    dataName = dataName.trim();
    dataOpacity = parseFloat(dataOpacity);
    dataAltitude = parseInt(dataAltitude);
    dataOrder = parseFloat(dataOrder);

    if (dataName.length <= 0
      || dataOpacity < 0 || dataOpacity > 1
      || dataAltitude < 0
      || dataOrder < 0) {
      alert('Configuration not valid');
    } else {
      sceneActions.setLayerProperties(layerID, {
        name: dataName,
        opacity: dataOpacity,
        altitude: dataAltitude,
        order: dataOrder
      });
    }
  }


  render() {
    let {width, height} = this.props;
    let {layerID, dataName, dataOpacity, dataAltitude, dataOrder} = this.state;
    let {projectActions, sceneActions, translator} = this.context;

    return (
      <ContentContainer width={width} height={height}>
        <ContentTitle>{translator.t("Layer config")}</ContentTitle>

        <form onSubmit={e => this.onSubmit(e)}>
          <FormBlock>
            <FormLabel htmlFor="name">{translator.t("name")}</FormLabel>
            <FormTextInput id="name" placeholder="name" value={dataName}
                           onChange={e => this.setState({dataName: e.target.value})}/>
          </FormBlock>

          <FormBlock>
            <FormLabel htmlFor="opacity">{translator.t("opacity")}</FormLabel>
            <FormSlider min={0} max={100} value={Math.round(dataOpacity * 100)}
                        onChange={e => this.setState({dataOpacity: e.target.value / 100})}/>

          </FormBlock>

          <FormBlock>
            <FormLabel htmlFor="altitude">{translator.t("altitude")}</FormLabel>
            <FormNumberInput id="altitude" placeholder="altitude" value={dataAltitude}
                             onChange={e => this.setState({dataAltitude: e.target.value})}/>
          </FormBlock>

          <FormBlock>
            <FormLabel htmlFor="order">{translator.t("order")}</FormLabel>
            <FormNumberInput id="order" placeholder="order" value={dataOrder}
                             onChange={e => this.setState({dataOrder: e.target.value})}/>
          </FormBlock>

          <div style={{textAlign: "right"}}>
            <div style={{marginRight: "10px", display: "inline-block"}}>
              <DeleteButton  size="large" onClick={e => sceneActions.removeLayer(layerID)}>{translator.t("Delete")}</DeleteButton>
            </div>

            <div style={{marginRight: "3px", display: "inline-block"}}>
              <CancelButton  size="large" onClick={e => projectActions.rollback()}>{translator.t("Cancel")}</CancelButton>
            </div>

            <FormSubmitButton size="large">{translator.t("Save")}</FormSubmitButton>
          </div>
        </form>
      </ContentContainer>
    )
  }
}

LayerConfigurator.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired,
};

LayerConfigurator.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  sceneActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
