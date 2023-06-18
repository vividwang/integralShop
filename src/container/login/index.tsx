import React, { useState, useEffect, useRef } from 'react';
import {Box, Button, Input, Alert, Snackbar, Grid, Paper} from '@mui/material';
import './style.scss';
import {useLoginStore} from './login.store';

interface LoginProps {

}

export function Login(props: LoginProps) {
  const pwd = useRef(null);
  const user = useRef(null);
  const [status, setStatus] = useState(0); // login status
  const store = useLoginStore(state => state);


  useEffect(() => {
    if (status === 0) {
      localStorage.removeItem('INTEGRAL_SHOP_USER_INFO');
    }

    console.warn('value: ')

  }, []);

  async function login() {
    const result = await store.login(user.current.value, pwd.current.value);

    console.warn('result: ', result);
    setStatus(result.status !== 0 ? 200 : 400);

    if (result.status !== 0) {
      setTimeout(() => {
        window.location.href = '/cart'
      })
    }
  }

  function changeInput(e: any, type: string) {
    type === 'USER' ? user.current.value = e.target.value : pwd.current.value = e.target.value;
  }

  function handleClose() {
    setStatus(0);
  }

  return <>
    <Snackbar open={status === 200} onClose={handleClose} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert severity="success" sx={{ width: '100%' }}>
        登录成功
      </Alert>
    </Snackbar>
    <Snackbar open={status === 400} onClose={handleClose} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert severity="error" sx={{ width: '100%' }}>
        登录失败，请检查用户名或密码
      </Alert>
    </Snackbar>
    <div className="login-wrapper">
      <div className="login-container">
        <div style={{ width: '100%' }}>
          <Box>
            <Box component="div" style={{ marginBottom: '30px' }}>
              <Input style={{width: '100%'}} onChange={e => changeInput(e, 'USER')} placeholder="请输入用户名" ref={user}/>
            </Box>
            <Box component="div">
              <Input type="password" style={{width: '100%'}} onChange={e => changeInput(e, 'PWD')}  placeholder='请输入密码' ref={pwd}/>
            </Box>
          </Box>
          <div style={{ textAlign: 'center', marginTop: 50 }}>
            <Button style={{width: '100%'}} onClick={login} variant="contained">登录</Button>
          </div>
        </div>
      </div>
    </div>
  </>
}