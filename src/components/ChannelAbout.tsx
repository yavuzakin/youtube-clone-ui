import styled from 'styled-components';
import EditIcon from '@mui/icons-material/EditOutlined';
import CheckIcon from '@mui/icons-material/CheckOutlined';
import { User } from '../types/User';
import { useState } from 'react';

const Container = styled.div`
  display: flex;
  padding: 4rem 20rem 0;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2rem;
  color: ${({ theme }) => theme.text};
  gap: 10rem;
`;

const LeftSide = styled.div`
  flex: 7;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
`;

const RightSide = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
`;

const EditIconWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.bgLight};
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 0.4rem;
  cursor: pointer;
`;

const CheckIconWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 2.8rem;
  background-color: green;
  border: 1px solid ${({ theme }) => theme.bgLight};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 0.4rem;
  cursor: pointer;
`;

const Input = styled.input`
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  font-size: 1.4rem;
  border: 1px solid ${({ theme }) => theme.bgLighter};
  padding: 1rem 2rem;
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
  isChannelOwner: boolean;
  totalViews?: number;
  onUserUpdate: (description: string) => Promise<void>;
}

const ChannelAbout: React.FC<Props> = (props) => {
  const [description, setDescription] = useState(props.user?.description);
  const [editMode, setEditMode] = useState(false);

  const date = new Date(props.user?.createdAt);

  const joinDate = `Joined ${date.toLocaleString('en-EN', {
    month: 'short',
  })} ${date.getDay()}, ${date.getFullYear()}`;

  const editModeHandler = () => {
    setEditMode((prevState) => !prevState);
    setDescription(props.user?.description);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const updateDescriptionHandler = () => {
    props.onUserUpdate(description);
    setEditMode(false);
  };

  return (
    <Container>
      <LeftSide>
        <Title>Description</Title>
        {editMode ? (
          <Input value={description} onChange={inputChangeHandler} />
        ) : (
          <Description>{props.user?.description}</Description>
        )}
        {props.isChannelOwner && (
          <EditIconWrapper onClick={editModeHandler}>
            <EditIcon />
          </EditIconWrapper>
        )}
        {description !== props.user?.description && props.isChannelOwner && (
          <CheckIconWrapper onClick={updateDescriptionHandler}>
            <CheckIcon />
          </CheckIconWrapper>
        )}
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
