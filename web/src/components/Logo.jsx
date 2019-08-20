import React from 'react';
import styled from '@emotion/styled'

const Wrapper = styled.div`
  position: absolute;
  top: 85%;
  left: 28%;
  > div {
    display: inline-block;
    margin: 0 3px;
  }
`

const Brand = styled.div`
  color: #577284;
  text-transform: uppercase;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  font-size: 18px;
  font-style: italic;
  letter-spacing: -1px;
`

const Color = styled.div`
  font-family: 'Gochi Hand', cursive;
  font-weight: 800;
  font-size: 27px;
  letter-spacing: -1px;
  > * {
    position: relative;
    display: inline-block;
  }
  > :first-of-type {
    color: #882451;
    transform: rotate(4deg);
  }
  > :nth-of-type(2) {
    color: #545cc2;
    font-size: 0.9em;
  }
  > :nth-of-type(3) {
    color: #8cb947;
    transform: rotate(-7deg);
  }
  > :nth-of-type(4) {
    color: #c0ae30;
    font-size: 0.9em;
  }
  > :last-child {
    color: #1f8db0;
    font-size: 0.97em;
  }
`

const Logo = () => (
  <Wrapper>
    <Brand>
      Game Boy
    </Brand>
    <Color>
      <span>C</span>
      <span>O</span>
      <span>L</span>
      <span>O</span>
      <span>R</span>
    </Color>
  </Wrapper>
)

export default Logo;
