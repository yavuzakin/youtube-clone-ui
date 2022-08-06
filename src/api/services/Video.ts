import instance from '../axios';
import { VideoQueryResponse } from '../../types/Video';

export const createVideo = async (
  title: string,
  description: string,
  imgUrl: string,
  videoUrl: string,
  tags: string[]
) => {
  try {
    const response = await instance.post<VideoQueryResponse>('videos', {
      title,
      description,
      imgUrl,
      videoUrl,
      tags,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllVideos = async () => {
  try {
    const response = await instance.get<VideoQueryResponse>('videos');
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getVideo = async (id: string) => {
  try {
    const response = await instance.get<VideoQueryResponse>(`videos/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getVideosOfUser = async (userId: string) => {
  try {
    const response = await instance.get<VideoQueryResponse>(`users/${userId}/videos`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getVideosOFSubscribedChannels = async () => {
  try {
    const response = await instance.get<VideoQueryResponse>('videos/subscribed-channels');
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getRecommendedVideos = async (tags?: string) => {
  try {
    const response = await instance.get<VideoQueryResponse>(`videos?tags=${tags}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getSearchedVideos = async (query: string) => {
  try {
    const response = await instance.get<VideoQueryResponse>(`videos?query=${query}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const likeVideo = async (videoId: string) => {
  try {
    const response = await instance.put<VideoQueryResponse>(`videos/like/${videoId}`, {});
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const dislikeVideo = async (videoId: string) => {
  try {
    const response = await instance.put<VideoQueryResponse>(`videos/dislike/${videoId}`, {});
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
