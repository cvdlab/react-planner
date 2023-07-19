import React from 'react';
import { createRoot } from 'react-dom/client';

import Wrapper from './wrapper';

// Render
const root = createRoot(document.getElementById('app'));

root.render(
    <Wrapper />
);
