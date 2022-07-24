import styled from 'styled-components';
import Comment from './Comment';
import NewComment from './NewComment';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const CommentsCount = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.2rem;
  color: ${({ theme }) => theme.text};
`;

const Comments = () => {
  return (
    <Container>
      <CommentsCount>242 Comments</CommentsCount>
      <NewComment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </Container>
  );
};

export default Comments;
