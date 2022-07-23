import styled from 'styled-components';
import Card from '../components/Card';
import Leftbar from '../components/Leftbar';

const Container = styled.div`
  display: flex;
`;

const Content = styled.h1`
  flex: 8;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 2rem;
  row-gap: 4rem;
  padding: 2rem 6rem;
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
      <Content>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </Content>
    </Container>
  );
};

export default Home;
