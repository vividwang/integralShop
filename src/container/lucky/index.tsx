import React, { useState, useRef, useEffect } from "react";
import { LuckyWheel } from "@lucky-canvas/react";
import "./style.scss";
import { Header } from "../../components/header";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Alert, Snackbar} from '@mui/material';
import {useStore as useUserStore} from '../../store/user.store';
import {useStore} from '../../store/cart.store';

export function Lucky() {
	const userState = useUserStore(state => state);
	const state = useStore(state => state);
	const [open, setOpen]= useState(false);
  const [blocks] = useState([{ padding: "10px", background: "#869cfa" }]);
  const [prizes] = useState([
    { background: "#e9e8fe", fonts: [{ text: "下次加油", status: 'FAILED' }] },
    { background: "#b8c5f2", fonts: [{ text: "1积分", status: 'SUCCESS', coin: 1, }] },
    { background: "#e9e8fe", fonts: [{ text: "2积分", status: 'SUCCESS', coin: 2, }] },
    { background: "#b8c5f2", fonts: [{ text: "3积分", status: 'SUCCESS', coin: 3, }] },
    { background: "#e9e8fe", fonts: [{ text: "4积分", status: 'SUCCESS',  coin: 4, }] },
    { background: "#b8c5f2", fonts: [{ text: "5积分", status: 'SUCCESS',  coin: 5, }] },
  ]);
  const [buttons] = useState([
    { radius: "40%", background: "#617df2" },
    { radius: "35%", background: "#afc8ff" },
    {
      radius: "30%",
      background: "#869cfa",
      pointer: true,
      fonts: [{ text: "开始", top: "-10px" }],
    },
  ]);

	const [prize, setPrize] = useState(null);
	const [isShowTips, setShowTips] = useState(false);

	useEffect(() => {
    (async () => {
      await userState.getUserInfo();
    })();

    console.warn('state: ', userState);
  }, [])

	const handleClose = () => {
    setOpen(false);
  };

	const handleOk = () => {
		setOpen(false);

		  // 点击抽奖按钮会触发star回调
			(myLucky.current as any).play();
			setTimeout(() => {
				const index = (Math.random() * 6) >> 0;
				(myLucky.current as any).stop(index);
			}, 2500);
	}

  const myLucky = useRef();

  return (
    <>
			<Header title="幸运转轮" returnTitle="回到首页" path="/" />
      <div className="lucky-container">
			<div style={{ marginBottom: "25px"}}>
          <span>当前积分：</span>
          <span>{userState.userInfo.coin}</span>
        </div>
        <LuckyWheel
          ref={myLucky}
          width="300px"
          height="300px"
          blocks={blocks}
          prizes={prizes}
          buttons={buttons}
          onStart={() => {
						setOpen(true);
          }}
          onEnd={(prize) => {
            // 抽奖结束会触发end回调
            setShowTips(true);
						setPrize(prize.fonts[0]);
						// useUserStore.
						const data = JSON.parse(localStorage.getItem('INTEGRAL_SHOP_USER_INFO'));

						if (prize.fonts[0].status === 'FAILED') {
							userState.getCoins(data.id, userState.userInfo.coin - 2);
						} else {
							userState.getCoins(data.id, userState.userInfo.coin - 2 + prize.fonts[0].coin);
						}
						setTimeout(() => {
							setShowTips(false);
						}, 3000);
          }}
        />
				<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"提示"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
						{ userState.userInfo.coin >= 2 ? '进行抽奖需要耗费2个积分，是否继续？' : '当前积分不足'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleOk} autoFocus disabled={ userState.userInfo.coin < 2}>
            确认
          </Button>
        </DialogActions>
      </Dialog>
			<Snackbar open={isShowTips} onClose={handleClose} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert severity="success" sx={{ width: '100%' }}>
				{  prize?.text === '下次加油' ? prize?.text : "恭喜你抽到 " + prize?.text}
      </Alert>
    </Snackbar>
      </div>
    </>
  );
}
