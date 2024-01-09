import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app/App.js';
import { store } from './app/store.js';

const root = createRoot(document.getElementById('root'));
const render = () => {
  root.render(
    <App 
      state={store.getState()}
      dispatch={store.dispatch}
    />
  )
}
store.subscribe(render);
render();
