import React, { useCallback, useMemo, useState, useRef, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import Card from './Card';
import Search from './Searchbar';
import DropdownL from './DropdownL';
import Warning from './Warning';
import { Spinner } from 'reactstrap';

const GET_PRODUCTS = gql`
  {
    merchants {
      guid
      merchant
      brands
      products {
        belongsToBrand
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


const withProducts = Component => props => {
  return (
    <Query query={GET_PRODUCTS}>
      {({ loading, data }) => {
        return (
          <Component merchantsLoading={loading} merchants={data && data.merchants} {...props} />
        );
      }}
    </Query>
  );
};

const ProductsList = (props) => {
  const [search, setSearch] = useState('');
  const [allProducts, setProducts] = useState([]);
  const [allBrands, setBrands] = useState([]);
  const [allMerchants, setMerchants] = useState([]);
  const [merchant, setMerchant] = useState('');
  const [brand, setBrand] = useState('');
  const [temporaryProducts, setTemporaryProducts] = useState([]);
  const searchInput = useRef(null);
  const { merchants = [], merchantsLoading } = props;

  useEffect(() => {
    storeProducts()
  }, [merchantsLoading]);

  const storeProducts = () => {
    let localProducts = [];
    let localMerchants = [];
    if (merchants.length) {
      merchants.map((productsT) => {
        localMerchants.push(productsT.merchant)
        localProducts.push(...productsT.products)
      })
    }
    setProducts(localProducts);
    setMerchants(localMerchants)
  }


  const handleSearch = useCallback(() => {
    setMerchant('')
    setBrand('')
    setTemporaryProducts('')
    setSearch(searchInput.current.value);
  }, []);


  const handlerDisplayByMerchants = (e) => {
    let merchant = merchants.find(item => item.merchant === e.target.value);
    let brands = merchant.brands;
    if (merchant !== undefined) {
      setMerchant(merchant.merchant)
      setBrand('')
      setBrands(brands)
      setTemporaryProducts(merchant.products)
    }
  }

  const handlerDisplayByBrand = (e) => {
    let products = temporaryProducts.filter(item => item.belongsToBrand === allBrands.indexOf(e.target.value))
    if (products.length === 0) {
      setBrand('No Products found')
    } else {
      setTemporaryProducts(products)
      setBrand(e.target.value)
    }
  }

  const filtereProducts = useMemo(() =>
    allProducts.filter((product) => {
      return product.name.toLowerCase().includes(search.toLowerCase());
    }),
    [search, allProducts]
  )

  const showProducts = () => {
    if (!merchantsLoading && merchants && temporaryProducts.length) {
      return temporaryProducts.map(product => <Card key={product.id} {...product} />)
    }
  }

  const showFilteredProducts = () => {
    return (
      filtereProducts.map(product => (
        <Card key={product.id} {...product} />
      )
      ))
  }

  return (
    <>
      <nav>
        <Search search={search} searchInput={searchInput} handleSearch={handleSearch} />
        <div className="dropdown--list">
          <h3>Filter by &nbsp;</h3>
          <DropdownL list={allMerchants} value={merchant} type={'Merchant'} handlerDisplayItems={(e) => handlerDisplayByMerchants(e)} />
          {merchant !== '' ?
            <DropdownL list={allBrands} value={brand} type={'Brand'} handlerDisplayItems={(e) => handlerDisplayByBrand(e)} /> : null
          }
        </div>
      </nav>
      {temporaryProducts.length === 0 && filtereProducts.length === 0 || brand == 'No Products found' ? <Warning /> :
        <h3 className="results">Results {temporaryProducts.length || allProducts.length} Products</h3>
      }
      <div className="catalog">
        <p className="p-l m-1">/ {merchant} / {brand}</p>
         {merchantsLoading ? <Spinner color="info" /> : null}
        {(temporaryProducts.length > 0 ? showProducts() : showFilteredProducts())}
      </div>
    </>
  );

}
export default withProducts(ProductsList)