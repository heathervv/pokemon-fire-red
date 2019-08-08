import React, { useState } from 'react';
import styled from '@emotion/styled'
import Game from './Game'
import Screen from './Screen'
import Controls from './Controls'

const GameBoy = styled.div`
  position: relative;
  width: 425px;
  height: 650px;
  background: #fdd437;
  border-radius: 15px 15px 170px 170px/15px 15px 35px 35px;
`

// TODO add "grill" bottom right side

const Gameboy = () => {
  const [active, setActive] = useState(false)

  return (
    <GameBoy>
      <Screen power={active}>
        <Game turnGameboyOn={setActive} />
      </Screen>
      <Controls />
    </GameBoy>
  );
}

export default Gameboy;
