import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import ProductCard from '.';

describe('ProductCard Component', () => {
  const fn = jest.fn();
  let productCardComponent;

  beforeEach(() => {
    productCardComponent = (otherFn) => (
      <ProductCard
        id="c40db221-076f-45ae-9028-020a5b0dcdd8"
        image="https://picsum.photos/300/?random"
        name="OFFICIA Blouse"
        price={656.5}
        color="in"
        size="S"
        description="Et Lorem ipsum deserunt aute."
        quantity={2}
        validateQuantity={fn}
        validateNumberInput={fn}
        addItemToCart={otherFn}
      />
    );
  });

  afterEach(cleanup);

  it('renders without crashing', () => {
    render(productCardComponent());
  });

  it('props work', () => {
    const { getByText } = render(productCardComponent());
    getByText(/^Details: Et Lorem ipsum deserunt aute./);
    getByText(/^OFFICIA Blouse/);
    getByText(/^\$656.5/);
    getByText(/^Size: S$/);
  });

  it('mock function to validateQuantity', () => {
    const { getByLabelText } = render(productCardComponent());
    const quantityInput = getByLabelText('quantity-input') as HTMLInputElement;
    fireEvent.change(quantityInput, { target: { value: '2' } });
    expect(fn).toBeCalled();
  });

  it('mock function to validateNumber', () => {
    const { getByLabelText } = render(productCardComponent());
    const quantityInput = getByLabelText('quantity-input') as HTMLInputElement;
    fireEvent.change(quantityInput, { target: { value: 'F' } });
    expect(quantityInput.value).toBe('');
  });

  it('mock function to addItemToCart', () => {
    const submit = fn.mockImplementation((e) => e.preventDefault());
    const { getByText } = render(productCardComponent(submit));
    const addToCartButton = getByText(/^Add To Cart/);
    fireEvent.click(addToCartButton);
    expect(fn).toBeCalled();
  });
});
