import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getUser } from '../api/services/User';
import { StatusType } from '../types/Common';
import { User } from '../types/User';
import breakpoint from '../utils/BreakPoints';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  line-height: 2.8rem;
  padding: 0.75rem 1.2rem;

  @media ${breakpoint.devices.smallDesktop} {
    display: none;
  }
`;

const ChannelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  cursor: pointer;
  padding: 0.75rem 1.2rem;
  border-radius: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.bgLighter};
  }

  @media ${breakpoint.devices.smallDesktop} {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Avatar = styled.img`
  height: 2.4rem;
  width: 2.4rem;
  border-radius: 50%;
  object-fit: cover;
  background-color: #999;
`;

const Name = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2rem;

  @media ${breakpoint.devices.smallDesktop} {
    font-size: 1.1rem;
  }
`;

interface Props {
  subscribedUsers: string[];
}

const Subscriptions: React.FC<Props> = (props) => {
  const [subscribedUsers, setSubscribedUser] = useState<User[]>();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscribedUsers = async () => {
      const promises = props.subscribedUsers.map(
        async (subscribedUser) => await getUser(subscribedUser)
      );

      const responses = await Promise.all(promises);
      // Filter successfull responses
      const successfullResponses = responses.filter((userQueryResponse) => {
        return userQueryResponse?.status === StatusType.SUCCESS;
      });
      // Extract user objects from successfull responses
      const users = successfullResponses.map((response) => response?.data?.user!);
      setSubscribedUser(users);
    };
    fetchSubscribedUsers();
  }, [props.subscribedUsers]);

  const goToUserPage = (id: string) => {
    navigate(`/channel/${id}`);
  };

  return (
    <Container>
      <Title>Subscriptions</Title>
      {subscribedUsers?.map((user) => (
        <ChannelContainer key={user._id} onClick={() => goToUserPage(user._id)}>
          <Avatar src={user.profilePic} />
          <Name>{user.username}</Name>
        </ChannelContainer>
      ))}
    </Container>
  );
};

export default Subscriptions;
