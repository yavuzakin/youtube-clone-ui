import styled, { createGlobalStyle } from 'styled-components';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PhoneSearchIcon from '@mui/icons-material/Search';
import AddVideo from '@mui/icons-material/VideoCallOutlined';
import Logout from '@mui/icons-material/LogoutOutlined';
import Account from '@mui/icons-material/AccountBoxOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBackOutlined';

import YoutubeLogo from '../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../types/Hooks';
import { useRef, useState } from 'react';
import { logout } from '../store/userActions';
import UploadVideo from './UploadVideo';
import breakpoint from '../utils/BreakPoints';

const GlobalStyle = createGlobalStyle<{ isUploadVideoModalOpen: boolean }>`
  body {
    overflow: ${({ isUploadVideoModalOpen }) => isUploadVideoModalOpen && 'hidden'};
  }
`;

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

const Search = styled.div<{ isMobile: boolean }>`
  width: 35%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${breakpoint.devices.tabPort} {
    width: 50%;
  }

  @media ${breakpoint.devices.phone} {
    width: ${({ isMobile }) => (isMobile ? '70%' : '10%')};
    margin-left: ${({ isMobile }) => !isMobile && 'auto'};
    margin-right: ${({ isMobile }) => !isMobile && '1rem'};
  }
`;

const Input = styled.input<{ isMobile: boolean }>`
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

  @media ${breakpoint.devices.phone} {
    display: ${({ isMobile }) => !isMobile && 'none'};
  }
`;

const Icon = styled.div<{ isMobile: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.bgLighter};
  padding: 0.8rem 1.4rem;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  cursor: pointer;

  @media ${breakpoint.devices.phone} {
    display: ${({ isMobile }) => !isMobile && 'none'};
  }
`;

const PhoneIcon = styled.div<{ isMobile: boolean }>`
  display: none;

  @media ${breakpoint.devices.phone} {
    display: ${({ isMobile }) => (isMobile ? 'none' : 'flex')};
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
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
  object-fit: cover;
  background-color: #999;
  cursor: pointer;
`;

const Username = styled.p`
  @media ${breakpoint.devices.tabPort} {
    display: none;
  }
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

  @media ${breakpoint.devices.tabPort} {
    padding: 1rem 1.6rem;
    font-size: 1.4rem;
  }
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`;

const SignIn = styled.p<{ isMobile: boolean }>`
  display: ${({ isMobile }) => isMobile && 'none'};
`;

const Topbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUploadVideoModalOpen, setIsUploadVideoModalOpen] = useState(false);
  const [isPhoneIconClicked, setIsPhoneIconClicked] = useState(false);
  const { currentUser } = useAppSelector((state) => state.user);
  const inputRef = useRef<HTMLInputElement>(null);

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
    const bodyElement = document.querySelector('body') as HTMLBodyElement;
    bodyElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsUploadVideoModalOpen((prevState) => !prevState);
  };

  const searchHandler = () => {
    const query = inputRef.current!.value.trim();
    query && navigate(`/results?q=${query}`);
  };

  const phoneIconClickHandler = () => {
    setIsPhoneIconClicked((prevState) => !prevState);
  };

  return (
    <>
      <GlobalStyle isUploadVideoModalOpen={isUploadVideoModalOpen} />
      <Container>
        {isPhoneIconClicked ? (
          <ArrowBackIcon
            style={{ fontSize: '2.4rem', cursor: 'pointer' }}
            onClick={phoneIconClickHandler}
          />
        ) : (
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Logo>
              <Image src={YoutubeLogo} />
              YouTube
            </Logo>
          </Link>
        )}
        <Search isMobile={isPhoneIconClicked}>
          <Input placeholder="Search" ref={inputRef} isMobile={isPhoneIconClicked} />
          <Icon onClick={searchHandler} isMobile={isPhoneIconClicked}>
            <SearchIcon style={{ fontSize: '2.4rem' }} />
          </Icon>
          <PhoneIcon onClick={phoneIconClickHandler} isMobile={isPhoneIconClicked}>
            <PhoneSearchIcon style={{ fontSize: '2.2rem' }} />
          </PhoneIcon>
        </Search>
        {currentUser ? (
          <User>
            <AddVideo
              style={
                isPhoneIconClicked ? { display: 'none' } : { fontSize: '3rem', cursor: 'pointer' }
              }
              onClick={uploadVideoModalHandler}
            />
            <Avatar onClick={clickHandler} src={currentUser.profilePic} />
            <Username>{currentUser.username}</Username>
            {isMenuOpen && !isPhoneIconClicked && (
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
              <AccountCircleOutlinedIcon style={{ fontSize: '2.4rem' }} />{' '}
              <SignIn isMobile={isPhoneIconClicked}>SIGN IN</SignIn>
            </Button>
          </Link>
        )}
      </Container>
      {isUploadVideoModalOpen && <UploadVideo setOpenModal={uploadVideoModalHandler} />}
    </>
  );
};

export default Topbar;
