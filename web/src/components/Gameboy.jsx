import React, { useState } from 'react';
import styled from '@emotion/styled'
import Game from './Game/index'
import Screen from './Screen'
import Controls from './Controls'
import Grill from './Grill'
import { responsive } from './global'

const GameBoy = styled.div`
  position: relative;
  height: 100vh;
  background: #fdd437;

  ${responsive('small')} {
    width: 425px;
    height: 650px;
    border-radius: 15px 15px 170px 170px/15px 15px 35px 35px;
    box-shadow: 3px 3px 6px rgba(0,0,0,.4);
  }
`

const Gameboy = () => {
  const [active, setActive] = useState(false)
  const [yesNoControl, setYesNoControl] = useState(null)
  const [arrowControl, setArrowControl] = useState({ direction: 'UP', count: 0})

  return (
    <GameBoy>
      <Screen power={active}>
        <Game
          turnGameboyOn={setActive}
          arrowControl={arrowControl}
        />
      </Screen>
      <Controls
        setYesNoControl={setYesNoControl}
        setArrowControl={setArrowControl}
        arrowControl={arrowControl}
      />
      <Grill />
    </GameBoy>
  );
}

export default Gameboy;
