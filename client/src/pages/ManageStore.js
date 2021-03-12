import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { Query, Mutation } from 'react-apollo';
import { Button, Col, FormGroup, Input, Label, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row } from 'reactstrap';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import ProductsList from '../components/templates/Products';
import './ManageStore.css';
import { LoadingArea } from '../components/organisms/LoadingArea';

const GET_MERCHANT_BY_GUID = gql`
  query GetMerchantByGuid($guid: String!) {
    merchant(guid: $guid) {
      guid
      merchant
      logo
      contactEmail
      phone
      address
      companyDescription
    }
  }
`;

const EDIT_MERCHANT_WITH_GUID = gql`
  mutation EditMerchantWithGuid(
    $guid: String!
    $merchant: String!
    $contactEmail: String!
    $phone: String!
    $address: String!
    $companyDescription: String!
  ) {
    editMerchantWithGuid(
      guid: $guid,
      merchant: $merchant,
      contactEmail: $contactEmail,
      phone: $phone,
      address: $address,
      companyDescription: $companyDescription
    ) {
      guid
      merchant
      contactEmail
      phone
      address
      companyDescription
    }
  }
`;

const ManageStorePageComponent = ({ merchantLoading, merchant }) => {
  const { width, height } = useWindowSize();
  return (
    <div>
      <Confetti
        style={{
          zIndex: -1,
          position: 'fixed',
        }}
        width={width}
        height={height}
        numberOfPieces={10}
        colors={['#222', '#ff5030', '#ff5033']}
        gravity={0.01}
      />
      <h1>Manage Store</h1>
      {
        merchantLoading
          ? (
            <>
              <Col>
                <LoadingArea />
              </Col>
            </>
          )
          : (
            <>
              <Row>
                <Col>
                  <MerchantInfoTable merchant={merchant} />
                </Col>
              </Row>
              
              <Row style={{ marginTop: 32 }}>
                <Col>
                  <h2>Your Products</h2>
                  <ProductsList merchantGuid={merchant.guid} />
                </Col>
              </Row>
            </>
          )
      }
    </div>
  );
}

const MerchantInfoTableComponent = ({ merchant, editMerchantWithGuid }) => {
  const [isEditingInfo, updateIsEditingInfo] = useState(false);

  const [draftMerchantName, updateDraftMerchantName] = useState(merchant.merchant);
  const [draftContactEmail, updateDraftContactEmail] = useState(merchant.contactEmail);
  const [draftPhone, updateDraftPhone] = useState(merchant.phone);
  const [draftAddress, updateDraftAddress] = useState(merchant.address);
  const [draftCompanyDescription, updateDraftCompanyDescription] = useState(merchant.companyDescription);

  const handleSave = async () => {
    await editMerchantWithGuid({
      variables: {
        guid: merchant.guid,
        merchant: draftMerchantName,
        contactEmail: draftContactEmail,
        phone: draftPhone,
        address: draftAddress,
        companyDescription: draftCompanyDescription,
      },
    });
    updateIsEditingInfo(false);
  };

  const handleReset = async () => {
    await Promise.all([
      updateDraftMerchantName(merchant.merchant),
      updateDraftContactEmail(merchant.contactEmail),
      updateDraftPhone(merchant.phone),
      updateDraftAddress(merchant.address),
      updateDraftCompanyDescription(merchant.companyDescription),
    ]);
  }

  const handleEdit = () => updateIsEditingInfo(true);
  const handleCancel = async () => {
    await handleReset();
    updateIsEditingInfo(false);
  }

  const hasUnsavedChanges = (
    merchant.merchant !== draftMerchantName
    || merchant.contactEmail !== draftContactEmail
    || merchant.phone !== draftPhone
    || merchant.address !== draftAddress
    || merchant.companyDescription !== draftCompanyDescription
  )
  
  return (
    <ListGroup>
      <ListGroupItem>
        {
          isEditingInfo
          ? (
            <>
              <FormGroup>
                <Label for="merchantName">Merchant Name</Label>
                <Input type="text" name="merchantName" id="merchantName"
                  value={draftMerchantName}
                  onChange={(e) => updateDraftMerchantName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="companyDescription">Company Description</Label>
                <Input type="textarea" name="companyDescription" id="companyDescription"
                  value={draftCompanyDescription}
                  onChange={(e) => updateDraftCompanyDescription(e.target.value)}
                />
              </FormGroup>
            </>
          )
          : (
            <>
              <ListGroupItemHeading>
                {merchant.merchant || <em>No merchant name... 🤔</em>}
                <img className='merchant-logo' src={merchant.logo}></img>
              </ListGroupItemHeading>
              <ListGroupItemText>{merchant.companyDescription || <em>No description</em>}</ListGroupItemText>
            </>
          )
        }
      </ListGroupItem>

      <ListGroupItem>
        {
          isEditingInfo
          ? (
            <>
              <FormGroup>
                <Label for="merchantAddress">Address</Label>
                <Input type="text" name="merchantAddress" id="merchantAddress"
                  value={draftAddress}
                  onChange={(e) => updateDraftAddress(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="merchantEmail">Email</Label>
                <Input type="textarea" name="merchantEmail" id="merchantEmail"
                  value={draftContactEmail}
                  onChange={(e) => updateDraftContactEmail(e.target.value)}
                />
              </FormGroup>
            </>
          )
          : (
            <>
              <ListGroupItemHeading>
                Contact Details
              </ListGroupItemHeading>
              <ListGroupItemText>
                {merchant.address || <em>No address</em>}
                <br />
                {merchant.contactEmail ? <a href={`mailto:${merchant.contactEmail}`}>{merchant.contactEmail}</a> : <em>No email address</em>}
              </ListGroupItemText>
            </>
          )
        }
      </ListGroupItem>

      <ListGroupItem>
        <ListGroupItemText>
          {
            isEditingInfo
            ? (
              <>
                <Button disabled={!hasUnsavedChanges} color="primary" size="md" onClick={handleSave}>Save</Button> {' '}
                <Button disabled={!hasUnsavedChanges} size="md" onClick={handleReset}>Reset</Button> {' '}
                <Button size="md" onClick={handleCancel}>Cancel</Button>
              </>
            )
            : (
              <Button color="primary" size="md" onClick={handleEdit}>Edit</Button>
            )
          }
        </ListGroupItemText>
      </ListGroupItem>
    </ListGroup>
  )
}

/* TODO: Integrate a login solution to get current merchant GUID */
const withCurrentMerchant = (Component) => props => {
  return (
    <Query query={GET_MERCHANT_BY_GUID} variables={{
      guid: '8b36dad9-f5a5-4b35-bfc9-27990a0be2b2',
    }}>
      {({ loading, data }) => {
        const merchant = data && data.merchant;
        return (
          <div>
            <Component merchantLoading={loading} merchant={merchant} {...props} />
          </div>
        );
      }}
    </Query>
  );
};

const withEditMerchant = (Component) => (props) => {
  return (
    <Mutation mutation={EDIT_MERCHANT_WITH_GUID} refetchQueries={['GetMerchantByGuid']}>
      {(editMerchantWithGuid) => {
        return (
          <Component editMerchantWithGuid={editMerchantWithGuid} {...props} />
        )
      }}
    </Mutation>
  )
}

const MerchantInfoTable = withEditMerchant(MerchantInfoTableComponent);
export const ManageStorePage = withCurrentMerchant(ManageStorePageComponent);
