import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './style.scss';

/**
 * selectedMenu{ INDEX, WALL, USER }
 */
interface FootProps {
  selectedMenu: string
}

const OLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  color: black;
  margin-top: 5px;
`
const OIcon = styled.i`
  font-size: 150%
`


export function Footerbar(props: FootProps) {
  return <>
    <div className='footerbar'>
      <div className='footerbar-item'>
        {props.selectedMenu === 'INDEX' ? <>
          <span className="menu selected-menu">
            <OLink to='/dashboard' style={{ color: 'blue' }}>
              <OIcon className="fas fa-infinity"></OIcon>
            </OLink>
          </span>
        </> : <>
          <span className="menu">
            <OLink to='/dashboard'>
              <OIcon className="fas fa-infinity"></OIcon>
            </OLink>
          </span>
        </>}
      </div>
      <div className='footerbar-item'>
        {props.selectedMenu === 'WALL' ? <>
          <span className="menu selected-menu">
            <OLink to='/wall' style={{ color: 'blue' }}>
              <OIcon className="fas fa-camera-retro"></OIcon>
            </OLink>
          </span>
        </> : <>
          <span className="menu">
            <OLink to='/wall'>
              <OIcon className="fas fa-camera-retro"></OIcon>
            </OLink>
          </span>
        </>}
      </div>
      <div className='footerbar-item'>
        {props.selectedMenu === 'USER' ? <>
          <span className="menu selected-menu">
            <OLink to='/user' style={{ color: 'blue' }}>
              <OIcon className="fas fa-user-astronaut"></OIcon>
            </OLink>
          </span>
        </> : <>
          <span className="menu">
            <OLink to='/user'>
              <OIcon className="fas fa-user-astronaut"></OIcon>
            </OLink>
          </span>
        </>}
      </div>
    </div>
  </>
}