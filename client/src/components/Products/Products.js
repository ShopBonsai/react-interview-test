import React, { useState } from "react";
import { Spinner, Jumbotron, Input } from "reactstrap";
import { gql, useQuery } from "@apollo/client";
import "./styles.css";
import ProductCard from "./ProductCard";
import Filters from "./Filters";
import Loading from "../Loading/Loading";

const GET_PRODUCTS = gql`
  {
    merchants {
      guid
      merchant
      brands
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

const ProductList = (props) => {
  const { merchants, productNameFilter, merchantFilter } = props;
  if (merchants && merchants.length > 0) {
    const filteredMerchants = merchants.filter((merchant) =>
      merchant.merchant.toLowerCase().includes(merchantFilter.toLowerCase()),
    );
    return filteredMerchants.map(({ merchant, products }) => {
      return (
        products &&
        products.length > 0 &&
        products
          .filter((product) =>
            product.name
              .toLowerCase()
              .includes(productNameFilter.toLowerCase()),
          )
          .map((product) => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                merchant={merchant}
              />
            );
          })
      );
    });
  } else {
    return (
      <div>
        <h3>No products available</h3>
      </div>
    );
  }
};

const Products = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [productNameFilter, setProductNameFilter] = useState("");
  const [merchantFilter, setMerchantFilter] = useState("");

  const handleProductFilterChange = (value) => {
    setProductNameFilter(value);
  };

  const handleMerchantFilterChange = (value) => {
    console.log("handleMerchantFilterChange", value);
    setMerchantFilter(value);
  };

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <h4>ERROR!</h4>;
  }
  const { merchants } = data;

  const merchantList = merchants.map((merchant) => merchant.merchant);

  return (
    <div className="products">
      <Filters
        merchantList={merchantList}
        merchantFilter={merchantFilter}
        productFilter={productNameFilter}
        onProductFilterChange={handleProductFilterChange}
        onMerchantFilerChange={handleMerchantFilterChange}
      />
      <ProductList
        merchants={merchants}
        productNameFilter={productNameFilter}
        merchantFilter={merchantFilter}
      />
    </div>
  );
};
export default Products;
