import { render } from 'react-dom';
import React, { useState } from 'react';

import './global.scss';
import Routers from './router'; 

function App() {
  const [value, setValue] = useState(0);
  // setInterval(() => {
  //   setValue(value + 1);
  // }, 1000);

  // console.warn('value: ', value);
  return <div className='container'>
    <Routers />
  </div>
}

render(<App />, document.getElementById('root'));
