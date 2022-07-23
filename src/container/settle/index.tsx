import {
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";

import { Header } from '../../components/header';
import {useStore} from '../../store/cart.store';
import './style.scss';


function ListItem(props: any) {
  return <>
    <div className="list-item-container">
      <div className="list-item-img"></div>
      <div className="list-item-name">
        <span style={{ color: 'darkgray' }}>{props.title}</span>
      </div>
      <div className="list-item-info">
        <div className="list-item-info-count">x {props.count}</div>
        <div className="list-item-info-price"></div>
      </div>
    </div>
  </>
}

export function Settle(props: any) {
  const state = useStore(state => state);
  const history = useHistory();

  useEffect(() => {
    // if (!state.cart.length) {
    //   history.push('/cart');
    // }
    console.warn('state: ', state.price);
  }, [])

  function cancel() {
    history.push('/cart');
  }

  async function settle() {

  }

  const list = state.cart.map((item, i) => {
    return <>
      <div>title</div>
    </>
  })

  return <>
    <div className="settle-wrapper">
      <Header title="结算" returnTitle="返回购物车" path="/cart" />
      <div className="show-cart">
        <div className="list">
          {
            state.cart.map((item, i) => {
              return (<>
                <ListItem style={{ marginTop: '20px' }} key={item.id} title={item.title} count={item.count} price={item.price}></ListItem>
              </>)
            })
          }
        </div>
      </div>
      <div className="sum">
        <div style={{paddingLeft: '20px'}}>合计：</div>
        <div style={{textAlign: 'right', paddingRight: '20px'}}>¥ {state.price}</div>
      </div>
      <div className="operators">
        <Stack direction="row" style={{"justifyContent": "center"}} spacing={2}>
          <Button 
            onClick={cancel}
            variant="outlined" color="primary" startIcon={<DeleteIcon />}>
            取消
          </Button>
          <Button 
            onClick={settle}
            variant="contained" endIcon={<SendIcon />} color="primary">
            下单
          </Button>
        </Stack>
      </div>
    </div>
  </>
}