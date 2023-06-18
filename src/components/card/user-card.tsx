import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface CardProps {
  children: React.FC | React.ClassicComponent | ReactElement
}

const Div = styled.div`
  width: 92%;
  margin: 15px auto;
  padding: 10px;
  border-radius: 4px;
  background-color: #f5f5f5;
  box-shadow: 2px 2px 1px #f1f1f1;
`


export function UserCard(props: CardProps) {
  return <>
    <Div>
      {props.children}
    </Div>
  </>
}