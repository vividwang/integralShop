import React from 'react';
import './navbar.scss';

interface NavbarProps {
  title: string
}

export function Navbar(props: NavbarProps) {
  console.warn('navbar: ', props.title);
  return <>
    <div className='navbar'>{ props.title }</div>
  </>
}