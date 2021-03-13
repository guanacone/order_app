import React from 'react';
import { GatsbyImage } from "gatsby-plugin-image";
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

const PizzaOrder = ({ order, pizzas, removeFromOrder }) => {
  return <>
    {order.map((singleOrder, index) => {
      const orderedPizza = pizzas.find((pizza) => singleOrder.id === pizza._id);
      return (
        <div className='menu-item' key={`${orderedPizza._id}-${index}`}>
          <GatsbyImage image={orderedPizza.image.childImageSharp.gatsbyImageData} />
          <h2>{orderedPizza.name} - {singleOrder.size}</h2>
          <p>{formatMoney(calculatePizzaPrice(orderedPizza.price, singleOrder.size))}</p>
          <button
            type='button'
            className='remove'
            title={`Remove ${orderedPizza.name} ${singleOrder.size} from order`}
            onClick={() => removeFromOrder(index)}
          >&times;</button>
        </div>
      );
    })}
  </>;
};

export default PizzaOrder;
