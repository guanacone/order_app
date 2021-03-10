import { useContext, useState } from 'react';
import axios from 'axios';
import OrderContext from '../components/OrderContext';
import calculateOrderTotal from './calculateOrderTotal';
import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

const formatOrder = (order, pizzas) => {
  return order.map((item) => {
    const orderedPizza = pizzas.find((pizza) => pizza.id === item.id);
    return {
      name: orderedPizza.name,
      size: item.size,
      price: formatMoney(calculatePizzaPrice(orderedPizza.price, item.size)),
      thumbnail: orderedPizza.image.asset.fluid.src,
    };
  });
};

const useOrder = ({ pizzas, values }) => {
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const addToOrder = (orderedPizza) => {
    setOrder([...order, orderedPizza]);
  };
  const removeFromOrder = (index) => {
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
  };

  const submitOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    const body = {
      order: formatOrder(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
    };
    try {
      await axios.post(
        `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
        {
          body,
        },
      );
      setLoading(false);
      setMessage('Success! Come on down for your pizza');
      setOrder([]);
      setTimeout(() => setMessage(null), 2e3);
    } catch (err) {
      const { response: { data: { message: errMessage } } } = err;
      setLoading(false); // turn off loading
      setError(errMessage || 'Internal Server Error. Please try again');
    }
  };

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
};

export default useOrder;
