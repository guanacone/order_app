import React, { useState } from 'react';

// Create a order context
const OrderContext = React.createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState([]);
  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
