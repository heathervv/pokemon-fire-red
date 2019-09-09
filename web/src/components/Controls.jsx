import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Arrows from './Arrows'
import { responsive } from './global'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 180px;

  ${responsive('small')} {
    position: absolute;
    top: 62%;
  }
`

const Button = styled.button`
  position: absolute;
  top: ${props => props.top}%;
  right: ${props => props.right}%;
  width: 45px;
  height: 45px;
  padding: 0 0 0 10px;
  background: #222;
  border-radius: 50%;
  border: 3px solid #000;
  color: #000;
  text-shadow: -1px 1px 2px #555;
  text-align: left;
  font-size: 25px;
  cursor: pointer;

  &.focus,
  &:active {
    background: #000;
  }

  &:focus {
    outline: none;
  }
`

const Pill = styled.button`
  position: absolute;
  bottom: 16px;
  left: ${props => props.left}%;
  width: 33px;
  height: 15px;
  padding: 0;
  background: #222;
  border: 3px solid #000;
  border-radius: 90px/35px 35px;
  cursor: pointer;
  &:after {
    content: "${props => props.text}";
    display: block;
    position: absolute;
    top: calc(100% + 5px);
    left: 50%;
    transform: translateX(-50%);
    color: #ffd947;
    font-family: 'Lato', sans-serif;
    font-size: 15px;
    font-weight: 800;
    text-shadow: -1px -1px 1px #e0bc31;
    text-transform: uppercase;
    cursor: default;
  }
  &:active {
    background: #000;
  }
  &:focus {
    outline: none;
  }
`

class Controls extends Component {
  constructor() {
    super()

    this.state = {
      focusedElement: null
    }

    this.aButton = React.createRef()
    this.bButton = React.createRef()
    this.upArrow = React.createRef()
    this.downArrow = React.createRef()
    this.leftArrow = React.createRef()
    this.rightArrow = React.createRef()
    this.startButton = React.createRef()

    this.KEY_VALUES = {
      65: [this.aButton, 'A'],
      66: [this.bButton, 'B'],
      38: [this.upArrow, 'UP'],
      40: [this.downArrow, 'DOWN'],
      37: [this.leftArrow, 'LEFT'],
      39: [this.rightArrow, 'RIGHT']
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', event => {
      const keyCode = event.keyCode.toString()

      if (Object.keys(this.KEY_VALUES).includes(keyCode)) {
          this.triggerControl(this.KEY_VALUES[keyCode][0], this.KEY_VALUES[keyCode][1])
      }
    })
  }

  triggerControl = (ref, value = null) => {
    const { yesNoClicked, arrowClicked } = this.props

    this.setState({ focusedElement: ref }, () => {
      setTimeout(() => {
        this.setState({ focusedElement: null })
      }, 100)
    })

    if (ref === this.startButton) {
      this.props.setStartControl(true)
    }

    if (ref === this.aButton || ref === this.bButton) {
      this.props.setYesNoControl({ button: value, count: yesNoClicked + 1 })
    }

    if (ref !== this.aButton && ref !== this.bButton && ref !== this.startButton) {
      this.props.setArrowControl({ direction: value, count: arrowClicked + 1 })
    }
  }

  render() {
    const { focusedElement } = this.state

    return (
      <Wrapper>
        <Arrows
          refs={{
            up: this.upArrow,
            down: this.downArrow,
            left: this.leftArrow,
            right: this.rightArrow
          }}
          onClick={this.triggerControl}
          focusOnArrow={focusedElement}
        />
        <Button
          ref={this.aButton}
          onClick={() => this.triggerControl(this.aButton)}
          top={7}
          right={11}
          className={focusedElement === this.aButton ? 'focus' : ''}
        >
          A
        </Button>
        <Button
          ref={this.bButton}
          onClick={() => this.triggerControl(this.bButton)}
          top={24}
          right={27}
          className={focusedElement === this.bButton ? 'focus' : ''}
        >
          B
        </Button>
        <Pill text="Select" left={38} />
        <Pill
          text="Start"
          left={53}
          ref={this.startButton}
          onClick={() => this.triggerControl(this.startButton)}
        />
      </Wrapper>
    )
  }
}

Controls.propTypes = {
  setYesNoControl: PropTypes.func.isRequired,
  setArrowControl: PropTypes.func.isRequired,
  setStartControl: PropTypes.func.isRequired,
  yesNoClicked: PropTypes.number.isRequired,
  arrowClicked: PropTypes.number.isRequired
}

export default Controls;
