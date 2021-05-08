import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { Spinner } from 'reactstrap';
import { initializeProducts, addToCart } from '../../actions';
import { IMerchants, RootState } from '../../interfaces';
import ProductCard from '../ProductCard';
import mockMerchantData from '../../../../mockMerchantData';

const GET_PRODUCTS = gql`
  {
    merchants {
      guid
      merchant
      products {
        id
        name
        price
        description
        color
        size
        image
      }
    }
  }
`;

type Props = {
  merchantsData: IMerchants[] | null;
  merchantsLoading: boolean;
};

const withProducts = (Component) => (props) => {
  return (
    <Query query={GET_PRODUCTS}>
      {({ loading, data }) => {
        return <Component merchantsLoading={loading} merchantsData={data && data.merchants} {...props} />;
      }}
    </Query>
  );
};

const ProductsList: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const merchants = useSelector((state: RootState) => state.shop.merchants);
  const { merchantsData, merchantsLoading } = props;

  useEffect(() => {
    if (!merchantsLoading && merchantsData.length) {
      // setting up the merchants in our redux store
      dispatch(initializeProducts(merchantsData));
    }
  }, [merchantsData]);

  const validateNumberInput = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const numsOnly = new RegExp(/^\d+$/);
    const charCode = numsOnly.test(e.key);
    if (!charCode) e.preventDefault();
  };

  const validateQuantity = (e: React.ChangeEvent<HTMLInputElement>, quantity: number): void => {
    const { value } = e.target;
    if (value.charAt(0) === '0') {
      e.target.value = value.replace(/^0+/, '');
    }
    if (+value > quantity) {
      e.target.value = `${quantity}`;
    }
  };

  const addItemToCart = (e: React.FormEvent<HTMLFormElement>, item): void => {
    e.preventDefault();
    const selectedQuantity = +e.target[0].value;
    const { id, image, name, price, color, size, description, quantity } = item;
    const cartItem = {
      id,
      image,
      color,
      name,
      price,
      size,
      description,
      selectedQuantity,
    };
    dispatch(addToCart(cartItem, quantity));
  };

  return (
    <div className="products">
      {!merchants.length ? (
        <div className="no-products">
          <Spinner style={{ width: '3rem', height: '3rem', margin: '0 5px' }} color="primary" />
          <Spinner style={{ width: '3rem', height: '3rem', margin: '0 5px' }} color="primary" />
          <Spinner style={{ width: '3rem', height: '3rem', margin: '0 5px' }} color="primary" />
        </div>
      ) : (
        merchants.map(
          ({ products }, i) =>
            products &&
            products.length &&
            products.map((product, j) => {
              const { id, color, description, image, name, price, size } = product;
              const { quantity } = mockMerchantData.merchants[i].products[j];
              return (
                <ProductCard
                  key={id}
                  id={id}
                  color={color}
                  description={description}
                  image={image}
                  name={name}
                  price={price}
                  size={size}
                  quantity={quantity}
                  validateNumberInput={validateNumberInput}
                  validateQuantity={validateQuantity}
                  addItemToCart={addItemToCart}
                />
              );
            }),
        )
      )}
    </div>
  );
};

export default withProducts(ProductsList);
