import React from 'react';
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Logo from './Logo'
import { responsive } from './global'

const ScreenGlass = styled.div`
  position: relative;
  width: 382px;
  height: 318px;
  background: #000;
  margin-bottom: 24px;
  border-radius: 0 0 170px 170px/0 0 25px 25px;

  ${responsive('small')} {
    position: absolute;
    left: 5%;
    top: 3%;
    width: 90%;
    height: 49%;
    border-radius: 9px 9px 170px 170px/9px 9px 25px 25px;
    margin-bottom: 0;
  }
`

const ScreenWindow = styled.div`
  position: absolute;
  top: 10%;
  left: 11%;
  width: 77%;
  height: 70%;
  background: #999;
  border-radius: 3px;
  box-shadow: inset 13px 14px 5px -10px rgba(0,0,0,0.4);
  overflow: hidden;
`

const Power = styled.div`
  position: absolute;
  top: 28%;
  left: 4%;
  width: 7px;
  height: 7px;
  background: #d12a17;
  border-radius: 50%;
  opacity: ${props => props.on ? 1 : .2};
  transition: opacity .3s cubic-bezier(0.895, 0.030, 0.685, 0.220);
`

const Screen = ({ children, power }) => (
    <ScreenGlass>
      <Power on={power} />
      <ScreenWindow>
        {children}
      </ScreenWindow>
      <Logo />
    </ScreenGlass>
)

Screen.propTypes = {
  power: PropTypes.bool,
  children: PropTypes.node.isRequired
}

Screen.defaultProps = {
  power: false
}

export default Screen;
