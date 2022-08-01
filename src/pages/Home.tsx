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
  column-gap: 2rem;
  row-gap: 4rem;
  padding: 2rem 8rem;
  font-size: 56px;
  color: ${({ theme }) => theme.textDark};
  background-color: ${({ theme }) => theme.bg};
`;

interface Props {
  isDarkTheme: boolean;
  onThemeChange: () => void;
}

const Home: React.FC<Props> = (props) => {
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
      <Leftbar isDarkTheme={props.isDarkTheme} onThemeChange={props.onThemeChange} />
      <Content>
        {videos?.map((video) => (
          <Card key={video._id} video={video} size="large" />
        ))}
      </Content>
    </Container>
  );
};

export default Home;
