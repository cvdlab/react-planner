# react-planner [WIP]
*react-planner* is a React Component for plans design.
Draw a 2D floorplan and navigate it in 3D mode.

[![npm](https://img.shields.io/npm/v/react-planner.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/react-planner)
![javascript](https://img.shields.io/badge/javascript-ES6-fbde34.svg)
![react-version](https://img.shields.io/badge/react%20version-15.0.0%20or%20later-61dafb.svg)

## Features
- Fully customizable catalog
- 3D realtime view
- Pan & zoom support
- ES6 syntax

## Demo

[https://cvdlab.github.io/react-planner](https://cvdlab.github.io/react-planner)


## Usage
```
 import React, {Component} from 'react';
 import {Planner} from 'react-planner';

 import MyCatalog from './catalog/mycatalog';
 import MyPlugin from './plugins/myplugin/myplugin';

 export default class Demo extends Component {
   render() {
     return (
       <Planner catalog={MyCatalog} plugins={[MyPlugin]}/>
     )
   }
 }
```

## Docs

Cooming soon!

## Contributing
Your contributions (issues and pull request) are very appreciated!

## Authors
- [chrvadala](https://github.com/chrvadala)
- [danilosalvati](https://github.com/danilosalvati)
- [enricomarino](https://github.com/enricomarino)
- [federicospini](https://github.com/federicospini)


Developed @ [CVDLAB](http://cvdlab.org/)

## License
MIT
