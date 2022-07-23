import styled from 'styled-components';
import Leftbar from '../components/Leftbar';

const Container = styled.div`
  display: flex;
`;

const Content = styled.h1`
  flex: 8;
  padding: 1rem 6rem;
  font-size: 56px;
  color: ${({ theme }) => theme.textDark};
  background-color: ${({ theme }) => theme.bg};
`;

interface Props {
  isDarkTheme: boolean;
  onThemeChange: () => void;
}

const Home: React.FC<Props> = (props) => {
  return (
    <Container>
      <Leftbar
        isDarkTheme={props.isDarkTheme}
        onThemeChange={props.onThemeChange}
      />
      <Content></Content>
    </Container>
  );
};

export default Home;
