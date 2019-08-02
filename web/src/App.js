import React from 'react';
import styled from '@emotion/styled'
import Game from './components/Game'

const Background = styled.section`
  background: #222;
`

function App() {
  return (
    <Background>
      <Game />
    </Background>
  );
}

export default App;
