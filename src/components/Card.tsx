import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div<{ size: string }>`
  display: ${(props) => props.size === 'small' && 'flex'};
  gap: ${(props) => props.size === 'small' && '1rem'};
  max-width: ${(props) => (props.size === 'small' ? '100%' : '36rem')};
  margin-bottom: ${(props) => (props.size === 'small' ? '1rem' : '2rem')};
  cursor: pointer;
`;

const Image = styled.img<{ size: string }>`
  width: 100%;
  flex: ${(props) => props.size === 'small' && '1'};
  height: ${(props) => (props.size === 'small' ? '9.4rem' : '20.2rem')};
  background-color: #999;
  border-radius: 2px;
`;

const Details = styled.div<{ size: string }>`
  width: 100%;
  flex: ${(props) => props.size === 'small' && '1'};
  display: flex;
  gap: 1rem;
`;

const ChannelImage = styled.img<{ size: string }>`
  display: ${(props) => props.size === 'small' && 'none'};
  height: 3.6rem;
  min-width: 3.6rem;
  border-radius: 50%;
  background-color: #999;
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
  line-height: ${(props) => (props.size === 'small' ? '2rem' : '2.2rem')};
  margin-bottom: 0.3rem;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h3<{ size: string }>`
  font-size: ${(props) => (props.size === 'small' ? '1.2rem' : '1.4rem')};
  font-weight: 400;
  color: ${({ theme }) => theme.textDark};
`;

const ViewsAndCreatedAgo = styled.p<{ size: string }>`
  margin-top: ${(props) => props.size === 'small' && '-0.5rem'};
  font-weight: 400;
  color: ${({ theme }) => theme.textDark};
`;

interface Props {
  size: string;
}

const Card: React.FC<Props> = (props) => {
  return (
    <Link to="/video/test" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Container size={props.size}>
        <Image size={props.size} />
        <Details size={props.size}>
          <ChannelImage size={props.size} />
          <Texts size={props.size}>
            <VideoTitle size={props.size}>
              React Project Tutorial: Build a Responsive Portfolio
            </VideoTitle>
            <ChannelName size={props.size}>Pink Ward</ChannelName>
            <ViewsAndCreatedAgo size={props.size}>
              58 B görüntüleme ‧ 4 ay önce
            </ViewsAndCreatedAgo>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
