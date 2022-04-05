import React from 'react';
import { List } from '@mui/material';

export function User(props: {}) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return <>
    <div>
      <div className="user-center"></div>
      <div className="list-item">
        <List></List>
      </div>
    </div>
  </>
}
