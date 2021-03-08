import React from 'react';
import PizzaList from '../components/PizzaList';

const Home = ({ pageContext: { langKey } }) => {
  return (
    <>
      <PizzaList langKey={langKey}/>
    </>
  );
};

export default Home;
