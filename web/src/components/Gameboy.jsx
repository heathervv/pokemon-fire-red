import React, { useState } from 'react';
import styled from '@emotion/styled'
import Game from './Game'
import Screen from './Screen'
import Controls from './Controls'
import Grill from './Grill'

const GameBoy = styled.div`
  position: relative;
  width: 425px;
  height: 650px;
  background: #fdd437;
  border-radius: 15px 15px 170px 170px/15px 15px 35px 35px;
`

const Gameboy = () => {
  const [active, setActive] = useState(false)
  const [yesNoControl, setYesNoControl] = useState(null)

  return (
    <GameBoy>
      <Screen power={active}>
        <Game turnGameboyOn={setActive} yesNoControl={yesNoControl} />
      </Screen>
      <Controls setYesNoControl={setYesNoControl} />
      <Grill />
    </GameBoy>
  );
}

export default Gameboy;
