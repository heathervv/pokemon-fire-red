import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'
import { SpeechText } from '../global'

import logoAsset from '../../images/pokemon_logo.png'
import playerAsset from '../../images/player_start_sprite.png'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: #FDE5F7;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Logo = styled.img`
  display: block;
  max-width: 100%;
  width: 66%;
  margin: 0 auto;
`

const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`

const Player = styled.img`
  display: block;
  height: 75px;
  margin-left: 10px;
`

const blinker = keyframes`
  50% {
    opacity: 0;
  }
`

const Action = styled.span`
  animation: ${blinker} 1.75s linear infinite;
`

const Start = () => (
  <Wrapper>
    <Logo src={logoAsset} />
    <SpeechText color="#900C3F" bold><span>Red Version</span></SpeechText>
    <ActionWrapper>
      <SpeechText bold><Action>Press Start</Action></SpeechText>
      <Player src={playerAsset} />
    </ActionWrapper>
  </Wrapper>
)

export default Start
