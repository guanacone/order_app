import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const StyledDiv = styled.div`
  text-align: center;
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

    img {
      margin-top: 10px;
    }
  }

  @media(max-width: 900px) {
    .pizza-grid {
      grid-template-columns: 1fr;
    }
  }
`;

const Home = ({ data: { pizzas: { nodes } } }) => {
  console.log({ nodes });
  const pizzas = nodes;
  return (
    <StyledDiv>
      <div className='pizza-grid'>
        {pizzas.map((pizza) => (
          <div className='single-pizza' key={pizza._id}>
            <Link to={`/pizza/${pizza.slug.current}`}>
              <h2 className='mark'>{pizza.name}</h2>
              <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
            </Link>
          </div>
        ))}
      </div>
    </StyledDiv>
  );
};

export default Home;

export const query = graphql`
  query MyQuery {
  pizzas: allSanityPizza {
    nodes {
      _id
      name
      price
      image {
        asset {
          fluid(maxHeight: 350) {
            ...GatsbySanityImageFluid
          }
        }
      }
      slug {
        current
      }
    }
  }
}
`;
