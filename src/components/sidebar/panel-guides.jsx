import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Panel from './panel';
import * as SharedStyle from '../../shared-style';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {FaPencil, FaTrash, FaClose} from 'react-icons/lib/fa';
import { FormNumberInput } from '../../components/style/export';

const iconStyle = {
  fontSize:'14px',
  margin:'2px',
  cursor:'pointer'
};

export default class PanelGuides extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      addVisibile: true
    };
  }

  render() {
    let { guides } = this.props.state.scene;

    return (
      <Panel name="Guides">
        <Tabs id="guidesTabs" style={{margin:'1em'}}>
          <TabList>
            <Tab>Horizontal</Tab>
            <Tab>Vertical</Tab>
            <Tab>Circular</Tab>
          </TabList>

          <TabPanel>
            <table style={{width:'100%'}}>
              <tbody>
                {
                  guides.get('horizontal').entrySeq().map( ([ hgKey, hgVal ], ind) => {
                    return (
                      <tr key={hgKey}>
                        <td>{ind + 1}</td>
                        <td  style={{width:'19em', textAlign:'center'}}>{hgVal}</td>
                        <td>
                          <FaPencil style={iconStyle} />
                          <FaTrash style={iconStyle} />
                        </td>
                      </tr>
                    );
                  })
                }
                {
                  this.state.addVisibile ? 
                    <tr style={{height:'2em'}}>
                      <td
                        colSpan="3"
                        style={{textAlign:'center', cursor:'pointer'}}
                        onClick={ ( e ) => { console.log('clicked'); return this.setState({'addVisibile': false}) } }
                      >
                        + Add Horizontal Giude
                      </td>
                    </tr> :
                    <tr>
                      <td colSpan="2">
                      <FormNumberInput
                        value={0}
                        onChange={( e ) => {
                          console.log(e.target.value);
                          this.context.projectActions.addHorizontalGuide( e.target.value );
                          return this.setState({'addVisibile': true});
                        }}
                        onValid={ () => console.log('valid') }
                        min={0}
                        max={100000}/>
                      </td>
                      <td style={{textAlign:'center'}}>
                        <FaClose style={iconStyle} onClick={ ( e ) => { console.log('clicked'); return this.setState({'addVisibile': true}) } } />
                      </td>
                    </tr>
                }
              </tbody>
            </table>
          </TabPanel>
          <TabPanel>
            <b>Vertical Giudes</b>
          </TabPanel>
          <TabPanel>
            <b>Circular Giudes</b>
          </TabPanel>
        </Tabs>
      </Panel>
    );
  }
  

}

PanelGuides.propTypes = {
  state: PropTypes.object.isRequired
};

PanelGuides.contextTypes = {
  projectActions: PropTypes.object.isRequired
};
