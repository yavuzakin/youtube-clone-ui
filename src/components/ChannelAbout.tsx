import styled from 'styled-components';
import { User } from '../types/User';

const Container = styled.div`
  display: flex;
  padding: 4rem 20rem 0;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2rem;
  color: ${({ theme }) => theme.text};
`;

const LeftSide = styled.div`
  flex: 7;
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
`;

const RightSide = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.text};
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.2rem;
`;

const Description = styled.p``;

const JoinDate = styled.p`
  margin-top: 1rem;
  border-top: 0.6px solid ${({ theme }) => theme.soft};
  padding: 1.2rem 0;
`;

const TotalViews = styled.p`
  border-top: 1px solid ${({ theme }) => theme.soft};
  padding: 1.2rem 0;
`;

interface Props {
  user: User;
  totalViews?: number;
}

const ChannelAbout: React.FC<Props> = (props) => {
  const date = new Date(props.user?.createdAt);

  const joinDate = `Joined ${date.toLocaleString('en-EN', {
    month: 'short',
  })} ${date.getDay()}, ${date.getFullYear()}`;

  return (
    <Container>
      <LeftSide>
        <Title>Description</Title>
        <Description>{props.user?.description}</Description>
      </LeftSide>
      <RightSide>
        <Title>Stats</Title>
        <JoinDate>{joinDate}</JoinDate>
        {props.totalViews !== undefined && props.totalViews > 0 && (
          <TotalViews>{props.totalViews} views</TotalViews>
        )}
      </RightSide>
    </Container>
  );
};

export default ChannelAbout;
