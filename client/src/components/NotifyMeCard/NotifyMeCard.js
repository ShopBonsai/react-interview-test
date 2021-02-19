import { Button, CardSubtitle, CardText, CardTitle, Form } from "reactstrap";
import React, { useCallback, useState } from "react";
import { saveFavourites, saveNotificationRequest } from "../../actions";
import { EmailAddressInput } from "../EmailAddressInput";
import PropTypes from "prop-types";

export const NotifyMeCard = (props) => {
  const { onClose, product } = props;
  const [emailAddress, setEmailAddress] = useState("");
  const [isEmailAddressValid, setEmailAddressValid] = useState(false);
  const [hasRequestSucceeded, setSuccessState] = useState(false);

  const handleInput = useCallback(
    (e) => {
      setEmailAddress(e.target.value);
    },
    [setEmailAddress]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (isEmailAddressValid) {
        const success = await saveNotificationRequest({
          emailAddress: emailAddress,
          productId: product.id,
        });
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
    [onClose, isEmailAddressValid, product, emailAddress, setSuccessState]
  );

  if (hasRequestSucceeded) {
    return (
      <CardTitle>
        Thanks! We&apos;ll email {emailAddress} when this is back in stock
      </CardTitle>
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <CardTitle>Notify When Restocked</CardTitle>
      <CardText>
        <CardSubtitle>
          Want to be notified when this item comes back in stock? Enter your
          email address below and we&apos;ll shoot you off an email as soon as{" "}
          {product.name} is restocked!
        </CardSubtitle>
        <EmailAddressInput
          emailAddress={emailAddress}
          setEmailAddress={handleInput}
          setValidState={setEmailAddressValid}
        />
      </CardText>
      <Button color="primary">Notify Me</Button>
    </Form>
  );
};
NotifyMeCard.propTypes = {
  onClose: PropTypes.func,
  product: PropTypes.object,
};
