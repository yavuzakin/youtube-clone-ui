import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useRef, useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useAppSelector } from '../types/Hooks';
import { createVideo } from '../api/services/Video';
import { StatusType } from '../types/Common';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: #00000096;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 70rem;
  height: 70rem;
  background-color: ${({ theme }) => theme.bgLight};
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 500;
  border-bottom: 1px solid ${({ theme }) => theme.bgLighter};
  padding: 2rem 4rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 500;
`;

const Body = styled.div`
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const Label = styled.label`
  font-size: 1.4rem;
  margin-bottom: -1rem;
`;

const Input = styled.input`
  padding: 1rem;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.bgLighter};
`;

const Description = styled.textarea`
  padding: 1rem;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.bgLighter};
`;

const Button = styled.button`
  font-size: 1.6rem;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.soft};
  padding: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.bgLighter};
  }
`;

const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
`;

const Percentage = styled.span`
  color: ${({ theme }) => theme.text};
`;

const Error = styled.p`
  color: red;
`;

interface Props {
  setOpenModal: () => void;
}

const UploadVideo: React.FC<Props> = (props) => {
  const user = useAppSelector((state) => state.user.currentUser);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [video, setVideo] = useState<File | null>();
  const [videoPercentage, setVideoPercentage] = useState(0);
  const [image, setImage] = useState<File | null>();
  const [imagePercentage, setImagePercentage] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    videoRef.current?.load();
  }, [video]);

  useEffect(() => {
    const postVideo = async () => {
      const response = await createVideo(title, description, imgUrl, videoUrl, tags);
      if (response?.status === StatusType.SUCCESS) {
        props.setOpenModal();
      }
    };
    imgUrl && videoUrl && postVideo();
  }, [imgUrl, videoUrl, title, description, tags, props]);

  const uploadFile = (file: File, urlType: string, fileType: string) => {
    const storage = getStorage();
    const fileName = user?.username + file.name + new Date().getTime();
    const storageRef = ref(storage, `${fileType}/` + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === 'imgUrl'
          ? setImagePercentage(Math.round(progress))
          : setVideoPercentage(Math.round(progress));
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            break;
        }
      },
      (error) => {
        // Error handling
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (urlType === 'imgUrl') {
            setImgUrl(downloadURL);
          } else if (urlType === 'videoUrl') {
            setVideoUrl(downloadURL);
          }
          console.log('File available at', downloadURL);
        });
      }
    );
  };

  const videoChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e.target && e.target.files) {
      setVideo(e.target.files[0]);
    }
  };

  const removeVideoHandler = () => {
    setVideo(null);
  };

  const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e.target && e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const removeImageHandler = () => {
    setImage(null);
  };

  const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const descriptionChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const tagsChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value.split(','));
  };

  const preventCapturingHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const uploadVideoHandler = () => {
    let errorMessage = [];
    !video && errorMessage.push('Video');
    !image && errorMessage.push('Image');
    !title && errorMessage.push('Title');
    !description && errorMessage.push('Description');

    setErrorMessage(errorMessage.join(', '));

    if (errorMessage.join(', ') !== '') {
      return;
    }

    uploadFile(video!, 'videoUrl', 'videos');
    uploadFile(image!, 'imgUrl', 'images');
  };

  return (
    <Container onClick={props.setOpenModal}>
      <Wrapper onClick={preventCapturingHandler}>
        <Header>
          <Title>Upload Video</Title>
          <CloseIcon
            onClick={props.setOpenModal}
            style={{ fontSize: '2.4rem', cursor: 'pointer' }}
          />
        </Header>
        <Body>
          <Label>Video* :</Label>
          <Input type="file" accept="video/*" onChange={videoChangeHandler} />
          {video && (
            <FileContainer>
              {videoPercentage > 0 && <Percentage>Upload: {videoPercentage}%</Percentage>}
              <CloseIcon
                onClick={removeVideoHandler}
                style={{
                  fontSize: '2.4rem',
                  cursor: 'pointer',
                  position: 'absolute',
                  zIndex: '10',
                  top: `${videoPercentage > 0 ? '4rem' : '1rem'}`,
                  right: '1rem',
                }}
              />
              <video ref={videoRef} controls style={{ width: '100%' }}>
                <source src={URL.createObjectURL(video)} type="video/mp4" />
              </video>
            </FileContainer>
          )}
          <Input type="text" placeholder="Title*" onChange={titleChangeHandler} />
          <Description placeholder="Description*" rows={8} onChange={descriptionChangeHandler} />
          <Input
            type="text"
            placeholder="Seperate tags with comma.(tag1,tag2,tag3)"
            onChange={tagsChangeHandler}
          />
          <Label>Image* :</Label>
          <Input type="file" accept="image/*" onChange={imageChangeHandler} />
          {image && (
            <FileContainer>
              {imagePercentage > 0 && <Percentage>Upload: {imagePercentage}%</Percentage>}
              <CloseIcon
                onClick={removeImageHandler}
                style={{
                  fontSize: '2.4rem',
                  cursor: 'pointer',
                  position: 'absolute',
                  zIndex: '10',
                  top: `${imagePercentage > 0 ? '4rem' : '1rem'}`,
                  right: '1rem',
                }}
              />
              <img src={URL.createObjectURL(image)} style={{ width: '100%' }} alt="thumbnail" />
            </FileContainer>
          )}
          {errorMessage && <Error>{errorMessage} field(s) are required.</Error>}
          <Button onClick={uploadVideoHandler}>Upload</Button>
        </Body>
      </Wrapper>
    </Container>
  );
};

export default UploadVideo;
