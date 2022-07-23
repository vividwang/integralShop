import React, {useState, useEffect} from 'react';
import {
  Button,
} from '@mui/material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useHistory } from "react-router-dom";


import {Card} from '../../components/card';
import { Header } from '../../components/header';
import {useStore} from '../../store/cart.store';
import './style.scss';

export function Cart(props: any) {
  const history = useHistory();
  const state = useStore(state => state);

  useEffect(() => {
    state.getCart();
  }, [])

  return <>
    <Header title="购物车" returnTitle="返回首页" path="/"/>
    <div className="cards-wrapper">
      <Card
        id='1'
        img={require('../../../public/asserts/apple.jpg')}
        title="Apple"
        intro="A apple in spring."
        price={12}
        addCart={(item) => state.addCart(item)}/>
      <Card
        id='2'
        img={require('../../../public/asserts/apple.jpg')}
        title="Apple"
        intro="A apple in spring."
        price={33}
        addCart={(item) => state.addCart(item)}/>
      <Card
        id='3'
        img={require('../../../public/asserts/apple.jpg')}
        title="Apple"
        intro="A apple in spring."
        price={19}
        addCart={(item) => state.addCart(item)}/>
      <Card
        id='4'
        img={require('../../../public/asserts/apple.jpg')}
        title="Apple"
        intro="A apple in spring."
        price={72}
        addCart={(item) => state.addCart(item)}/>
    </div>
    <div className="settle-accounts">
      <div className="cart-icon">
        <LocalMallIcon />
        <div className="budge">{state.cart.length}</div>
      </div>
      <div className="value-wrapper">
        <div className="price"><span style={{ fontSize: '14px' }}>¥</span> {state.price}</div>
        <div className="count">共{state.count}件</div>
      </div>
      <div className="calculate">
        <Button disabled={!state.cart.length} onClick={() =>history.push('/settle')} variant="contained" color="primary">结算</Button>
      </div>
    </div>
  </>
}
