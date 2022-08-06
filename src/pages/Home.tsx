import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAllVideos } from '../api/services/Video';
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
  padding: 2rem 9rem;
  font-size: 56px;
  color: ${({ theme }) => theme.textDark};
  background-color: ${({ theme }) => theme.bg};
`;

const Home = () => {
  const [videos, setVideos] = useState<Video[]>();

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await getAllVideos();
      setVideos(response?.data?.videos);
    };
    fetchVideos();
  }, []);

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
