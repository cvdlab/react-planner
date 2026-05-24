import React from 'react';

// Single shared context that replaces the legacy childContextTypes / getChildContext API
// (removed in React 19). Provided by <ReactPlanner>; consumers either set
// `static contextType = PlannerContext` on classes, or use `useContext(PlannerContext)`.
// The provided value contains all action namespaces (projectActions, sceneActions, …),
// plus `translator` and `catalog`.
export const PlannerContext = React.createContext<any>({});
