import React, {useState, useEffect} from "react";
import {Button} from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import {useHistory} from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
//import useSWR from 'swr';

import {Card} from "../../components/card";
import {Header} from "../../components/header";
import {useStore} from "../../store/cart.store";
import "./style.scss";

export function Cart(props: any) {
  const history = useHistory();
  const state = useStore((state) => state);
  const [isShowDetail, showDetail] = useState(false);
  let pageIndex = 1;
  let pageSize = 20;


  // todo 页面加载时获取购物车中的数据
  useEffect(() => {
    console.warn('data: ', state);
    state.getCart();
    (async () => {
      await state.getGoods(pageIndex, pageSize);
    })();
  }, []);

  return (
    <>
      <Header title="购物车" returnTitle="返回首页" path="/"/>
      <div className="cards-wrapper">
        {state.goods.data.map((item) => {
          return (
            <div key={item.id}>
              <Card
                id={item.id}
                img={item.img}
                title={item.name}
                price={item.price}
                intro={
                  item.description.length > 15
                    ? item.description.slice(0, 15) + "..."
                    : item.description
                }
                addCart={(item) => state.addCart(item)}
              ></Card>
            </div>
          );
        })}
      </div>
      <div className="settle-accounts">
        <div
          className="cart-icon"
          onClick={() => showDetail(() => !isShowDetail)}
        >
          <LocalMallIcon/>
          <div className="budge">{state.cart.length}</div>
        </div>
        <div className="value-wrapper">
          <div className="price">
            <span style={{fontSize: "14px"}}>¥</span> {state.price}
          </div>
          <div className="count">共{state.count}件</div>
        </div>
        <div className="calculate">
          <Button
            disabled={!state.cart.length}
            onClick={() => history.push("/settle")}
            variant="contained"
            color="primary"
          >
            结算
          </Button>
        </div>
      </div>
      {isShowDetail ? (
        <div className="cart-detail">
          {state.cart.map((item) => {
            return (
              <div key={item.id} style={{marginBottom: '6px'}}>
                <div className="cart-item">
                  <div className="thumb-img">
                    <img
                      style={{width: "36px", height: "36px"}}
                      src={state.goods.data.find(val => val.id === item.id)?.img} />
                  </div>
                  <div className="info-wrapper">
                    <h4>{item.title}</h4>
                    <span>¥ {item.price}</span>
                  </div>
                  <div className="operator-wrapper">
                    <div
                      className="operators operator-add"
                      onClick={() => state.addCart(item)}
                    >
                      <AddCircleIcon/>
                    </div>
                    <div className="operator-count">{item.count}</div>
                    <div
                      className="operators operator-remove"
                      onClick={() => state.removeItem(item)}
                    >
                      <RemoveCircleIcon/>
                    </div>
                  </div>
                </div>
                <div className="divider"></div>
              </div>
            );
          })}
          <div className="tips">
            <span>快快快结算！</span>
          </div>
        </div>
      ) : null}
    </>
  );
}
