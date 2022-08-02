import styled from 'styled-components';
import { Link } from 'react-router-dom';
// Icons
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import ExploreOutlined from '@mui/icons-material/ExploreOutlined';
import SubscriptionsOutlined from '@mui/icons-material/SubscriptionsOutlined';
import LibraryOutlined from '@mui/icons-material/VideoLibraryOutlined';
import HistoryOutlined from '@mui/icons-material/RestoreOutlined';
import MusicOutlined from '@mui/icons-material/LibraryMusicOutlined';
import SportsOutlined from '@mui/icons-material/SportsBasketballOutlined';
import GamingOutlined from '@mui/icons-material/SportsEsportsOutlined';
import MoviesOutlined from '@mui/icons-material/MovieCreationOutlined';
import NewsOutlined from '@mui/icons-material/ArticleOutlined';
import LiveOutlined from '@mui/icons-material/LiveTvOutlined';
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import ReportOutlined from '@mui/icons-material/OutlinedFlag';
import HelpOutlined from '@mui/icons-material/HelpOutlineOutlined';
import ModeOutlined from '@mui/icons-material/SettingsBrightnessOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import { useAppDispatch, useAppSelector } from '../types/Hooks';
import Subscriptions from './Subscriptions';
import { updateTheme } from '../store/themeSlice';

const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bgLight};
  color: ${({ theme }) => theme.text};
  height: calc(100vh - 5.6rem);
  position: sticky;
  top: 5.6rem;
  padding: 0 2.6rem;
  font-size: 1.4rem;
  overflow-y: scroll;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0.75rem 1.2rem;
  border-radius: 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.bgLighter};
  }
`;

const Hr = styled.hr`
  margin: 1.5rem 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div`
  padding: 0.75rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Button = styled.button`
  padding: 0.5rem 1.5rem;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  cursor: pointer;
  border-radius: 3px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const Leftbar = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const { isDarkTheme } = useAppSelector((state) => state.theme);

  const dispatch = useAppDispatch();

  const themeChangeHandler = () => {
    dispatch(updateTheme());
  };

  return (
    <Container>
      <Item>
        <HomeOutlined style={{ fontSize: '2.4rem' }} />
        Home
      </Item>
      <Item>
        <ExploreOutlined style={{ fontSize: '2.4rem' }} />
        Explore
      </Item>
      <Item>
        <SubscriptionsOutlined style={{ fontSize: '2.4rem' }} />
        Subscriptions
      </Item>
      <Hr />
      <Item>
        <LibraryOutlined style={{ fontSize: '2.4rem' }} />
        Library
      </Item>
      <Item>
        <HistoryOutlined style={{ fontSize: '2.4rem' }} />
        History
      </Item>
      <Hr />
      {currentUser ? (
        <Subscriptions subscribedUsers={currentUser.subscribedUsers} />
      ) : (
        <Login>
          Sign in to like videos, comment, and subscribe
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button>
              <AccountCircleOutlinedIcon style={{ fontSize: '2.4rem' }} /> SIGN IN
            </Button>
          </Link>
        </Login>
      )}
      <Hr />
      <Item>
        <MusicOutlined style={{ fontSize: '2.4rem' }} />
        Music
      </Item>
      <Item>
        <SportsOutlined style={{ fontSize: '2.4rem' }} />
        Sports
      </Item>
      <Item>
        <GamingOutlined style={{ fontSize: '2.4rem' }} />
        Gaming
      </Item>
      <Item>
        <MoviesOutlined style={{ fontSize: '2.4rem' }} />
        Movies
      </Item>
      <Item>
        <NewsOutlined style={{ fontSize: '2.4rem' }} />
        News
      </Item>
      <Item>
        <LiveOutlined style={{ fontSize: '2.4rem' }} />
        Live
      </Item>
      <Hr />
      <Item>
        <SettingsOutlined style={{ fontSize: '2.4rem' }} />
        Settings
      </Item>
      <Item>
        <ReportOutlined style={{ fontSize: '2.4rem' }} />
        Report
      </Item>
      <Item>
        <HelpOutlined style={{ fontSize: '2.4rem' }} />
        Help
      </Item>
      <Item onClick={themeChangeHandler}>
        <ModeOutlined style={{ fontSize: '2.4rem' }} />
        {isDarkTheme ? 'Light' : 'Dark'} Mode
      </Item>
    </Container>
  );
};

export default Leftbar;
