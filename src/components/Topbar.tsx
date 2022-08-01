import styled from 'styled-components';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchIcon from '@mui/icons-material/Search';
import AddVideo from '@mui/icons-material/VideoCallOutlined';
import Logout from '@mui/icons-material/LogoutOutlined';
import Account from '@mui/icons-material/AccountBoxOutlined';

import YoutubeLogo from '../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../types/Hooks';
import { useState } from 'react';
import { logout } from '../store/userActions';
import UploadVideo from './UploadVideo';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.bgLight};
  color: ${({ theme }) => theme.text};
  height: 5.6rem;
  position: sticky;
  top: 0;
  padding: 0 2.6rem;
  z-index: 999;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;
  margin-top: 1.8rem;
  margin-bottom: 2.5rem;
  padding: 0 1.2rem;
  cursor: pointer;
`;

const Image = styled.img`
  height: 3rem;
`;

const Search = styled.div`
  width: 35%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  width: 84%;
  padding: 0.9rem 0.5rem;
  font-size: 1.6rem;
  height: 2rem;
  border: 1px solid ${({ theme }) => theme.bgLighter};
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  outline: none;
  &:focus-visible {
    border: 0.5px solid #3ea6ff;
  }
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.bgLighter};
  padding: 0.8rem 1.4rem;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  cursor: pointer;
`;

const Button = styled.button`
  padding: 0.5rem 1.5rem;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  cursor: pointer;
  border-radius: 3px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  position: relative;
`;

const Avatar = styled.img`
  height: 3.2rem;
  width: 3.2rem;
  border-radius: 50%;
  background-color: #999;
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 4rem;
  left: -1rem;
  background-color: ${({ theme }) => theme.bgLight};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.soft};
  border-top: none;
  padding: 1rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: flex-start;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`;

const Topbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUploadVideoModalOpen, setIsUploadVideoModalOpen] = useState(false);
  const { currentUser } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const clickHandler = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const logoutHandler = () => {
    dispatch(logout());
    setIsMenuOpen(false);
  };

  const accountClickHandler = () => {
    setIsMenuOpen(false);
    navigate(`/channel/${currentUser?._id}`);
  };

  const uploadVideoModalHandler = () => {
    setIsUploadVideoModalOpen((prevState) => !prevState);
  };

  return (
    <>
      <Container>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Logo>
            <Image src={YoutubeLogo} />
            YouTube
          </Logo>
        </Link>
        <Search>
          <Input placeholder="Search" />
          <Icon>
            <SearchIcon style={{ fontSize: '2.4rem' }} />
          </Icon>
        </Search>
        {currentUser ? (
          <User>
            <AddVideo
              style={{ fontSize: '3rem', cursor: 'pointer' }}
              onClick={uploadVideoModalHandler}
            />
            <Avatar onClick={clickHandler} src={currentUser.profilePic} />
            {currentUser.username}
            {isMenuOpen && (
              <DropdownMenu>
                <MenuItem onClick={accountClickHandler}>
                  <Account style={{ fontSize: '2rem' }} /> Account
                </MenuItem>
                <MenuItem onClick={logoutHandler}>
                  <Logout style={{ fontSize: '2rem' }} /> Logout
                </MenuItem>
              </DropdownMenu>
            )}
          </User>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button>
              <AccountCircleOutlinedIcon style={{ fontSize: '2.4rem' }} /> SIGN IN
            </Button>
          </Link>
        )}
      </Container>
      {isUploadVideoModalOpen && <UploadVideo setOpenModal={uploadVideoModalHandler} />}
    </>
  );
};

export default Topbar;
