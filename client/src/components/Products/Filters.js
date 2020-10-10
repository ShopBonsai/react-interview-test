import React from "react";
import { Input } from "reactstrap";
import "./styles.css";

const Filters = (props) => {
  const {
    merchantList,
    merchantFilter,
    productFilter,
    onProductFilterChange,
    onMerchantFilerChange,
  } = props;

  const handleFilterChange = (event) => {
    onProductFilterChange(event.target.value);
  };

  const onMerchantSelection = (event) => {
    onMerchantFilerChange(event.target.value);
  };

  const merchantOptions = merchantList.map((merchant) => (
    <option key={merchant} value={merchant}>
      {merchant}
    </option>
  ));

  return (
    <div className="filter-container">
      <Input
        style={{ marginRight: 10 }}
        type="text"
        value={productFilter}
        onChange={handleFilterChange}
        placeholder={"Filter by product name"}
      ></Input>
      <Input
        type="select"
        name="select"
        onChange={onMerchantSelection}
        value={merchantFilter}
      >
        <option value="">Select a Merchant</option>
        {merchantOptions}
      </Input>
    </div>
  );
};

export default Filters;