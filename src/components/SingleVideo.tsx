import styled from 'styled-components';
import Timeago from 'react-timeago';
import Like from '@mui/icons-material/ThumbUpOutlined';
import Liked from '@mui/icons-material/ThumbUp';
import Dislike from '@mui/icons-material/ThumbDownOutlined';
import Disliked from '@mui/icons-material/ThumbDown';
import Share from '@mui/icons-material/ReplyOutlined';
import Save from '@mui/icons-material/PlaylistAddOutlined';
import { Video } from '../types/Video';
import { useAppSelector, useAppDispatch } from '../types/Hooks';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../store/userSlice';
import { useEffect, useRef } from 'react';
import { dislikeVideo, likeVideo } from '../api/services/Video';
import { StatusType } from '../types/Common';
import { subscribeToUser, unSubscribeFromUser } from '../api/services/User';

const VideoWrapper = styled.div`
  max-width: 128rem;
  max-height: 72rem;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 2.6rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2rem;
  color: ${({ theme }) => theme.textDark};
`;

const Buttons = styled.div`
  display: flex;
  gap: 2rem;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 2rem 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: grid;
  grid-template-columns: 1fr 15fr 2fr;
  row-gap: 2rem;
`;

const ChannelInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Image = styled.img`
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 50%;
  object-fit: cover;
  background-color: #999;
  cursor: pointer;
`;

const ChannelName = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 2rem;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

const SubscriberCount = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.8rem;
  color: ${({ theme }) => theme.textDark};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.text};
  grid-row: 2 / span 1;
  grid-column: 2 / span 1;
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

interface Props {
  video: Video;
  setVideo: React.Dispatch<React.SetStateAction<Video | undefined>>;
}

const SingleVideo: React.FC<Props> = (props) => {
  const user = useAppSelector((state) => state.user.currentUser);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.load();
  }, [props.video.videoUrl]);

  let isLiked = false;
  let isDisliked = false;
  let isSubscribed = false;
  let isChannelOwner = false;
  if (user) {
    isLiked = props.video?.likes.includes(user._id);
    isDisliked = props.video?.dislikes.includes(user._id);
    isSubscribed = user.subscribedUsers.includes(props.video?.user._id);
    isChannelOwner = props.video?.user._id === user._id;
  }

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const likeHandler = async () => {
    if (!user) navigate('/login');
    if (isLiked) return;

    const response = await likeVideo(props.video._id);
    if (response?.status === StatusType.SUCCESS) {
      props.setVideo(response.data?.video);
    }
  };

  const dislikeHandler = async () => {
    if (!user) navigate('/login');
    if (isDisliked) return;

    const response = await dislikeVideo(props.video._id);
    if (response?.status === StatusType.SUCCESS) {
      props.setVideo(response.data?.video);
    }
  };

  const subscribeHandler = async () => {
    if (!user) navigate('/login');
    if (isChannelOwner) return;

    if (isSubscribed) {
      const response = await unSubscribeFromUser(props.video.user._id);
      if (response?.status === StatusType.SUCCESS) {
        dispatch(loginSuccess(response.data?.user!));
      }
    } else {
      const response = await subscribeToUser(props.video.user._id);
      if (response?.status === StatusType.SUCCESS) {
        dispatch(loginSuccess(response.data?.user!));
      }
    }
  };

  const goToUserPage = () => {
    navigate(`/channel/${props.video.user._id}`);
  };

  return (
    <>
      <VideoWrapper>
        {props.video?.videoUrl && (
          <video ref={videoRef} controls autoPlay style={{ width: '100%' }}>
            <source src={props.video?.videoUrl} type="video/mp4" />
          </video>
        )}
      </VideoWrapper>
      <Title>{props.video?.title}</Title>
      <Details>
        <Info>
          {props.video?.views} {props.video?.views > 1 ? 'views' : 'view'} ‧{' '}
          <Timeago date={props.video?.createdAt} />
        </Info>
        <Buttons>
          <Button onClick={likeHandler}>
            {isLiked ? (
              <Liked style={{ fontSize: '2.4rem' }} />
            ) : (
              <Like style={{ fontSize: '2.4rem' }} />
            )}
            {props.video?.likes.length}
          </Button>
          <Button onClick={dislikeHandler}>
            {isDisliked ? (
              <Disliked style={{ fontSize: '2.4rem' }} />
            ) : (
              <Dislike style={{ fontSize: '2.4rem' }} />
            )}
            DISLIKE
          </Button>
          <Button>
            <Share style={{ fontSize: '2.4rem' }} />
            SHARE
          </Button>
          <Button>
            <Save style={{ fontSize: '2.4rem' }} />
            SAVE
          </Button>
        </Buttons>
      </Details>
      <Hr />
      <Channel>
        <Image onClick={goToUserPage} src={props.video?.user.profilePic} />
        <ChannelInfo>
          <ChannelName onClick={goToUserPage}>{props.video?.user.username}</ChannelName>
          <SubscriberCount>
            {props.video?.user.subscribers.length}{' '}
            {props.video?.user.subscribers.length === 0 ? 'subcriber' : 'subcribers'}
          </SubscriberCount>
        </ChannelInfo>
        <SubscribeButton onClick={subscribeHandler}>
          {isSubscribed ? 'SUBSCRIBED' : 'SUBSCRIBE'}
        </SubscribeButton>
        <Description>{props.video?.description}</Description>
      </Channel>
      <Hr />
    </>
  );
};

export default SingleVideo;
