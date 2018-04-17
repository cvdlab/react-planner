In this example we will create a Color Property.

``` es6
import React from 'react';
import PropTypes from 'prop-types';
import { FormLabel, FormColorInput } from '../../components/style/export';
import PropertyStyle from './shared-property-style';

export default function PropertyColor({value, onUpdate, configs, sourceElement, internalState, state}) {

  let update = (val) => {

    if (configs.hook) {
      return configs.hook(val, sourceElement, internalState, state).then(_val => {
        return onUpdate(_val);
      });
    }

    return onUpdate(val);
  };

  return (
    <table className="PropertyColor" style={PropertyStyle.tableStyle}>
      <tbody>
      <tr>
        <td style={PropertyStyle.firstTdStyle}>
          <FormLabel>{configs.label}</FormLabel>
        </td>
        <td>
          <FormColorInput value={value} onChange={event => update(event.target.value)}/>
        </td>
      </tr>
      </tbody>
    </table>
  );
}

PropertyColor.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired,
  sourceElement: PropTypes.object,
  internalState: PropTypes.object,
  state: PropTypes.object.isRequired
};

```

After creating a Property Component like this, you should register it into the Catalog.
You can do it calling *Catalog.registerPropertyType(['color', PropertyColor, PropertyColor]);* specifying the Property's name and the used component.
If you got more than one Property to register you can also use the *Catalog.registerMultiplePropertyType([['color', PropertyColor, PropertyColor],...])* function that accept an Array of Property as input.
> The *hook* callback is used for link multiple properties. Ex if you change the coordinates of a line's vertex also the line's lenght should change
