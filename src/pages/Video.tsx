import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Comments from '../components/Comments';
import Recommendation from '../components/Recommendation';
import SingleVideo from '../components/SingleVideo';
import { Comment } from '../types/Comment';
import { Video as VideoType } from '../types/Video';

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
  const videoId = useLocation().pathname.split('/')[2];
  const [video, setVideo] = useState<VideoType>();
  const [comments, setComments] = useState<Comment[]>([]);

  const addNewCommentHandler = (newComment: Comment) => {
    setComments((prevState) => [newComment, ...prevState]);
  };

  useEffect(() => {
    const fetchVideo = async () => {
      const response = await axios(`http://localhost:4132/api/v1/videos/${videoId}`);
      setVideo(response.data.data.video);
    };
    const fetchComments = async () => {
      const response = await axios(`http://localhost:4132/api/v1/videos/${videoId}/comments`);
      setComments(response.data.data.comments);
    };
    fetchVideo();
    fetchComments();
  }, [videoId]);

  return (
    <Container>
      <Wrapper>
        <Content>
          <SingleVideo video={video!} setVideo={setVideo} />
          <Comments comments={comments!} onAddNewComment={addNewCommentHandler} />
        </Content>
        <Recommendations>
          <Recommendation />
        </Recommendations>
      </Wrapper>
    </Container>
  );
};

export default Video;
