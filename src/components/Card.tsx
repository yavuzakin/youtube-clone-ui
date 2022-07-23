import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 36rem;
  margin-bottom: 2rem;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 20.2rem;
  background-color: #999;
  border-radius: 3px;
`;

const Details = styled.div`
  display: flex;
  gap: 1rem;
`;

const ChannelImage = styled.img`
  height: 3.6rem;
  min-width: 3.6rem;
  border-radius: 50%;
  background-color: #999;
`;

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 1.4rem;
`;

const VideoTitle = styled.h2`
  font-size: 1.6rem;
  line-height: 2.2rem;
  font-weight: 500;
  margin-bottom: 0.3rem;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h3`
  line-height: 2rem;
  font-weight: 400;
`;

const ViewsAndCreatedAgo = styled.p`
  font-weight: 400;
`;

const Card = () => {
  return (
    <Link to="/video/test" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Container>
        <Image />
        <Details>
          <ChannelImage />
          <Texts>
            <VideoTitle>
              React Project Tutorial: Build a Responsive Portfolio
            </VideoTitle>
            <ChannelName>Pink Ward</ChannelName>
            <ViewsAndCreatedAgo>
              58 B görüntüleme ‧ 4 ay önce
            </ViewsAndCreatedAgo>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
