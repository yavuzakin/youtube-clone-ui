import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { deleteComment, getCommentsOfVideo } from '../api/services/Comment';
import { getVideo } from '../api/services/Video';
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
      const response = await getVideo(videoId);
      setVideo(response?.data?.video);
    };
    const fetchComments = async () => {
      const response = await getCommentsOfVideo(videoId);
      setComments(response?.data?.comments!);
    };
    fetchVideo();
    fetchComments();
  }, [videoId]);

  const deleteCommentHandler = async (commentId: string) => {
    await deleteComment(commentId);
    setComments((prevState) => prevState.filter((comment) => comment._id !== commentId));
  };

  return (
    <Container>
      <Wrapper>
        <Content>
          {video && <SingleVideo video={video} setVideo={setVideo} />}
          {comments && (
            <Comments
              comments={comments}
              onAddNewComment={addNewCommentHandler}
              onDeleteComment={deleteCommentHandler}
            />
          )}
        </Content>
        <Recommendations>
          <Recommendation tags={video?.tags.join(',')} />
        </Recommendations>
      </Wrapper>
    </Container>
  );
};

export default Video;
