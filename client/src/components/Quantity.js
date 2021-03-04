import React, { useState } from 'react'
import { Button } from 'reactstrap'

const Quantity = props => {
  return (
    <div className="quantity-select">
      <Button onClick={props.decrease}>-</Button>
      <span>{props.num}</span>
      <Button onClick={props.increase}>+</Button>
    </div>
  )
}

export default Quantity