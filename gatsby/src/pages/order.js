import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
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
    }
    button + button {
      margin-left: 1rem;
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
`;

const OrderPage = ({ data: { pizzas: { nodes: pizzas } } }) => {
  const { values, updateValue } = useForm({
    name: '',
    email: '',
  });
  const { order, addToOrder, removeFromOrder } = useOrder({ pizzas, inputs: values });
  return (
    <>
      <StyledForm>
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            id='name'
            value={values.name}
            onChange={updateValue}
          />
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            value={values.email}
            onChange={updateValue}
          />
        </fieldset>
        <fieldset className='menu'>
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <div key={pizza.id} className='menu-item'>
              <Img
                width='50'
                height='50'
                fluid={pizza.image.asset.fluid}
                alt={pizza.name}
              />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map((size) => (
                  <button type='button' key={size} onClick={() => addToOrder({ id: pizza.id, size })}>
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </fieldset>
        <fieldset className='order'>
          <legend>Order</legend>
          <PizzaOrder
            order={order}
            pizzas={pizzas}
            removeFromOrder={removeFromOrder}
          />
        </fieldset>
        <fieldset>
          <h3>
            Your Total is {formatMoney(calculateOrderTotal(order, pizzas))}
          </h3>
          <button type='submit'>Order Ahead</button>
        </fieldset>
      </StyledForm>
    </>
  );
};

export default OrderPage;

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
