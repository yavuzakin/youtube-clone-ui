import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { getSearchedVideos } from '../api/services/Video';
import Card from '../components/Card';
import Leftbar from '../components/Leftbar';
import { StatusType } from '../types/Common';
import { Video } from '../types/Video';

const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 8;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
`;

const ResultsContainer = styled.div`
  width: 70%;
  margin: 5rem auto 0;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const Results = () => {
  const [searchedVideos, setSearchedVideos] = useState<Video[]>();

  const { search } = useLocation();
  const queryValue = new URLSearchParams(search).get('q');

  useEffect(() => {
    const fetchSearchedVideos = async () => {
      const response = await getSearchedVideos(queryValue!);
      if (response?.status === StatusType.SUCCESS) {
        setSearchedVideos(response?.data?.videos);
      }
    };
    queryValue && fetchSearchedVideos();
  }, [queryValue]);

  return (
    <Container>
      <Leftbar />
      <Content>
        <ResultsContainer>
          {searchedVideos &&
            searchedVideos.map((video) => (
              <Card key={video._id} size="large" alignment="horizontal" video={video} />
            ))}
        </ResultsContainer>
      </Content>
    </Container>
  );
};

export default Results;
