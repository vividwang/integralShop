import { render } from 'react-dom';
import React, { useState } from 'react';

import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import CameraIcon from '@mui/icons-material/Camera';

import './global.scss';
import { Cart  } from './container/cart';


import { User  } from './container/user';

function App() {
  const [value, setValue] = useState(0);

  return <div>
    <Cart />
    {/*<User></User>*/}
    {/*<div className="bottom-navigation-wrapper">*/}
    {/*  <BottomNavigation*/}
    {/*    showLabels*/}
    {/*    value={value}*/}
    {/*    onChange={(event, newValue) => {*/}
    {/*      setValue(newValue);*/}
    {/*    }}*/}
    {/*  >*/}
    {/*    <BottomNavigationAction icon={<CircleNotificationsIcon />} />*/}
    {/*    <BottomNavigationAction icon={<CameraIcon />} />*/}
    {/*    <BottomNavigationAction icon={<AccountCircleIcon />} />*/}
    {/*  </BottomNavigation>*/}
    {/*</div>*/}
  </div>
}

render(<App />, document.getElementById('root'));
