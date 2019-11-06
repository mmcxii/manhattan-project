import styled from 'styled-components';

const Container = styled.div`
  --margin: 0.5rem;

  margin: 0 var(--margin);

  @media screen and (min-width: 576px) {
    --margin: 1rem;
  }
  @media screen and (min-width: 768px) {
    --margin: 2rem;
  }
  @media screen and (min-width: 992px) {
    --margin: 4rem;
  }
  @media screen and (min-width: 1200px) {
    --margin: 20%;
  }
`;

export default Container;
