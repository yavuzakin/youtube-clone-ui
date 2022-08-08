import styled from 'styled-components';
import { Comment as CommentType } from '../types/Comment';
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

interface Props {
  comments: CommentType[];
  onAddNewComment: (newComment: CommentType) => void;
  onDeleteComment: (commentId: string) => Promise<void>;
}

const Comments: React.FC<Props> = (props) => {
  return (
    <Container>
      <CommentsCount>{props.comments?.length} Comments</CommentsCount>
      <NewComment onAddNewComment={props.onAddNewComment} />
      {props.comments?.map((comment) => (
        <Comment key={comment._id} comment={comment} onDeleteComment={props.onDeleteComment} />
      ))}
    </Container>
  );
};

export default Comments;
