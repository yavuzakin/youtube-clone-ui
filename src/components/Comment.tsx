import styled from 'styled-components';

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

const Comment = () => {
  return (
    <Container>
      <Image />
      <Wrapper>
        <ChannelName>
          makunouchi <TimeAgo>11 days ago</TimeAgo>
        </ChannelName>
        <UserComment>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum itaque
          praesentium sint ducimus cumque ullam nemo, officiis temporibus minima
          consequuntur. Lorem ipsum dolor, sit amet consectetur
        </UserComment>
      </Wrapper>
    </Container>
  );
};

export default Comment;
