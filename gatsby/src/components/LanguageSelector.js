import React from 'react';
import { Link, useI18next } from 'gatsby-plugin-react-i18next';
import styled from 'styled-components';
import EnIcon from '../assets/images/english-language.png';
import EsIcon from '../assets/images/spanish-language.png';

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-around;
  width: 8vw;
  img {
    width: 40px;
  }
`;

const LanguageSelector = () => {
  const { languages, originalPath } = useI18next();
  return (
    <StyledDiv>
      {languages.map((lng) => (
        <Link key={lng} to={originalPath} language={lng}>
          {lng === 'en'
            ? <img src={EnIcon} alt='english flag'/>
            : <img src={EsIcon} alt='english flag'/>}
        </Link>
      ))}
    </StyledDiv>
  );
};

export default LanguageSelector;
