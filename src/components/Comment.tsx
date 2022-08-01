import styled from 'styled-components';
import Timeago from 'react-timeago';
import { Comment as CommentType } from '../types/Comment';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  gap: 1.6rem;
  color: ${({ theme }) => theme.text};
`;

const Image = styled.img`
  min-width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: #999;
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

interface Props {
  comment: CommentType;
}

const Comment: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  const goToUserPage = () => {
    navigate(`/channel/${props.comment?.user._id}`);
  };

  return (
    <Container>
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
    </Container>
  );
};

export default Comment;
