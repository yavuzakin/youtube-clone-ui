import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Topbar from './components/Topbar';
import { darkTheme, lightTheme } from './utils/Theme';
import { GlobalStyles } from './utils/GlobalStyles';
import Home from './pages/Home';
import Video from './pages/Video';
import Login from './pages/Login';
import User from './pages/User';
import { useAppSelector } from './types/Hooks';
import Results from './pages/Results';

const Container = styled.div`
  font-size: 1.6rem;
`;

function App() {
  const isDarkTheme = useAppSelector((state) => state.theme.isDarkTheme);

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <Container>
        <GlobalStyles />
        <BrowserRouter>
          <Topbar />
          <Routes>
            <Route path="/">
              <Route index element={<Home page="home" />} />
              <Route
                path="subscribed-channels-videos"
                element={<Home page="subscribed-channels-videos" />}
              />
              <Route path="login" element={<Login />} />
              <Route path="results" element={<Results />} />
              <Route path="video">
                <Route path=":id" element={<Video />} />
              </Route>
              <Route path="channel">
                <Route path=":id" element={<User />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
