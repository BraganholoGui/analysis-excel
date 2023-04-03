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

  // async function loadData() {
  //   setUrl(history.location.pathname)
  //   let userLogado = await localStorage.getItem("token") || false;
  //   if ((userLogado === "null" || !userLogado) && history.location.pathname != '/login' ) {
  //     localStorage.removeItem("token")
  //     history.push('/login')
  //     return;
  //   }
  // }
  // useEffect(() => {
  //   loadData();
  // }, [location]);

  return (
    <S.Grid {...rest}>
      {/* <S.GridNav>
        <Navbar visible={showNav} close={toggle} setCompact={setCompact} />
      </S.GridNav> */}
      <S.GridHeader>
        <Header />
      </S.GridHeader>
      <S.GridMain>{children}</S.GridMain>
    </S.Grid>
  );
}

export default Layout;
