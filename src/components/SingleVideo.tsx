import styled from 'styled-components';
import Like from '@mui/icons-material/ThumbUpOutlined';
import Dislike from '@mui/icons-material/ThumbDownOutlined';
import Share from '@mui/icons-material/ReplyOutlined';
import Save from '@mui/icons-material/PlaylistAddOutlined';

const VideoWrapper = styled.div`
  max-width: 128rem;
  height: 72rem;
  background-color: #999;
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
  background-color: #999;
`;

const ChannelName = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 2rem;
  color: ${({ theme }) => theme.text};
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
`;

const SingleVideo = () => {
  return (
    <>
      <VideoWrapper></VideoWrapper>
      <Title>
        React Video Sharing App UI Design | Youtube UI Clone with React
      </Title>
      <Details>
        <Info>21.907 görüntüleme ‧ 30 Haz 2022</Info>
        <Buttons>
          <Button>
            <Like style={{ fontSize: '2.4rem' }} /> 123
          </Button>
          <Button>
            <Dislike style={{ fontSize: '2.4rem' }} />
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
        <Image />
        <ChannelInfo>
          <ChannelName>JavaScript Mastery</ChannelName>
          <SubscriberCount>111 Subscribers</SubscriberCount>
        </ChannelInfo>
        <SubscribeButton>SUBSCRIBE</SubscribeButton>
        <Description>
          Video uploading app design using React and Styled Components. Youtube
          clone design with hooks and functional component. React video player.
        </Description>
      </Channel>
      <Hr />
    </>
  );
};

export default SingleVideo;
