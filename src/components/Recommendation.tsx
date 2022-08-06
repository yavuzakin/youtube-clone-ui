import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getRecommendedVideos } from '../api/services/Video';
import { StatusType } from '../types/Common';
import { Video } from '../types/Video';
import Card from './Card';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

interface Props {
  tags?: string;
}

const Recommendation: React.FC<Props> = (props) => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchRecommendedVideos = async () => {
      const response = await getRecommendedVideos(props.tags);
      if (response?.status === StatusType.SUCCESS) {
        setVideos(response.data?.videos!);
      }
    };
    fetchRecommendedVideos();
  }, [props.tags]);
  return (
    <Container>
      {videos.map((video) => (
        <Card key={video?._id} size="xsmall" alignment="horizontal" video={video} />
      ))}
    </Container>
  );
};

export default Recommendation;
