import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import { Cart } from './container/cart';
import { Login } from './container/login';
import { Settle } from './container/settle';
import { Management } from './container/manage_entry';

export default function Routers() {
  const user = JSON.parse(localStorage.getItem('USER'));

  return <>
    <Router>
      <Switch>
        <Route path="/login" component={Login}></Route>
        { user && user.username ? (<>
          <Route path="/cart" component={Cart}></Route>
          <Route path="/settle" component={Settle}></Route>
          <Route path="/manage_entry" component={Management}></Route>
        </>) : (<>
          <Redirect to="/login"></Redirect>
        </>)}
      </Switch>
    </Router>
  </>
}