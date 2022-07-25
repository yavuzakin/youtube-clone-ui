import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Topbar from './components/Topbar';
import { darkTheme, lightTheme } from './utils/Theme';
import { GlobalStyles } from './utils/GlobalStyles';
import Home from './pages/Home';
import Video from './pages/Video';

const Container = styled.div`
  font-size: 1.6rem;
`;

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const themeChangeHandler = () => {
    setIsDarkTheme((prevState) => !prevState);
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <Container>
        <GlobalStyles />
        <BrowserRouter>
          <Topbar />
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  <Home
                    isDarkTheme={isDarkTheme}
                    onThemeChange={themeChangeHandler}
                  />
                }
              />
              <Route path="video">
                <Route path=":id" element={<Video />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
