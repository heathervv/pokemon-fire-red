import React from 'react';
import styled from '@emotion/styled'
import Gameboy from './components/Gameboy'

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`

function App() {
  return (
    <Section>
      <Gameboy />
    </Section>
  );
}

export default App;
