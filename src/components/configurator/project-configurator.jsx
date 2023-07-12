import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  ContentTitle,
  ContentContainer,
  FormLabel,
  FormBlock,
  FormNumberInput,
  FormSubmitButton,
  CancelButton
} from '../style/export';
import ReactPlannerContext from '../../utils/react-planner-context';

const ProjectConfigurator = ({ width, height, state }) => {
  const { projectActions, translator } = useContext(ReactPlannerContext);
  const scene = state.scene;

  const [dataWidth, setDataWidth] = useState(scene.width);
  const [dataHeight, setDataHeight] = useState(scene.height);

  const onSubmit = (event) => {
    event.preventDefault();

    let width = parseInt(dataWidth);
    let height = parseInt(dataHeight);
    if (width <= 100 || height <= 100) {
      alert('Scene size too small');
    } else {
      projectActions.setProjectProperties({width, height});
    }
  }

  return (
    <ContentContainer width={width} height={height}>
      <ContentTitle>{translator.t('Project config')}</ContentTitle>

      <form onSubmit={onSubmit}>
        <FormBlock>
          <FormLabel htmlFor='width'>{translator.t('width')}</FormLabel>
          <FormNumberInput
            id='width'
            placeholder='width'
            value={dataWidth}
            onChange={e => setDataWidth(e.target.value)}
          />
        </FormBlock>

        <FormBlock>
          <FormLabel htmlFor='height'>{translator.t('height')}</FormLabel>
          <FormNumberInput
            id='height'
            placeholder='height'
            value={dataHeight}
            onChange={e => setDataHeight(e.target.value)}
          />
        </FormBlock>

        <table style={{float: 'right'}}>
          <tbody>
          <tr>
            <td>
              <CancelButton size='large'
                            onClick={e => projectActions.rollback()}>{translator.t('Cancel')}</CancelButton>
            </td>
            <td>
              <FormSubmitButton size='large'>{translator.t('Save')}</FormSubmitButton>
            </td>
          </tr>
          </tbody>
        </table>
      </form>
    </ContentContainer>
  )
}

ProjectConfigurator.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired,
};

export default ProjectConfigurator;
