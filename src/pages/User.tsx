import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ChannelAbout from '../components/ChannelAbout';
import ChannelVideos from '../components/ChannelVideos';
import Leftbar from '../components/Leftbar';
import { loginSuccess } from '../store/userSlice';
import { useAppDispatch, useAppSelector } from '../types/Hooks';
import { User as UserType } from '../types/User';
import { Video } from '../types/Video';

const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 8;
  font-size: 56px;
  color: ${({ theme }) => theme.textDark};
  background-color: ${({ theme }) => theme.bg};
`;

const CoverPicture = styled.img`
  width: 100%;
  height: 30rem;
  background-color: #999;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: ${({ theme }) => theme.bgLight};
  padding: 1rem 20rem 0;
`;

const FirstRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChannelInformation = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

const ProfilePicture = styled.img`
  height: 8rem;
  width: 8rem;
  border-radius: 50%;
`;

const TextInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const ChannelName = styled.h2`
  color: ${({ theme }) => theme.text};
  font-size: 2.4rem;
  font-weight: 400;
  line-height: 3rem;
`;

const SubscriberCount = styled.p`
  color: ${({ theme }) => theme.textDark};
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2rem;
`;

const SubscribeButton = styled.button`
  border: none;
  font-size: 1.4rem;
  font-weight: 500;
  padding: 1rem 1.6rem;
  color: white;
  background-color: #cc0000;
  cursor: pointer;
`;

const SecondRow = styled.div`
  display: flex;
`;

const TabItem = styled.div<{ active: boolean }>`
  color: ${({ active, theme }) => (active ? theme.text : theme.textDark)};
  border-bottom: ${({ active, theme }) => active && `2px solid ${theme.text}`};
  font-size: 1.4rem;
  font-weight: 500;
  padding: 1.2rem 3.2rem;
  cursor: pointer;
`;

const tabs = [
  { id: 'tab1', name: 'VIDEOS' },
  { id: 'tab2', name: 'ABOUT' },
];

interface Props {
  isDarkTheme: boolean;
  onThemeChange: () => void;
}

const User: React.FC<Props> = (props) => {
  const userId = useLocation().pathname.split('/')[2];

  const [user, setUser] = useState<UserType>();
  const [videos, setVideos] = useState<Video[]>();
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);

  const currentUser = useAppSelector((state) => state.user.currentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let isSubscribed = false;
  let isChannelOwner = false;

  if (currentUser) {
    isSubscribed = currentUser.subscribedUsers.includes(userId);
    isChannelOwner = currentUser._id === user?._id;
  }

  const channelTotalViews =
    videos && videos.reduce((prevValue, curValue) => prevValue + curValue.views, 0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios(`http://localhost:4132/api/v1/users/${userId}`);
        setUser(response.data.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchUserVideos = async () => {
      try {
        const response = await axios(`http://localhost:4132/api/v1/users/${userId}/videos`);
        setVideos(response.data.data.videos);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserVideos();
  }, [userId]);

  const subscribeHandler = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (isChannelOwner) return;

    try {
      const response = await axios.put(
        `http://localhost:4132/api/v1/users/${isSubscribed ? 'unsubscribe' : 'subscribe'}/${
          user!._id
        }`,
        {},
        { withCredentials: true }
      );
      dispatch(loginSuccess(response.data.data.user));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Leftbar isDarkTheme={props.isDarkTheme} onThemeChange={props.onThemeChange} />
      <Content>
        <CoverPicture />
        <ProfileHeader>
          <FirstRow>
            <ChannelInformation>
              <ProfilePicture src={user?.profilePic} />
              <TextInformation>
                <ChannelName>{user?.username}</ChannelName>
                <SubscriberCount>
                  {user?.subscribers?.length}{' '}
                  {user && user.subscribers.length > 1 ? 'subscribers' : 'subscriber'}
                </SubscriberCount>
              </TextInformation>
            </ChannelInformation>
            <SubscribeButton onClick={subscribeHandler}>
              {isSubscribed ? 'SUBSCRIBED' : 'SUBSCRIBE'}
            </SubscribeButton>
          </FirstRow>
          <SecondRow>
            {tabs.map((tab) => (
              <TabItem
                key={tab.id}
                active={tab.id === activeTabId}
                onClick={() => setActiveTabId(tab.id)}
              >
                {tab.name}
              </TabItem>
            ))}
          </SecondRow>
        </ProfileHeader>
        {activeTabId === 'tab1' && videos && <ChannelVideos videos={videos} />}
        {activeTabId === 'tab2' && user && channelTotalViews && (
          <ChannelAbout user={user} totalViews={channelTotalViews} />
        )}
      </Content>
    </Container>
  );
};

export default User;
