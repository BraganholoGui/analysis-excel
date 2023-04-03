import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid:
    "nav header" min-content
    "nav main" 1fr / min-content 1fr;
  min-height: 90vh;
`;

export const GridNav = styled.div`
  grid-area: nav;
  z-index: 2000;
`;

export const GridHeader = styled.header`
  grid-area: header;
`;

export const GridMain = styled.main`
  grid-area: main;
  background-color: #FBFCFD;
`;
