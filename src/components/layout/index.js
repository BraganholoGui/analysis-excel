import React, { useEffect, useState } from 'react';
import * as S from './styles';
import Header from '../../components/Header';
// import Navbar from '../navbar';
import { useLocation } from 'react-router-dom';

function Layout({ children, ...rest }) {
  const [showNav, setShowNav] = useState(0);
  const [compact, setCompact] = useState(0);
  const toggle = () => setShowNav(Number(!showNav));
  const [url, setUrl] = useState('');
  // const history = useHistory();
  const location = useLocation();


  return (
    <S.Grid {...rest}>
      <S.GridHeader>
        <Header />
      </S.GridHeader>
      <S.GridMain>{children}</S.GridMain>
    </S.Grid>
  );
}

export default Layout;
