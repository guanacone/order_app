import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';

const StyledPizza = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(2, minmax(200px, 1fr));
  justify-content: center;
  @media(max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const SinglePizza = ({ data: { pizza } }) => {
  console.log({ pizza });
  return (
    <StyledPizza>
      <Img fluid={pizza.image.asset.fluid} className='picture'/>
      <div>
        <h2 className='mark'>{pizza.name}</h2>
        <ul>
          {pizza.toppings.map((topping) => (
            <li key={topping.id}>{topping.name}</li>
          ))}
        </ul>
      </div>
    </StyledPizza>
  );
};

export default SinglePizza;

export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxHeight: 600) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`;
