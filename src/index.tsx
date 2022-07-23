import { render } from 'react-dom';
import React, { useState } from 'react';

import './global.scss';
import Routers from './router'; 

function App() {
  return <div>
    <Routers />
  </div>
}

render(<App />, document.getElementById('root'));
