import React, {useState} from 'react';
import {
  Box,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Fab, Button,
} from '@mui/material';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import AddIcon from '@mui/icons-material/Add';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import {useTheme} from '@mui/material/styles';

import {Card} from '../../components/card';
import { Header } from '../../components/header';
import {useStore} from './store';
import './style.scss';

export function Cart(props: any) {
  const theme = useTheme();
  const state = useStore(state => state);

  return <>
    <Header title="购物车"/>
    <div className="cards-wrapper">
      <Card
        id='123'
        img={require('../../../public/asserts/apple.jpg')}
        title="Apple"
        intro="A apple in spring."
        price={10}
        addCart={(item) => state.addCart(item)}/>
      <Card
        id='123'
        img={require('../../../public/asserts/apple.jpg')}
        title="Apple"
        intro="A apple in spring."
        price={10}
        addCart={(item) => state.addCart(item)}/>
      <Card
        id='123'
        img={require('../../../public/asserts/apple.jpg')}
        title="Apple"
        intro="A apple in spring."
        price={10}
        addCart={(item) => state.addCart(item)}/>
      <Card
        id='123'
        img={require('../../../public/asserts/apple.jpg')}
        title="Apple"
        intro="A apple in spring."
        price={10}
        addCart={(item) => state.addCart(item)}/>
    </div>
    <div className="settle-accounts">
      <div className="cart-icon">
        <LocalMallIcon />
        <div className="budge">3</div>
      </div>
      <div className="value-wrapper">
        <div className="price"><span style={{ fontSize: '14px' }}>¥</span> 52</div>
        <div className="count">共三件</div>
      </div>
      <div className="calculate">
        <Button type="primary" variant="outlined">结算</Button>
      </div>
    </div>
  </>
}
