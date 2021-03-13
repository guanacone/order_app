import React from 'react';
import { Link, Trans } from 'gatsby-plugin-react-i18next';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

const StyledDiv = styled.div`
  text-align: center;
  h1 {
    padding-bottom: 15px;
  }
  .pizza-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 4rem;
  }
  .single-pizza {
    display: grid;
    grid-template-rows: auto auto 1fr;
    grid-row: span 3;
    grid-gap: 1rem;

    .picture {
      margin-top: 10px;
      height: 60vh;
    }
  }

  @media(max-width: 900px) {
    .pizza-grid {
      grid-template-columns: 1fr;
    }
  }
`;

const Home = ({ data }) => {
  const pizzas = data.pizzas.nodes;
  return (
    <StyledDiv>
      <h1>
        <Trans>Our selection of tasty pizzas</Trans>
      </h1>
      <div className='pizza-grid'>
        {pizzas.map((pizza) => (
          <div className='single-pizza' key={pizza._id}>
            <Link to={`/pizza/${pizza.slug.current}`}>
              <h2 className='mark'>{pizza.name}</h2>
              <GatsbyImage
                image={pizza.image.childImageSharp.gatsbyImageData}
                alt={pizza.name}
                className='picture' />
            </Link>
          </div>
        ))}
      </div>
    </StyledDiv>
  );
};

export default Home;

export const query = graphql`
  query ($language: String!){
    pizzas: allSanityPizza {
      nodes {
        _id
        name
        price
        image {
          asset {
            fluid {
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
