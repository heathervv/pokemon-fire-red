import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import ChoiceBubble from './ChoiceBubble'
import {
  Paragraph,
  SpeechText,
  Arrow,
  BorderedBox
} from '../global'
import { replaceString, wrapEveryLetter } from '../../stringHelpers'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
`

const Image = styled(BorderedBox)`
  position: absolute;
  top: 31px;
  left: 50%;
  height: 100px;
  width: 40%;
  transform: translatex(-50%);
  background: ${props => props.sprite && `url(${props.sprite}) no-repeat center rgba(255,255,255,.9)`};
  background-size: cover;
`

const Bubble = styled.div`
  position: absolute;
  left: 3%;
  bottom: 2%;
  width: 103%;
  padding: 5px 24px 5px 13px;
  box-sizing: border-box;
  background: rgba(255,255,255,.9);
  border-radius: 14px;
  border: 3px solid #8ce5f5;
  button {
    vertical-align: bottom;
  }
`

class Speech extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      currentScreen: 0,
      copy: this.generateCopy(0, props.content, props.pokemon),
      activeChoice: 0
    }

    this.RespondToButtonClick = this.RespondToButtonClick.bind(this)
    this.respondToArrowClick = this.respondToArrowClick.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    const { arrowControl, yesNoControl } = this.props

    if (prevProps.arrowControl !== arrowControl) {
      this.respondToArrowClick(arrowControl)
    }

    if (prevProps.yesNoControl !== yesNoControl) {
      this.RespondToButtonClick(yesNoControl)
    }
  }

  generateCopy = (currentScreen, content, pokemon) => {
    const selectedCopy = content(pokemon.order)[currentScreen]
    return {
      text: replaceString(
        selectedCopy[0],
        [
          { a: '{{POKEMON_NAME}}', b: pokemon.name },
          { a: '{{POKEMON_TYPE}}', b: pokemon.types[1] }
        ]
      ),
      showChoiceBubble: selectedCopy[1]
    }
  }

  RespondToButtonClick = (yesNoControl) => {
    const { button } = yesNoControl

    const { currentScreen, copy, activeChoice } = this.state
    const { content, pokemon, deViewPokemon, choosePokemon } = this.props

    let newCurrentScreen = currentScreen
    let newCopy = copy

    const nextScreen = (index) => {
      newCurrentScreen = index
      newCopy = this.generateCopy(index, content, pokemon)

      if (index === 0) deViewPokemon()
    }

    switch(button) {
      case 'A':
        const thereAreStillScreensToSee = currentScreen < Object.keys(content()).length - 1

        if (copy.showChoiceBubble && activeChoice === 0) choosePokemon(pokemon)

        if ((copy.showChoiceBubble && activeChoice !== 0) || !thereAreStillScreensToSee) {
          nextScreen(0)
        } else if (thereAreStillScreensToSee) {
          nextScreen(newCurrentScreen + 1)
        }
      break
      case 'B':
        if (copy.showChoiceBubble) {
          nextScreen(0)
        }
      break
      default:
        console.log('Button not supported');
      break
    }

      this.setState({ currentScreen: newCurrentScreen, copy: newCopy })
  }

  respondToArrowClick = (arrowControl) => {
    const { direction } = arrowControl

    const { copy, activeChoice } = this.state
    let active = activeChoice

    if (copy.showChoiceBubble) {
      switch(direction) {
        case 'UP':
          active = active > 0 ? active - 1 : active
        break
        case 'DOWN':
          active = active < 2 ? active + 1 : active
        break
        default:
          console.log('Arrow not supported');
        break
      }
    }

    this.setState({ activeChoice: active })
  }

  render() {
    const { pokemon, content } = this.props
    const { currentScreen, copy, activeChoice } = this.state

    const thereAreStillScreensToSee = currentScreen < Object.keys(content()).length - 1

    return (
      <Wrapper>
        <Image sprite={pokemon.sprite} />
        <Bubble>
          <SpeechText>
            <Paragraph>{wrapEveryLetter(copy.text)} { thereAreStillScreensToSee && <Arrow delay={copy.text.length} key={currentScreen} /> }</Paragraph>
          </SpeechText>
        </Bubble>
        {
          copy.showChoiceBubble &&
          <ChoiceBubble active={activeChoice} />
        }
      </Wrapper>
    )
  }
}

Speech.propTypes = {
  pokemon: PropTypes.shape({
    sprite: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  content: PropTypes.func.isRequired,
  arrowControl: PropTypes.object.isRequired,
  yesNoControl: PropTypes.object.isRequired,
  deViewPokemon: PropTypes.func.isRequired,
  choosePokemon: PropTypes.func.isRequired
}

export default Speech
