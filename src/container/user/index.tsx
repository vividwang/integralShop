import React, { useState, useEffect } from "react";
import { Layout } from "../../components/layout";
import { UserCard } from "../../components/card/user-card";
import { useStore } from '../../store/user.store';

import "./style.scss";

interface UserProps {}

const title = "个人中心";

export function User(props: UserProps) {
  const store = useStore();
  const [isShow, setIsShow] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  console.info('store: ', store);
  
  useEffect(() => {
    (async () => {
      const res = await store.getUserInfo();
      
      console.warn('res: ', res);
      setUserInfo(res);
    })();
  }, []);
  
  function handleClick(e, type: string) {
    if (type === 'ORDER') {
      window.location.href = '/orders'; 
    } else if (type === 'SHOP') {
      window.location.href = '/cart'; 
    } else if (type === 'LUCKY') {
      window.location.href = '/lucky';
    }
  }

  function handleLogout(e) {
    store.logout();
    window.location.href = '/login';
  }

  function selectEmotion() {
    setIsShow(!isShow);
  }

  function selectStatus(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    store.setUserInfo({ status: (event.target as HTMLTextAreaElement).className });
    setIsShow(false);
  }
  
  async function getCoins() {
    const data = JSON.parse(localStorage.getItem('INTEGRAL_SHOP_USER_INFO'));
    
    await store.getCoins(data.id, ++store.userInfo.coin);
  }
  
  return (
    <>
      <Layout title={title} menu="USER">
        <div>
          <UserCard>
            <>
              <div className="user-info-wrapper">
                <div className="user-info-image"></div>
                <div className="user-info-name">{ store.userInfo.username }</div>
                <div className="user-info-status" onClick={selectEmotion}>
                  { store.userInfo.status ? store.userInfo.status : '选择心情' }
                </div>
                <div className="user-info-operator">
                  <div>积分：{store.userInfo.coin}</div>
                  <div onClick={() => getCoins()}>签到👍+1</div>
                </div>
                { 
                  isShow ? 
                  <div className="emotion-select-wrapper" onClick={e => selectStatus(e)}>
                    <div className="not-happy">🙃</div>
                    <div className="proud">😎</div>
                    <div className="upset">😔</div>
                    <div className="pity">🥺</div>
                    <div className="happy">🤩</div>
                  </div> : null
                }
              </div>
              <div></div>
            </>
          </UserCard>
          <UserCard>
            <div onClick={e => handleClick(e, 'SHOP')}>
              积分商城
            </div>
          </UserCard>
          <UserCard>
            <div onClick={e => handleClick(e, 'LUCKY')}>
              幸运大转盘
            </div>
          </UserCard>
          <UserCard>
            <div onClick={e => handleClick(e, 'ORDER')}>
              订单中心
            </div>
          </UserCard>
          <UserCard>
            <div onClick={e => handleLogout(e)}>
              退出登陆
            </div>
          </UserCard>
        </div>
      </Layout>
    </>
  );
}
