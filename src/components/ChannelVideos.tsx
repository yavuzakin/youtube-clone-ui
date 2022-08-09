import styled from 'styled-components';
import SortIcon from '@mui/icons-material/Sort';
import React, { useState } from 'react';
import { Video } from '../types/Video';
import Card from './Card';

const Container = styled.div`
  padding: 0 20rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 0;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 0.5rem;
  row-gap: 2rem;
`;

const HeaderText = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.2rem;
`;

const SortContainer = styled.div`
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  position: relative;
`;

const SortText = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 2.2rem;
`;

const Modal = styled.div`
  position: absolute;
  top: 3rem;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  background-color: ${({ theme }) => theme.bgLight};
  width: 18rem;
  z-index: 111;
`;

const ModalItem = styled.p<{ active: boolean }>`
  cursor: pointer;
  padding: 2rem;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2rem;
  background-color: ${({ active, theme }) => active && theme.bgLighter};

  &:hover {
    background-color: ${({ theme }) => theme.bgLighter};
  }
`;

const NoVideo = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2rem;
  margin: 6rem auto;
`;

const modalItems = [
  { id: 'item1', name: 'Most popular' },
  { id: 'item2', name: 'Upload Date (earliest)' },
  { id: 'item3', name: 'Upload Date (latest)' },
];

interface Props {
  videos: Video[];
  isChannelOwner: boolean;
  onVideoDelete: (videoId: string, title: string) => Promise<void>;
}

const ChannelVideos: React.FC<Props> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSortMethodId, setSelectedSortMethodId] = useState('item3');

  selectedSortMethodId === 'item1' && props.videos.sort((a, b) => b.views - a.views);
  selectedSortMethodId === 'item2' &&
    props.videos.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  selectedSortMethodId === 'item3' &&
    props.videos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const modalHandler = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const selectSortMethodHandler = (e: React.MouseEvent<HTMLParagraphElement>, id: string) => {
    e.stopPropagation();
    setSelectedSortMethodId(id);
    setIsModalOpen(false);
  };

  return (
    <Container>
      {props.videos && props.videos.length > 0 ? (
        <>
          <Header>
            <HeaderText>Uploads</HeaderText>
            <SortContainer onClick={modalHandler}>
              <SortIcon style={{ fontSize: '2.4rem' }} />
              <SortText>SORT BY</SortText>
              {isModalOpen && (
                <Modal>
                  {modalItems.map((modalItem) => (
                    <ModalItem
                      active={selectedSortMethodId === modalItem.id}
                      key={modalItem.id}
                      onClick={(e) => selectSortMethodHandler(e, modalItem.id)}
                    >
                      {modalItem.name}
                    </ModalItem>
                  ))}
                </Modal>
              )}
            </SortContainer>
          </Header>
          <Content>
            {props.videos?.map((video) => (
              <Card
                key={video._id}
                video={video}
                size="small"
                alignment="vertical"
                isChannelOwner={props.isChannelOwner}
                onVideoDelete={props.onVideoDelete}
              />
            ))}
          </Content>
        </>
      ) : (
        <NoVideo>This channel has no videos.</NoVideo>
      )}
    </Container>
  );
};

export default ChannelVideos;
