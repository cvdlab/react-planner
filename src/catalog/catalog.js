import {
  PropertyColor,
  PropertyEnum,
  PropertyString,
  PropertyNumber,
  PropertyLengthMeasure,
  PropertyToggle,
  PropertyCheckbox,
  PropertyHidden,
  PropertyReadOnly
} from './properties/export';

import {UNIT_CENTIMETER} from '../constants';

export default class Catalog {

  constructor(unit = UNIT_CENTIMETER) {
    this.elements = {};
    this.categories = {root: {name: 'root', label: '/', elements: [], categories: []}};
    this.propertyTypes = {};
    this.unit = unit;

    this.registerMultiplePropertyType([
      ['color', PropertyColor, PropertyColor],
      ['enum', PropertyEnum, PropertyEnum],
      ['string', PropertyString, PropertyString],
      ['number', PropertyNumber, PropertyNumber],
      ['length-measure', PropertyLengthMeasure, PropertyLengthMeasure],
      ['toggle', PropertyToggle, PropertyToggle],
      ['checkbox', PropertyCheckbox, PropertyCheckbox],
      ['hidden', PropertyHidden, PropertyHidden],
      ['read-only', PropertyReadOnly, PropertyReadOnly]
    ]);
  }

  /** @description Get catalog's element
   *  @param {string} type Element's type
   *  @return {?object} Element
  */
  getElement(type) {
    if (this.hasElement(type)) {
      return this.elements[type];
    }
    throw new Error(`Element ${type} does not exist in catalog`);
  }

  /** @description Get catalog category
   *  @param {string} categoryName Name of category
   *  @return {object} Category
  */
  getCategory(categoryName) {
    if (this.hasCategory(categoryName)) {
      return this.categories[categoryName];
    }
    throw new Error(`Category ${categoryName} does not exist in catalog`);
  }

  /** @description Return type of a specfied property
   *  @param {string} type Property type
   *  @return {?object} Property
  */
  getPropertyType(type) {
    if (this.propertyTypes.hasOwnProperty(type)) {
      return this.propertyTypes[type];
    }
    throw new Error(`Element ${type} does not exist in catalog`);
  }

  /** @description Register a new element
   *  @param {object} json Element structure
   *  @return {void}
  */
  registerElement(json) {
    json.properties = json.properties || {};
    if (this.validateElement(json)) {
      this.elements[json.name] = json;
      this.categories.root.elements.push(this.elements[json.name]);
    }
  }

  /** @description Register multiple elements
   *  @param {array} [elementArray] Array of elements
   *  @return {void}
  */
  registerMultipleElements(elementArray) {
    elementArray.forEach(el => this.registerElement(el));
  }

  /** @description Register a new property
   *  @param {string} type Type of property
   *  @param {object} Viewer Property viewer component
   *  @param {object} Editor Property editor component
   *  @return {void}
  */
  registerPropertyType(type, Viewer, Editor) {
    this.propertyTypes[type] = {type, Viewer, Editor};
  }

  /** @description Register multiple property
   *  @param {array} propertyTypeArray Array of properties
   *  @return {void}
  */
  registerMultiplePropertyType(propertyTypeArray) {
    propertyTypeArray.forEach(el => this.registerPropertyType(...el));
  }

  /** @description Validate an element
   *  @param {object} json Element's structure
   *  @return {?boolean}
  */
  validateElement(json) {
    if (!json.hasOwnProperty('name')) throw new Error('Element not valid');

    let name = json.name;
    if (!json.hasOwnProperty('prototype')) throw new Error(`Element ${name} doesn't have prototype`);

    if (!json.hasOwnProperty('info')) throw new Error(`Element ${name} doesn't have info`);
    if (!json.info.hasOwnProperty('tag')) throw new Error(`Element ${name} doesn't have tag`);
    if (!json.info.hasOwnProperty('description')) throw new Error(`Element ${name} doesn't have description`);
    if (!json.info.hasOwnProperty('image')) throw new Error(`Element ${name} doesn't have image`);

    if (!json.hasOwnProperty('render2D')) throw new Error(`Element ${name} doesn't have render2D handler`);
    if (!json.hasOwnProperty('render3D')) throw new Error(`Element ${name} doesn't have render3D handler`);
    if (!json.hasOwnProperty('properties')) throw new Error(`Element ${name} doesn't have properties`);

    for (let propertyName in json.properties) {
      let propertyConfigs = json.properties[propertyName];
      if (!propertyConfigs.hasOwnProperty('type')) throw new Error(`Element ${name}, Property ${propertyName} doesn't have type`);
      if (!propertyConfigs.hasOwnProperty('defaultValue')) throw new Error(`Element ${name}, Property ${propertyName} doesn't have defaultValue`);
    }

    return true;
  }

  /** @description Check if catalog has element
   *  @param {string} type Element's type
   *  @return {boolean}
  */
  hasElement(type) {
    return this.elements.hasOwnProperty(type);
  }

  /** @description Register a new category
   *  @param {string} name Name of category
   *  @param {string} label Label of category
   *  @param {array} [childs] Category's childs
   *  @return {?object} Registered category
  */
  registerCategory(name, label, childs) {
    if (this.validateCategory(name, label)) {
      this.categories[name] = {name, label, categories: [], elements: []};
      this.categories.root.categories.push(this.categories[name]);

      if(childs && childs.length) {
        childs.forEach( el => this.addToCategory( name, el ) );
      }

      return this.categories[name];
    }
    return null;
  }

  /** @description Add an element to the specified category
   *  @param {string} name Name of category
   *  @param {object} child Element's structure
   *  @return {?void}
  */
  addToCategory(name, child) {
    if (this.hasElement(child.name)) {
      this.categories[name].elements.push(child);
      this.categories.root.elements.splice(this.categories.root.elements.indexOf(child), 1);
    } else if (this.hasCategory(child.name)) {
      this.categories[name].categories.push(child);
      this.categories.root.categories.splice(this.categories.root.categories.indexOf(child), 1);
    } else {
      throw new Error(`child ${child} is either category nor element`);
    }
  }

  /** @description Check if category contain element
   *  @param {string} categoryName Name of category
   *  @param {string} elementName Name of element
   *  @return {boolean}
  */
  categoryHasElement(categoryName, elementName) {
    return this.hasCategory(categoryName) && this.categories[categoryName].elements.some(el => el.name === elementName);
  }

  /** @description Validate a category
   *  @param {string} name Name of category
   *  @param {string} label Label of category
   *  @return {?boolean}
  */
  validateCategory(name, label) {
    if (!name) {
      throw new Error('Category has undefined name');
    }
    if (name === '') {
      throw new Error('Category has empty name');
    }
    if (this.hasCategory(name)) {
      throw new Error('Category has already been registered');
    }

    return true;
  }

  /** @description Verify if catalog already contain a category with specified name
   *  @param {string} categoryName Name of category
   *  @return {boolean}
  */
  hasCategory(categoryName) {
    return this.categories.hasOwnProperty(categoryName);
  }

}
