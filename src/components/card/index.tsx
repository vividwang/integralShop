import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import "./style.scss";

interface CardProps {
  id: string,
  img: any,
  title: string,
  intro: string,
  price: number,
  addCart: (item: CardProps) => void,
}

export function Card(props: CardProps) {
  return <>
    <div className="card-wrapper">
      <div className="img-display">
        <img src={props.img} alt="cart img"/>
      </div>
      <div className="content">
        <div className="title">{props.title}</div>
        <div className="intro">{props.intro}</div>
        <div className="footer">
          <span className="price">¥ { props.price }</span>
          <span className="cart" onClick={() =>props.addCart(props)}> <AddCircleIcon /> </span>
        </div>
      </div>
    </div>
  </>
}
