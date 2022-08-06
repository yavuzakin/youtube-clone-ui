import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAllVideos, getVideosOFSubscribedChannels } from '../api/services/Video';
import Card from '../components/Card';
import Leftbar from '../components/Leftbar';
import { Video } from '../types/Video';

const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 8;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;
  column-gap: 1rem;
  row-gap: 4rem;
  padding: 2rem 12rem;
  color: ${({ theme }) => theme.textDark};
  background-color: ${({ theme }) => theme.bg};
`;

interface Props {
  page: 'home' | 'subscribed-channels-videos';
}

const Home: React.FC<Props> = (props) => {
  const [videos, setVideos] = useState<Video[]>();

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await getAllVideos();
      setVideos(response?.data?.videos);
    };
    const fetchVideosOfSubscribedChannels = async () => {
      const response = await getVideosOFSubscribedChannels();
      setVideos(response?.data?.videos);
    };

    props.page === 'home' && fetchVideos();
    props.page === 'subscribed-channels-videos' && fetchVideosOfSubscribedChannels();
  }, [props.page]);

  return (
    <Container>
      <Leftbar />
      <Content>
        {videos?.map((video) => (
          <Card key={video._id} video={video} size="medium" alignment="vertical" />
        ))}
      </Content>
    </Container>
  );
};

export default Home;
