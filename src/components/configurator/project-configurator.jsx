import React, {PropTypes, Component} from 'react';
import ContentTitle from '../style/content-title';
import ContentContainer from '../style/content-container';
import FormLabel from '../style/form-label';
import FormBlock from '../style/form-block';
import FormNumberInput from '../style/form-number-input';

import FormSubmitButton from '../style/form-submit-button';
import CancelButton from '../style/cancel-button';

export default class ProjectConfigurator extends Component {

  constructor(props, context) {
    super(props, context);

    let scene = props.state.scene;

    this.state = {
      dataWidth: scene.width,
      dataHeight: scene.height,
    };
  }

  onSubmit(event) {
    event.preventDefault();

    let {projectActions} = this.context;

    let {dataWidth, dataHeight} = this.state;
    dataWidth = parseInt(dataWidth);
    dataHeight = parseInt(dataHeight);
    if (dataWidth <= 100 || dataHeight <= 100) {
      alert('Scene size too small');
    } else {
      projectActions.setProjectProperties({width: dataWidth, height: dataHeight});
    }
  }


  render() {
    let {width, height} = this.props;
    let {dataWidth, dataHeight} = this.state;
    let {projectActions} = this.context;

    return (
      <ContentContainer width={width} height={height}>
        <ContentTitle>Project config</ContentTitle>

        <form onSubmit={e => this.onSubmit(e)}>
          <FormBlock>
            <FormLabel htmlFor="width">width</FormLabel>
            <FormNumberInput id="width" placeholder="width" value={dataWidth}
                             onChange={e => this.setState({dataWidth: e.target.value})}/>
          </FormBlock>

          <FormBlock>
            <FormLabel htmlFor="height">height</FormLabel>
            <FormNumberInput id="height" placeholder="height" value={dataHeight}
                             onChange={e => this.setState({dataHeight: e.target.value})}/>
          </FormBlock>

          <div style={{textAlign: "right"}}>
            <div style={{marginRight: "3px", display: "inline-block"}}>
              <CancelButton onClick={e => projectActions.rollback()}>Cancel</CancelButton>
            </div>

            <FormSubmitButton>Save</FormSubmitButton>
          </div>
        </form>
      </ContentContainer>
    )
  }
}

ProjectConfigurator.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired,
};

ProjectConfigurator.contextTypes = {
  projectActions: PropTypes.object.isRequired,
};
