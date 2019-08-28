import React from 'react';
import styled from '@emotion/styled'
import { Global, css } from '@emotion/core'
import Gameboy from './components/Gameboy'

import background from'./images/bg.jpg';

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: url(${background}) repeat-x;
  background-size: auto 100%;
`

function App() {
  return (
    <>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
            vertical-align: baseline;
            line-height: 1;
          }
        `}
      />
      <Section>
        <Gameboy />
      </Section>
    </>
  );
}

export default App;
