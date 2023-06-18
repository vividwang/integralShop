import React from 'react';
import {
  Button,
} from '@mui/material';
import { useHistory } from "react-router-dom";

import './style.scss';

interface HeaderProps {
  title: string,
  returnTitle?: string,
  path?: string,
}

export const Header = function (props: HeaderProps) {
  let history = useHistory();

  function returnTo() {
    history.push(props.path);
  }

  return <>
    <div className="header-container">
      <div className="return-btn">
        <Button color="primary" size="small" style={{ color: 'white' }} variant="outlined" onClick={returnTo}>{props.returnTitle}</Button>
      </div>
      <header className="header">{ props.title ? props.title : '首页' }</header>
    </div>
  </>
}
