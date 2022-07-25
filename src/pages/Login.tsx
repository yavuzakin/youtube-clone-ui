import styled from 'styled-components';

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
  return (
    <Container>
      <Form>
        <Title>Sign in</Title>
        <Input placeholder="username" />
        <Input placeholder="password" />
        <Button>Sign in</Button>
        <Divisor>
          <Hr />
          <Text> or </Text>
          <Hr />
        </Divisor>
        <Title>Sign up</Title>
        <Input placeholder="username" />
        <Input placeholder="email" />
        <Input placeholder="password" />
        <Button>Sign up</Button>
      </Form>
    </Container>
  );
};

export default Login;
