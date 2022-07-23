import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Leftbar from './components/Leftbar';
import Topbar from './components/Topbar';
import { darkTheme, lightTheme } from './utils/Theme';

const Container = styled.div`
  display: flex;
  font-size: 1.6rem;
`;

const Main = styled.div`
  flex: 8;
`;

const Heading = styled.h1`
  font-size: 56px;
`;

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const themeChangeHandler = () => {
    setIsDarkTheme((prevState) => !prevState);
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <Container>
        <Leftbar isDarkTheme={isDarkTheme} onThemeChange={themeChangeHandler} />
        <Main>
          <Topbar />
          <Heading>Video Cards</Heading>
        </Main>
      </Container>
    </ThemeProvider>
  );
}

export default App;
