import React from 'react';
import { graphql } from 'gatsby';

const Home = ({ data }) => {
  console.log({ data });
  return (
    <>
      <h2>{data.allSanityCompany.nodes.map((company) => company.name)}</h2>
      <div className='container-fluid'>
        <button type='button' className='btn btn-primary'>Primary</button>
      </div>
    </>
  );
};

export default Home;

export const query = graphql`
  query CompanyQuery {
    allSanityCompany {
      nodes {
        name
      }
    }
  }
`;
