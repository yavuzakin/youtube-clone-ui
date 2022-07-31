import axios from 'axios';
import { useEffect, useState } from 'react';
import { Video } from '../types/Video';
import Card from './Card';

interface Props {
  tags?: string;
}

const Recommendation: React.FC<Props> = (props) => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchRecommendedVideos = async () => {
      try {
        const response = await axios.get(`http://localhost:4132/api/v1/videos?tags=${props.tags}`);
        setVideos(response.data.data.videos);
      } catch (err) {
        console.log(err);
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
