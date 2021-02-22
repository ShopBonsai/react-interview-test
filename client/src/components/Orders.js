import { useQuery } from "@apollo/client";
import { format } from "mathjs";
import React from "react";
import { Table } from "reactstrap";
import { GET_ORDERS } from "../queries";

const Orders = ({}) => {
  const { loading, errors, data: { orders = [] } = {} } = useQuery(GET_ORDERS);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="max-w-3xl mx-auto">
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Order ID</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(({ id, quantity, totalPrice }, idx) => (
            <tr key={id}>
              <th scope="row">{idx + 1}</th>
              <td>{id}</td>
              <td>{quantity}</td>
              <td>{format(totalPrice, { precision: 2, notation: "fixed" })}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Orders;
