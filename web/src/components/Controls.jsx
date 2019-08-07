import React from 'react';
import styled from '@emotion/styled'
import Arrows from './Arrows'

const Wrapper = styled.div`
  position: absolute;
  top: 62%;
  width: 100%;
  height: 180px;
`

const Button = styled.button`
  position: absolute;
  top: ${props => props.top}%;
  right: ${props => props.right}%;
  width: 45px;
  height: 45px;
  padding: 0 0 0 10px;
  background: #222;
  border-radius: 50%;
  border: 3px solid #000;
  color: #000;
  text-shadow: -1px 1px 2px #555;
  text-align: left;
  font-size: 25px;
  cursor: pointer;
  &:active {
    background: #000;
  }
  &:focus {
    outline: none;
  }
`

const Pill = styled.button`
  position: absolute;
  bottom: 16px;
  left: ${props => props.left}%;
  width: 33px;
  height: 15px;
  padding: 0;
  background: #222;
  border: 3px solid #000;
  border-radius: 90px/35px 35px;
  cursor: pointer;
  &:after {
    content: "${props => props.text}";
    display: block;
    position: absolute;
    top: calc(100% + 5px);
    left: 50%;
    transform: translateX(-50%);
    color: #ffd947;
    font-family: 'Lato', sans-serif;
    font-size: 15px;
    font-weight: 800;
    text-shadow: -1px -1px 1px #e0bc31;
    text-transform: uppercase;
    cursor: default;
  }
  &:active {
    background: #000;
  }
  &:focus {
    outline: none;
  }
`

const Controls = () => (
  <Wrapper>
    <Arrows />
    <Button top={7} right={11}>A</Button>
    <Button top={24} right={27}>B</Button>
    <Pill text="Select" left={38} />
    <Pill text="Start" left={53} />
  </Wrapper>
)

export default Controls;
