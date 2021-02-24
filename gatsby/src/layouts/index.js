import React, { useEffect } from 'react';
import 'normalize.css';

const Layout = ({ children }) => {
  const [hasMounted, setHasMounted] = React.useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      {children}
    </>
  );
};

export default Layout;
