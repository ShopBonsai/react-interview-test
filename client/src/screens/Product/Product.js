import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchGet } from '../../helper/fetchHelper';
import {
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  CardBody,
  Media,
  Spinner,
} from 'reactstrap';

const Product = () => {
  const { id } = useParams();

  const [product, setProduct] = React.useState(null);

  React.useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetchGet(`/products/${id}`);
      setProduct(res.product);
    };
    fetchProduct();
  }, []);

  return (
    <>
      {product === null ? (
        <Spinner color="primary" />
      ) : (
        <Media className="product-card">
          <Media left href="#">
            <Media object src={product.image_url} alt="Product image cap" />
          </Media>
          <CardBody>
            <CardTitle style={{ fontWeight: 600 }}>
              {product.product_name}
            </CardTitle>
            <CardTitle>Price: {product.price}</CardTitle>
            <CardSubtitle>Color: {product.color}</CardSubtitle>
            <CardSubtitle>Size: {product.size}</CardSubtitle>
            <CardText>Details: {product.description}</CardText>
            <Button color="primary" size="lg" block>
              Buy
            </Button>
          </CardBody>
        </Media>
      )}

      <Link to="/">
        <Button color="secondary" size="lg" block>
          Back
        </Button>
      </Link>
    </>
  );
};

export default Product;
