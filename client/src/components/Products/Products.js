import "./styles.css";
import React, { Component } from "react";
import { EmptyNotice } from "../EmptyNotice";
import { Loading } from "../Loading";
import { ProductCard } from "../ProductCard";
import PropTypes from "prop-types";
import { withProducts } from "../../containers";

class ProductsList extends Component {
  state = {
    favourites: JSON.parse(
      // Restore favourites from local storage
      localStorage.getItem("favourites") || JSON.stringify([])
    ),
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
            localFavourites={favourites}
            product={product}
            onSetFavourites={this.handleSetFavourites}
          />
        );
      });
    });
  }

  handleSetFavourites = (favourites) => {
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
