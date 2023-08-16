import React, { useEffect, useRef, useState } from 'react';

import Immutable, { Map } from 'immutable';
import immutableDevtools from 'immutable-devtools';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import MyCatalog from './catalog/mycatalog';

import ScreenshotToolbarButton from './ui/screenshot-toolbar-button';

import "react-planner/styles/react-planner.css"

import {
    Models as PlannerModels,
    reducer as PlannerReducer,
    Plugins as PlannerPlugins,
    ReactPlanner,
} from 'react-planner';

// Define state
let AppState = Map({
    'react-planner': new PlannerModels.State()
});

// Define reducer
let reducer = (state, action) => {
    state = state || AppState;
    state = state.update('react-planner', plannerState => PlannerReducer(plannerState, action));
    return state;
};

let blackList = isProduction === true ? [] : [
    'UPDATE_MOUSE_COORDS',
    'UPDATE_ZOOM_SCALE',
    'UPDATE_2D_CAMERA'
];

if (!isProduction) {
    console.info('Environment is in development and these actions will be blacklisted', blackList);
    console.info('Enable Chrome custom formatter for Immutable pretty print');
    immutableDevtools(Immutable);
}

// Init store
let store = createStore(
    reducer,
    null,
    !isProduction && window.devToolsExtension ?
        window.devToolsExtension({
            features: {
                pause: true,
                lock: true,
                persist: true,
                export: true,
                import: 'custom',
                jump: true,
                skip: true,
                reorder: true,
                dispatch: true,
                test: true
            },
            actionsBlacklist: blackList,
            maxAge: 999999
        }) :
        f => f
);

let plugins = [
    PlannerPlugins.Keyboard(),
    PlannerPlugins.Autosave('react-planner_v0'),
    PlannerPlugins.ConsoleDebugger(),
];

let toolbarButtons = [
    ScreenshotToolbarButton,
];

const Wrapper = () => {
    const parentRef = useRef();
    const [ width, setWidth] = useState();
    const [ height, setHeight] = useState();

    useEffect(() => {
        setWidth(parentRef.current.offsetWidth);
        setHeight(parentRef.current.offsetHeight);
    }, []);

    return (
        <Provider store={store}>
            <div style={{width: '100%', height: '100%'}} ref={parentRef}>
                {
                    width && height &&
                    <ReactPlanner
                        store={store}
                        catalog={MyCatalog}
                        width={width}
                        height={height}
                        plugins={plugins}
                        toolbarButtons={toolbarButtons}
                        stateExtractor={state => state.get('react-planner')}
                    />
                }
            </div>
        </Provider>
    );
};

export default Wrapper;