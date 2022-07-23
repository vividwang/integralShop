import React, { useState } from 'react';
import {Box, Button, Input, Alert, Snackbar, Grid, Paper} from '@mui/material';
import './style.scss';
import {useLoginStore} from './login.store';

interface LoginProps {

}

export function Login(props: LoginProps) {
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [status, setStatus] = useState(0); // login status
  const store = useLoginStore(state => state);

  function login() {
    const result = store.login(user, pwd);

    setStatus(result ? 200 : 400);

    if (result) {
      setTimeout(() => {
        window.location.href = '/cart'
      })
    }
  }

  function changeInput(e: any, type: string) {
    type === 'USER' ? setUser(e.target.value) : setPwd(e.target.value);
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
    <div className="login-container">
      <div style={{ width: '100%' }}>
        <Box>
          <Box component="div" style={{ marginBottom: '30px' }}>
            <Input style={{width: '100%'}} onChange={e => changeInput(e, 'USER')} placeholder="请输入用户名"/>
          </Box>
          <Box component="div">
            <Input type="password" style={{width: '100%'}} onChange={e => changeInput(e, 'PWD')}  placeholder='请输入密码'/>
          </Box>
        </Box>
        <div style={{ textAlign: 'center', marginTop: 50 }}>
          <Button style={{width: '100%'}} onClick={login} variant="contained">登录</Button>
        </div>
      </div>
    </div>
  </>
}