import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TimeAgo from 'react-timeago';
import { Video } from '../types/Video';

const Container = styled.div<{ size: string }>`
  display: ${(props) => props.size === 'small' && 'flex'};
  gap: ${(props) => props.size === 'small' && '1rem'};
  max-width: ${(props) =>
    props.size === 'small' ? '100%' : props.size === 'medium' ? '21rem' : '36rem'};
  margin-bottom: ${(props) => (props.size === 'small' ? '1rem' : '2rem')};
`;

const Image = styled.img<{ size: string }>`
  max-width: 100%;
  flex: ${(props) => props.size === 'small' && '1'};
  height: ${(props) =>
    props.size === 'small' ? '10rem' : props.size === 'medium' ? '12rem' : '20.2rem'};
  background-color: #999;
  border-radius: 2px;
  cursor: pointer;
`;

const Details = styled.div<{ size: string }>`
  width: 100%;
  flex: ${(props) => props.size === 'small' && '1'};
  display: flex;
  gap: 1rem;
  align-self: flex-start;
`;

const ChannelImage = styled.img<{ size: string }>`
  display: ${(props) => (props.size === 'small' || props.size === 'medium') && 'none'};
  height: 3.6rem;
  min-width: 3.6rem;
  border-radius: 50%;
  background-color: #999;
  cursor: pointer;
`;

const Texts = styled.div<{ size: string }>`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: ${(props) => (props.size === 'small' ? '1.2rem' : '1.4rem')};
  line-height: ${(props) => (props.size === 'small' ? '2rem' : '2.2rem')};
`;

const VideoTitle = styled.h2<{ size: string }>`
  font-size: ${(props) => (props.size === 'small' ? '1.4rem' : '1.6rem')};
  font-weight: 500;
  line-height: ${(props) =>
    props.size === 'small' || props.size === 'medium' ? '2rem' : '2.2rem'};
  margin-bottom: 0.3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

const ChannelName = styled.h3<{ size: string }>`
  font-size: ${(props) => (props.size === 'small' ? '1.2rem' : '1.4rem')};
  font-weight: 400;
  color: ${({ theme }) => theme.textDark};
  display: ${(props) => props.size === 'medium' && 'none'};
  cursor: pointer;
`;

const ViewsAndCreatedAgo = styled.p<{ size: string }>`
  margin-top: ${(props) => props.size === 'small' && '-0.5rem'};
  font-weight: 400;
  color: ${({ theme }) => theme.textDark};
`;

interface Props {
  size: string;
  video: Video;
}

const Card: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  const goToVideoPage = () => {
    navigate(`/video/${props.video._id}`);
  };

  const goToChannelPage = () => {
    navigate(`/channel/${props.video.user._id}`);
  };

  return (
    <Container size={props.size}>
      <Image size={props.size} src={props.video.imgUrl} onClick={goToVideoPage} />
      <Details size={props.size}>
        <ChannelImage
          onClick={goToChannelPage}
          size={props.size}
          src={props.video.user.profilePic}
        />
        <Texts size={props.size}>
          <VideoTitle size={props.size} onClick={goToVideoPage}>
            {props.video.title}
          </VideoTitle>
          <ChannelName onClick={goToChannelPage} size={props.size}>
            {props.video.user.username}
          </ChannelName>
          <ViewsAndCreatedAgo size={props.size}>
            {props.video.views} {props.video.views > 1 ? 'views' : 'view'} ‧{' '}
            <TimeAgo date={props.video.createdAt} />
          </ViewsAndCreatedAgo>
        </Texts>
      </Details>
    </Container>
  );
};

export default Card;
