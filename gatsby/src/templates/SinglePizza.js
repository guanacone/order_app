import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { GatsbyImage } from "gatsby-plugin-image";
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

const SinglePizza = ({ data: { pizza }, pageContext: { language } }) => {
  return (
    <StyledPizza>
      <GatsbyImage image={pizza.image.childImageSharp.gatsbyImageData} />
      <div className='item'>
        <h2 className='mark'>{pizza.name}</h2>
        <ul>
          {pizza.toppings.map((topping) => (
            <li key={topping.id}>
              {topping.name[language] || topping.name.en}
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
  query($slug: String!, $language: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug }}) {
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
          es
        }
        id
        vegetarian
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
