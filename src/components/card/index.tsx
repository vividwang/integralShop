import React from 'react';
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
          <span>¥ { props.price }</span>
          <span onClick={() =>props.addCart(props)}>加入购物车</span>
        </div>
      </div>
    </div>
  </>
}
