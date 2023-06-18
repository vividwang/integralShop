import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { useStore } from '../../store/timeline.store';
import './style.scss';

const TimeLineCard = function (props: { date: string; content: string }) {
  return <>
    <div className="timeline-card-wrapper">
      <div className="timeline-card-title">{ props.date }</div>
      <div className="timeline-card-content">{ props.content }</div>
    </div>
  </>
}

export const TimeShow = function () {
  const store = useStore();

  useEffect(() => {
    ;(async () => {
      await store.getInitialState();

      console.warn('store: ', store);
    })();

    
  }, []);

  return <>
    <div className="timeline-wrapper">
      { store.data.map(item => <div key={item.id}>
        <TimeLineCard {...item}></TimeLineCard>
      </div>) }
      { store.total > 20 ? <div style={{ textAlign: 'center', marginTop: '20px' }}><CircularProgress /></div> : null }
    </div>
  </>
} 