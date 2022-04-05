import React from 'react';
import './style.scss';

interface HeaderProps {
  title ?: string,
}

export const Header = function (props: HeaderProps) {
  return <>
    <header className="header">{ props.title ? props.title : '首页' }</header>
  </>
}
