import instance from '../axios';
import { CommentQueryResponse } from '../../types/Comment';

export const getCommentsOfVideo = async (id: string) => {
  try {
    const response = await instance.get<CommentQueryResponse>(`videos/${id}/comments/`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const createComment = async (videoId: string, description: string) => {
  try {
    const response = await instance.post<CommentQueryResponse>('comments/', {
      video: videoId,
      description,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
