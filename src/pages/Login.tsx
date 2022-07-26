import React, { useState } from 'react';
import styled from 'styled-components';
import { login } from '../store/userActions';
import { useAppDispatch } from '../types/Hooks';

const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  height: calc(100vh - 5.6rem);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 5rem 10rem;
  border: 1px solid ${({ theme }) => theme.bgLighter};
  background-color: ${({ theme }) => theme.bgLight};
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const Input = styled.input`
  outline: none;
  border: 1px solid ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  background: transparent;
  padding: 1rem;
  width: 100%;

  &:focus-visible {
    border: 1px solid ${({ theme }) => theme.textSoft};
  }
`;

const Button = styled.button`
  border: none;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bgLighter};
  padding: 1rem;
  width: 100%;
  margin-top: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Divisor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
  margin: 2rem 0;
`;

const Hr = styled.hr`
  margin: 2rem 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
  width: 100%;
`;

const Text = styled.h4``;

const Login = () => {
  const [usernameLogin, setUsernameLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useAppDispatch();

  const usernameLoginChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameLogin(e.target.value);
  };

  const passwordLoginChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordLogin(e.target.value);
  };

  const usernameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login(usernameLogin, passwordLogin));
  };

  const registerHandler = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Container>
      <Form>
        <Title>Sign in</Title>
        <Input type="text" placeholder="username" onChange={usernameLoginChangeHandler} />
        <Input type="password" placeholder="password" onChange={passwordLoginChangeHandler} />
        <Button onClick={loginHandler}>Sign in</Button>
        <Divisor>
          <Hr />
          <Text> or </Text>
          <Hr />
        </Divisor>
        <Title>Sign up</Title>
        <Input placeholder="username" onChange={usernameChangeHandler} />
        <Input placeholder="email" onChange={passwordChangeHandler} />
        <Input placeholder="password" onChange={emailChangeHandler} />
        <Button onClick={registerHandler}>Sign up</Button>
      </Form>
    </Container>
  );
};

export default Login;
