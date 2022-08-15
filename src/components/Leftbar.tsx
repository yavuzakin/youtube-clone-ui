import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
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
import breakpoint from '../utils/BreakPoints';

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

  @media ${breakpoint.devices.smallDesktop} {
    flex: 0.5;
    padding: 0 0.8rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-top: 1rem;
  }

  @media ${breakpoint.devices.tabLand} {
    flex: 0.8;
  }

  @media ${breakpoint.devices.phone} {
    flex: 1.3;
  }
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

  @media ${breakpoint.devices.smallDesktop} {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    &:not(:nth-child(-n + 6)) {
      display: none;
    }
    &:last-child {
      display: flex;
      text-align: center;
    }
  }
`;

const Name = styled.p`
  @media ${breakpoint.devices.smallDesktop} {
    font-size: 1rem;
  }

  @media ${breakpoint.devices.phone} {
    font-size: 0.8rem;
  }
`;

const Hr = styled.hr`
  margin: 1.5rem 0;
  border: 0.5px solid ${({ theme }) => theme.soft};

  @media ${breakpoint.devices.smallDesktop} {
    display: none;
  }
`;

const Login = styled.div`
  padding: 0.75rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media ${breakpoint.devices.smallDesktop} {
    display: none;
  }
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

  const navigate = useNavigate();

  const themeChangeHandler = () => {
    dispatch(updateTheme());
  };

  const goToSubVideosPage = () => {
    if (currentUser) {
      navigate('/subscribed-channels-videos');
    } else {
      navigate('/login');
    }
  };

  const goToHomePage = () => {
    console.log('go to home page');
    navigate('/');
  };

  return (
    <Container>
      <Item onClick={goToHomePage}>
        <HomeOutlined style={{ fontSize: '2.4rem' }} />
        <Name>Home</Name>
      </Item>
      <Item>
        <ExploreOutlined style={{ fontSize: '2.4rem' }} />
        <Name>Explore</Name>
      </Item>
      <Item onClick={goToSubVideosPage}>
        <SubscriptionsOutlined style={{ fontSize: '2.4rem' }} />
        <Name>Subscriptions</Name>
      </Item>
      <Hr />
      <Item>
        <LibraryOutlined style={{ fontSize: '2.4rem' }} />
        <Name>Library</Name>
      </Item>
      <Item>
        <HistoryOutlined style={{ fontSize: '2.4rem' }} />
        <Name>History</Name>
      </Item>
      <Hr />
      {currentUser ? (
        <Subscriptions subscribedUsers={currentUser.subscribedUsers} />
      ) : (
        <Login>
          <Name>Sign in to like videos, comment, and subscribe</Name>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button>
              <AccountCircleOutlinedIcon style={{ fontSize: '2.4rem' }} /> <Name>SIGN IN</Name>
            </Button>
          </Link>
        </Login>
      )}
      <Hr />
      <Item>
        <MusicOutlined style={{ fontSize: '2.4rem' }} />
        <Name>Music</Name>
      </Item>
      <Item>
        <SportsOutlined style={{ fontSize: '2.4rem' }} />
        <Name>Sports</Name>
      </Item>
      <Item>
        <GamingOutlined style={{ fontSize: '2.4rem' }} />
        <Name>Gaming</Name>
      </Item>
      <Item>
        <MoviesOutlined style={{ fontSize: '2.4rem' }} />
        <Name>Movies</Name>
      </Item>
      <Item>
        <NewsOutlined style={{ fontSize: '2.4rem' }} />
        <Name>News</Name>
      </Item>
      <Item>
        <LiveOutlined style={{ fontSize: '2.4rem' }} />
        <Name>Live</Name>
      </Item>
      <Hr />
      <Item>
        <SettingsOutlined style={{ fontSize: '2.4rem' }} />
        <Name>Settings</Name>
      </Item>
      <Item>
        <ReportOutlined style={{ fontSize: '2.4rem' }} />
        <Name>Report</Name>
      </Item>
      <Item>
        <HelpOutlined style={{ fontSize: '2.4rem' }} />
        <Name>Help</Name>
      </Item>
      <Item onClick={themeChangeHandler}>
        <ModeOutlined style={{ fontSize: '2.4rem' }} />
        <Name>{isDarkTheme ? 'Light' : 'Dark'} Mode</Name>
      </Item>
    </Container>
  );
};

export default Leftbar;
