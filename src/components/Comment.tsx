import styled from 'styled-components';
import Timeago from 'react-timeago';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Comment as CommentType } from '../types/Comment';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppSelector } from '../types/Hooks';

const Container = styled.div`
  display: flex;
  gap: 1.6rem;
  color: ${({ theme }) => theme.text};
  position: relative;
`;

const Image = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: #999;
  object-fit: cover;
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ChannelName = styled.span`
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 1.8rem;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

const TimeAgo = styled.span`
  margin-left: 0.5rem;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.8rem;
  color: ${({ theme }) => theme.textDark};
`;

const UserComment = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2rem;
  color: ${({ theme }) => theme.text};
`;

const DeleteIconWrapper = styled.div`
  color: white;
  background-color: #ff0000;
  position: absolute;
  top: 50%;
  right: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transform: translateY(-50%);
`;

interface Props {
  comment: CommentType;
  onDeleteComment: (commentId: string) => Promise<void>;
}

const Comment: React.FC<Props> = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  const currentUser = useAppSelector((state) => state.user.currentUser);
  const isOwner = currentUser?._id === props.comment.user._id;

  const navigate = useNavigate();

  const goToUserPage = () => {
    navigate(`/channel/${props.comment?.user._id}`);
  };

  const hoverOnHandler = () => {
    setIsHovered(true);
  };

  const hoverOffHandler = () => {
    setIsHovered(false);
  };

  const deleteCommentHandler = () => {
    props.onDeleteComment(props.comment._id);
    setIsHovered(false);
  };

  return (
    <Container onMouseEnter={hoverOnHandler} onMouseLeave={hoverOffHandler}>
      <Image src={props.comment?.user.profilePic} onClick={goToUserPage} />
      <Wrapper>
        <ChannelName onClick={goToUserPage}>
          {props.comment?.user.username}{' '}
          <TimeAgo>
            <Timeago date={props.comment?.createdAt} />
          </TimeAgo>
        </ChannelName>
        <UserComment>{props.comment?.description}</UserComment>
      </Wrapper>
      {isOwner && isHovered && (
        <DeleteIconWrapper onClick={deleteCommentHandler}>
          <DeleteIcon style={{ fontSize: '2rem' }} />
        </DeleteIconWrapper>
      )}
    </Container>
  );
};

export default Comment;
