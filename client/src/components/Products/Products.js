import "./styles.css";
import {
  Button,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Media,
} from "reactstrap";
import React, { Component } from "react";
import { EmptyNotice } from "../EmptyNotice";
import { Loading } from "../Loading";
import { ProductCard } from "../ProductCard";
import PropTypes from "prop-types";
import { withProducts } from "../../containers";
import { saveNotificationRequest } from "../../actions";

class ProductsList extends Component {
  state = {
    favourites: JSON.parse(
      // Restore favourites from local storage
      localStorage.getItem("favourites") || JSON.stringify([])
    ),
    isBuyNow: false,
    isNotifyMe: false,
    selectedProduct: null,
  };

  render() {
    const { areMerchantsLoading, merchants } = this.props;
    const { favourites } = this.state;

    // Always return edge cases as early as possible, this eliminates
    // deeply nested code and aids in readability of code
    if (areMerchantsLoading || !merchants) return <Loading />;
    if (!merchants.length) return <EmptyNotice />;

    return merchants.map(({ products }) => {
      return (products || []).map((product) => {
        return (
          <ProductCard
            key={product.id}
            onSetFavourites={this._handleSetFavourites}
            localFavourites={favourites}
            product={product}
          />
        );
      });
    });
  }

  _handleSetFavourites = (favourites) => {
    console.log("_handleSetFavourites", favourites);
    this.setState({ favourites });
    // NOTE: We do not store favourites in the database until
    // the user has taken a "valuable" action to avoid
    // unnecessary calls to the BE for performance
    localStorage.setItem("favourites", JSON.stringify(favourites));
  };
}

ProductsList.propTypes = {
  areMerchantsLoading: PropTypes.bool,
  merchants: PropTypes.arrayOf(PropTypes.object),
};

export const Products = withProducts(ProductsList);
