import React, { useState, useContext, memo } from 'react';
import PropTypes from 'prop-types';
import Panel from './panel';
import ReactPlannerContext from '../../utils/react-planner-context';
import * as SharedStyle from '../../styles/shared-style';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FaPencil, FaTrash, FaTimes } from 'react-icons/fa';
import { FormNumberInput } from '../../components/style/export';

const tabStyle = { margin: '1em' };

const iconStyle = {
  fontSize: '14px',
  margin: '2px',
  cursor: 'pointer'
};

const addGuideStyle = {
  cursor: 'pointer',
  height: '2em'
};

const tableTabStyle = {
  width: '100%',
  textAlign: 'center'
};

const PanelGuides = ({ state }) => {
  const { projectActions, translator } = useContext(ReactPlannerContext);
  const { guides } = state.scene;

  const [addHGVisible, setAddHGVisible] = useState(true);
  const [addVGVisible, setAddVGVisible] = useState(true);
  const [addCGVisible, setAddCGVisible] = useState(true);

  return (
    <Panel name={translator.t('Guides')}>
      <Tabs id='guidesTabs' style={tabStyle}>
        <TabList>
          <Tab>{translator.t('Horizontal')}</Tab>
          <Tab>{translator.t('Vertical')}</Tab>
          {/*<Tab>{translator.t('Circular')}</Tab>*/}
        </TabList>

        <TabPanel>
          <table style={tableTabStyle}>
            <tbody>
              {guides
                .get('horizontal')
                .entrySeq()
                .map(([hgKey, hgVal], ind) => {
                  return (
                    <tr key={hgKey}>
                      <td style={{ width: '2em' }}>{ind + 1}</td>
                      <td>{hgVal}</td>
                      <td style={{ width: '5em' }}>
                        {/*<FaPencil style={iconStyle} />*/}
                        <FaTrash
                          style={iconStyle}
                          onClick={e =>
                            projectActions.removeHorizontalGuide(hgKey)
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              {addHGVisible ? (
                <tr>
                  <td
                    colSpan='3'
                    style={addGuideStyle}
                    onClick={e => setAddHGVisible(false)}
                  >
                    {translator.t('+ Add Horizontal Giude')}
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan='2'>
                    <FormNumberInput
                      value={0}
                      onChange={e => {
                        projectActions.addHorizontalGuide(e.target.value);
                        return setAddHGVisible(true);
                      }}
                      min={0}
                      max={state.getIn(['scene', 'height'])}
                    />
                  </td>
                  <td>
                    <FaTimes
                      style={iconStyle}
                      onClick={e => setAddHGVisible(true)}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </TabPanel>
        <TabPanel>
          <table style={tableTabStyle}>
            <tbody>
              {guides
                .get('vertical')
                .entrySeq()
                .map(([hgKey, hgVal], ind) => {
                  return (
                    <tr key={hgKey}>
                      <td style={{ width: '2em' }}>{ind + 1}</td>
                      <td>{hgVal}</td>
                      <td style={{ width: '5em' }}>
                        {/*<FaPencil style={iconStyle} />*/}
                        <FaTrash
                          style={iconStyle}
                          onClick={e =>
                            projectActions.removeVerticalGuide(hgKey)
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              {addVGVisible ? (
                <tr>
                  <td
                    colSpan='3'
                    style={addGuideStyle}
                    onClick={e => setAddVGVisible(false)}
                  >
                    {translator.t('+ Add Vertical Giude')}
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan='2'>
                    <FormNumberInput
                      value={0}
                      onChange={e => {
                        projectActions.addVerticalGuide(e.target.value);
                        return setAddVGVisible(true);
                      }}
                      min={0}
                      max={state.getIn(['scene', 'height'])}
                    />
                  </td>
                  <td>
                    <FaTimes
                      style={iconStyle}
                      onClick={e => setAddVGVisible(true)}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </TabPanel>
        {/*<TabPanel>
          <b>TODO Circular Guides</b>
        </TabPanel>*/}
      </Tabs>
    </Panel>
  );
}

PanelGuides.propTypes = {
  state: PropTypes.object.isRequired
};

export default memo(PanelGuides, (prevProps, nextProps) => {
  return (
    prevProps.state.getIn(['scene', 'guides']).hashCode() !==
      nextProps.state.getIn(['scene', 'guides']).hashCode()
  );
});

