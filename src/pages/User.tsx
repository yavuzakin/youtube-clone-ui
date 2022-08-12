import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import EditIcon from '@mui/icons-material/EditOutlined';
import CheckIcon from '@mui/icons-material/CheckOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { getUser, subscribeToUser, unSubscribeFromUser, updateUser } from '../api/services/User';
import { deleteVideo, getVideosOfUser } from '../api/services/Video';
import ChannelAbout from '../components/ChannelAbout';
import ChannelVideos from '../components/ChannelVideos';
import Leftbar from '../components/Leftbar';
import { loginSuccess } from '../store/userSlice';
import { StatusType } from '../types/Common';
import { useAppDispatch, useAppSelector } from '../types/Hooks';
import { User as UserType } from '../types/User';
import { Video } from '../types/Video';
import breakpoint from '../utils/BreakPoints';

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

  @media ${breakpoint.devices.smallDesktop} {
    padding: 1rem 13rem;
  }

  @media ${breakpoint.devices.tabLand} {
    padding: 1rem 4rem;
  }

  @media ${breakpoint.devices.tabPort} {
    padding: 1rem;
  }
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

  @media ${breakpoint.devices.phone} {
    gap: 2rem;
  }
`;

const PPWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfilePicture = styled.img`
  height: 8rem;
  width: 8rem;
  border-radius: 50%;
  object-fit: cover;

  @media ${breakpoint.devices.phone} {
    height: 5rem;
    width: 5rem;
  }
`;

const Label = styled.label`
  position: absolute;
  bottom: 1rem;
  right: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.bgLight};
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 0.4rem;
  cursor: pointer;
`;

const CheckIconWrapper = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 0;
  background-color: green;
  border: 1px solid ${({ theme }) => theme.bgLight};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 0.4rem;
  cursor: pointer;
`;

const CloseIconWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.bgLight};
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 0.4rem;
  cursor: pointer;
`;

const Input = styled.input`
  display: none;
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

  @media ${breakpoint.devices.phone} {
    font-size: 2rem;
    line-height: 2rem;
  }
`;

const SubscriberCount = styled.p`
  color: ${({ theme }) => theme.textDark};
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2rem;

  @media ${breakpoint.devices.phone} {
    font-size: 1.2rem;
  }
`;

const SubscribeButton = styled.button`
  border: none;
  font-size: 1.4rem;
  font-weight: 500;
  padding: 1rem 1.6rem;
  color: white;
  background-color: #cc0000;
  cursor: pointer;

  @media ${breakpoint.devices.phone} {
    font-size: 1.2rem;
    padding: 0.8rem 1.2rem;
  }
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

const User = () => {
  const userId = useLocation().pathname.split('/')[2];

  const [user, setUser] = useState<UserType>();
  const [videos, setVideos] = useState<Video[]>();
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);
  const [selectedPP, setSelectedPP] = useState<File | null>();
  const [profilePic, setProfilePic] = useState('');

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
      const response = await getUser(userId);
      if (response?.status === StatusType.SUCCESS) {
        setUser(response.data?.user);
      }
    };
    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchUserVideos = async () => {
      const response = await getVideosOfUser(userId);
      if (response?.status === StatusType.SUCCESS) {
        setVideos(response.data?.videos);
      }
    };
    fetchUserVideos();
  }, [userId]);

  useEffect(() => {
    const updateUserPP = async () => {
      const response = await updateUser(userId, { profilePic });
      if (response?.status === StatusType.SUCCESS) {
        dispatch(loginSuccess(response.data?.user!));
        setUser(response.data?.user!);
      }
    };
    profilePic && updateUserPP();
  }, [dispatch, profilePic, userId]);

  const subscribeHandler = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (isChannelOwner) return;

    if (isSubscribed) {
      const response = await unSubscribeFromUser(user!._id);
      if (response?.status === StatusType.SUCCESS) {
        dispatch(loginSuccess(response.data?.user!));
        setUser(response.data?.unSubscribedFrom);
      }
    } else {
      const response = await subscribeToUser(user!._id);
      if (response?.status === StatusType.SUCCESS) {
        dispatch(loginSuccess(response.data?.user!));
        setUser(response.data?.subscribedTo);
      }
    }
  };

  const ppChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e.target && e.target.files) {
      setSelectedPP(e.target.files[0]);
    }
  };

  const removePPHandler = () => {
    setSelectedPP(null);
  };

  const uploadFile = (file: File) => {
    const storage = getStorage();
    const fileName = user?.username;
    const storageRef = ref(storage, 'pp/' + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            break;
        }
      },
      (error) => {
        // Error handling
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProfilePic(downloadURL);
          setSelectedPP(null);
        });
      }
    );
  };

  const updateUserDescription = async (description: string) => {
    const response = await updateUser(userId, { description });
    if (response?.status === StatusType.SUCCESS) {
      dispatch(loginSuccess(response.data?.user!));
      setUser(response.data?.user!);
    }
  };

  const videoDeleteHandler = async (videoId: string, title: string) => {
    const storage = getStorage();
    const videoRef = ref(storage, `videos/${currentUser?.username}videos${title}`);
    const imageRef = ref(storage, `images/${currentUser?.username}images${title}`);

    deleteObject(videoRef)
      .then(() => {})
      .catch(() => {});

    deleteObject(imageRef)
      .then(() => {})
      .catch(() => {});

    await deleteVideo(videoId);
    setVideos((prevState) => prevState?.filter((video) => video._id !== videoId));
  };

  return (
    <Container>
      <Leftbar />
      <Content>
        <CoverPicture />
        <ProfileHeader>
          <FirstRow>
            <ChannelInformation>
              <PPWrapper>
                <ProfilePicture
                  src={selectedPP ? URL.createObjectURL(selectedPP) : user?.profilePic}
                />
                {isChannelOwner && !selectedPP && (
                  <Label htmlFor="pp-input">
                    <EditIcon />
                  </Label>
                )}
                {isChannelOwner && selectedPP && (
                  <CheckIconWrapper onClick={() => uploadFile(selectedPP)}>
                    <CheckIcon />
                  </CheckIconWrapper>
                )}
                {selectedPP && isChannelOwner && (
                  <CloseIconWrapper onClick={removePPHandler}>
                    <CloseIcon />
                  </CloseIconWrapper>
                )}
                {isChannelOwner && (
                  <Input id="pp-input" type="file" accept="image/*" onChange={ppChangeHandler} />
                )}
              </PPWrapper>
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
        {activeTabId === 'tab1' && videos && (
          <ChannelVideos
            videos={videos}
            isChannelOwner={isChannelOwner}
            onVideoDelete={videoDeleteHandler}
          />
        )}
        {activeTabId === 'tab2' && user && (
          <ChannelAbout
            user={user}
            totalViews={channelTotalViews}
            isChannelOwner={isChannelOwner}
            onUserUpdate={updateUserDescription}
          />
        )}
      </Content>
    </Container>
  );
};

export default User;
