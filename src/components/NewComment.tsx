import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.8rem;
`;

const Input = styled.input`
  width: 100%;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2rem;
  background-color: transparent;
  border: none;
  border-bottom: 0.5px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};

  &:focus-visible {
    outline: none;
    border-bottom: 1px solid ${({ theme }) => theme.text};
  }
`;

const Button = styled.button<{ isFilled: boolean }>`
  border: none;
  font-size: 1.4rem;
  font-weight: 500;
  padding: 1rem 1.6rem;
  cursor: pointer;
  color: ${({ theme }) => theme.bgLight};
  background-color: ${({ theme, isFilled }) =>
    isFilled ? '#3ea6ff' : theme.bgLighter};
`;

const NewComment = () => {
  const [userInput, setUserInput] = useState('');
  const [isInputActive, setIsInputActive] = useState(false);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const inputStateHandler = () => {
    setIsInputActive((prevState) => !prevState);
  };

  return (
    <Container>
      <Image />
      <Wrapper>
        <Input
          value={userInput}
          onChange={inputChangeHandler}
          onFocus={inputStateHandler}
          onBlur={inputStateHandler}
          placeholder="Add a comment..."
        />
        {isInputActive && (
          <Button isFilled={userInput.length > 0}>COMMENT</Button>
        )}
      </Wrapper>
    </Container>
  );
};

export default NewComment;
