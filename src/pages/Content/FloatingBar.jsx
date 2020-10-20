import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Popup from './Popup/Popup';

const StyledFloatingBar = styled.div`
  width: 60px;
  height: 60px;
  position: fixed;
  background-color: black;
  right: 0;
  top: 25%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  color: white;
  font-family: 'Source Serif Pro', serif;
  transition: all ease-in-out 175ms;
  user-select: none;
  z-index: 999;

  &:hover {
    margin-right: 10px;
  }

  &::after {
    content: '';
    width: 60px;
    height: 60px;
    position: fixed;
    right: 0;
    z-index: -1;
    background-color: black;
  }
`;

const HiddenContentWrapper = styled.div`
  position: fixed;
  top: 5%;
  right: 30px;
  width: 400px;
  height: 600px;
  background-color: white;
  border: 1px solid black;
  z-index: 9999;
`;

const FloatingBar = () => {
  const [hidden, setHidden] = useState(true);

  return (
    <>
      {!hidden && (
        <HiddenContentWrapper>
          {/* <Popup handleSetHidden={(hidden) => setHidden(hidden)} /> */}
        </HiddenContentWrapper>
      )}
      <StyledFloatingBar onClick={() => setHidden(false)}>I</StyledFloatingBar>
    </>
  );
};

export default FloatingBar;
