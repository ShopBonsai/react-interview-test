import {
  Button,
  CardText,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import React, { useCallback, useState } from "react";
import { saveFavourites, saveOrderData } from "../../actions";
import { EmailAddressInput } from "../EmailAddressInput";
import PropTypes from "prop-types";

export const BuyNowCard = (props) => {
  const { onClose, product } = props;
  const [emailAddress, setEmailAddress] = useState("");
  const [quantity, setProductQuantity] = useState(1);
  const [isMaxQtyExceeded, setMaxQtyExceeded] = useState(false);
  const [isEmailAddressValid, setEmailAddressValid] = useState(false);
  const [hasBeenSubmitted, setSubmittedState] = useState(false);
  const [hasRequestSucceeded, setSuccessState] = useState(false);

  const handleSetEmail = useCallback(
    (e) => {
      setEmailAddress(e.target.value);
    },
    [setEmailAddress]
  );

  const handleQtyChange = useCallback(
    (e) => {
      if (e.target.value > product.quantity) {
        setMaxQtyExceeded(true);
      } else {
        setProductQuantity(e.target.value);
      }
    },
    [setProductQuantity, product, setMaxQtyExceeded]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setSubmittedState(true);
      if (isEmailAddressValid) {
        const success = await saveOrderData(emailAddress, product, quantity);
        // this is intentionally not waited on, as
        // this is metadata about the session, not totally
        // required but allows for further insight on the customer
        saveFavourites(emailAddress);
        setSuccessState(true);
        if (success) {
          // This should be consider a violation of linting rules,
          // this type of timeout should be global
          // eslint-disable-next-line no-magic-numbers
          setTimeout(onClose, 1500);
        }
      }
    },
    [
      setSubmittedState,
      isEmailAddressValid,
      product,
      emailAddress,
      quantity,
      onClose,
    ]
  );

  if (hasRequestSucceeded) {
    return (
      <CardTitle>
        This is obviously contrived as there is no checkout step yet... but
        we&apos;ve saved this to the db
      </CardTitle>
    );
  }

  const maxQty = isMaxQtyExceeded ? (
    <CardText>
      Sorry, we only have {product.quantity} available right now
    </CardText>
  ) : null;

  const invalidEmail =
    hasBeenSubmitted && !isEmailAddressValid ? (
      <CardText>
        Please enter a valid email address to proceed with your order
      </CardText>
    ) : null;

  // FIXME: This is quick and dirty, all price calculations
  // should be made in a central place to properly account for
  // taxes etc. This is not a main feature of the PR so I'm
  // leaving it quick and dirty
  const total = quantity * product.price;

  return (
    <Form onSubmit={handleSubmit}>
      <CardTitle>Buy {product.name}</CardTitle>
      <CardText>
        <FormGroup>
          <Label for="productQty">
            Quantity (max avail {product.quantity})
          </Label>
          <Input
            bsSize="large"
            id="productQty"
            max={product.quantity}
            min={1}
            type="number"
            value={quantity}
            onChange={handleQtyChange}
          />
          {maxQty}
          <br />${total}
        </FormGroup>
        <FormGroup>
          <Label for="emailAddress">Email Address:</Label>
          <EmailAddressInput
            emailAddress={emailAddress}
            setEmailAddress={handleSetEmail}
            setValidState={setEmailAddressValid}
          />
        </FormGroup>
        {invalidEmail}
      </CardText>
      <Button color="primary">Begin Purchase</Button>
    </Form>
  );
};

BuyNowCard.propTypes = {
  onClose: PropTypes.func,
  product: PropTypes.object,
};
