import React, {useState} from 'react';
import {
  Box,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Fab,

} from '@mui/material';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';

import { Card } from '../../components/card';
import { useStore } from './store';

export function Cart(props: any) {
  const theme = useTheme();
  const state = useStore(state => state);

  return <>
   <div className="cards-wrapper">
     <Card
       id='123'
       img={require('../../../public/asserts/apple.jpg')}
       title="Apple"
       intro="A apple in spring."
       price={10}
       addCart={(item) => state.addCart(item)}/>
   </div>
    <div className="settle-accounts">
      <div>{ state.count }</div>
    </div>
  </>
}
