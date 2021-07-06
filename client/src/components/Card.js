import React from 'react'
import { CardTitle, CardSubtitle, CardText, Button, CardBody, Media } from 'reactstrap';

const Card = (props) => {
  const { id, color, description, image, name, price, size } = props

  return (
    <Media key={id} className="product-card m-3">
      <Media left href="#">
        <Media object src={image} alt="Product image cap" className="align-self-center mr-3" />
      </Media>
      <CardBody>
        <div className="card--body__price">
          <CardTitle style={{ fontWeight: 900 }}>{name}</CardTitle>
          <CardTitle className="card--price">${price}</CardTitle>
        </div>
        <CardSubtitle>Color: {color}</CardSubtitle>
        <CardSubtitle>Size: {size}</CardSubtitle>
        <CardText>Details: {description}</CardText>
        <Button color="warning" size="lg" block>Buy</Button>
      </CardBody>
    </Media>
  )
}

export default Card
