import styled from "@emotion/styled";
import {Character} from "./Character";

const Arrow = styled(Character)`
  position: relative;
  display: inline-block;
  width: 0;
  height: 0;
  
  ${props => !props.rotate && (
    `border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 7px solid #222;`
  )}
  
  ${props => props.rotate && (
    `border-top: 6px solid transparent;
     border-bottom: 6px solid transparent;
     border-left: 7px solid #222;
     transform: translate(0, 2px);`
  )}

  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    transform: translate(-8px, -8px);
    
    ${props => !props.rotate && (
        `border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 7px solid ${props.color ? props.color : 'red'};`
    )}
  
    ${props => props.rotate && (
        `border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-left: 7px solid ${props.color ? props.color : 'red'};`
    )}
  }
`

export { Arrow }
