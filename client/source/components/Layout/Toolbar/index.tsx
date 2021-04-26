import * as React from "react";
import { Header, FilterInput } from "./style";
import ShoppingCart from "../ShoppingCart";
import { useProducts } from "../../../context/products-context";

const Toolbar: React.FC = () => {
  const { setFilteredProducts } = useProducts();
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredProducts(event.target.value);
  };
  return (
    <Header>
      <ShoppingCart />
      <FilterInput
        placeholder="Search for a product..."
        onChange={onChangeHandler}
      />
    </Header>
  );
};

export default Toolbar;
