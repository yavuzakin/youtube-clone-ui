import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Leftbar from './components/Leftbar';
import Topbar from './components/Topbar';
import { darkTheme, lightTheme } from './utils/Theme';

const Container = styled.div`
  font-size: 1.6rem;
`;

const Main = styled.div`
  display: flex;
`;

const Content = styled.h1`
  flex: 8;
  padding: 1rem 2rem;
  font-size: 56px;
  color: ${({ theme }) => theme.textDark};
  background-color: ${({ theme }) => theme.bg};
`;

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const themeChangeHandler = () => {
    setIsDarkTheme((prevState) => !prevState);
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <Container>
        <Topbar />
        <Main>
          <Leftbar
            isDarkTheme={isDarkTheme}
            onThemeChange={themeChangeHandler}
          />
          <Content>
            <h1>Video Cards</h1>
            <h1>Video Cards</h1>
            <h1>Video Cards</h1>
            <h1>Video Cards</h1>
            <h1>Video Cards</h1>
            <h1>Video Cards</h1>
            <h1>Video Cards</h1>
            <h1>Video Cards</h1>
            <h1>Video Cards</h1>
            <h1>Video Cards</h1>
            <h1>Video Cards</h1>
            <h1>Video Cards</h1>
            <h1>Video Cards</h1>
            <h1>Video Cards</h1>
            <h1>Video Cards</h1>
            <h1>Video Cards</h1>
            <h1>Video Cards</h1>
            <h1>Video Cards</h1>
            <h1>Video Cards</h1>
            <h1>Video Cards</h1>
          </Content>
        </Main>
      </Container>
    </ThemeProvider>
  );
}

export default App;
