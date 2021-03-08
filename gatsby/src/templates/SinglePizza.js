import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';
import formatMoney from '../utils/formatMoney';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';

const StyledPizza = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  justify-content: center;
  .item {
    place-self: center;
  }
  @media(max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const SinglePizza = ({ data: { pizza }, pageContext: { langKey } }) => {
  return (
    <StyledPizza>
      <Img fluid={pizza.image.asset.fluid}/>
      <div className='item'>
        <h2 className='mark'>{pizza.name}</h2>
        <ul>
          {pizza.toppings.map((topping) => (
            <li key={topping.id}>
              {topping.name[langKey] ? topping.name[langKey] : topping.name.en}
            </li>
          ))}
        </ul>
      </div>
      <div className='item'>
        {['S', 'M', 'L'].map((size) => (
          <h3 key={size}>
            {size}: {formatMoney(calculatePizzaPrice(pizza.price, size))}
          </h3>
        ))}
      </div>
    </StyledPizza>
  );
};

export default SinglePizza;

export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      price
      id
      image {
        asset {
          fluid(maxHeight: 600) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name {
          en
          sp
        }
        id
        vegetarian
      }
    }
  }
`;
