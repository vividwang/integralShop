import {
  Button,
  Alert,
  Snackbar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

import {Header} from '../../components/header';
import {useStore} from '../../store/cart.store';
import {useStore as useUserStore} from '../../store/user.store';
import './style.scss';


function ListItem(props: any) {
  console.warn('props: ', props);
  return <>
    <div className="list-item-container">
      <div className="list-item-img">
        <img
          style={{width: "36px", height: "36px"}}
          src={props.img}/>
      </div>
      <div className="list-item-name">
        <h4>{props.title}</h4>
      </div>
      <div className="list-item-info">
        <div className="list-item-info-count">x {props.count}</div>
        <div className="list-item-info-price"></div>
      </div>
    </div>
  </>
}

export function Settle(props: any) {
  const [status, setStatus] = useState(''); // settle status
  const state = useStore(state => state);
  const userState = useUserStore(state => state);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      await userState.getUserInfo();
    })();

    console.warn('state: ', state.price);
  }, [])

  function cancel() {
    history.push('/cart');
  }

  function handleClose() {
    setStatus('CLOSE');
  }

  async function settle() {
    console.warn('data: ', userState.userInfo.coin);
    if (state.price > userState.userInfo.coin) {
      setStatus('NO_ENOUGH_COINS');
      return ;
    }
    await state.doSettle();

    if (state.isFinished) {
      setStatus('SUCCESS');
    } else {
      setStatus('FAILED');
    }

  }

  const list = state.cart.map((item, i) => {
    return <>
      <div>title</div>
    </>
  })

  return <>
    <div className="settle-wrapper">
      <Header title="结算" returnTitle="返回购物车" path="/cart"/>
      <div className="show-cart">
        <div className="list">
          {
            state.cart.map((item, i) => {
              return (
                <ListItem
                  key={item.id}
                  id={item.id}
                  style={{marginTop: '20px'}}
                  title={item.title}
                  count={item.count}
                  price={item.price}
                  img={state.goods.data.find(val => val.id === item.id)?.img}
                ></ListItem>
              )
            })
          }
        </div>
      </div>
      <div className="sum">
        <div style={{paddingLeft: '20px'}}>当前积分：</div>
        <div style={{textAlign: 'right', paddingRight: '20px'}}>¥ {userState.userInfo.coin}</div>
      </div>
      <div className="sum">
        <div style={{paddingLeft: '20px'}}>合计：</div>
        <div style={{textAlign: 'right', paddingRight: '20px'}}>¥ {state.price}</div>
      </div>
      <div className="operators">
        <Stack direction="row" style={{"justifyContent": "center"}} spacing={2}>
          <Button
            onClick={cancel}
            variant="outlined" color="primary" startIcon={<DeleteIcon/>}>
            取消
          </Button>
          <Button
            onClick={() => settle()}
            variant="contained" endIcon={<SendIcon/>} color="primary">
            下单
          </Button>
        </Stack>
      </div>
    </div>
    <Snackbar open={status === 'SUCCESS'} onClose={handleClose} autoHideDuration={2000}
              anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
      <Alert severity="success" sx={{width: '100%'}}>
        下单成功
      </Alert>
    </Snackbar>
    <Snackbar open={status === 'FAILED'} onClose={handleClose} autoHideDuration={2000}
              anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
      <Alert severity="error" sx={{width: '100%'}}>
        下单失败
      </Alert>
    </Snackbar>
  <Snackbar open={status === 'NO_ENOUGH_COINS'} onClose={handleClose} autoHideDuration={2000}
    anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
    <Alert severity="error" sx={{width: '100%'}}>
      抱歉，积分不足
    </Alert>
  </Snackbar>
  </>
}