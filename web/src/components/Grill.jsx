import React, { memo } from 'react'
import styled from '@emotion/styled'
import { isOdd, isEven } from '../helpers'

const Wrapper = styled.div`
  position: absolute;
  right: 5%;
  bottom: 5%;
  transform: skew(0, -10deg);
`

const Row = styled.div`
  display: flex;
  justify-content: center;
`

const Hole = styled.span`
  display: block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${props => props.dark ? '#000' : 'rgba(0, 0, 0, .5)'};
  margin: 3px;
`

const Grill = () => {
  const rows = [6, 8, 8, 8, 8, 8, 8, 6]

  return (
    <Wrapper>
      {
        rows.map((row, i) => (
          <Row key={i}>
            {
              [...Array(row)].map((hole, o) => {
                const startOnOdd = i === 0 || isEven(i)

                return (
                  <Hole key={o} dark={startOnOdd ? isOdd(o) : isEven(o)} />
                )
              })
            }
          </Row>
        ))
      }
    </Wrapper>
  )
}

export default memo(Grill)
