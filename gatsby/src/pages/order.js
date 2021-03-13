import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { Trans } from 'gatsby-plugin-react-i18next';
import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import useOrder from '../utils/useOrder';
import PizzaOrder from '../components/PizzaOrder';
import calculateOrderTotal from '../utils/calculateOrderTotal';

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  fieldset {
    grid-column: span 2;
    max-height: 600px;
    overflow: auto;
    display: grid;
    gap: 1rem;
    align-content: start;
    &.order,
    &.menu {
      grid-column: span 1;
    }
  }
  .menu-item {  
    display: grid;
    grid-template-columns: 100px 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 0 1.3rem;
    align-content: center;
    align-items: center;
    position: relative;
    .gatsby-image-wrapper {
      grid-row: span 2;
      height: 100px;
    }
    p {
      margin: 0;
    }
    button {
      font-size: 1.5rem;
      margin-left: 5px;
      width: 30%;
    }
    
    .remove {
      background: none;
      color: var(--red);
      font-size: 3rem;
      position: absolute;
      bottom: 0;
      right: 0;
      box-shadow: none;
      line-height: 1rem;
    }
  }

  @media(max-width: 900px) {
    fieldset {
      &.order,
      &.menu {
        grid-column: span 2;
      }
    }
  }

  @media(max-width: 495px) {
    .menu-item {
      display: flex;
      flex-direction: column;
      .gatsby-image-wrapper {
        width: 100px;
      }
    }
    
    .button-container {
      width: 100%; 
      display: flex;
      flex-direction: column;
      button {
        width: 90%;
        margin-top: 5px;
      }
    }
  }
`;

const OrderPage = ({ data: { pizzas: { nodes: pizzas } } }) => {
  const { values, updateValue } = useForm({
    name: '',
    email: '',
  });
  const {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  } = useOrder({ pizzas, values });

  if (message) {
    return <div>{message}</div>;
  }

  return (
    <>
      <StyledForm onSubmit={submitOrder}>
        <fieldset disabled={loading}>
          <legend><Trans>Your Info</Trans></legend>
          <label htmlFor='name'><Trans>Name</Trans></label>
          <input
            type='text'
            name='name'
            id='name'
            value={values.name}
            onChange={updateValue}
            required
          />
          <label htmlFor='email'><Trans>Email</Trans></label>
          <input
            type='email'
            name='email'
            id='email'
            value={values.email}
            onChange={updateValue}
            required
          />
        </fieldset>
        <fieldset className='menu' disabled={loading}>
          {pizzas.map((pizza) => (
            <div key={pizza._id} className='menu-item'>
              <Img
                width='50'
                height='50'
                fluid={pizza.image.asset.fluid}
                alt={pizza.name}
              />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div className='button-container'>
                {['S', 'M', 'L'].map((size) => (
                  <button type='button' key={size} onClick={() => { addToOrder({ id: pizza._id, size }); }}>
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </fieldset>
        <fieldset className='order' disabled={loading}>
          <legend><Trans>Order</Trans></legend>
          <PizzaOrder
            order={order}
            pizzas={pizzas}
            removeFromOrder={removeFromOrder}
          />
        </fieldset>
        <fieldset disabled={loading}>
          <h3>
            <Trans>Your total is</Trans>
            {formatMoney(calculateOrderTotal(order, pizzas))}
          </h3>
          <div>{error && <p>Error: {error}</p>}</div>
          <button type='submit' disabled={loading}>
            {loading ? <Trans>Placing order</Trans> : <Trans>Order Ahead</Trans>}
          </button>
        </fieldset>
      </StyledForm>
    </>
  );
};

export default OrderPage;

export const query = graphql`
  query ($language: String!) {
    pizzas: allSanityPizza {
      nodes {
        _id
        name
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
        slug {
          current
        }
      }
    }
  locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
