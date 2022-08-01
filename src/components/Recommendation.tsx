import { useEffect, useState } from 'react';
import { getRecommendedVideos } from '../api/services/Video';
import { StatusType } from '../types/Common';
import { Video } from '../types/Video';
import Card from './Card';

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
    <>
      {videos.map((video) => (
        <Card key={video?._id} size="small" video={video} />
      ))}
    </>
  );
};

export default Recommendation;
