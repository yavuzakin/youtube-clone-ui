import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TimeAgo from 'react-timeago';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Video } from '../types/Video';
import { useState } from 'react';
import breakpoint from '../utils/BreakPoints';

const Container = styled.div<{ size: string; alignment: string }>`
  display: flex;
  flex-direction: ${({ alignment }) => alignment === 'vertical' && 'column'};
  align-items: flex-start;
  gap: ${({ size }) => (size === 'large' ? '1.6rem' : size === 'medium' ? '1.2rem' : '0.8rem')};
  max-width: 100%;
  position: relative;

  @media ${breakpoint.devices.phone} {
    flex-direction: ${({ size }) => size === 'large' && 'column'};
  }
`;

const Image = styled.img<{ size: string }>`
  flex: ${({ size }) => (size === 'xsmall' ? '1' : size === 'large' && '1')};
  max-width: ${({ size }) => (size === 'large' ? '36rem' : size === 'xsmall' ? '17rem' : '100%')};
  background-color: #999;
  border-radius: 2px;
  cursor: pointer;
`;

const Details = styled.div<{ size: string }>`
  max-width: 100%;
  flex: ${({ size }) => (size === 'xsmall' ? '1' : size === 'large' && '2')};
  display: grid;
  grid-template-columns: ${({ size }) =>
    size === 'large' ? '1fr 32fr' : size === 'medium' && '1fr 8fr'};
  column-gap: ${({ size }) => (size === 'large' ? '0.8rem' : size === 'medium' && '1.2rem')};
  align-items: ${({ size }) => (size === 'medium' ? 'center' : 'start')};
`;

const ChannelImage = styled.img<{ size: string }>`
  display: ${({ size }) => (size === 'small' ? 'none' : size === 'xsmall' && 'none')};
  height: ${({ size }) => (size === 'large' ? '2.4rem' : '3.6rem')};
  width: ${({ size }) => (size === 'large' ? '2.4rem' : '3.6rem')};
  margin-top: ${({ size }) => size === 'large' && '1.2rem'};
  margin-bottom: ${({ size }) => size === 'large' && '1.2rem'};
  border-radius: 50%;
  object-fit: cover;
  background-color: #999;
  cursor: pointer;
`;

const VideoTitle = styled.h2<{ size: string }>`
  font-size: ${({ size }) =>
    size === 'large' ? '1.8rem' : size === 'medium' ? '1.6rem' : '1.4rem'};
  font-weight: ${({ size }) => (size === 'large' ? '400' : '500')};
  line-height: ${({ size }) =>
    size === 'large' ? '2.6rem' : size === 'medium' ? '2.2rem' : '2rem'};
  grid-column: ${({ size }) => size === 'large' && '1 / -1'};
  grid-row: ${({ size }) => size === 'large' && '1 / 2'};

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

const ChannelName = styled.h3<{ size: string }>`
  font-size: ${({ size }) => (size === 'medium' ? '1.4rem' : '1.2rem')};
  font-weight: 400;
  line-height: ${({ size }) => (size === 'medium' ? '2rem' : '1.8rem')};
  grid-column: ${({ size }) => size === 'medium' && '2 / -1'};
  margin-top: ${({ size }) =>
    size === 'large' ? '1.2rem' : size === 'medium' ? '0.4rem' : size === 'xsmall' && '0.4rem'};
  margin-bottom: ${({ size }) => size === 'large' && '1.2rem'};
  align-self: ${({ size }) => (size === 'large' ? 'center' : 'start')};

  color: ${({ theme }) => theme.textDark};
  display: ${(props) => props.size === 'small' && 'none'};
  cursor: pointer;
`;

const ViewsAndCreatedAgo = styled.p<{ size: string }>`
  font-size: ${({ size }) => (size === 'medium' ? '1.4rem' : '1.2rem')};
  font-weight: 400;
  line-height: ${({ size }) => (size === 'medium' ? '2rem' : '1.8rem')};
  grid-column: ${({ size }) => (size === 'large' ? '1 / -1' : size === 'medium' && '2 / -1')};
  grid-row: ${({ size }) => size === 'large' && '2 / 3'};

  margin-top: ${(props) => props.size === 'small' && '0.8rem'};
  color: ${({ theme }) => theme.textDark};
`;

const Description = styled.p<{ size: string }>`
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.8rem;
  color: ${({ theme }) => theme.textDark};
  grid-column: 1 / -1;
  display: ${({ size }) => size !== 'large' && 'none'};
`;

const DeleteIconWrapper = styled.div`
  color: white;
  background-color: #ff0000;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
`;

interface Props {
  video: Video;
  alignment: 'vertical' | 'horizontal';
  size: 'xsmall' | 'small' | 'medium' | 'large';
  isChannelOwner?: boolean;
  onVideoDelete?: (videoId: string, title: string) => Promise<void>;
}

const Card: React.FC<Props> = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const goToVideoPage = () => {
    navigate(`/video/${props.video._id}`);
  };

  const goToChannelPage = () => {
    navigate(`/channel/${props.video.user._id}`);
  };

  const mouseEnterHandler = () => {
    setIsHovered(true);
  };

  const mouseLeaveHandler = () => {
    setIsHovered(false);
  };

  const deleteVideoHandler = () => {
    props.onVideoDelete!(props.video._id, props.video.title);
  };

  return (
    <Container
      size={props.size}
      alignment={props.alignment}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <Image size={props.size} src={props.video.imgUrl} onClick={goToVideoPage} />
      <Details size={props.size}>
        <ChannelImage
          onClick={goToChannelPage}
          size={props.size}
          src={props.video.user.profilePic}
        />
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
        <Description size={props.size}>{props.video.description}</Description>
      </Details>
      {props.isChannelOwner && isHovered && (
        <DeleteIconWrapper onClick={deleteVideoHandler}>
          <DeleteIcon style={{ fontSize: '2rem' }} />
        </DeleteIconWrapper>
      )}
    </Container>
  );
};

export default Card;
