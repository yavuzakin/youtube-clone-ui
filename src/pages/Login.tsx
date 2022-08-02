import React, { useState } from 'react';
import styled from 'styled-components';
import GoogleButton from 'react-google-button';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { login, loginWithGoogle, register } from '../store/userActions';
import { useAppDispatch } from '../types/Hooks';
import { auth, provider } from '../firebase';

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

const Input = styled.input<{ error?: boolean }>`
  outline: none;
  border: 1px solid ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  background: transparent;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;

  &:focus-visible {
    border: 1px solid ${({ theme, error }) => (error ? 'red' : theme.textSoft)};
  }
`;

const Button = styled.button`
  border: none;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bgLighter};
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
  margin-top: 0.5rem;
  cursor: pointer;
  font-size: 1.6rem;

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
  const navigate = useNavigate();

  const isUsernameError = username.length < 4;
  const isPasswordError = password.length < 8;

  const isEmailCorrect =
    email.split('@').length === 2 &&
    email.split('@')[0].length > 2 &&
    email.split('@')[1].length > 3 &&
    email.split('@')[1].split('.').length === 2 &&
    email.split('@')[1].split('.')[1].length > 1;

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

  const loginHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login(usernameLogin, passwordLogin, setUsernameLogin, setPasswordLogin, navigate));
  };

  const registerHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (isUsernameError || isPasswordError || !isEmailCorrect) return;
    dispatch(register(username, email, password, setUsername, setEmail, setPassword, navigate));
  };

  const googleLoginHandler = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch(
          loginWithGoogle(
            result.user.displayName!,
            result.user.email!,
            result.user.photoURL!,
            navigate
          )
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Form>
        <Title>Sign in</Title>
        <Input
          value={usernameLogin}
          type="text"
          placeholder="username"
          onChange={usernameLoginChangeHandler}
        />
        <Input
          value={passwordLogin}
          type="password"
          placeholder="password"
          onChange={passwordLoginChangeHandler}
        />
        <Button onClick={loginHandler}>Sign in</Button>
        <GoogleButton onClick={googleLoginHandler} />
        <Divisor>
          <Hr />
          <Text> or </Text>
          <Hr />
        </Divisor>
        <Title>Sign up</Title>
        <Input
          error={username.length < 4}
          value={username}
          placeholder="username"
          onChange={usernameChangeHandler}
        />
        <Input
          error={!isEmailCorrect}
          value={email}
          placeholder="email"
          onChange={emailChangeHandler}
        />
        <Input
          error={password.length < 8}
          value={password}
          type="password"
          placeholder="password"
          onChange={passwordChangeHandler}
        />
        <Button onClick={registerHandler}>Sign up</Button>
      </Form>
    </Container>
  );
};

export default Login;
