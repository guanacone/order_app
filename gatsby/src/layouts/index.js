import React, { useEffect } from 'react';
import 'normalize.css';
import styled from 'styled-components';
import Nav from '../components/Nav';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import stripes from '../assets/images/stripes.svg';
import { OrderProvider } from '../components/OrderContext';
import LanguageSelector from '../components/LanguageSelector';

const SiteBorderStyles = styled.div`
  max-width: 1000px;
  margin: 12rem auto 4rem auto;
  margin-top: clamp(2rem, 10vw, 12rem);
  background: white url(${stripes});
  background-size: 1500px;
  padding: 5px;
  padding: clamp(5px, 1vw, 25px);
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.044);
  border: 5px solid white;
  @media (max-width: 1100px) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
`;

const ContentStyles = styled.div`
  background: white;
  padding: 2rem;
`;

const Layout = ({ children }) => {
  const [hasMounted, setHasMounted] = React.useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <OrderProvider>
      <GlobalStyles/>
      <Typography/>
      <SiteBorderStyles>
        <ContentStyles>
          <LanguageSelector/>
          <Nav />
          {children}
        </ContentStyles>
      </SiteBorderStyles>
    </OrderProvider>
  );
};

export default Layout;
