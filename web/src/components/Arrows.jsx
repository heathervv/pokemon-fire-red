import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const Wrapper = styled.div`
    position: absolute;
    top: 3%;
    left: 10%;
    width: 90px;
    height: 90px;
`

const Background = styled.div`
  position: absolute;
  top: -1%;
  left: 1%;
  width: 90px;
  height: 90px;
  transform: scale(1.04);

  &:before,
  &:after {
    content: "";
    position: absolute;
    display: block;
    background: #000;
    border-radius: 5px;
  }
  &:before {
    top: 0;
    left: 50%;
    height: 100%;
    width: 33.33%;
    transform: translateX(-50%);
  }
  &:after {
    top: 50%;
    left: 0;
    height: 33.33%;
    width: 100%;
    transform: translateY(-50%);
  }
`

const Arrow = styled.div`
  position: absolute;
  top: ${props => props.position === 'vertical' ? '0' : '50%'};
  left: ${props => props.position === 'vertical' ? '50%' : '0'};
  height: ${props => props.position === 'vertical' ? '100%' : '33.33%'};
  width: ${props => props.position === 'vertical' ? '33.33%' : '100%'};
  transform: ${props => props.position === 'vertical' ? 'translateX(-50%)' : 'translateY(-50%)'};
  border-radius: 5px;
  overflow: hidden;
  background: #222;

  &:before {
    content: "";
    position: absolute;
    top: 38%;
    left: 18%;
    display: block;
    width: 20px;
    height: 20px;
    background: #000;
    border-radius: 50%;
  }

  > button {
    width: ${props => props.position === 'vertical' ? '100%' : '34%'};
    height: ${props => props.position === 'vertical' ? '34%' : '100%'};

    &:active {
      background: ${props => props.position === 'vertical'
        ? 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%,rgba(34, 34, 34, 1) 100%)'
        : 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%,rgba(34, 34, 34, 1) 100%)'
      }
    }

    &:last-child {
      bottom: 0;
      right: 0;

      &:active {
        background: ${props => props.position === 'vertical'
          ? 'linear-gradient(to bottom, rgba(34, 34, 34, 1) 0%,rgba(0, 0, 0, 1) 100%)'
          : 'linear-gradient(to right, rgba(34, 34, 34, 1) 0%,rgba(0, 0, 0, 1) 100%)'
        }
      }
    }
  }
`

const Button = styled.button`
  position: absolute;
  background: none;
  border: none;
  cursor: pointer;
  background: #222;
  padding: 0;
  &:focus {
    outline: none;
  }

  &:before {
    content: "";
    position: absolute;
    top: 25%;
    left: 26%;
    display: block;
    width: 0;
    height: 0;

    ${props => props.direction === 'up' && (
      `border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 13px solid #000;`
    )}
    ${props => props.direction === 'down' && (
      `border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 13px solid #000;`
    )}
    ${props => props.direction === 'left' && (
      `border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-right: 13px solid #000;`
    )}
    ${props => props.direction === 'right' && (
      `border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-left: 13px solid #000;`
    )}
  }
`

class Arrows extends Component {
  render() {
    const { refs, onClick } = this.props

    return (
      <Wrapper>
        <Background />
        <Arrow position="horizontal">
          <Button onClick={() => onClick(refs.left)} ref={refs.left} direction="left" />
          <Button onClick={() => onClick(refs.right)} ref={refs.right} direction="right" />
        </Arrow>
        <Arrow position="vertical">
          <Button onClick={() => onClick(refs.up)} ref={refs.up} direction="up" />
          <Button onClick={() => onClick(refs.down)} ref={refs.down} direction="down" />
        </Arrow>
      </Wrapper>
    )
  }
}

Arrows.propTypes = {
  refs: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Arrows;
