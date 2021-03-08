import React from 'react';
import styled from 'styled-components';
import { Link, graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

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

const PizzaList = ({ langKey }) => {
  const { pizzas: { nodes: pizzas } } = useStaticQuery(graphql`
    query {
        pizzas: allSanityPizza {
            nodes {
                _id
                name
                slug {
                    current
                }
                image {
                    asset {
                        fluid {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
            }
        }
    }
    `);

  return (
    <StyledDiv>
      <div className='pizza-grid'>
        {pizzas.map((pizza) => (
          <div className='single-pizza' key={pizza._id}>
            <Link to={ langKey === 'en'
              ? `/pizza/${pizza.slug.current}`
              : `/sp/pizza/${pizza.slug.current}`}>
              <h2 className='mark'>{pizza.name}</h2>
              <Img fluid={pizza.image.asset.fluid} alt={pizza.name} className='picture'/>
            </Link>
          </div>
        ))}
      </div>
    </StyledDiv>
  );
};

export default PizzaList;

// export const query = graphql`
//   query MyQuery {
//   pizzas: allSanityPizza {
//     nodes {
//       _id
//       name
//       price
//       image {
//         asset {
//           fluid {
//             ...GatsbySanityImageFluid
//           }
//         }
//       }
//       slug {
//         current
//       }
//     }
//   }
// }
// `;
