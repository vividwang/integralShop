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
import { User } from './container/user';
import { Orders } from './container/orders'
import { Lucky } from './container/lucky';
import { TimelinePage } from './container/timeline-page';

export default function Routers() {
  const user = JSON.parse(localStorage.getItem('INTEGRAL_SHOP_USER_INFO'));

  return <>
    <Router>
      <Switch>
        <Route path="/login" component={Login}></Route>
        { user && user.username ? (<>
          <Route path="/" component={User} exact></Route>
          <Route path="/cart" component={Cart}></Route>
          <Route path="/orders" component={Orders}></Route>
          <Route path="/settle" component={Settle}></Route>
          <Route path="/user" component={User}></Route>
          <Route path="/lucky" component={Lucky}></Route>
          <Route path="/timeline" component={TimelinePage}></Route>
          <Route path="/manage_entry" component={Management}></Route>
        </>) : (<>
          <Redirect to="/login"></Redirect>
        </>)}
      </Switch>
    </Router>
  </>
}