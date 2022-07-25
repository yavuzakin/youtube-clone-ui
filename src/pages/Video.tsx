import styled from 'styled-components';
import Comments from '../components/Comments';
import Recommendation from '../components/Recommendation';
import SingleVideo from '../components/SingleVideo';

const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 173rem;
  margin: 0 auto;
`;

const Content = styled.div`
  padding: 2.4rem;
  flex: 11;
`;

const Recommendations = styled.div`
  flex: 4;
  padding: 2.4rem 2.4rem 2.4rem 0;
`;

const Video = () => {
  return (
    <Container>
      <Wrapper>
        <Content>
          <SingleVideo />
          <Comments />
        </Content>
        <Recommendations>
          <Recommendation />
        </Recommendations>
      </Wrapper>
    </Container>
  );
};

export default Video;
