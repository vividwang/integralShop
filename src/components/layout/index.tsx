import React from 'react';
import { Navbar } from '../navbar';
import { Footerbar } from '../footbar';

interface LayoutProps {
  children ?: React.CElement<any, any>
  title: string,
  menu: string,
}

// todo
export function Layout(props: LayoutProps) {
  return (<>
    <Navbar title={ props.title }/>
      <div>
      { props.children }
      </div>
    {/*<Footerbar selectedMenu={ props.menu }></Footerbar>*/} 
  </>)
}