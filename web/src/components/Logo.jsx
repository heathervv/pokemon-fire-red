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
`

const Color = styled.div`
  font-family: 'Delius', cursive;
  font-weight: 800;
  > :first-of-type {
    color: #882451;
  }
  > :nth-of-type(2) {
    color: #545cc2;
  }
  > :nth-of-type(3) {
    color: #8cb947;
  }
  > :nth-of-type(4) {
    color: #c0ae30;
  }
  > :last-child {
    color: #1f8db0;
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
